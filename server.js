import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { createApp } from "json-server/lib/app.js";
import { NormalizedAdapter } from "json-server/lib/adapters/normalized-adapter.js";
import { Observer } from "json-server/lib/adapters/observer.js";
import { createServer } from "node:http";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ─── Config ───────────────────────────────────────────────────────────────────
const ADMIN_TOKEN = process.env.ADMIN_TOKEN;
const PORT = process.env.PORT || 3000;

if (!ADMIN_TOKEN) {
  console.error("❌ ERROR: ADMIN_TOKEN environment variable is not set!");
  console.error("   Set it on Render: Environment → Add Variable → ADMIN_TOKEN");
  process.exit(1);
}

// ─── Database ─────────────────────────────────────────────────────────────────
const file = join(__dirname, "db.json");
const adapter = new JSONFile(file);
const observer = new Observer(new NormalizedAdapter(adapter));
const db = new Low(observer, {});
await db.read();

// ─── JSON Server App ──────────────────────────────────────────────────────────
const app = createApp(db, { logger: true });

// ─── Auth Middleware ──────────────────────────────────────────────────────────
const WRITE_METHODS = ["POST", "PUT", "PATCH", "DELETE"];

const server = createServer((req, res) => {
  // CORS headers so your store and admin can call from any domain
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // Protect all write operations
  if (WRITE_METHODS.includes(req.method)) {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1]; // "Bearer TOKEN" → "TOKEN"

    if (!authHeader || token !== ADMIN_TOKEN) {
      res.writeHead(401, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Unauthorized: Invalid or missing token" }));
      return;
    }
  }

  // Pass to json-server
  app.handler(req, res);
});

// ─── Start ────────────────────────────────────────────────────────────────────
server.listen(PORT, () => {
  console.log(`\n JSON Server running on port ${PORT}`);
  console.log(` Write operations protected by ADMIN_TOKEN`);
  console.log(`\nPublic endpoints (no token needed):`);
  console.log(`  GET  /products`);
  console.log(`  GET  /products/:id`);
  console.log(`\nProtected endpoints (token required):`);
  console.log(`  POST   /products`);
  console.log(`  PUT    /products/:id`);
  console.log(`  PATCH  /products/:id`);
  console.log(`  DELETE /products/:id\n`);
});