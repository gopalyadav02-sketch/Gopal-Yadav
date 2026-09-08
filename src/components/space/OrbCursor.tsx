import { useEffect, useRef } from "react";

import { useFinePointer, useReducedMotion } from "./hooks";

/** Glowing orb cursor. Disabled for coarse pointers and reduced motion. */
export function OrbCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const halo = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const enabled = fine && !reduced;

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let hx = x;
    let hy = y;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${x - 4}px, ${y - 4}px, 0)`;
    };
    const loop = () => {
      hx += (x - hx) * 0.12;
      hy += (y - hy) * 0.12;
      if (halo.current) halo.current.style.transform = `translate3d(${hx - 22}px, ${hy - 22}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move);
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60]">
      <div
        ref={halo}
        className="absolute top-0 left-0 h-11 w-11 rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--halo) 45%, transparent) 0%, transparent 70%)",
        }}
      />
      <div
        ref={dot}
        className="bg-halo absolute top-0 left-0 h-2 w-2 rounded-full"
        style={{ boxShadow: "0 0 18px var(--halo)" }}
      />
    </div>
  );
}
