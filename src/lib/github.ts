import { profile } from "@/content/profile";

export type LatestCommit = {
  /** Absent when the commit lookup fails; the strip then shows repo + time. */
  message?: string;
  repo: string;
  url: string;
  date: string;
};

type PushEvent = {
  type: string;
  repo: { name: string };
  created_at: string;
  payload?: {
    ref?: string;
    /** The pushed SHA. The public events feed does NOT include commit
        messages, so this has to be resolved separately. */
    head?: string;
    commits?: { message: string; sha: string }[];
  };
};

const headers: HeadersInit = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
};

/** Commit bodies are long; only the subject line is useful here. */
const subjectLine = (message: string) => message.split("\n")[0];

/**
 * "Merge remote-tracking branch 'origin/main'" is technically the latest push
 * and tells a reader nothing. Skip merges and bot noise so the strip shows a
 * commit that actually describes work.
 */
const isNoise = (message: string) =>
  /^(merge\b|revert\b|bump\b|chore\(deps\)|initial commit$)/i.test(message.trim());

/**
 * Most recent public push across every repo.
 *
 * The public events feed advertises a `commits` array, but in practice it
 * frequently returns a trimmed payload carrying only `head` (the SHA) — so the
 * message has to be resolved with a second request against the commits API.
 * Both paths are handled; if the lookup fails we still return the repo and
 * timestamp rather than dropping the whole strip.
 *
 * Unauthenticated this is 60 requests/hour per IP, and the page revalidates
 * hourly, so two requests per revalidate is comfortable. GITHUB_TOKEN raises
 * the ceiling to 5,000 and enables the contribution graph.
 */
export async function getLatestCommit(): Promise<LatestCommit | null> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${profile.githubUser}/events/public?per_page=50`,
      { headers, next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;

    const events = (await res.json()) as PushEvent[];

    // Used only if every candidate turns out to be unreadable.
    let fallback: LatestCommit | undefined;

    for (const event of events) {
      if (event.type !== "PushEvent") continue;

      // Fast path: the payload actually carried the commits.
      const inlineCommit = event.payload?.commits?.at(-1);
      if (inlineCommit) {
        if (isNoise(inlineCommit.message)) continue;
        return {
          message: subjectLine(inlineCommit.message),
          repo: event.repo.name.split("/")[1] ?? event.repo.name,
          url: `https://github.com/${event.repo.name}/commit/${inlineCommit.sha}`,
          date: event.created_at,
        };
      }

      const sha = event.payload?.head;
      if (!sha) continue;

      const base = {
        repo: event.repo.name.split("/")[1] ?? event.repo.name,
        url: `https://github.com/${event.repo.name}/commit/${sha}`,
        date: event.created_at,
      };

      const commitRes = await fetch(
        `https://api.github.com/repos/${event.repo.name}/commits/${sha}`,
        { headers, next: { revalidate: 3600 } }
      );
      // Can't read the message — fall back rather than losing the strip, but
      // only if we haven't got a better candidate still to come.
      if (!commitRes.ok) {
        fallback ??= base;
        continue;
      }

      const commit = (await commitRes.json()) as { commit?: { message?: string } };
      const message = commit.commit?.message;

      if (!message) {
        fallback ??= base;
        continue;
      }
      if (isNoise(message)) continue;

      return { ...base, message: subjectLine(message) };
    }
    return fallback ?? null;
  } catch {
    return null;
  }
}

export type ContributionDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

/**
 * Contribution calendar. Requires GITHUB_TOKEN — the GraphQL API has no
 * unauthenticated mode. Returns null without one so the strip degrades to just
 * the latest commit rather than breaking the page.
 */
export async function getContributions(): Promise<ContributionDay[] | null> {
  if (!process.env.GITHUB_TOKEN) return null;

  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays { date contributionCount contributionLevel }
            }
          }
        }
      }
    }`;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { login: profile.githubUser } }),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;

    const json = (await res.json()) as {
      data?: {
        user?: {
          contributionsCollection: {
            contributionCalendar: {
              weeks: {
                contributionDays: {
                  date: string;
                  contributionCount: number;
                  contributionLevel: string;
                }[];
              }[];
            };
          };
        };
      };
    };

    const weeks = json.data?.user?.contributionsCollection.contributionCalendar.weeks;
    if (!weeks) return null;

    const levels: Record<string, ContributionDay["level"]> = {
      NONE: 0,
      FIRST_QUARTILE: 1,
      SECOND_QUARTILE: 2,
      THIRD_QUARTILE: 3,
      FOURTH_QUARTILE: 4,
    };

    return weeks.flatMap((week) =>
      week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
        level: levels[day.contributionLevel] ?? 0,
      }))
    );
  } catch {
    return null;
  }
}
