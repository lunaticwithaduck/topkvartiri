/**
 * Step B of the reference-site teardown. For each route in routes.json:
 *   - desktop (1440×900) + mobile (390×844) full-page screenshots
 *   - HTML dump
 *   - computed-style digest (typography, colors, spacing, layout sections, components)
 *
 * Then writes design-notes.md (per-page brief) + design-data.json (raw).
 *
 * Usage:
 *   node scripts/capture-reference.cjs
 *   node scripts/capture-reference.cjs --routes=output/reference/routes.json
 *   node scripts/capture-reference.cjs --skip-mobile
 */

const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');

const DEFAULT_ROUTES = path.resolve(__dirname, '..', 'output', 'reference', 'routes.json');
const NAV_TIMEOUT = 45_000;
const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };

function parseArgs(argv) {
  const out = { routes: DEFAULT_ROUTES, skipDesktop: false, skipMobile: false };
  for (const a of argv.slice(2)) {
    if (a.startsWith('--routes=')) out.routes = path.resolve(a.slice(9));
    else if (a === '--skip-desktop') out.skipDesktop = true;
    else if (a === '--skip-mobile') out.skipMobile = true;
  }
  return out;
}

function slug(url) {
  try {
    const u = new URL(url);
    const p = (u.pathname + (u.search || '')).replace(/^\//, '').replace(/[^a-z0-9]+/gi, '-');
    return p || 'root';
  } catch {
    return 'page';
  }
}

async function captureRoute(browser, route, outDir, args) {
  const routeSlug = slug(route.url);
  const routeDir = path.join(outDir, 'pages', routeSlug);
  fs.mkdirSync(routeDir, { recursive: true });

  // Desktop pass — also where we collect the style digest.
  let digest = null;
  if (!args.skipDesktop) {
    const ctx = await browser.newContext({ viewport: DESKTOP, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    try {
      await page.goto(route.url, { waitUntil: 'networkidle', timeout: NAV_TIMEOUT });
    } catch {
      await page.waitForLoadState('load', { timeout: 15_000 }).catch(() => {});
    }
    await page.waitForTimeout(600);

    digest = await collectDigest(page);

    const html = await page.content();
    fs.writeFileSync(path.join(routeDir, 'page.html'), html);
    await page.screenshot({ path: path.join(routeDir, 'desktop.png'), fullPage: true });
    await ctx.close();
  }

  if (!args.skipMobile) {
    const ctx = await browser.newContext({ viewport: MOBILE, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    const page = await ctx.newPage();
    try {
      await page.goto(route.url, { waitUntil: 'networkidle', timeout: NAV_TIMEOUT });
    } catch {
      await page.waitForLoadState('load', { timeout: 15_000 }).catch(() => {});
    }
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(routeDir, 'mobile.png'), fullPage: true });
    await ctx.close();
  }

  return { route, digest, slug: routeSlug };
}

async function collectDigest(page) {
  return page.evaluate(() => {
    const SKIP_COLOR = new Set(['rgba(0, 0, 0, 0)', 'transparent', 'currentcolor', '', 'none']);

    // Typography: unique (font-family, font-size, font-weight, line-height) tuples in use.
    const typo = new Map();
    // Colors: bucketed by prop, weighted by approximate render area / text length.
    const colors = new Map();
    // Spacing: collect padding + margin numeric values from text-bearing elements.
    const paddings = new Map();
    const margins = new Map();
    const radii = new Map();

    const all = document.querySelectorAll('*');
    for (const el of all) {
      const cs = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) continue;
      const text = (el.textContent || '').trim();

      // Typography — only count elements that actually contain text in their direct content.
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

      // Colors — weighted
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

      // Spacing
      for (const side of ['Top', 'Right', 'Bottom', 'Left']) {
        const p = cs.getPropertyValue('padding-' + side.toLowerCase());
        if (p && p !== '0px') paddings.set(p, (paddings.get(p) ?? 0) + 1);
        const m = cs.getPropertyValue('margin-' + side.toLowerCase());
        if (m && m !== '0px') margins.set(m, (margins.get(m) ?? 0) + 1);
      }
      const br = cs.borderRadius;
      if (br && br !== '0px') radii.set(br, (radii.get(br) ?? 0) + 1);
    }

    // Layout: top-level sections. Look for <header>, <nav>, <main>, <section>, <footer>,
    // and any direct child of <body> or <main>.
    const sectionTargets = ['header', 'nav', 'main', 'footer', 'section', 'article', 'aside'];
    const sections = [];
    for (const tag of sectionTargets) {
      for (const el of document.querySelectorAll(tag)) {
        const rect = el.getBoundingClientRect();
        if (rect.height < 20) continue;
        sections.push({
          tag,
          classes: (el.className && typeof el.className === 'string') ? el.className.trim().split(/\s+/).slice(0, 6) : [],
          id: el.id || null,
          dimensions: { width: Math.round(rect.width), height: Math.round(rect.height) },
          childTagCounts: tagCounts(el),
          headings: [...el.querySelectorAll('h1,h2,h3')].slice(0, 5).map((h) => ({
            level: Number(h.tagName.slice(1)),
            text: (h.textContent || '').trim().slice(0, 120),
          })),
        });
      }
    }

    // Components: count visible buttons, anchors-styled-as-buttons, inputs, images, forms.
    const componentCounts = {
      buttons: document.querySelectorAll('button, [role="button"]').length,
      links: document.querySelectorAll('a[href]').length,
      inputs: document.querySelectorAll('input, textarea, select').length,
      forms: document.querySelectorAll('form').length,
      images: document.querySelectorAll('img').length,
      iframes: document.querySelectorAll('iframe').length,
      videos: document.querySelectorAll('video').length,
    };

    // Nav: try to find the primary nav and list its top-level items.
    const navEl = document.querySelector('nav') || document.querySelector('header nav') || document.querySelector('[role="navigation"]');
    const navItems = navEl
      ? [...navEl.querySelectorAll('a')].slice(0, 12).map((a) => ({
          text: (a.textContent || '').trim().slice(0, 60),
          href: a.getAttribute('href'),
        })).filter((x) => x.text)
      : [];

    function tagCounts(root) {
      const counts = {};
      for (const el of root.children) {
        counts[el.tagName.toLowerCase()] = (counts[el.tagName.toLowerCase()] ?? 0) + 1;
      }
      return counts;
    }

    const sortByValue = (m, limit) => [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit);
    const sortByWeight = (m, limit) => [...m.values()].sort((a, b) => b.weight - a.weight).slice(0, limit);

    return {
      url: location.href,
      title: document.title,
      lang: document.documentElement.lang || null,
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

function renderNotes({ seed, pages }) {
  const lines = [];
  lines.push(`# Reference design teardown`);
  lines.push('');
  lines.push(`Seed: ${seed}`);
  lines.push(`Captured: ${new Date().toISOString()}`);
  lines.push(`Pages: ${pages.length}`);
  lines.push('');
  lines.push('---');
  lines.push('');

  for (const p of pages) {
    if (!p.digest) continue;
    const d = p.digest;
    lines.push(`## ${d.title || p.route.url}`);
    lines.push('');
    lines.push(`URL: ${d.url}`);
    if (d.lang) lines.push(`Lang: \`${d.lang}\``);
    lines.push('');
    lines.push(`![desktop](pages/${p.slug}/desktop.png)`);
    lines.push('');
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
    lines.push(`### Layout sections`);
    lines.push('');
    for (const s of d.layout.sections) {
      const cls = s.classes.length ? ` .${s.classes.join('.')}` : '';
      const id = s.id ? `#${s.id}` : '';
      lines.push(`- **\`<${s.tag}>${id}${cls}\`** — ${s.dimensions.width}×${s.dimensions.height}px, children: ${JSON.stringify(s.childTagCounts)}`);
      for (const h of s.headings) {
        lines.push(`  - h${h.level}: ${h.text}`);
      }
    }
    lines.push('');
    lines.push(`### Components`);
    lines.push('');
    for (const [name, count] of Object.entries(d.components)) {
      lines.push(`- ${name}: ${count}`);
    }
    lines.push('');
    if (d.nav.items.length) {
      lines.push(`### Nav`);
      lines.push('');
      for (const item of d.nav.items) {
        lines.push(`- [${item.text}](${item.href})`);
      }
      lines.push('');
    }
    lines.push('---');
    lines.push('');
  }
  return lines.join('\n');
}

async function run() {
  const args = parseArgs(process.argv);
  if (!fs.existsSync(args.routes)) {
    console.error(`capture: routes file not found: ${args.routes}`);
    console.error('         run `pnpm ref:crawl` first');
    process.exit(2);
  }
  const routesFile = JSON.parse(fs.readFileSync(args.routes, 'utf8'));
  const routes = routesFile.routes || [];
  if (!routes.length) {
    console.error('capture: routes file is empty');
    process.exit(2);
  }

  const outDir = path.resolve(__dirname, '..', 'output', 'reference');
  fs.mkdirSync(outDir, { recursive: true });

  console.log(`capture: ${routes.length} routes from ${routesFile.seed}`);
  const browser = await chromium.launch();

  const pages = [];
  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];
    process.stdout.write(`capture: [${i + 1}/${routes.length}] ${route.url} ... `);
    try {
      const result = await captureRoute(browser, route, outDir, args);
      pages.push(result);
      process.stdout.write('ok\n');
    } catch (err) {
      process.stdout.write(`fail (${err.message})\n`);
    }
  }

  await browser.close();

  fs.writeFileSync(path.join(outDir, 'design-data.json'), JSON.stringify({ seed: routesFile.seed, pages }, null, 2));
  fs.writeFileSync(path.join(outDir, 'design-notes.md'), renderNotes({ seed: routesFile.seed, pages }));

  console.log('capture: done');
  console.log(`  → ${path.join(outDir, 'design-notes.md')}`);
  console.log(`  → ${path.join(outDir, 'design-data.json')}`);
  console.log(`  → ${path.join(outDir, 'pages', '<slug>', 'desktop.png|mobile.png|page.html')}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
