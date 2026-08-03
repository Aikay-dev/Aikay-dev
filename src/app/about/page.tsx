import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { profile } from "@/content/profile";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "About",
  description: `${profile.name} — ${profile.role} based in ${profile.location}. Marketplaces, client sites and AI systems, built end to end.`,
};

export default function AboutPage() {
  return (
    <>
      <section className="shell pb-16 pt-12 md:pb-24 md:pt-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <h1 className="text-display-l font-display">About</h1>

            <div className="measure mt-8 space-y-6">
              {profile.intro.map((paragraph, i) => (
                <p
                  key={i}
                  className={i === 0 ? "text-lede text-ink-soft" : "leading-relaxed text-ink-soft"}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <div className="relative aspect-[11/16] w-full max-w-xs overflow-hidden bg-bg-sunken md:max-w-none">
              <Image
                src="/images/portrait/about.webp"
                alt={profile.name}
                fill
                sizes="(max-width: 768px) 20rem, 28vw"
                className="object-cover"
              />
            </div>
            <p className="mt-4 font-mono text-xs text-ink-muted">
              {profile.location} — {profile.availability.toLowerCase()}
            </p>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- services */}
      <section className="shell py-12 md:py-16" aria-labelledby="services-heading">
        <h2 id="services-heading" className="font-display text-display-m">
          What I take on
        </h2>
        <div className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-3">
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

      {/* -------------------------------------------------------- background */}
      <section className="shell py-12 md:py-16" aria-labelledby="background-heading">
        <h2 id="background-heading" className="font-display text-display-m">
          Background
        </h2>
        <ul className="mt-10 border-t border-rule">
          {profile.background.map((entry) => (
            <li
              key={`${entry.org}-${entry.period}`}
              className="grid gap-1 border-b border-rule py-6 md:grid-cols-12 md:items-baseline md:gap-8"
            >
              <span className="font-mono text-xs text-ink-muted md:col-span-3">{entry.period}</span>
              <div className="md:col-span-9">
                <h3 className="text-base font-medium">
                  {entry.role}
                  <span className="text-ink-muted"> — {entry.org}</span>
                </h3>
                <p className="mt-1 text-sm text-ink-soft">{entry.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ------------------------------------------------ education + languages */}
      <section className="shell py-12 md:py-16">
        <div className="grid gap-12 border-t border-rule pt-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6">
            <h2 className="label mb-6">Education</h2>
            <ul className="space-y-6">
              {profile.education.map((entry) => (
                <li key={entry.qualification}>
                  <h3 className="text-base font-medium">{entry.qualification}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{entry.institution}</p>
                  <p className="mt-1 font-mono text-xs text-ink-muted">{entry.period}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-5 md:col-start-8">
            <h2 className="label mb-6">Languages</h2>
            <ul className="space-y-3">
              {profile.languages.map((language) => (
                <li key={language.name} className="flex items-baseline justify-between gap-4">
                  <span className="text-sm">{language.name}</span>
                  <span className="font-mono text-xs text-ink-muted">{language.level}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className="link-underline mt-10 inline-block font-mono text-xs text-ink-muted"
            >
              Get in touch →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
