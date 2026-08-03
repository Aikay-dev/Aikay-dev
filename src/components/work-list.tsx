"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";

/**
 * The numbered index is the page's signature interaction. The numbering earns
 * its place here because this genuinely is an ordered list, not decoration
 * bolted onto section headings.
 *
 * On pointer devices, hovering a row raises a preview that trails the cursor.
 * On touch and for reduced-motion users the row is just a link, and each row
 * carries its own thumbnail so the work is never invisible.
 */
export function WorkList({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Project | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 32, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 260, damping: 32, mass: 0.6 });

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const bounds = containerRef.current?.getBoundingClientRect();
    if (!bounds) return;
    x.set(event.clientX - bounds.left);
    y.set(event.clientY - bounds.top);
  };

  return (
    <div ref={containerRef} onMouseMove={handleMove} className="relative">
      <ul className="border-t border-rule">
        {projects.map((project, index) => (
          <li key={project.slug} className="border-b border-rule">
            <Link
              href={`/work/${project.slug}`}
              onMouseEnter={() => setActive(project)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(project)}
              onBlur={() => setActive(null)}
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-2 py-6 transition-colors duration-500 md:grid-cols-[3rem_1fr_10rem_2rem] md:gap-x-8 md:py-8"
            >
              <span className="font-mono text-xs text-ink-muted transition-colors duration-500 group-hover:text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="flex min-w-0 items-center gap-4">
                {/* Always-visible thumbnail. The hover preview is an
                    enhancement on top of this, never a replacement for it. */}
                <span className="relative hidden size-11 shrink-0 overflow-hidden bg-bg-sunken sm:block md:hidden lg:block">
                  <Image
                    src={project.cover}
                    alt=""
                    fill
                    sizes="44px"
                    className="object-cover object-top opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-display text-[1.75rem] leading-tight transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 md:text-[2.25rem]">
                    {project.title}
                  </span>
                  <span className="mt-0.5 block truncate font-mono text-xs text-ink-muted md:hidden">
                    {project.discipline} · {project.year}
                  </span>
                </span>
              </span>

              <span className="hidden font-mono text-xs text-ink-muted md:block">
                {project.discipline}
                <span className="mt-1 block opacity-60">{project.year}</span>
              </span>

              <ArrowUpRight
                className="size-5 text-ink-muted transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>

      {!reduceMotion ? (
        <AnimatePresence>
          {active ? (
            <motion.div
              key={active.slug}
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
              style={{ x: springX, y: springY, zIndex: "var(--z-raised)" }}
              className="pointer-events-none absolute left-0 top-0 hidden aspect-[16/10] w-[26rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden lg:block"
            >
              <Image
                src={active.cover}
                alt=""
                fill
                sizes="416px"
                className="object-cover object-top"
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      ) : null}
    </div>
  );
}
