/**
 * Step A of the reference-site teardown. BFS the same-origin link graph from
 * the seed URL up to a depth and a page cap. Emits routes.json so you can
 * eyeball + prune before the heavier capture step.
 *
 * Usage:
 *   node scripts/crawl-reference.cjs
 *   node scripts/crawl-reference.cjs --url=https://example.com --depth=2 --max=15
 */

const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');

const DEFAULT_URL = 'https://boutiqueholiday-pirin.com/';
const DEFAULT_DEPTH = 2;
const DEFAULT_MAX = 15;
const NAV_TIMEOUT = 30_000;

const SKIP_EXTENSIONS = /\.(pdf|jpg|jpeg|png|gif|svg|webp|zip|mp4|webm|mp3|css|js|ico|xml|woff2?|ttf)(\?|$)/i;
const SKIP_HASH = /#/;

function parseArgs(argv) {
  const out = { url: DEFAULT_URL, depth: DEFAULT_DEPTH, max: DEFAULT_MAX };
  for (const a of argv.slice(2)) {
    if (a.startsWith('--url=')) out.url = a.slice(6);
    else if (a.startsWith('--depth=')) out.depth = Number(a.slice(8));
    else if (a.startsWith('--max=')) out.max = Number(a.slice(6));
  }
  return out;
}

function normalize(href, originUrl) {
  try {
    const u = new URL(href, originUrl);
    if (u.origin !== originUrl.origin) return null;
    if (SKIP_EXTENSIONS.test(u.pathname)) return null;
    u.hash = '';
    // Strip query strings that look like tracking junk; keep meaningful ones
    const skipQuery = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'];
    for (const k of skipQuery) u.searchParams.delete(k);
    return u.toString();
  } catch {
    return null;
  }
}

async function run() {
  const args = parseArgs(process.argv);
  const seedUrl = new URL(args.url);
  const outDir = path.resolve(__dirname, '..', 'output', 'reference');
  fs.mkdirSync(outDir, { recursive: true });

  console.log(`crawl: seed ${args.url}, depth ${args.depth}, max ${args.max}`);
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const visited = new Map(); // url → { url, title, depth }
  const queue = [{ url: args.url, depth: 0 }];

  while (queue.length && visited.size < args.max) {
    const { url, depth } = queue.shift();
    if (visited.has(url)) continue;

    process.stdout.write(`crawl: [${visited.size + 1}/${args.max}] (d=${depth}) ${url} ... `);
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: NAV_TIMEOUT });
    } catch (err) {
      try {
        await page.waitForLoadState('load', { timeout: 15_000 });
      } catch {
        process.stdout.write('skip (load failed)\n');
        continue;
      }
    }
    await page.waitForTimeout(300);

    const title = (await page.title()).trim() || '(no title)';
    visited.set(url, { url, title, depth });
    process.stdout.write(`ok — ${title}\n`);

    if (depth < args.depth) {
      const hrefs = await page.evaluate(() => {
        const out = new Set();
        for (const a of document.querySelectorAll('a[href]')) {
          const h = a.getAttribute('href');
          if (h) out.add(h);
        }
        return [...out];
      });
      for (const h of hrefs) {
        const n = normalize(h, seedUrl);
        if (!n || visited.has(n) || queue.find((q) => q.url === n)) continue;
        queue.push({ url: n, depth: depth + 1 });
      }
    }
  }

  await browser.close();

  const routes = [...visited.values()];
  const out = {
    seed: args.url,
    crawledAt: new Date().toISOString(),
    depth: args.depth,
    cap: args.max,
    count: routes.length,
    routes,
  };
  const routesPath = path.join(outDir, 'routes.json');
  fs.writeFileSync(routesPath, JSON.stringify(out, null, 2));
  console.log(`crawl: done — ${routes.length} routes`);
  console.log(`  → ${routesPath}`);
  console.log('  → edit that file to prune anything irrelevant, then: pnpm ref:capture');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
