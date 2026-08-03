import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { getAdjacentProjects, getProject, projects, statusLabel } from "@/content/projects";
import { Reveal } from "@/components/reveal";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: `${project.title} — ${project.tagline}`,
      description: project.summary,
      images: [{ url: project.cover, width: 1600, height: 1000, alt: project.title }],
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { previous, next } = getAdjacentProjects(slug);

  const meta = [
    project.client ? { label: "Client", value: project.client } : null,
    { label: "Role", value: project.role },
    { label: "Year", value: project.year },
    { label: "Status", value: statusLabel[project.status] },
  ].filter((m): m is { label: string; value: string } => m !== null);

  return (
    <article style={{ ["--project-accent" as string]: project.accent }}>
      {/* ----------------------------------------------------------- head */}
      <header className="shell pb-12 pt-12 md:pt-20">
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 font-mono text-xs text-ink-muted transition-colors duration-300 hover:text-ink"
        >
          <ArrowLeft
            className="size-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-1"
            aria-hidden="true"
          />
          All work
        </Link>

        <div className="mt-8 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <h1 className="text-display-l font-display">{project.title}</h1>
            <p className="measure mt-5 text-lede text-ink-soft">{project.tagline}</p>
          </div>

          <div className="flex flex-wrap items-end gap-x-6 gap-y-3 md:col-span-3 md:col-start-10 md:justify-end">
            {(project.links.live || project.links.repo) && (
              <div className="flex flex-col gap-2 md:items-end">
                {project.links.live ? (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-1.5 font-mono text-xs"
                  >
                    <span className="link-underline">Visit site</span>
                    <ArrowUpRight
                      className="size-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </a>
                ) : null}
                {project.links.repo ? (
                  <a
                    href={project.links.repo}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-1.5 font-mono text-xs text-ink-muted"
                  >
                    <span className="link-underline">Source</span>
                    <ArrowUpRight
                      className="size-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </a>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ---------------------------------------------------------- cover */}
      <div className="shell">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-bg-sunken md:aspect-[2/1]">
          <Image
            src={project.cover}
            alt={`${project.title} — ${project.tagline}`}
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
        </div>
      </div>

      {/* --------------------------------------------------------- meta bar */}
      <div className="shell mt-8">
        <dl className="grid grid-cols-2 gap-6 border-y border-rule py-6 sm:grid-cols-4">
          {meta.map((item) => (
            <div key={item.label}>
              <dt className="label mb-1.5">{item.label}</dt>
              <dd className="text-sm text-ink-soft">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* ------------------------------------------------------- the problem */}
      <section className="shell py-16 md:py-24" aria-labelledby="problem-heading">
        <div className="grid gap-8 md:grid-cols-12">
          <h2 id="problem-heading" className="font-display text-display-m md:col-span-4">
            The problem
          </h2>
          <div className="md:col-span-7 md:col-start-6">
            <p className="text-lede text-ink-soft">{project.summary}</p>
            <p className="mt-6 leading-relaxed text-ink-soft">{project.problem}</p>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- gallery */}
      {project.gallery.length > 0 ? (
        <section className="space-y-16 py-4 md:space-y-24" aria-label={`${project.title} screenshots`}>
          {project.gallery.map((image) => (
            <Reveal key={image.src}>
              <figure className={image.bleed ? "shell" : "shell"}>
                <div
                  className={
                    image.bleed
                      ? "relative w-full overflow-hidden bg-bg-sunken"
                      : "relative mx-auto w-full max-w-4xl overflow-hidden bg-bg-sunken"
                  }
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={2000}
                    height={1250}
                    sizes={image.bleed ? "100vw" : "(max-width: 1024px) 100vw, 56rem"}
                    className="h-auto w-full object-cover"
                  />
                </div>
                <figcaption
                  className={
                    image.bleed
                      ? "measure mt-4 text-sm text-ink-muted"
                      : "mx-auto mt-4 max-w-4xl text-sm text-ink-muted"
                  }
                >
                  {image.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </section>
      ) : null}

      {/* ------------------------------------------------------ how I built it */}
      <section className="shell py-16 md:py-24" aria-labelledby="approach-heading">
        <h2 id="approach-heading" className="font-display text-display-m">
          How I built it
        </h2>

        <div className="mt-12 space-y-12 md:space-y-16">
          {project.approach.map((block, i) => (
            <Reveal key={block.heading}>
              <div className="grid gap-4 border-t border-rule pt-6 md:grid-cols-12 md:gap-8">
                <div className="flex items-baseline gap-4 md:col-span-4 md:flex-col md:gap-2">
                  <span className="font-mono text-xs text-[var(--project-accent)] dark:text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-display-s leading-tight">{block.heading}</h3>
                </div>
                <p className="leading-relaxed text-ink-soft md:col-span-7 md:col-start-6">
                  {block.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------ stack + result */}
      <section className="shell py-16 md:py-20">
        <div className="grid gap-12 border-t border-rule pt-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <h2 className="label mb-5">Built with</h2>
            <ul className="flex flex-wrap gap-x-2 gap-y-2">
              {project.stack.map((item) => (
                <li
                  key={item}
                  className="border border-rule px-3 py-1.5 font-mono text-xs text-ink-soft"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <h2 className="label mb-5">Outcome</h2>
            <ul className="space-y-3">
              {project.outcomes.map((outcome) => (
                <li key={outcome} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                  <span
                    className="mt-2 size-1 shrink-0 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- prev / next */}
      <nav className="shell pb-8 pt-8" aria-label="More projects">
        <div className="grid gap-6 border-t border-rule pt-8 sm:grid-cols-2">
          {previous ? (
            <Link href={`/work/${previous.slug}`} className="group">
              <span className="label flex items-center gap-2">
                <ArrowLeft
                  className="size-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-1"
                  aria-hidden="true"
                />
                Previous
              </span>
              <span className="mt-2 block font-display text-display-s">{previous.title}</span>
            </Link>
          ) : (
            <span />
          )}

          {next ? (
            <Link href={`/work/${next.slug}`} className="group sm:text-right">
              <span className="label flex items-center gap-2 sm:justify-end">
                Next
                <ArrowRight
                  className="size-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
              <span className="mt-2 block font-display text-display-s">{next.title}</span>
            </Link>
          ) : null}
        </div>
      </nav>
    </article>
  );
}
