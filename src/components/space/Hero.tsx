import { useEffect, useRef } from "react";

import skillSystemScene from "@/assets/black-hole-skill-system.jpg";

import { useReducedMotion } from "./hooks";

const SKILL_PLANETS = [
  { planet: "Mercury", skill: "Python", position: "mercury" },
  { planet: "Venus", skill: "Machine Learning", position: "venus" },
  { planet: "Earth", skill: "Artificial Intelligence", position: "earth" },
  { planet: "Mars", skill: "Data Science", position: "mars" },
  { planet: "Jupiter", skill: "Deep Learning", position: "jupiter" },
  { planet: "Saturn", skill: "SQL / Databases", position: "saturn" },
  { planet: "Uranus", skill: "Generative AI", position: "uranus" },
  { planet: "Neptune", skill: "n8n / AI Automation", position: "neptune" },
];

export function Hero() {
  const scene = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const visual = scene.current;
    if (!visual || reduced) return;
    let frame = 0;
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth - 0.5) * 2;
        const y = (event.clientY / window.innerHeight - 0.5) * 2;
        visual.style.setProperty("--scene-x", `${x * -1.3}deg`);
        visual.style.setProperty("--scene-y", `${y * 0.8}deg`);
        visual.style.setProperty("--scene-tx", `${x * -10}px`);
        visual.style.setProperty("--scene-ty", `${y * -6}px`);
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
    };
  }, [reduced]);

  return (
    <section
      id="top"
      className="hero-space relative z-10 flex min-h-[100svh] flex-col overflow-hidden px-5 pt-28 pb-8 sm:px-8 lg:px-12"
    >
      <div ref={scene} aria-hidden="true" className="solar-system-scene absolute inset-0">
        <img
          src={skillSystemScene}
          alt=""
          width={1920}
          height={1080}
          decoding="async"
          fetchPriority="high"
          className="h-full w-full object-cover"
        />
      </div>
      <div aria-hidden="true" className="hero-contrast absolute inset-0" />
      <div className="hero-copy relative z-20 max-w-xl">
        <p className="muted text-[0.6rem] tracking-[0.38em] uppercase sm:text-[0.68rem]">
          Portfolio / 2026
        </p>
        <h1 className="font-display text-glow mt-4 text-[clamp(2.8rem,7vw,6.7rem)] leading-[0.88] font-semibold">
          GOPAL
          <span className="block">YADAV</span>
        </h1>
        <p className="mt-5 text-xs font-medium tracking-[0.32em] text-starlight uppercase sm:text-sm">
          AI / ML Engineer
        </p>
        <p className="muted mt-4 max-w-md text-sm leading-relaxed sm:text-base">
          Exploring Intelligence Across the Digital Universe.
        </p>
      </div>

      <ul className="skill-constellation absolute inset-0 z-10" aria-label="Technical skills represented by Solar System planets">
        {SKILL_PLANETS.map(({ planet, skill, position }) => (
          <li key={planet} className={`skill-label skill-label--${position}`}>
            <span className="skill-line" aria-hidden="true" />
            <span className="skill-planet">{planet}</span>
            <span className="skill-name">{skill}</span>
          </li>
        ))}
      </ul>

      <div aria-hidden="true" className="min-h-[43svh] flex-1" />

      <div className="relative z-20 flex flex-wrap items-center gap-3">
        <a
          href="#projects"
          className="bg-foreground text-background rounded-full px-6 py-3 text-xs tracking-[0.25em] uppercase"
        >
          Explore Missions
        </a>
        <a
          href="#contact"
          className="rounded-full border border-current/25 px-6 py-3 text-xs tracking-[0.25em] uppercase"
        >
          Open Comms
        </a>
      </div>

      <div className="relative z-20 mt-7 flex items-center gap-3">
        <span aria-hidden="true" className="h-px w-8 bg-current opacity-30" />
        <p className="muted text-[0.56rem] tracking-[0.35em] uppercase">Scroll to explore</p>
      </div>
    </section>
  );
}
