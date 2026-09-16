import { useEffect, useRef } from "react";

import solarSystemScene from "@/assets/solar-system-black-hole.jpg";

import { useReducedMotion } from "./hooks";

const ROLES = [
  "AI Engineer",
  "Full Stack Developer",
  "ML Engineer",
  "Backend Developer",
  "Creator",
  "Builder",
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
      className="hero-space relative z-10 flex min-h-[100svh] flex-col items-center overflow-hidden px-5 pt-28 pb-10 text-center"
    >
      <div ref={scene} aria-hidden="true" className="solar-system-scene absolute inset-0">
        <img
          src={solarSystemScene}
          alt=""
          width={1536}
          height={1024}
          decoding="async"
          fetchPriority="high"
          className="h-full w-full object-cover"
        />
      </div>
      <div aria-hidden="true" className="hero-contrast absolute inset-0" />
      <p className="absolute right-5 bottom-5 z-10 max-w-[12rem] text-right text-[0.52rem] leading-relaxed tracking-[0.28em] text-starlight/60 uppercase sm:right-8 sm:bottom-8 sm:max-w-none sm:text-[0.6rem]">
        Our Solar System — Black Hole Scenario
      </p>

      <p className="muted relative z-10 text-[0.65rem] tracking-[0.42em] uppercase sm:text-xs">
        Alwar, Rajasthan &nbsp;•&nbsp; B.Tech @ JECRC Alwar
      </p>

      <h1 className="font-display text-glow relative z-10 mt-5 text-[clamp(2.6rem,10vw,6.5rem)] leading-[0.95] font-semibold">
        GOPAL YADAV
      </h1>

      <ul className="muted relative z-10 mt-5 flex max-w-2xl flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[0.7rem] tracking-[0.22em] uppercase sm:text-xs">
        {ROLES.map((r) => (
          <li key={r} className="rounded-full border border-current/20 px-3 py-1">
            {r}
          </li>
        ))}
      </ul>

      <div aria-hidden="true" className="min-h-[34svh] flex-1 sm:min-h-[40svh]" />

      <div className="relative z-10 flex flex-wrap items-center justify-center gap-3">
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

      <p className="muted relative z-10 mt-8 text-[0.6rem] tracking-[0.4em] uppercase">
        Scroll to launch
      </p>
    </section>
  );
}
