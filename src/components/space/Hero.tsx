import { useEffect, useRef } from "react";

import blackHoleHero from "@/assets/black-hole-hero.jpg";

import { useReducedMotion } from "./hooks";

const ROLES = [
  "AI Engineer",
  "Full Stack Developer",
  "ML Engineer",
  "Backend Developer",
  "Creator",
  "Builder",
];

/** Black hole hero: a gravitational core that tilts toward the pointer. */
export function Hero() {
  const core = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = stage.current;
    const orb = core.current;
    if (!el || !orb) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      orb.style.transform = `perspective(900px) rotateY(${dx * 16}deg) rotateX(${-dy * 16}deg) translate3d(${dx * 14}px, ${dy * 14}px, 0)`;
    };
    const reset = () => {
      orb.style.transform = "";
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerleave", reset);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", reset);
    };
  }, [reduced]);

  return (
    <section
      id="top"
      ref={stage}
      className="hero-space relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pt-28 pb-16 text-center"
    >
      <div aria-hidden="true" className="hero-star-dust absolute inset-0" />

      <p className="muted text-[0.65rem] tracking-[0.42em] uppercase sm:text-xs">
        Alwar, Rajasthan &nbsp;•&nbsp; B.Tech @ JECRC Alwar
      </p>

      <h1 className="font-display mt-6 text-[clamp(2.6rem,10vw,6.5rem)] leading-[0.95] font-semibold">
        GOPAL YADAV
      </h1>

      <ul className="muted mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[0.7rem] tracking-[0.22em] uppercase sm:text-xs">
        {ROLES.map((r) => (
          <li key={r} className="rounded-full border border-current/20 px-3 py-1">
            {r}
          </li>
        ))}
      </ul>

      <div
        ref={core}
        aria-hidden="true"
        className="black-hole-core relative mt-8 aspect-square w-[min(74vw,25rem)] transition-transform duration-500 ease-out will-change-transform"
      >
        <img
          src={blackHoleHero}
          alt=""
          width={1536}
          height={1536}
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full rounded-full object-cover"
        />
        <div className="black-hole-lens absolute inset-[7%] rounded-full" />
      </div>

      <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
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

      <p className="muted mt-16 text-[0.6rem] tracking-[0.4em] uppercase">Scroll to launch</p>
    </section>
  );
}
