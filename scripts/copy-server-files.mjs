/**
 * Copies the PHP endpoints, their support files and the deploy .htaccess into
 * `out/` after `next build`, so the whole folder can be uploaded to the
 * Hostfactory web root in one go.
 *
 * Runtime state (the rate-limit salt, the Spotify cache, real config files) is
 * deliberately NOT copied: those live on the server and must survive a deploy.
 */
import { cp, mkdir, readdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const out = path.join(root, "out");
const server = path.join(root, "server");

if (!existsSync(out)) {
  console.error("out/ is missing — run `next build` first.");
  process.exit(1);
}

// Secrets and runtime state never ride along in the upload.
const SKIP = new Set(["config", "storage"]);

const entries = await readdir(server, { withFileTypes: true });
for (const entry of entries) {
  if (SKIP.has(entry.name)) continue;
  await cp(path.join(server, entry.name), path.join(out, entry.name), { recursive: true });
}

// Example config files ship so a fresh server can be set up; the real ones do not.
await mkdir(path.join(out, "config"), { recursive: true });
for (const name of ["openai.example.php", "spotify.example.php", ".htaccess"]) {
  await cp(path.join(server, "config", name), path.join(out, "config", name));
}

// An empty, write-protected storage directory for the server to fill in.
await mkdir(path.join(out, "storage", "ratelimit"), { recursive: true });
await cp(path.join(server, "storage", ".htaccess"), path.join(out, "storage", ".htaccess"));

await writeFile(
  path.join(out, "DEPLOY.txt"),
  [
    "Upload the CONTENTS of this folder to the Hostfactory web root.",
    "",
    "Do not overwrite on the server:",
    "  config/openai.php, config/spotify.php   (API credentials)",
    "  storage/                                (rate-limit salt, Spotify cache)",
    "",
    "storage/ and storage/ratelimit/ must be writable by PHP (755).",
    "",
  ].join("\n"),
);

console.log("Copied PHP endpoints and .htaccess into out/");
