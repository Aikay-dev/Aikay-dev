import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { profile } from "@/content/profile";
import { NowPlaying } from "@/components/now-playing";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-rule">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="font-display text-display-m leading-[1.05]">
              Got something
              <br />
              worth building?
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="link-underline mt-6 inline-block font-mono text-sm text-ink-soft"
            >
              {profile.email}
            </a>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <h2 className="label mb-4">Pages</h2>
            <ul className="space-y-2.5">
              {profile.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline text-sm text-ink-soft">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={profile.cv.href}
                  download={profile.cv.filename}
                  className="group inline-flex items-center gap-1 text-sm text-ink-soft"
                >
                  <span className="link-underline">CV</span>
                  <ArrowDown
                    className="size-3.5 opacity-50 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h2 className="label mb-4">Elsewhere</h2>
            <ul className="space-y-2.5">
              {profile.socials.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-1 text-sm text-ink-soft"
                  >
                    <span className="link-underline">{social.label}</span>
                    <ArrowUpRight
                      className="size-3.5 opacity-50 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-rule">
        <div className="shell flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-ink-muted">
            © {new Date().getFullYear()} {profile.name} — {profile.location}
          </p>
          <NowPlaying />
        </div>
      </div>
    </footer>
  );
}
