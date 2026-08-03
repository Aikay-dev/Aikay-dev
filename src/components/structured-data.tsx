import { profile } from "@/content/profile";

export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: "https://aikay-dev.vercel.app",
    email: `mailto:${profile.email}`,
    jobTitle: profile.role,
    description: profile.lede,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Warsaw",
      addressCountry: "PL",
    },
    alumniOf: profile.education.map((entry) => ({
      "@type": "EducationalOrganization",
      name: entry.institution,
    })),
    knowsLanguage: profile.languages.map((language) => language.name),
    sameAs: profile.socials.map((social) => social.href),
  };

  return (
    <script
      type="application/ld+json"
      // Content is authored in this repo, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
