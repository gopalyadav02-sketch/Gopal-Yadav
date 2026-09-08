import { createFileRoute } from "@tanstack/react-router";

import { BootLoader } from "@/components/space/BootLoader";
import { Hero } from "@/components/space/Hero";
import { Nav } from "@/components/space/Nav";
import { OrbCursor } from "@/components/space/OrbCursor";
import { Starfield } from "@/components/space/Starfield";
import {
  About,
  Certifications,
  Contact,
  Experience,
  Footer,
  Projects,
  Skills,
} from "@/components/space/Sections";
import { useRevealOnScroll, useScrollProgress } from "@/components/space/hooks";

const TITLE = "Gopal Yadav — AI Engineer & Full Stack Developer";
const DESCRIPTION =
  "Portfolio of Gopal Yadav, AI and full stack engineer and B.Tech student at JECRC Alwar, building machine learning and web products from Alwar, Rajasthan.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Gopal Yadav",
          jobTitle: "AI Engineer, Full Stack Developer",
          email: "mailto:yuvanahir02@gmail.com",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Alwar",
            addressRegion: "Rajasthan",
            addressCountry: "IN",
          },
          alumniOf: { "@type": "CollegeOrUniversity", name: "JECRC Alwar" },
          knowsAbout: ["Artificial Intelligence", "Machine Learning", "Full Stack Development"],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  useRevealOnScroll();
  const progress = useScrollProgress();

  return (
    <div className="stage relative min-h-screen overflow-x-hidden">
      <BootLoader />
      <OrbCursor />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 transition-opacity duration-500"
        style={{ opacity: Math.min(1, Math.max(0, (progress - 0.25) * 2.4)) }}
      >
        <Starfield />
      </div>

      <a
        href="#about"
        className="sr-only rounded-full px-4 py-2 focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[90] focus:bg-white focus:text-black"
      >
        Skip to content
      </a>

      <Nav />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
