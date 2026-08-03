"use client";

import { useEffect, useState } from "react";
import { profile } from "@/content/profile";

const formatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: profile.timezone,
});

/**
 * Renders nothing until mounted. The server has no idea what second it is on
 * the client, so rendering a time during SSR guarantees a hydration mismatch;
 * a reserved-width placeholder keeps the header from shifting when it arrives.
 */
export function WarsawClock({ className }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = setInterval(tick, 1000 * 15);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={className} aria-label={time ? `Local time in Warsaw, ${time}` : undefined}>
      <span className="tabular-nums">{time ?? "  :  "}</span>
      <span className="ml-1.5 opacity-60">WAW</span>
    </span>
  );
}
