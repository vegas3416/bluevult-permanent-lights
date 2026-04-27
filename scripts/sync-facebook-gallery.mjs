/**
 * Calls the Supabase Edge Function to pull Facebook Page photos into gallery_facebook_photos.
 * Requires in .env (project root):
 *   VITE_SUPABASE_URL
 *   VITE_SUPABASE_ANON_KEY
 *   GALLERY_SYNC_SECRET   (same value as Supabase Edge Function secret)
 *
 * Usage: npm run sync:facebook-gallery
 */
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, "..", ".env");

if (!existsSync(envPath)) {
  console.error("Missing .env — copy from .env.example and add keys.");
  process.exit(1);
}

/** Minimal KEY=VAL parser (no multiline values). */
const env = {};
for (const line of readFileSync(envPath, "utf8").split("\n")) {
  const t = line.trim();
  if (!t || t.startsWith("#")) continue;
  const i = t.indexOf("=");
  if (i === -1) continue;
  const key = t.slice(0, i).trim();
  const val = t.slice(i + 1).trim().replace(/^["']|["']$/g, "");
  env[key] = val;
}

const base = env.VITE_SUPABASE_URL?.replace(/\/$/, "");
const anon = env.VITE_SUPABASE_ANON_KEY;
const secret = env.GALLERY_SYNC_SECRET;

if (!base || !anon) {
  console.error("Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env");
  process.exit(1);
}
if (!secret) {
  console.error(
    "Add GALLERY_SYNC_SECRET to .env (same string as Supabase Edge Function secret GALLERY_SYNC_SECRET)."
  );
  process.exit(1);
}

const fnUrl = `${base}/functions/v1/sync-facebook-gallery`;

const res = await fetch(fnUrl, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${anon}`,
    "Content-Type": "application/json",
    "x-gallery-sync-secret": secret,
  },
});

const text = await res.text();
let body;
try {
  body = JSON.parse(text);
} catch {
  body = text;
}

console.log(`HTTP ${res.status}`);
console.log(typeof body === "string" ? body : JSON.stringify(body, null, 2));

if (!res.ok) process.exit(1);
