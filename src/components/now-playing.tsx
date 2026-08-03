"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { NowPlayingPayload } from "@/app/api/spotify/route";
import { relativeTime } from "@/lib/utils";

/** Bar heights are prime-ish multiples so the loop never looks synchronised. */
const BARS = [
  { delay: "0ms", duration: "620ms" },
  { delay: "180ms", duration: "780ms" },
  { delay: "80ms", duration: "540ms" },
  { delay: "260ms", duration: "700ms" },
];

export function NowPlaying() {
  const [track, setTrack] = useState<NowPlayingPayload>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch("/api/spotify");
        const data = (await res.json()) as NowPlayingPayload;
        if (!cancelled) setTrack(data);
      } catch {
        if (!cancelled) setTrack(null);
      } finally {
        if (!cancelled) setLoaded(true);
      }
    };

    load();
    const id = setInterval(load, 30_000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  // Render nothing rather than an empty shell if Spotify isn't wired up yet.
  if (!loaded || !track) return null;

  const progress =
    track.progressMs && track.durationMs
      ? Math.min(100, (track.progressMs / track.durationMs) * 100)
      : null;

  return (
    <a
      href={track.url}
      target="_blank"
      rel="noreferrer noopener"
      className="group flex items-center gap-3 font-mono text-xs text-ink-muted transition-colors duration-300 hover:text-ink"
    >
      {track.albumArt ? (
        <span className="relative block size-8 shrink-0 overflow-hidden bg-bg-sunken">
          <Image
            src={track.albumArt}
            alt=""
            fill
            sizes="32px"
            className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
        </span>
      ) : null}

      <span className="flex min-w-0 flex-col gap-1">
        <span className="flex items-center gap-2">
          {track.isPlaying ? (
            <span className="flex h-3 items-end gap-[2px]" aria-hidden="true">
              {BARS.map((bar, i) => (
                <span
                  key={i}
                  className="w-[2px] bg-accent motion-safe:animate-[eq_var(--d)_ease-in-out_var(--delay)_infinite_alternate]"
                  style={
                    {
                      "--d": bar.duration,
                      "--delay": bar.delay,
                      height: "40%",
                    } as React.CSSProperties
                  }
                />
              ))}
            </span>
          ) : null}

          <span className="truncate">
            <span className="opacity-60">
              {track.isPlaying ? "Listening to" : "Last played"}
            </span>{" "}
            <span className="text-ink-soft group-hover:text-ink">{track.title}</span>
            <span className="opacity-60"> — {track.artist}</span>
          </span>
        </span>

        {progress !== null ? (
          <span className="block h-px w-full max-w-48 bg-rule" aria-hidden="true">
            <span
              className="block h-px bg-accent transition-[width] duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </span>
        ) : track.playedAt ? (
          <span className="opacity-50">{relativeTime(track.playedAt)}</span>
        ) : null}
      </span>
    </a>
  );
}
