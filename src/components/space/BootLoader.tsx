import { useEffect, useState } from "react";

const LINES = [
  "Initializing flight systems",
  "Calibrating neural core",
  "Loading mission archives",
  "Engaging deep space drive",
];

export function BootLoader() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDone(true);
      return;
    }
    const timers = LINES.map((_, i) => window.setTimeout(() => setStep(i + 1), 380 * (i + 1)));
    const end = window.setTimeout(() => setDone(true), 380 * LINES.length + 650);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(end);
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className="bg-background fixed inset-0 z-[80] flex flex-col items-center justify-center gap-8 transition-opacity duration-700"
      style={{ opacity: done ? 0 : 1, pointerEvents: done ? "none" : "auto" }}
    >
      <div className="relative h-24 w-24">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, color-mix(in oklab, var(--halo) 70%, transparent), transparent 65%)",
            animation: "pulse-core 2.2s ease-in-out infinite",
          }}
        />
        <div
          className="border-halo/40 absolute inset-0 rounded-full border border-dashed"
          style={{ animation: "spin-slow 9s linear infinite" }}
        />
      </div>
      <ul className="space-y-1.5 text-center text-xs tracking-[0.28em] uppercase">
        {LINES.map((l, i) => (
          <li
            key={l}
            className={i < step ? "text-foreground" : "text-muted-foreground/40"}
            style={{ transition: "color 400ms" }}
          >
            {l}
          </li>
        ))}
      </ul>
      <div className="bg-border h-px w-48 overflow-hidden">
        <div
          className="bg-halo h-px w-1/3"
          style={{ animation: "sweep 1.4s ease-in-out infinite" }}
        />
      </div>
    </div>
  );
}
