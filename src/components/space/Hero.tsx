const ROLES = [
  "AI Engineer",
  "Full Stack Developer",
  "ML Engineer",
  "Backend Developer",
  "Creator",
  "Builder",
];

export function Hero() {
  return (
    <section
      id="top"
      className="hero-space relative z-10 flex min-h-[100svh] flex-col items-center overflow-hidden px-5 pt-28 pb-10 text-center"
    >
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
