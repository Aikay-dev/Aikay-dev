"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

/**
 * No `mounted` state and no hydration guard: which icon shows is decided
 * purely by the `.dark` class, which next-themes puts on <html> in a blocking
 * script before first paint. That keeps the server and client markup identical
 * and avoids a setState-in-effect round trip just to render an icon.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="grid size-9 place-items-center text-ink-muted transition-colors duration-300 hover:text-ink"
      aria-label="Toggle colour theme"
    >
      <span className="relative block size-4" aria-hidden="true">
        <Sun className="absolute inset-0 hidden size-4 dark:block" />
        <Moon className="absolute inset-0 block size-4 dark:hidden" />
      </span>
    </button>
  );
}
