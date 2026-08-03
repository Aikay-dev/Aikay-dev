import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { profile } from "@/content/profile";
import { featuredProjects } from "@/content/projects";
import { WorkList } from "@/components/work-list";
import { GithubActivity } from "@/components/github-activity";
import { Reveal } from "@/components/reveal";

export default function HomePage() {
  return (
    <>
      {/* ------------------------------------------------------------ hero */}
      <section className="shell pb-20 pt-12 md:pb-28 md:pt-20">
        <div className="grid gap-10 md:grid-cols-12 md:items-end md:gap-8">
          <div className="md:col-span-7">
            <h1 className="text-display-xl font-display">
              {profile.headline.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <p className="measure mt-8 text-lede text-ink-soft">{profile.lede}</p>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href="/work"
                className="group inline-flex items-center gap-2 bg-ink px-6 py-3.5 text-sm text-bg transition-opacity duration-300 hover:opacity-85"
              >
                See the work
                <ArrowRight
                  className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>

              <span className="inline-flex items-center gap-2 font-mono text-xs text-ink-muted">
                <span className="relative flex size-1.5" aria-hidden="true">
                  <span className="absolute inline-flex size-full rounded-full bg-accent opacity-70 motion-safe:animate-ping" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
                </span>
                {profile.availability} — {profile.location}
              </span>
            </div>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <div className="relative aspect-[3/4] w-full max-w-xs overflow-hidden bg-bg-sunken md:max-w-none">
              <Image
                src="/images/portrait/hero.webp"
                alt={`${profile.name}, ${profile.role}`}
                fill
                priority
                sizes="(max-width: 768px) 20rem, 28vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ selected work */}
      <section className="shell py-16 md:py-20" aria-labelledby="work-heading">
        <div className="mb-10 flex items-baseline justify-between gap-6 md:mb-12">
          <h2 id="work-heading" className="font-display text-display-m">
            Selected work
          </h2>
          <Link href="/work" className="link-underline font-mono text-xs text-ink-muted">
            All {featuredProjects.length > 0 ? "projects" : "work"} →
          </Link>
        </div>

        <WorkList projects={featuredProjects} />
      </section>

      {/* ---------------------------------------------------------- services */}
      <section className="shell py-16 md:py-24" aria-labelledby="services-heading">
        <h2 id="services-heading" className="font-display text-display-m">
          What I take on
        </h2>

        <div className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-3">
          {profile.services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.08}>
              <article className="border-t border-rule-strong pt-6">
                <h3 className="font-display text-display-s">{service.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">{service.body}</p>
                <p className="mt-5 font-mono text-xs text-ink-muted">{service.proof}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------- live github */}
      <GithubActivity />

      {/* -------------------------------------------------------- background */}
      <section className="shell py-16 md:py-24" aria-labelledby="background-heading">
        <h2 id="background-heading" className="font-display text-display-m">
          Background
        </h2>

        <ul className="mt-12 border-t border-rule">
          {profile.background.map((entry) => (
            <li
              key={`${entry.org}-${entry.period}`}
              className="grid gap-1 border-b border-rule py-6 md:grid-cols-12 md:items-baseline md:gap-8"
            >
              <span className="font-mono text-xs text-ink-muted md:col-span-3">{entry.period}</span>
              <div className="md:col-span-9">
                <h3 className="font-sans text-base font-medium tracking-normal">
                  {entry.role}
                  <span className="text-ink-muted"> — {entry.org}</span>
                </h3>
                <p className="mt-1 text-sm text-ink-soft">{entry.note}</p>
              </div>
            </li>
          ))}
        </ul>

        <Link href="/about" className="link-underline mt-8 inline-block font-mono text-xs text-ink-muted">
          More about me →
        </Link>
      </section>
    </>
  );
}
