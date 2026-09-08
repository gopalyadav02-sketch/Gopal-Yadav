import { useState } from "react";

function Heading({ index, title, kicker }: { index: string; title: string; kicker: string }) {
  return (
    <div className="reveal mb-12">
      <p className="text-[0.62rem] tracking-[0.42em] uppercase opacity-60">
        {index} — {kicker}
      </p>
      <h2 className="mt-3 text-[clamp(1.9rem,5vw,3.2rem)] leading-tight font-semibold">{title}</h2>
    </div>
  );
}

/* ------------------------------- About -------------------------------- */

const PANELS = [
  {
    title: "Origin",
    body: "I'm Gopal Yadav, a B.Tech student at JECRC Alwar, building from Alwar, Rajasthan. I learn by shipping — turning ideas into working systems instead of leaving them as notes.",
  },
  {
    title: "Focus",
    body: "My work sits between AI and engineering: training and applying machine learning models, and wrapping them in full stack products with dependable backends.",
  },
  {
    title: "Approach",
    body: "Curiosity first, craft second, polish always. I like clean architecture, readable code, and interfaces that feel calm even when the system underneath is complex.",
  },
];

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-28 sm:py-36">
      <Heading index="01" kicker="Crew Profile" title="A student engineer with a builder's habit" />
      <div className="grid gap-5 md:grid-cols-3">
        {PANELS.map((p, i) => (
          <article
            key={p.title}
            className="reveal glass group relative overflow-hidden rounded-3xl p-7"
            style={{ transitionDelay: `${i * 90}ms` }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(135deg, color-mix(in oklab, var(--halo) 18%, transparent), transparent 60%)",
              }}
            />
            <h3 className="text-sm tracking-[0.3em] uppercase opacity-70">{p.title}</h3>
            <p className="relative mt-4 text-sm leading-relaxed opacity-90">{p.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------- Skills ------------------------------- */

const PLANETS = [
  { name: "Python", orbit: "AI & ML" },
  { name: "Machine Learning", orbit: "AI & ML" },
  { name: "Deep Learning", orbit: "AI & ML" },
  { name: "React", orbit: "Frontend" },
  { name: "TypeScript", orbit: "Frontend" },
  { name: "Tailwind CSS", orbit: "Frontend" },
  { name: "Node.js", orbit: "Backend" },
  { name: "REST APIs", orbit: "Backend" },
  { name: "SQL", orbit: "Backend" },
  { name: "Git & GitHub", orbit: "Tooling" },
  { name: "Docker", orbit: "Tooling" },
  { name: "Cloud Basics", orbit: "Tooling" },
];

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-5 py-28 sm:py-36">
      <Heading index="02" kicker="Star Systems" title="Skills in orbit" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {PLANETS.map((s, i) => (
          <div
            key={s.name}
            className="reveal glass flex flex-col items-center gap-4 rounded-3xl px-4 py-8 text-center transition-transform duration-500 hover:-translate-y-1.5"
            style={{ transitionDelay: `${(i % 4) * 70}ms` }}
          >
            <span
              aria-hidden="true"
              className="h-12 w-12 rounded-full"
              style={{
                background: `radial-gradient(circle at 35% 30%, #fff, oklch(0.7 0.12 ${200 + i * 8}) 45%, oklch(0.28 0.09 265) 100%)`,
                boxShadow: "0 18px 40px -18px oklch(0.7 0.12 240 / 0.8)",
              }}
            />
            <div>
              <p className="text-sm font-medium">{s.name}</p>
              <p className="mt-1 text-[0.6rem] tracking-[0.3em] uppercase opacity-55">{s.orbit}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------ Projects ------------------------------ */

const PROJECTS = [
  {
    name: "Neural Vision Lab",
    tag: "Machine Learning",
    body: "Placeholder mission: an image classification pipeline with training notebooks, evaluation dashboards and a small inference API.",
    stack: ["Python", "PyTorch", "FastAPI"],
  },
  {
    name: "Orbit Task Deck",
    tag: "Full Stack",
    body: "Placeholder mission: a real-time task workspace with authentication, role-based access and a responsive command-center UI.",
    stack: ["React", "Node.js", "PostgreSQL"],
  },
  {
    name: "Signal Assistant",
    tag: "AI Product",
    body: "Placeholder mission: a conversational assistant that summarizes documents and answers questions with cited sources.",
    stack: ["TypeScript", "LLM APIs", "Vector Search"],
  },
];

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-28 sm:py-36">
      <Heading index="03" kicker="Featured Missions" title="Projects" />
      <p className="reveal mb-10 max-w-xl text-sm opacity-65">
        These entries are polished placeholders, ready to be swapped for real projects and links.
      </p>
      <div className="grid gap-5 lg:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <article
            key={p.name}
            className="reveal glass group relative flex flex-col overflow-hidden rounded-3xl p-7 transition-transform duration-500 hover:-translate-y-2"
            style={{ transitionDelay: `${i * 90}ms` }}
          >
            <div
              aria-hidden="true"
              className="absolute -top-24 -right-24 h-52 w-52 rounded-full opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-80"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in oklab, var(--halo) 55%, transparent), transparent 70%)",
              }}
            />
            <p className="text-[0.6rem] tracking-[0.34em] uppercase opacity-60">{p.tag}</p>
            <h3 className="relative mt-3 text-xl font-semibold">{p.name}</h3>
            <p className="relative mt-4 flex-1 text-sm leading-relaxed opacity-85">{p.body}</p>
            <ul className="relative mt-6 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-white/15 px-3 py-1 text-[0.65rem] tracking-widest uppercase opacity-80"
                >
                  {s}
                </li>
              ))}
            </ul>
            <span className="relative mt-6 text-[0.65rem] tracking-[0.3em] uppercase opacity-50">
              Link coming soon
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------- Experience ----------------------------- */

const TIMELINE = [
  {
    period: "2023 — Present",
    title: "B.Tech Student, JECRC Alwar",
    body: "Studying engineering fundamentals while building side projects in AI, web development and backend systems.",
  },
  {
    period: "2024 — Present",
    title: "Self-directed AI & ML Practice",
    body: "Working through machine learning coursework and hands-on experiments: data preparation, model training and evaluation.",
  },
  {
    period: "2025 — Present",
    title: "Full Stack Project Work",
    body: "Designing and shipping personal full stack applications end to end — interface, API layer and data model.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-4xl px-5 py-28 sm:py-36">
      <Heading index="04" kicker="Flight Log" title="Experience" />
      <ol className="relative border-l border-white/15 pl-6 sm:pl-10">
        {TIMELINE.map((t, i) => (
          <li key={t.title} className="reveal pb-12 last:pb-0" style={{ transitionDelay: `${i * 90}ms` }}>
            <span
              aria-hidden="true"
              className="bg-halo absolute -left-[5px] h-2.5 w-2.5 rounded-full"
              style={{ boxShadow: "0 0 16px var(--halo)" }}
            />
            <p className="text-[0.62rem] tracking-[0.34em] uppercase opacity-60">{t.period}</p>
            <h3 className="mt-2 text-lg font-semibold">{t.title}</h3>
            <p className="mt-3 text-sm leading-relaxed opacity-80">{t.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* -------------------------- Certifications ---------------------------- */

const CERTS = [
  { name: "Certification Slot 01", issuer: "Add issuer", year: "Add year" },
  { name: "Certification Slot 02", issuer: "Add issuer", year: "Add year" },
  { name: "Certification Slot 03", issuer: "Add issuer", year: "Add year" },
];

export function Certifications() {
  return (
    <section id="certifications" className="mx-auto max-w-6xl px-5 py-28 sm:py-36">
      <Heading index="05" kicker="Cargo Manifest" title="Certifications" />
      <p className="reveal mb-10 max-w-xl text-sm opacity-65">
        Empty slots, intentionally. Add real certificates here — nothing is claimed that hasn't been
        earned.
      </p>
      <div className="grid gap-5 sm:grid-cols-3">
        {CERTS.map((c, i) => (
          <div
            key={c.name}
            className="reveal glass rounded-3xl border-dashed p-7"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <p className="text-sm font-medium">{c.name}</p>
            <p className="mt-2 text-xs opacity-60">{c.issuer}</p>
            <p className="mt-6 text-[0.6rem] tracking-[0.3em] uppercase opacity-45">{c.year}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------ Contact ------------------------------- */

const EMAIL = "yuvanahir02@gmail.com";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-4xl px-5 py-28 sm:py-36">
      <Heading index="06" kicker="Mission Control" title="Let's build something" />
      <div className="reveal glass rounded-[2rem] p-8 sm:p-12">
        <dl className="grid gap-6 sm:grid-cols-2">
          <div>
            <dt className="text-[0.6rem] tracking-[0.32em] uppercase opacity-55">Station</dt>
            <dd className="mt-2 text-sm">Alwar, Rajasthan, India</dd>
          </div>
          <div>
            <dt className="text-[0.6rem] tracking-[0.32em] uppercase opacity-55">Status</dt>
            <dd className="mt-2 text-sm">Open to internships & collaborations</dd>
          </div>
        </dl>

        <div className="mt-10 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <a
            href={`mailto:${EMAIL}`}
            className="bg-halo/90 text-primary-foreground truncate rounded-full px-6 py-4 text-center text-xs tracking-[0.25em] uppercase transition-transform hover:-translate-y-0.5"
          >
            {EMAIL}
          </a>
          <button
            type="button"
            onClick={copy}
            className="shrink-0 rounded-full border border-white/20 px-6 py-4 text-xs tracking-[0.25em] uppercase hover:bg-white/10"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <p aria-live="polite" className="sr-only">
          {copied ? "Email address copied to clipboard" : ""}
        </p>
      </div>
    </section>
  );
}

/* ------------------------------- Footer ------------------------------- */

export function Footer() {
  return (
    <footer className="relative overflow-hidden px-5 pt-20 pb-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-40 mx-auto h-80 w-[140%] rounded-[50%] opacity-50 blur-2xl"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, color-mix(in oklab, var(--ion) 35%, transparent), transparent 65%)",
        }}
      />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-3 text-center">
        <p className="font-display text-sm tracking-[0.4em] uppercase">Gopal Yadav</p>
        <p className="text-xs opacity-55">
          AI Engineer · Full Stack Developer · Alwar, Rajasthan
        </p>
        <p className="mt-6 text-[0.6rem] tracking-[0.3em] uppercase opacity-35">
          © {new Date().getFullYear()} — Signing off from deep space
        </p>
      </div>
    </footer>
  );
}
