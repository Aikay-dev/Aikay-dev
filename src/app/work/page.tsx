import type { Metadata } from "next";
import { clientProjects, personalProjects } from "@/content/projects";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Marketplaces, client sites and AI systems — built end to end. Case studies covering Fixam, Biddy, TestPortal Academy, AI Interviewer and more.",
};

export default function WorkPage() {
  const groups = [
    {
      id: "client",
      heading: "Client work",
      note: "Paid engagements. Each one shipped, deployed and handed over.",
      projects: clientProjects,
    },
    {
      id: "personal",
      heading: "Personal projects",
      note: "Built for myself — to answer a question, scratch an itch, or find out whether an idea held up.",
      projects: personalProjects,
    },
  ];

  return (
    <>
      <section className="shell pb-16 pt-12 md:pb-20 md:pt-20">
        <h1 className="text-display-l font-display">Work</h1>
        <p className="measure mt-6 text-lede text-ink-soft">
          Ten projects, six of them paid. Every case study covers what the problem actually was and
          the decisions that turned out to matter — including the ones that went wrong first.
        </p>
      </section>

      {groups.map((group) => (
        <section key={group.id} className="shell py-12 md:py-16" aria-labelledby={`${group.id}-heading`}>
          <div className="rule-top flex flex-col gap-2 pt-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
            <h2 id={`${group.id}-heading`} className="font-display text-display-s">
              {group.heading}
            </h2>
            <p className="font-mono text-xs text-ink-muted sm:max-w-sm sm:text-right">{group.note}</p>
          </div>

          <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {group.projects.map((project, i) => (
              <Reveal key={project.slug} delay={(i % 3) * 0.07}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
