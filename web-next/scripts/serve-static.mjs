import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve, sep } from "node:path";
import { createGzip } from "node:zlib";

const root = resolve(process.argv[2] ?? "out");
const port = Number(process.argv[3] ?? 4173);

const mime = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
};

const compressible = new Set([".css", ".html", ".js", ".json", ".svg", ".txt", ".xml"]);

function candidate(pathname) {
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return null;
  }

  const relative = normalize(decoded.replace(/^\/+/, ""));
  const requested = resolve(root, relative);
  if (requested !== root && !requested.startsWith(`${root}${sep}`)) return null;

  const options = [];
  if (extname(requested)) options.push(requested);
  else options.push(join(requested, "index.html"), `${requested}.html`);

  return options.find((file) => existsSync(file) && statSync(file).isFile()) ?? null;
}

const server = createServer((request, response) => {
  const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "127.0.0.1"}`);
  const file = candidate(url.pathname);

  if (!file) {
    const notFound = join(root, "404.html");
    response.writeHead(404, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
    if (existsSync(notFound)) createReadStream(notFound).pipe(response);
    else response.end("Not found");
    return;
  }

  const extension = extname(file).toLowerCase();
  const useGzip =
    compressible.has(extension) && /(?:^|,)\s*gzip\s*(?:,|$)/i.test(request.headers["accept-encoding"] ?? "");
  response.writeHead(200, {
    "Content-Type": mime[extension] ?? "application/octet-stream",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    Vary: "Accept-Encoding",
    ...(useGzip ? { "Content-Encoding": "gzip" } : {}),
  });
  if (request.method === "HEAD") response.end();
  else if (useGzip) createReadStream(file).pipe(createGzip()).pipe(response);
  else createReadStream(file).pipe(response);
});

server.listen(port, "127.0.0.1", () => {
  process.stdout.write(`Picodavi audit server: http://127.0.0.1:${port}\n`);
});
