import { ArrowUpRight } from "lucide-react";
import { getContributions, getLatestCommit } from "@/lib/github";
import { relativeTime } from "@/lib/utils";
import { profile } from "@/content/profile";

const levelClass = [
  "bg-rule",
  "bg-accent/25",
  "bg-accent/45",
  "bg-accent/70",
  "bg-accent",
] as const;

/**
 * Server component. Revalidates hourly, so the page stays static while the
 * content stays honest.
 */
export async function GithubActivity() {
  const [commit, contributions] = await Promise.all([getLatestCommit(), getContributions()]);

  if (!commit && !contributions) return null;

  // Last ~19 weeks reads well at this width without becoming a smear.
  const recent = contributions?.slice(-133) ?? null;
  const total = recent?.reduce((sum, day) => sum + day.count, 0) ?? 0;

  return (
    <section className="rule-top py-12 md:py-16" aria-labelledby="activity-heading">
      <div className="shell">
        <h2 id="activity-heading" className="label mb-8">
          Still building
        </h2>

        <div className="grid gap-10 md:grid-cols-12 md:items-end md:gap-8">
          {commit ? (
            <div className="md:col-span-7">
              <p className="font-mono text-xs text-ink-muted">
                Last pushed {relativeTime(commit.date)} to{" "}
                <span className="text-accent">{commit.repo}</span>
              </p>
              <a
                href={commit.url}
                target="_blank"
                rel="noreferrer noopener"
                className="group mt-3 inline-flex items-start gap-2"
              >
                <span className="link-underline font-display text-display-s leading-snug">
                  {commit.message ?? "View the commit"}
                </span>
                <ArrowUpRight
                  className="mt-2 size-4 shrink-0 text-ink-muted transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
          ) : null}

          {recent ? (
            <div className="md:col-span-4 md:col-start-9">
              <div
                className="flex flex-wrap gap-[3px]"
                role="img"
                aria-label={`${total} public contributions in the last four months`}
              >
                {recent.map((day) => (
                  <span
                    key={day.date}
                    className={`size-[9px] ${levelClass[day.level]}`}
                    title={`${day.count} on ${day.date}`}
                  />
                ))}
              </div>
              <p className="mt-3 font-mono text-xs text-ink-muted">
                {total} contributions · last four months
              </p>
            </div>
          ) : (
            <div className="md:col-span-4 md:col-start-9">
              <a
                href={`https://github.com/${profile.githubUser}`}
                target="_blank"
                rel="noreferrer noopener"
                className="link-underline font-mono text-xs text-ink-muted"
              >
                github.com/{profile.githubUser}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
