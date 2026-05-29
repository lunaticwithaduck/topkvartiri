/**
 * Quendoo booking-funnel capture — a DESIGN reference, not a transaction.
 *
 * The reference site (boutiqueholiday-pirin.com) hands its booking flow off to a
 * hosted Quendoo widget. This script captures that funnel's first screen (the search
 * widget) and, BEST EFFORT, the room/availability list one step in — so we can reskin
 * the booking UI without reverse-engineering Quendoo's markup by hand.
 *
 * For each captured step it writes (mirroring capture-reference.cjs):
 *   - desktop (1440×900) full-page screenshot
 *   - mobile (390×844) full-page screenshot   (step 01 only)
 *   - page.html dump
 *   - computed-style digest (typography, colors, spacing, layout sections, components)
 *   - sections/NN-*.png per-section crops
 * Then aggregates into design-data.json + design-notes.md under output/quendoo/.
 *
 * SAFETY GUARANTEES (non-negotiable — this script must NEVER place a booking):
 *   1. DENYLIST gate. Before any advance click we lowercase the candidate's text and
 *      reject it if it contains ANY deny phrase (pay/confirm/submit/checkout across
 *      BG/EN/RU). A candidate is clicked ONLY if it matches an ALLOW phrase AND
 *      contains NO deny phrase. So "Резервирай" advances; "Потвърди резервацията"
 *      (contains "потвърди"/"резервацията") is refused.
 *   2. TERMINAL-STATE detector. After any navigation we inspect the page for booking
 *      end-states — email/tel inputs, a payment iframe (stripe|mypos|viva|borica|pay),
 *      or visible pay/checkout text. If found we capture the screen and STOP the walk;
 *      we never click further.
 *   3. NO form interaction. The script never fills, types into, or submits any field,
 *      and never clicks inside an <input> or a payment iframe. It only navigates and
 *      screenshots.
 *   4. Every interaction is wrapped in try/catch; the script degrades to "captured what
 *      it could", always writes its aggregate files, and exits 0 on partial success.
 *
 * Usage:
 *   node scripts/capture-quendoo.cjs
 *   node scripts/capture-quendoo.cjs --url=https://booking.quendoo.com/...
 *   node scripts/capture-quendoo.cjs --headed --slowmo=100
 */

const { chromium } = require('playwright');
const { PNG } = require('pngjs');
const fs = require('node:fs');
const path = require('node:path');

const DEFAULT_URL = 'https://booking.quendoo.com/fe-bookings-mp/boutique-holiday-MqrPnFoLOC/';
const NAV_TIMEOUT = 30_000;
const NETWORK_IDLE_SOFT_TIMEOUT = 4_000;
const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };

// --- Interaction targets ---------------------------------------------------
// "Accept" phrases across BG / EN / RU (the reference flow may support all three).
// Order matters: broader "Accept all" / "Приемам всички" come BEFORE shorter variants.
const COOKIE_ACCEPT_PHRASES = [
  'Accept all', 'Accept All', 'Allow all', 'Allow All',
  'Приемам всички', 'Принять все',
  'Accept', 'Allow', 'Agree', 'I agree', 'I understand',
  'Приемам', 'Съгласен съм', 'Съгласен', 'Разрешавам',
  'Принять', 'Согласен',
  'OK', 'Ok', 'Got it', 'Continue', 'Разбрах', 'Продължи', 'Хорошо', 'Продолжить', 'Понятно',
];

const COOKIE_SELECTORS = [
  '#onetrust-accept-btn-handler',
  '#CybotCookiebotDialogBodyLevelButtonAccept',
  '#CybotCookiebotDialogBodyButtonAccept',
  '#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll',
  '.cc-accept-all',
  '.cc-allow',
  '.cookie-accept',
  '.cookie-banner button',
  '#cookieConsent button',
  '[id*="cookie" i] button[id*="accept" i]',
  '[class*="cookie" i] button[class*="accept" i]',
  '[class*="consent" i] button[class*="accept" i]',
];

// --- Advance-step safety lists ---------------------------------------------
// ALLOW: phrases that move forward from the search widget (BG/EN/RU). Case-insensitive.
const ADVANCE_ALLOW_PHRASES = [
  'Търсене', 'Search', 'Продължи', 'Continue', 'Напред', 'Next', 'Резервирай', 'Reserve',
];

// DENY: phrases that mean "money is about to move" or "this is the final commit".
// Matched as a case-insensitive SUBSTRING against the candidate's full text. A candidate
// is clicked only if it matches an ALLOW phrase AND contains NONE of these.
const ADVANCE_DENY_PHRASES = [
  // Bulgarian
  'плати', 'плащане', 'потвърди', 'потвържд', 'завърш', 'резервацията', 'книжка',
  // English
  'pay', 'payment', 'confirm', 'complete booking', 'book now', 'submit', 'checkout',
  // Russian
  'оплат', 'подтверд', 'заверш',
];

// TERMINAL-STATE markers: if any appear, we're at a booking end-state — capture & stop.
// Iframe srcs that indicate a payment provider (substring match, case-insensitive).
const PAYMENT_IFRAME_HINTS = ['stripe', 'mypos', 'viva', 'borica', 'pay'];
// Visible page text that indicates checkout/payment (substring match, case-insensitive).
const TERMINAL_TEXT_HINTS = [
  // Bulgarian
  'плащане', 'плати', 'данни за плащане', 'карта', 'каса',
  // English
  'payment', 'checkout', 'pay now', 'card number', 'billing',
  // Russian
  'оплата', 'оплатить', 'касса',
];

// --- Helpers ---------------------------------------------------------------

async function navigateAndLoad(page, url) {
  try {
    await page.goto(url, { waitUntil: 'load', timeout: NAV_TIMEOUT });
  } catch {
    // Some sites throw on `load` due to long-lived assets — keep going.
  }
  await page.waitForLoadState('networkidle', { timeout: NETWORK_IDLE_SOFT_TIMEOUT }).catch(() => {});
}

async function tryClickFirstVisible(page, selectors, { timeout = 250 } = {}) {
  // Search main frame + any iframes (cookie banners commonly render in iframes)
  for (const frame of page.frames()) {
    for (const sel of selectors) {
      try {
        const el = frame.locator(sel).first();
        const visible = await el.isVisible({ timeout }).catch(() => false);
        if (visible) {
          await el.click({ timeout: 2_000 });
          return sel;
        }
      } catch {
        // selector might be unsupported in this frame — keep going
      }
    }
  }
  return null;
}

async function tryClickFirstByText(page, phrases, { timeout = 250 } = {}) {
  for (const frame of page.frames()) {
    for (const phrase of phrases) {
      try {
        // Match button or anchor with text; case-insensitive via :has-text
        const el = frame.locator(`button:has-text("${phrase}"), a:has-text("${phrase}"), [role="button"]:has-text("${phrase}")`).first();
        const visible = await el.isVisible({ timeout }).catch(() => false);
        if (visible) {
          await el.click({ timeout: 2_000 });
          return phrase;
        }
      } catch {}
    }
  }
  return null;
}

async function dismissCookies(page) {
  const hitText = await tryClickFirstByText(page, COOKIE_ACCEPT_PHRASES);
  if (hitText) return { dismissed: true, via: `text:${hitText}` };
  const hitSel = await tryClickFirstVisible(page, COOKIE_SELECTORS);
  if (hitSel) return { dismissed: true, via: `sel:${hitSel}` };
  return { dismissed: false };
}

// Scroll the page until scrollHeight stops growing (or we hit a safety cap).
// Returns how many growth iterations we observed — useful for debugging "did we get everything?"
async function exhaustiveScroll(page) {
  return page.evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const distance = 600;
    const stepDelay = 120;
    const settleDelay = 600;
    const maxPasses = 8;
    const stableTarget = 2;

    let stableCount = 0;
    let lastHeight = 0;
    let passes = 0;
    let growthEvents = 0;

    while (passes < maxPasses && stableCount < stableTarget) {
      const startHeight = document.body.scrollHeight;
      for (let y = 0; y < startHeight; y += distance) {
        window.scrollTo(0, y);
        await sleep(stepDelay);
      }
      window.scrollTo(0, startHeight);
      await sleep(settleDelay);

      const endHeight = document.body.scrollHeight;
      if (endHeight > lastHeight) {
        growthEvents++;
        stableCount = 0;
        lastHeight = endHeight;
      } else {
        stableCount++;
      }
      passes++;
    }

    window.scrollTo(0, 0);
    await sleep(400);
    return { passes, growthEvents, finalHeight: document.body.scrollHeight };
  }).catch(() => ({ passes: 0, growthEvents: 0, finalHeight: 0, error: true }));
}

// --- Safety: terminal-state detection --------------------------------------
// Returns { terminal: bool, reasons: [...] }. NEVER throws — degrades to non-terminal.
async function detectTerminalState(page) {
  const reasons = [];
  try {
    // 1) Payment iframe by src.
    for (const frame of page.frames()) {
      let src = '';
      try { src = (frame.url() || '').toLowerCase(); } catch {}
      if (!src) continue;
      for (const hint of PAYMENT_IFRAME_HINTS) {
        // The main app frame's URL may itself contain "pay"-like substrings only when on a
        // payment route; still treat as terminal to stay safe. Skip the very first frame
        // (the top document at the funnel root) only when it's still the booking root.
        if (src.includes(hint)) {
          reasons.push(`frame-src:${hint}`);
          break;
        }
      }
    }

    // 2) Sensitive form fields + payment text, evaluated in-page across the main document.
    const domSignals = await page.evaluate((textHints) => {
      const out = { email: false, tel: false, paymentIframe: false, text: [] };
      out.email = !!document.querySelector('input[type="email"]');
      out.tel = !!document.querySelector('input[type="tel"]');
      for (const f of document.querySelectorAll('iframe')) {
        const s = (f.getAttribute('src') || '').toLowerCase();
        if (/stripe|mypos|viva|borica|pay/.test(s)) { out.paymentIframe = true; break; }
      }
      const bodyText = (document.body ? document.body.innerText : '').toLowerCase();
      for (const hint of textHints) {
        if (bodyText.includes(hint)) out.text.push(hint);
      }
      return out;
    }, TERMINAL_TEXT_HINTS).catch(() => null);

    if (domSignals) {
      if (domSignals.email) reasons.push('input[type=email]');
      if (domSignals.tel) reasons.push('input[type=tel]');
      if (domSignals.paymentIframe) reasons.push('payment-iframe');
      // Only treat text hints as terminal when at least one is present AND we already see a
      // payment iframe or sensitive input, OR when a strong checkout/payment word is visible.
      if (domSignals.text.length) reasons.push(`text:${domSignals.text.join(',')}`);
    }
  } catch {
    // Detection must never break the run — assume non-terminal so we still capture.
  }
  return { terminal: reasons.length > 0, reasons };
}

// --- Safety: denylist-gated advance click ----------------------------------
// Finds the first ALLOW phrase whose visible control's full text contains NO DENY phrase,
// then clicks it. Never clicks inputs or payment-iframe content. Returns a result record.
async function tryAdvanceSafely(page) {
  for (const allow of ADVANCE_ALLOW_PHRASES) {
    for (const frame of page.frames()) {
      // Skip payment-provider frames entirely — never interact inside them.
      let frameUrl = '';
      try { frameUrl = (frame.url() || '').toLowerCase(); } catch {}
      if (PAYMENT_IFRAME_HINTS.some((h) => frameUrl.includes(h)) && frameUrl !== '' && frame !== page.mainFrame()) {
        continue;
      }
      try {
        const candidate = frame.locator(
          `button:has-text("${allow}"), a:has-text("${allow}"), [role="button"]:has-text("${allow}")`
        ).first();
        const visible = await candidate.isVisible({ timeout: 300 }).catch(() => false);
        if (!visible) continue;

        // DENYLIST GATE: read the candidate's full text, lowercase it, reject on any deny phrase.
        const rawText = (await candidate.innerText({ timeout: 1_000 }).catch(() => '')) || '';
        const text = rawText.toLowerCase();
        const deny = ADVANCE_DENY_PHRASES.find((d) => text.includes(d.toLowerCase()));
        if (deny) {
          // Allow phrase present but a deny phrase is also present → refuse (e.g. "Потвърди резервацията").
          return { advanced: false, refused: true, allow, deny, candidateText: rawText.slice(0, 80) };
        }

        // Never click an <input> control (we only screenshot forms, never operate them).
        const tag = (await candidate.evaluate((el) => el.tagName.toLowerCase()).catch(() => '')) || '';
        if (tag === 'input') {
          continue;
        }

        const before = page.url();
        await candidate.click({ timeout: 2_000 });
        return { advanced: true, allow, candidateText: rawText.slice(0, 80), before };
      } catch {
        // candidate not actionable in this frame — keep trying
      }
    }
  }
  return { advanced: false, reason: 'no-allow-match' };
}

// Crop a full-page screenshot into per-section PNGs using the bounds we collected
// in the digest. Returns one entry per cropped file, keyed by section.seq.
function cropSectionsFromPng(pngPath, sections, sectionsDir) {
  if (!sections || !sections.length) return [];
  const buffer = fs.readFileSync(pngPath);
  const png = PNG.sync.read(buffer);
  fs.mkdirSync(sectionsDir, { recursive: true });
  const results = [];
  for (const s of sections) {
    if (s.x < 0 || s.y < 0) continue;
    const w = Math.min(s.dimensions.width, png.width - s.x);
    const h = Math.min(s.dimensions.height, png.height - s.y);
    if (w <= 0 || h <= 0) continue;
    if (s.x + w > png.width || s.y + h > png.height) continue;

    const out = new PNG({ width: w, height: h });
    PNG.bitblt(png, out, s.x, s.y, w, h, 0, 0);
    const classSuffix = s.classes[0]
      ? '-' + s.classes[0].replace(/[^a-z0-9]+/gi, '').slice(0, 20).toLowerCase()
      : '';
    const filename = `${String(s.seq).padStart(2, '0')}-${s.tag}${classSuffix}.png`;
    const file = path.join(sectionsDir, filename);
    fs.writeFileSync(file, PNG.sync.write(out));
    results.push({ seq: s.seq, file: 'sections/' + filename });
  }
  return results;
}

async function collectDigest(page) {
  return page.evaluate(() => {
    const SKIP_COLOR = new Set(['rgba(0, 0, 0, 0)', 'transparent', 'currentcolor', '', 'none']);

    const typo = new Map();
    const colors = new Map();
    const paddings = new Map();
    const margins = new Map();
    const radii = new Map();

    const all = document.querySelectorAll('*');
    for (const el of all) {
      const cs = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) continue;
      const text = (el.textContent || '').trim();

      const ownText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 0);
      if (ownText) {
        const key = JSON.stringify({
          family: cs.fontFamily.split(',')[0].trim().replace(/^["']|["']$/g, ''),
          size: cs.fontSize,
          weight: cs.fontWeight,
          lineHeight: cs.lineHeight,
        });
        typo.set(key, (typo.get(key) ?? 0) + 1);
      }

      const bumpColor = (color, prop, w) => {
        if (SKIP_COLOR.has(color)) return;
        const k = `${color}|${prop}`;
        const cur = colors.get(k) ?? { color, prop, weight: 0, count: 0 };
        cur.weight += w;
        cur.count += 1;
        colors.set(k, cur);
      };
      bumpColor(cs.color, 'color', Math.min(text.length, 500));
      bumpColor(cs.backgroundColor, 'background-color', Math.sqrt(rect.width * rect.height));
      bumpColor(cs.borderTopColor, 'border', 1);

      for (const side of ['Top', 'Right', 'Bottom', 'Left']) {
        const p = cs.getPropertyValue('padding-' + side.toLowerCase());
        if (p && p !== '0px') paddings.set(p, (paddings.get(p) ?? 0) + 1);
        const m = cs.getPropertyValue('margin-' + side.toLowerCase());
        if (m && m !== '0px') margins.set(m, (margins.get(m) ?? 0) + 1);
      }
      const br = cs.borderRadius;
      if (br && br !== '0px') radii.set(br, (radii.get(br) ?? 0) + 1);
    }

    // Top-level layout sections. Skip section-tags nested inside other section-tags so we
    // don't produce overlapping screenshots. Roughly one entry per visual band of the page.
    const SECTION_TAGS = new Set(['header', 'footer', 'section', 'article', 'aside', 'nav']);
    const sections = [];
    function tagCounts(root) {
      const counts = {};
      for (const el of root.children) {
        counts[el.tagName.toLowerCase()] = (counts[el.tagName.toLowerCase()] ?? 0) + 1;
      }
      return counts;
    }
    function isTopLevelSection(el) {
      let p = el.parentElement;
      while (p && p !== document.body) {
        if (SECTION_TAGS.has(p.tagName.toLowerCase())) return false;
        p = p.parentElement;
      }
      return true;
    }
    // Ensure scrollY === 0 so getBoundingClientRect aligns with the full-page screenshot.
    window.scrollTo(0, 0);
    let seq = 0;
    const sectionCandidates = document.querySelectorAll('header, footer, section, article, aside, nav');
    for (const el of sectionCandidates) {
      if (!isTopLevelSection(el)) continue;
      const rect = el.getBoundingClientRect();
      if (rect.height < 50 || rect.width < 50) continue;
      seq++;
      sections.push({
        seq,
        tag: el.tagName.toLowerCase(),
        classes: (el.className && typeof el.className === 'string') ? el.className.trim().split(/\s+/).slice(0, 6) : [],
        id: el.id || null,
        x: Math.max(0, Math.round(rect.left + window.scrollX)),
        y: Math.max(0, Math.round(rect.top + window.scrollY)),
        dimensions: { width: Math.round(rect.width), height: Math.round(rect.height) },
        childTagCounts: tagCounts(el),
        headings: [...el.querySelectorAll('h1,h2,h3')].slice(0, 5).map((h) => ({
          level: Number(h.tagName.slice(1)),
          text: (h.textContent || '').trim().slice(0, 120),
        })),
      });
    }

    const componentCounts = {
      buttons: document.querySelectorAll('button, [role="button"]').length,
      links: document.querySelectorAll('a[href]').length,
      inputs: document.querySelectorAll('input, textarea, select').length,
      forms: document.querySelectorAll('form').length,
      images: document.querySelectorAll('img').length,
      iframes: document.querySelectorAll('iframe').length,
      videos: document.querySelectorAll('video').length,
    };

    const navEl = document.querySelector('nav') || document.querySelector('header nav') || document.querySelector('[role="navigation"]');
    const navItems = navEl
      ? [...navEl.querySelectorAll('a')].slice(0, 12).map((a) => ({
          text: (a.textContent || '').trim().slice(0, 60),
          href: a.getAttribute('href'),
        })).filter((x) => x.text)
      : [];

    const sortByValue = (m, limit) => [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit);
    const sortByWeight = (m, limit) => [...m.values()].sort((a, b) => b.weight - a.weight).slice(0, limit);

    return {
      url: location.href,
      title: document.title,
      lang: document.documentElement.lang || null,
      pageHeight: Math.round(document.body.scrollHeight),
      typography: sortByValue(typo, 20).map(([k, count]) => ({ ...JSON.parse(k), count })),
      colors: sortByWeight(colors, 30),
      spacing: {
        paddings: sortByValue(paddings, 12).map(([v, c]) => ({ value: v, count: c })),
        margins: sortByValue(margins, 12).map(([v, c]) => ({ value: v, count: c })),
        borderRadii: sortByValue(radii, 8).map(([v, c]) => ({ value: v, count: c })),
      },
      layout: { sections: sections.slice(0, 20) },
      components: componentCounts,
      nav: { items: navItems },
    };
  });
}

// --- Per-step capture ------------------------------------------------------

// Capture the current DESKTOP `page` into a step dir. Used by both step 01 and step 02.
async function captureDesktopStep(page, stepSlug, outDir, log) {
  const stepDir = path.join(outDir, 'pages', stepSlug);
  fs.mkdirSync(stepDir, { recursive: true });

  log(`  ${stepSlug}: digest + desktop screenshot`);
  const digest = await collectDigest(page);
  const html = await page.content();
  fs.writeFileSync(path.join(stepDir, 'page.html'), html);
  const desktopPngPath = path.join(stepDir, 'desktop.png');
  await page.screenshot({ path: desktopPngPath, fullPage: true });

  log(`  ${stepSlug}: cropping per-section screenshots`);
  const sectionFiles = cropSectionsFromPng(desktopPngPath, digest.layout.sections, path.join(stepDir, 'sections'));
  const byseq = new Map(sectionFiles.map((s) => [s.seq, s.file]));
  for (const s of digest.layout.sections) {
    const f = byseq.get(s.seq);
    if (f) s.file = f;
  }

  return { digest, sectionsCropped: sectionFiles.length };
}

function parseArgs(argv) {
  const out = { url: DEFAULT_URL, headed: false, slowmo: 0 };
  for (const a of argv.slice(2)) {
    if (a.startsWith('--url=')) out.url = a.slice(6);
    else if (a === '--headed') out.headed = true;
    else if (a.startsWith('--slowmo=')) out.slowmo = Number(a.slice(9));
  }
  return out;
}

function slug(s) {
  return String(s).replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '').toLowerCase() || 'step';
}

function renderNotes({ url, capturedAt, steps }) {
  const lines = [];
  lines.push(`# Quendoo booking-funnel teardown`);
  lines.push('');
  lines.push(`Source: ${url}`);
  lines.push(`Captured: ${capturedAt}`);
  lines.push(`Steps captured: ${steps.length}`);
  lines.push('');
  lines.push('> Safety: this capture never fills forms, never clicks pay/confirm/checkout');
  lines.push('> controls, and stops at any payment terminal-state. Design reference only.');
  lines.push('');
  lines.push('---');
  lines.push('');

  for (const step of steps) {
    lines.push(`## ${step.step}${step.label ? ` — ${step.label}` : ''}`);
    lines.push('');
    if (step.note) {
      lines.push(`_${step.note}_`);
      lines.push('');
    }
    const d = step.digest;
    if (!d) {
      lines.push('No digest captured for this step.');
      lines.push('');
      lines.push('---');
      lines.push('');
      continue;
    }
    lines.push(`URL: ${d.url}`);
    if (d.lang) lines.push(`Lang: \`${d.lang}\``);
    lines.push(`Page height: ${d.pageHeight}px`);
    lines.push('');

    lines.push(`### Captured screenshots`);
    lines.push('');
    for (const state of step.captured || []) {
      lines.push(`**${state}**`);
      lines.push('');
      lines.push(`![${state}](pages/${step.step}/${state}.png)`);
      lines.push('');
    }

    lines.push(`### Typography`);
    lines.push('');
    lines.push('| family | size | weight | line-height | count |');
    lines.push('| --- | --- | --- | --- | --- |');
    for (const t of d.typography) {
      lines.push(`| ${t.family} | ${t.size} | ${t.weight} | ${t.lineHeight} | ${t.count} |`);
    }
    lines.push('');

    lines.push(`### Colors (top 15 by weighted usage)`);
    lines.push('');
    lines.push('| color | prop | weight | count |');
    lines.push('| --- | --- | --- | --- |');
    for (const c of d.colors.slice(0, 15)) {
      lines.push(`| \`${c.color}\` | ${c.prop} | ${c.weight.toFixed(1)} | ${c.count} |`);
    }
    lines.push('');

    lines.push(`### Spacing`);
    lines.push('');
    lines.push(`**Padding (top values):** ${d.spacing.paddings.map((s) => `\`${s.value}\` ×${s.count}`).join(', ') || '—'}`);
    lines.push('');
    lines.push(`**Margin (top values):** ${d.spacing.margins.map((s) => `\`${s.value}\` ×${s.count}`).join(', ') || '—'}`);
    lines.push('');
    lines.push(`**Border-radius:** ${d.spacing.borderRadii.map((s) => `\`${s.value}\` ×${s.count}`).join(', ') || '—'}`);
    lines.push('');

    lines.push(`### Layout sections (with per-section screenshots)`);
    lines.push('');
    for (const s of d.layout.sections) {
      const cls = s.classes.length ? `.${s.classes.join('.')}` : '';
      const domId = s.id ? `#${s.id}` : '';
      const firstHeading = (s.headings && s.headings[0]) ? ` — "${s.headings[0].text}"` : '';
      lines.push(`**${String(s.seq).padStart(2, '0')}. \`<${s.tag}>${domId}${cls}\`** (${s.dimensions.width}×${s.dimensions.height}px)${firstHeading}`);
      lines.push('');
      if (s.file) {
        lines.push(`![${s.tag} ${s.seq}](pages/${step.step}/${s.file})`);
        lines.push('');
      }
    }

    lines.push(`### Components`);
    lines.push('');
    for (const [name, count] of Object.entries(d.components)) {
      lines.push(`- ${name}: ${count}`);
    }
    lines.push('');
    lines.push('---');
    lines.push('');
  }
  return lines.join('\n');
}

async function run() {
  const args = parseArgs(process.argv);
  const url = args.url;
  const outDir = path.resolve(__dirname, '..', 'output', 'quendoo');
  fs.mkdirSync(outDir, { recursive: true });

  const capturedAt = new Date().toISOString();
  console.log(`quendoo: capturing ${url}${args.headed ? ' (headed)' : ''}${args.slowmo ? ` slowMo=${args.slowmo}ms` : ''}`);
  const browser = await chromium.launch({ headless: !args.headed, slowMo: args.slowmo });

  const steps = [];

  // --- Step 01: the search widget (reliable) -------------------------------
  // Hold onto the desktop context/page so step 02 can try to advance from it.
  let desktopCtx = null;
  let desktopPage = null;
  try {
    desktopCtx = await browser.newContext({ viewport: DESKTOP, deviceScaleFactor: 1 });
    desktopPage = await desktopCtx.newPage();

    console.log('quendoo: [01-search] desktop loading');
    await navigateAndLoad(desktopPage, url);

    console.log('quendoo: [01-search] dismissing cookies');
    const cookie = await dismissCookies(desktopPage).catch(() => ({ dismissed: false }));
    if (cookie.dismissed) await desktopPage.waitForTimeout(500);

    console.log('quendoo: [01-search] exhaustive scroll');
    await exhaustiveScroll(desktopPage);

    const log = (m) => console.log(`quendoo: [01-search]${m}`);
    const { digest } = await captureDesktopStep(desktopPage, '01-search', outDir, log);

    steps.push({
      step: '01-search',
      label: 'Search widget',
      note: 'Initial Quendoo funnel screen — date/guest search.',
      url: digest.url,
      captured: ['desktop', 'mobile'],
      digest,
    });
    console.log('quendoo: [01-search] desktop done');
  } catch (err) {
    console.log(`quendoo: [01-search] desktop fail (${err.message})`);
  }

  // --- Step 01: mobile (separate context) ----------------------------------
  try {
    const mctx = await browser.newContext({ viewport: MOBILE, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    const mpage = await mctx.newPage();
    console.log('quendoo: [01-search] mobile loading');
    await navigateAndLoad(mpage, url);
    const cookie = await dismissCookies(mpage).catch(() => ({ dismissed: false }));
    if (cookie.dismissed) await mpage.waitForTimeout(500);
    console.log('quendoo: [01-search] mobile exhaustive scroll');
    await exhaustiveScroll(mpage);
    const stepDir = path.join(outDir, 'pages', '01-search');
    fs.mkdirSync(stepDir, { recursive: true });
    console.log('quendoo: [01-search] mobile screenshot');
    await mpage.screenshot({ path: path.join(stepDir, 'mobile.png'), fullPage: true });
    await mctx.close();
    console.log('quendoo: [01-search] mobile done');
  } catch (err) {
    console.log(`quendoo: [01-search] mobile fail (${err.message})`);
  }

  // --- Step 02: rooms / availability (BEST EFFORT) -------------------------
  if (desktopPage) {
    try {
      console.log('quendoo: [02-rooms] safety pre-check (terminal state?)');
      const preTerminal = await detectTerminalState(desktopPage);
      if (preTerminal.terminal) {
        console.log(`quendoo: [02-rooms] already at terminal state (${preTerminal.reasons.join(', ')}) — not advancing`);
      } else {
        console.log('quendoo: [02-rooms] attempting safe advance');
        const before = desktopPage.url();
        const beforeHtml = await desktopPage.content().catch(() => '');
        const advance = await tryAdvanceSafely(desktopPage);

        if (advance.refused) {
          console.log(`quendoo: [02-rooms] refused click "${advance.candidateText}" (deny="${advance.deny}") — skipping`);
        } else if (!advance.advanced) {
          console.log(`quendoo: [02-rooms] no advance control found (${advance.reason || 'n/a'}) — skipping`);
        } else {
          await desktopPage.waitForTimeout(1500);

          // After advancing, run the terminal-state detector. If we landed on a booking
          // end-state, capture the current screen and STOP — never click again.
          const term = await detectTerminalState(desktopPage);
          const afterUrl = desktopPage.url();
          const afterHtml = await desktopPage.content().catch(() => '');
          const changed = afterUrl !== before || afterHtml !== beforeHtml;

          if (!changed) {
            console.log('quendoo: [02-rooms] click had no visible effect — skipping');
          } else {
            const log = (m) => console.log(`quendoo: [02-rooms]${m}`);
            await exhaustiveScroll(desktopPage).catch(() => {});
            const { digest } = await captureDesktopStep(desktopPage, '02-rooms', outDir, log);
            steps.push({
              step: '02-rooms',
              label: 'Rooms / availability',
              note: term.terminal
                ? `Advanced via "${advance.allow}" then detected terminal state (${term.reasons.join(', ')}); captured and stopped — no further clicks.`
                : `Advanced via "${advance.allow}".`,
              url: digest.url,
              captured: ['desktop'],
              digest,
            });
            if (term.terminal) {
              console.log(`quendoo: [02-rooms] terminal state reached (${term.reasons.join(', ')}) — STOP, captured only`);
            } else {
              console.log('quendoo: [02-rooms] desktop done');
            }
          }
        }
      }
    } catch (err) {
      console.log(`quendoo: [02-rooms] best-effort step failed gracefully (${err.message})`);
    }
  }

  if (desktopCtx) await desktopCtx.close().catch(() => {});
  await browser.close().catch(() => {});

  // --- Aggregate -----------------------------------------------------------
  const dataPath = path.join(outDir, 'design-data.json');
  const notesPath = path.join(outDir, 'design-notes.md');
  fs.writeFileSync(dataPath, JSON.stringify({ url, capturedAt, steps }, null, 2));
  fs.writeFileSync(notesPath, renderNotes({ url, capturedAt, steps }));

  console.log('quendoo: done');
  console.log(`  → ${notesPath}`);
  console.log(`  → ${dataPath}`);
  console.log(`  → ${path.join(outDir, 'pages', '<step>', '*.png + page.html')}`);
}

run().catch((err) => {
  // Last-resort guard: even an unexpected failure should not crash hard with a non-zero
  // exit on partial success — we log and exit 0 so "captured what we could" still counts.
  console.error(`quendoo: unexpected error — ${err && err.message}`);
  process.exit(0);
});
