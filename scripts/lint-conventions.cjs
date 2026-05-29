#!/usr/bin/env node
/**
 * Convention linter — gates primitive usage and design-token usage.
 *
 * Run: node scripts/lint-conventions.cjs
 * Exits 1 if any rule is violated.
 *
 * Scope: src/app/** and src/components/**. Design primitives live in
 * src/design/** and are NOT scanned — they're allowed to use raw HTML,
 * inline styles, next/link, and next/font, that's their job.
 *
 * Adapted from majstorbg's apps/web/scripts/lint-conventions.cjs. Rules are
 * gated to what we actually have primitives for. As new primitives land in
 * src/design/ (Text, Input, Image, Link, …) add the corresponding R3 rule
 * here.
 */

const { readFileSync, readdirSync, statSync } = require('node:fs');
const { join, relative, resolve } = require('node:path');

const ROOT = resolve(__dirname, '..');

const SCAN_DIRS = [resolve(ROOT, 'src/app'), resolve(ROOT, 'src/components')];

// next/link is only allowed via the next-intl Link wrapper in src/i18n/navigation.ts.
const ALLOW_IMPORTS_NEXT_LINK = new Set([resolve(ROOT, 'src/i18n/navigation.ts')]);

// next/font/google is only loaded in the root locale layout.
const ALLOW_IMPORTS_NEXT_FONT = new Set([resolve(ROOT, 'src/app/[locale]/layout.tsx')]);

// Files where we allow raw HTML (root locale layout uses <html>/<body>).
const ALLOW_RAW_HTML = new Set([resolve(ROOT, 'src/app/[locale]/layout.tsx')]);

// Test + story files may use raw HTML on purpose.
const IS_TEST_OR_STORY = (p) => /\.(test|spec|stories)\.(tsx?|jsx?)$/.test(p);

// R5 — one component per file. Detect top-level PascalCase function/const
// declarations whose bodies contain JSX.
const TOP_LEVEL_COMPONENT_RE =
  /^(?:export\s+)?(?:function|const)\s+([A-Z][A-Za-z0-9]*)\s*(?:\(|=\s*(?:\(|\(?\s*[A-Za-z{]))/gm;

function findComponentDeclarations(src) {
  const matches = [...src.matchAll(TOP_LEVEL_COMPONENT_RE)];
  const decls = [];
  for (let i = 0; i < matches.length; i += 1) {
    const match = matches[i];
    const name = match[1];
    const start = match.index ?? 0;
    const end = i + 1 < matches.length ? (matches[i + 1].index ?? src.length) : src.length;
    const body = src.slice(start, end);
    if (
      /return\s*\(\s*</.test(body) ||
      /=>\s*\(?\s*</.test(body) ||
      /<[A-Z][A-Za-z0-9]*[\s/>]/.test(body)
    ) {
      const line = src.slice(0, start).split('\n').length;
      decls.push({ name, line });
    }
  }
  return decls;
}

function findMultiComponentViolations(src, rel, file) {
  if (IS_TEST_OR_STORY(file)) return [];
  if (!file.endsWith('.tsx')) return [];
  const decls = findComponentDeclarations(src);
  if (decls.length < 2) return [];
  return decls.slice(1).map((decl) => ({
    file: rel,
    line: decl.line,
    rule: 'R5: one component per file',
    hint: `File declares multiple React components (${decls.map((d) => d.name).join(', ')}). Extract "${decl.name}" to its own ./${decl.name}/${decl.name}.tsx folder.`,
    snippet: decl.name,
  }));
}

const rules = [
  {
    name: 'R1: no inline style={}',
    pattern: /\bstyle=\{/,
    skipFile: (p) => p.endsWith('.styles.ts') || p.endsWith('.styles.tsx'),
    hint: 'Move inline styles into a co-located *.styles.ts file (Emotion `styled` exported from an `S` namespace).',
  },
  {
    name: 'R3: no raw <button> (use Button primitive from @/design/Button/Button)',
    pattern: /<button\b/,
    skipFile: (p) => IS_TEST_OR_STORY(p),
    skipLine: () => false,
    hint: 'Route through <Button variant=… /> from @/design/Button/Button.',
  },
  {
    // Only flag relative-path anchors. External links (http(s)://, mailto:,
    // tel:) and JS-expression hrefs that resolve to external URLs legitimately
    // need a raw <a> — the locale-aware Link is for internal routes only.
    name: 'R3: no raw <a href="/…"> (use Link from @/i18n/navigation)',
    pattern: /<a\s+[^>]*href=(?:"|')\//,
    skipFile: (p) => ALLOW_RAW_HTML.has(p),
    skipLine: () => false,
    hint: 'Use <Link href="/…" /> from @/i18n/navigation for internal routes. External URLs (http(s), mailto, tel) may use a raw <a>.',
  },
  {
    name: 'R3: no raw <h1>–<h6> (use Text as="h1" / "h2" / …)',
    pattern: /<h[1-6]\b/,
    skipFile: (p) => ALLOW_RAW_HTML.has(p) || IS_TEST_OR_STORY(p),
    skipLine: (line) => /^\s*\/\/|^\s*\*/.test(line),
    hint: 'Use <Text as="h1"> (or h2…h6) from @/design/Text/Text.',
  },
  {
    name: 'R3: no raw <p> (use Text as="p")',
    pattern: /<p\b/,
    skipFile: (p) => ALLOW_RAW_HTML.has(p) || IS_TEST_OR_STORY(p),
    skipLine: (line) => /^\s*\/\/|^\s*\*/.test(line),
    hint: 'Use <Text as="p"> from @/design/Text/Text for paragraph copy.',
  },
  {
    name: 'R3: no raw <label> (use Text as="label")',
    pattern: /<label\b/,
    skipFile: (p) => ALLOW_RAW_HTML.has(p) || IS_TEST_OR_STORY(p),
    skipLine: (line) => /^\s*\/\/|^\s*\*/.test(line),
    hint: 'Use <Text as="label" htmlFor=…> from @/design/Text/Text.',
  },
  {
    name: 'R3: no raw <img> (use Image primitive from @/design/Image/Image)',
    pattern: /<img\b/,
    skipFile: (p) => ALLOW_RAW_HTML.has(p) || IS_TEST_OR_STORY(p),
    skipLine: (line) => /^\s*\/\/|^\s*\*|eslint-disable/.test(line),
    hint: 'Use <Image src={…} alt="…" fill /> from @/design/Image/Image (wraps next/image).',
  },
  {
    name: 'R4: no hardcoded hex color',
    pattern: /#[0-9a-fA-F]{6}\b(?!`|\s*[`"'])/,
    skipFile: (p) => p.endsWith('.styles.ts'),
    skipLine: (line) => /data-node-id|@figma|\/\/|\/\*|^\s*\*/.test(line),
    hint: 'Use theme tokens via Emotion (theme.colors.<token>) inside a .styles.ts file instead of hex.',
  },
  {
    name: 'R4: no hardcoded font-size in px/rem',
    // catches `font-size: 17px` / `fontSize: '17px'` / `font-size: 1.0625rem` in non-.styles files
    pattern: /\b(font-size|fontSize)\s*[:=]\s*['"]?[\d.]+\s*(px|rem|em)\b/,
    skipFile: (p) => p.endsWith('.styles.ts') || p.endsWith('.styles.tsx'),
    skipLine: () => false,
    hint: 'Use a fontSize token (theme.fontSize.<token>) inside a .styles.ts file instead of a raw px/rem value.',
  },
  {
    name: 'R8: next/link must be imported only via @/i18n/navigation',
    pattern: /from\s+["']next\/link["']/,
    skipFile: (p) => ALLOW_IMPORTS_NEXT_LINK.has(p),
    skipLine: () => false,
    hint: 'Import Link from @/i18n/navigation, not next/link directly.',
  },
  {
    name: 'R8: next/font/google must be imported only from src/app/[locale]/layout.tsx',
    pattern: /from\s+["']next\/font\/google["']/,
    skipFile: (p) => ALLOW_IMPORTS_NEXT_FONT.has(p),
    skipLine: () => false,
    hint: 'Load fonts once in src/app/[locale]/layout.tsx; everything else consumes them via the --font-sans CSS variable through theme.fontFamily.body.',
  },
];

function walk(dir, out) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return;
  }
  for (const name of entries) {
    const full = join(dir, name);
    const s = statSync(full);
    if (s.isDirectory()) {
      if (name === 'node_modules' || name === '.next') continue;
      walk(full, out);
    } else if (/\.(tsx?|jsx?)$/.test(name)) {
      out.push(full);
    }
  }
}

const files = [];
for (const d of SCAN_DIRS) walk(d, files);

const violations = [];

for (const file of files) {
  const rel = relative(ROOT, file);
  const src = readFileSync(file, 'utf-8');
  const lines = src.split('\n');

  violations.push(...findMultiComponentViolations(src, rel, file));

  for (const rule of rules) {
    if (rule.skipFile?.(file)) continue;
    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      if (rule.skipLine?.(line)) continue;
      if (rule.pattern.test(line)) {
        violations.push({
          file: rel,
          line: i + 1,
          rule: rule.name,
          hint: rule.hint,
          snippet: line.trim().slice(0, 160),
        });
      }
    }
  }
}

if (violations.length === 0) {
  console.log(`[lint-conventions] ${files.length} files scanned — clean.`);
  process.exit(0);
}

console.error(
  `[lint-conventions] ${violations.length} violation${violations.length === 1 ? '' : 's'}:\n`,
);
for (const v of violations) {
  console.error(`  ${v.file}:${v.line}`);
  console.error(`    rule : ${v.rule}`);
  console.error(`    code : ${v.snippet}`);
  console.error(`    fix  : ${v.hint}\n`);
}
process.exit(1);
