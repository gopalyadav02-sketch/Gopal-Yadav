import { useEffect, useRef } from "react";

import { useReducedMotion } from "./hooks";

const ROLES = [
  "AI Engineer",
  "Full Stack Developer",
  "ML Engineer",
  "Backend Developer",
  "Creator",
  "Builder",
];

/** AI Core hero: an orb that tilts and glows toward the pointer. */
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
      className="on-light relative flex min-h-[100svh] flex-col items-center justify-center px-5 pt-32 pb-20 text-center"
    >
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
        className="relative mt-12 h-52 w-52 transition-transform duration-300 ease-out will-change-transform sm:h-64 sm:w-64"
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 38% 32%, #ffffff 0%, oklch(0.78 0.11 235) 38%, oklch(0.36 0.12 262) 78%, oklch(0.18 0.06 265) 100%)",
            boxShadow: "0 40px 120px -30px oklch(0.5 0.14 255 / 0.65)",
            animation: "pulse-core 5s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -inset-6 rounded-full border border-dashed"
          style={{
            borderColor: "oklch(0.5 0.08 255 / 0.35)",
            animation: "spin-slow 26s linear infinite",
          }}
        />
        <div
          className="absolute -inset-12 rounded-full border"
          style={{
            borderColor: "oklch(0.5 0.08 255 / 0.18)",
            animation: "spin-slow 44s linear infinite reverse",
          }}
        />
      </div>

      <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
        <a
          href="#projects"
          className="rounded-full px-6 py-3 text-xs tracking-[0.25em] uppercase"
          style={{ background: "oklch(0.22 0.03 262)", color: "oklch(0.98 0 0)" }}
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
