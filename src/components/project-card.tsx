import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { statusLabel, type Project } from "@/content/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-bg-sunken">
        <Image
          src={project.cover}
          alt={`${project.title} — ${project.tagline}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
        />
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-display text-display-s leading-tight">{project.title}</h3>
          <p className="mt-1.5 text-sm text-ink-soft">{project.tagline}</p>
        </div>
        <ArrowUpRight
          className="mt-1.5 size-4 shrink-0 text-ink-muted transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
          aria-hidden="true"
        />
      </div>

      <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-ink-muted">
        <span>{project.discipline}</span>
        <span aria-hidden="true">·</span>
        <span>{project.year}</span>
        <span aria-hidden="true">·</span>
        <span className={project.status === "live" ? "text-accent" : undefined}>
          {statusLabel[project.status]}
        </span>
      </p>
    </Link>
  );
}
