/**
 * One-time helper to mint a Spotify refresh token.
 *
 *   1. Put SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env.local
 *   2. Add http://127.0.0.1:8888/callback as a Redirect URI on your Spotify app
 *   3. node scripts/spotify-auth.mjs
 *   4. Open the printed URL, approve, and copy the refresh token it prints
 *
 * Spotify refresh tokens don't expire, so this only ever needs running once.
 */
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";

const PORT = 8888;
const REDIRECT_URI = `http://127.0.0.1:${PORT}/callback`;
const SCOPES = "user-read-currently-playing user-read-recently-played";

async function loadEnv() {
  for (const file of [".env.local", ".env"]) {
    try {
      const raw = await readFile(file, "utf8");
      for (const line of raw.split("\n")) {
        const match = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
        if (match && !process.env[match[1]]) {
          process.env[match[1]] = match[2].replace(/^["']|["']$/g, "");
        }
      }
    } catch {
      /* file is optional */
    }
  }
}

await loadEnv();

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  console.error("Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env.local first.");
  process.exit(1);
}

const authUrl =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    scope: SCOPES,
  });

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://127.0.0.1:${PORT}`);
  if (url.pathname !== "/callback") {
    res.writeHead(404).end();
    return;
  }

  const code = url.searchParams.get("code");
  if (!code) {
    res.writeHead(400).end("No code returned.");
    return;
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const token = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
    }),
  }).then((r) => r.json());

  if (!token.refresh_token) {
    res.writeHead(500).end("No refresh token returned. Check the console.");
    console.error(token);
    process.exit(1);
  }

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Done. You can close this tab and go back to the terminal.");

  console.log("\nAdd this to .env.local and to your Vercel environment variables:\n");
  console.log(`SPOTIFY_REFRESH_TOKEN=${token.refresh_token}\n`);
  server.close();
  process.exit(0);
});

server.listen(PORT, () => {
  console.log("\nOpen this URL in your browser and approve access:\n");
  console.log(authUrl + "\n");
});
