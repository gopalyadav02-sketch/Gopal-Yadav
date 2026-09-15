import { useEffect, useState } from "react";

const LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("about");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <header
      className="text-foreground fixed inset-x-0 top-4 z-50 px-4"
    >
      <nav
        aria-label="Primary"
        className="glass mx-auto flex max-w-5xl items-center gap-4 rounded-full px-4 py-2.5 sm:px-6"
      >
        <a
          href="#top"
          className="font-display grid min-w-0 shrink-0 text-[0.72rem] leading-tight tracking-[0.3em] uppercase"
        >
          <span className="truncate">Gopal</span>
          <span className="truncate opacity-60">Yadav</span>
        </a>

        <ul className="ml-auto hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? "true" : undefined}
                className={`rounded-full px-3 py-1.5 text-xs tracking-widest uppercase transition-colors ${
                  active === l.id
                    ? "bg-current/10 opacity-100"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="ml-auto rounded-full border border-current/20 px-3 py-1.5 text-xs tracking-widest uppercase md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-nav"
          className="glass mx-auto mt-2 max-w-5xl rounded-3xl p-3 md:hidden"
        >
          <ul className="grid gap-1">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-sm tracking-widest uppercase hover:bg-current/10"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
