"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type State = "shown" | "pending";

/**
 * Scroll reveal that can never hide content.
 *
 * Three things keep it honest:
 *
 *  1. The served HTML renders fully visible — nothing is hidden server-side, so
 *     search engines, reader modes and a failed JS bundle all see the content.
 *  2. It animates transform only, never opacity. Worst case the block sits 18px
 *     low; it is never invisible. Fading content in is how sections ship blank.
 *  3. Anything already on screen at mount is left alone, so nothing flashes,
 *     and a safety timer clears any pending element after 2.5s in case an
 *     IntersectionObserver callback is throttled or missed.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>("shown");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // Already visible at mount — leave it alone rather than hiding then
    // re-showing it.
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) return;

    setState("pending");

    const reveal = () => setState("shown");

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          reveal();
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.02 }
    );

    observer.observe(node);
    const safety = setTimeout(reveal, 2500);

    return () => {
      observer.disconnect();
      clearTimeout(safety);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: state === "pending" ? "translateY(18px)" : "none",
        transition: "transform 750ms cubic-bezier(0.16,1,0.3,1)",
        transitionDelay: state === "pending" ? "0ms" : `${delay * 1000}ms`,
      }}
    >
      {children}
    </div>
  );
}
