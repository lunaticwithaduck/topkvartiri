/**
 * Tiny static file server for the reference mirror. No deps.
 *
 *   pnpm ref:serve            # serves output/reference/mirror on port 4173
 *   PORT=8000 pnpm ref:serve  # change port
 */

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { loadToolingConfig, resolveConfiguredPath } = require('./lib/tooling-config.cjs');

function parseArgs(argv) {
  const out = { config: process.env.TOOLING_CONFIG || null, root: null, port: Number(process.env.PORT) || 4173 };
  for (const a of argv.slice(2)) {
    if (a.startsWith('--config=')) out.config = a.slice(9);
    else if (a.startsWith('--root=')) out.root = path.resolve(a.slice(7));
    else if (a.startsWith('--port=')) out.port = Number(a.slice(7));
  }
  return out;
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.htm':  'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.mjs':  'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml':  'application/xml; charset=utf-8',
  '.txt':  'text/plain; charset=utf-8',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf':  'font/ttf',
  '.otf':  'font/otf',
  '.eot':  'application/vnd.ms-fontobject',
  '.mp4':  'video/mp4',
  '.webm': 'video/webm',
  '.mp3':  'audio/mpeg',
  '.pdf':  'application/pdf',
};

function safeJoin(root, urlPath) {
  const resolved = path.resolve(root, '.' + urlPath);
  if (!resolved.startsWith(root)) return null;
  return resolved;
}

function send(file, res) {
  const ext = path.extname(file).toLowerCase();
  res.setHeader('Content-Type', MIME[ext] || 'application/octet-stream');
  res.setHeader('Cache-Control', 'no-store');
  const stream = fs.createReadStream(file);
  stream.on('error', () => {
    res.statusCode = 500;
    res.end('read error');
  });
  stream.pipe(res);
}

function startServer(root, port) {
  const server = http.createServer((req, res) => {
    try {
      let pathname = decodeURIComponent(req.url.split('?')[0]);
      // Index fallback
      if (pathname === '/' || pathname === '') pathname = '/_index.html';

      let file = safeJoin(root, pathname);
      if (!file) {
        res.statusCode = 403;
        res.end('forbidden');
        return;
      }

      fs.stat(file, (err, stats) => {
        if (err) {
          // Try directory index
          if (pathname.endsWith('/')) {
            const dirIndex = safeJoin(root, pathname + 'index.html');
            if (dirIndex) return fs.stat(dirIndex, (e2, s2) => {
              if (!e2 && s2.isFile()) send(dirIndex, res);
              else { res.statusCode = 404; res.end('not found: ' + pathname); }
            });
          }
          const dirIndex = safeJoin(root, pathname + '/index.html');
          if (dirIndex) return fs.stat(dirIndex, (e2, s2) => {
            if (!e2 && s2.isFile()) send(dirIndex, res);
            else { res.statusCode = 404; res.end('not found: ' + pathname); }
          });
          res.statusCode = 404;
          res.end('not found: ' + pathname);
          return;
        }
        if (stats.isDirectory()) {
          const dirIndex = path.join(file, 'index.html');
          return fs.stat(dirIndex, (e2, s2) => {
            if (!e2 && s2.isFile()) send(dirIndex, res);
            else { res.statusCode = 404; res.end('directory has no index.html'); }
          });
        }
        send(file, res);
      });
    } catch (err) {
      res.statusCode = 500;
      res.end('error: ' + err.message);
    }
  });

  server.listen(port, () => {
    console.log(`serve: ${root}`);
    console.log(`serve: http://localhost:${port}/_index.html`);
  });
}

function run() {
  const args = parseArgs(process.argv);
  const { config, rootDir } = loadToolingConfig(args.config);
  const referenceConfig = config.reference ?? {};
  const root = args.root ?? resolveConfiguredPath(rootDir, referenceConfig.mirrorDir ?? 'output/reference/mirror');
  startServer(root, args.port);
}

run();
