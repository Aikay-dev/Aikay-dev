import type { Metadata } from "next";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { profile } from "@/content/profile";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${profile.name} about client work — marketplaces, web products and AI systems.`,
};

export default function ContactPage() {
  return (
    <section className="shell pb-16 pt-12 md:pb-24 md:pt-20">
      <div className="grid gap-14 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <h1 className="text-display-l font-display">
            Let&apos;s talk
            <br />
            about it.
          </h1>

          <p className="measure mt-6 text-lede text-ink-soft">
            Whether it&apos;s a full product build or a specific problem you&apos;re stuck on, tell
            me what you&apos;re trying to make happen and I&apos;ll tell you honestly whether
            I&apos;m the right person for it.
          </p>

          <dl className="mt-12 space-y-8">
            <div>
              <dt className="label mb-2">Email</dt>
              <dd>
                <a href={`mailto:${profile.email}`} className="link-underline font-mono text-sm">
                  {profile.email}
                </a>
              </dd>
            </div>

            <div>
              <dt className="label mb-2">Based in</dt>
              <dd className="text-sm text-ink-soft">
                {profile.location} — working with clients across Europe, the UK and Nigeria.
              </dd>
            </div>

            <div>
              <dt className="label mb-2">CV</dt>
              <dd>
                <a
                  href={profile.cv.href}
                  download={profile.cv.filename}
                  className="group inline-flex items-center gap-2 text-sm text-ink-soft"
                >
                  <span className="link-underline">Download as PDF</span>
                  <ArrowDown
                    className="size-3.5 opacity-50 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              </dd>
            </div>

            <div>
              <dt className="label mb-2">Elsewhere</dt>
              <dd>
                <ul className="space-y-2">
                  {profile.socials.map((social) => (
                    <li key={social.href}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="group inline-flex items-center gap-1.5 text-sm text-ink-soft"
                      >
                        <span className="link-underline">{social.label}</span>
                        <span className="font-mono text-xs text-ink-muted">{social.handle}</span>
                        <ArrowUpRight
                          className="size-3.5 opacity-50 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
