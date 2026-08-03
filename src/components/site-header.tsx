"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { profile } from "@/content/profile";
import { ThemeToggle } from "@/components/theme-toggle";
import { WarsawClock } from "@/components/warsaw-clock";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 w-full bg-bg/85 backdrop-blur-sm transition-[border-color] duration-500",
        "border-b",
        scrolled ? "border-rule" : "border-transparent"
      )}
      style={{ zIndex: "var(--z-header)" }}
    >
      <div className="shell flex h-16 items-center justify-between gap-6 md:h-20">
        <Link
          href="/"
          className="font-display text-xl leading-none tracking-tight transition-opacity duration-300 hover:opacity-70 md:text-2xl"
          aria-label={`${profile.name} — home`}
        >
          {profile.initials}
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Primary">
          {profile.nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "px-3 py-2 font-mono text-xs uppercase tracking-[0.08em] transition-colors duration-300 sm:text-[0.8125rem]",
                  active ? "text-ink" : "text-ink-muted hover:text-ink"
                )}
              >
                {item.label}
              </Link>
            );
          })}

          <span className="mx-1 hidden h-4 w-px bg-rule sm:block" aria-hidden="true" />

          <WarsawClock className="hidden font-mono text-xs text-ink-muted sm:inline-block" />

          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
