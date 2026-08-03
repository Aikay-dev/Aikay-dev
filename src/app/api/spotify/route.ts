import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_URL = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENT_URL = "https://api.spotify.com/v1/me/player/recently-played?limit=1";

export type NowPlayingPayload = {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumArt: string | null;
  url: string;
  progressMs?: number;
  durationMs?: number;
  playedAt?: string;
} | null;

type SpotifyTrack = {
  name: string;
  album: { name: string; images: { url: string }[] };
  artists: { name: string }[];
  external_urls: { spotify: string };
  duration_ms: number;
};

async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) return null;

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: refreshToken }),
    cache: "no-store",
  });

  if (!response.ok) return null;
  const data = (await response.json()) as { access_token?: string };
  return data.access_token ?? null;
}

function shapeTrack(track: SpotifyTrack) {
  return {
    title: track.name,
    artist: track.artists.map((a) => a.name).join(", "),
    album: track.album.name,
    albumArt: track.album.images?.[0]?.url ?? null,
    url: track.external_urls.spotify,
    durationMs: track.duration_ms,
  };
}

export async function GET() {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) return NextResponse.json(null);

    const headers = { Authorization: `Bearer ${accessToken}` };

    const playing = await fetch(NOW_PLAYING_URL, { headers, cache: "no-store" });

    // 204 means nothing is playing right now; anything else non-OK we treat the
    // same way and fall through to the most recent track.
    if (playing.status === 200) {
      const data = (await playing.json()) as {
        is_playing: boolean;
        progress_ms: number | null;
        item: SpotifyTrack | null;
      };

      if (data.item) {
        return NextResponse.json({
          isPlaying: data.is_playing,
          ...shapeTrack(data.item),
          progressMs: data.progress_ms ?? 0,
        } satisfies NonNullable<NowPlayingPayload>);
      }
    }

    const recent = await fetch(RECENT_URL, { headers, cache: "no-store" });
    if (!recent.ok) return NextResponse.json(null);

    const recentData = (await recent.json()) as {
      items: { track: SpotifyTrack; played_at: string }[];
    };
    const item = recentData.items?.[0];
    if (!item) return NextResponse.json(null);

    return NextResponse.json({
      isPlaying: false,
      ...shapeTrack(item.track),
      playedAt: item.played_at,
    } satisfies NonNullable<NowPlayingPayload>);
  } catch {
    // A dead widget is a fine failure mode; a 500 in the footer is not.
    return NextResponse.json(null);
  }
}
