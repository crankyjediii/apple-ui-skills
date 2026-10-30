import http from "http";
import fs from "fs";
import path from "path";
import zlib from "zlib";

const PORT = 3333;
const ROOT = path.resolve("out");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url.split("?")[0]);
  if (reqPath.endsWith("/")) {
    reqPath += "index.html";
  }

  let filePath = path.join(ROOT, reqPath);
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(ROOT, "index.html");
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";

  const raw = fs.readFileSync(filePath);
  const acceptEncoding = req.headers["accept-encoding"] || "";

  if (/\bgzip\b/.test(acceptEncoding)) {
    const compressed = zlib.gzipSync(raw);
    res.writeHead(200, {
      "Content-Type": contentType,
      "Content-Encoding": "gzip",
      "Content-Length": compressed.length,
      "Cache-Control": "public, max-age=3600",
    });
    res.end(compressed);
  } else {
    res.writeHead(200, {
      "Content-Type": contentType,
      "Content-Length": raw.length,
      "Cache-Control": "public, max-age=3600",
    });
    res.end(raw);
  }
});

server.listen(PORT, () => {
  console.log(`Production static server with gzip listening on port ${PORT}`);
});
