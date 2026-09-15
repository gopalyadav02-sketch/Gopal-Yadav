# Living 3D Space Portfolio

## Goal
Turn the portfolio into a continuous deep-space experience with a much larger, genuinely animated black hole and moving stars that create clear 3D depth.

## Changes
- Replace the current flat black-hole image treatment with a WebGL scene: a dark event horizon, layered luminous accretion rings, gravitational glow, and slow three-axis motion.
- Scale and frame the black hole as the dominant visual in the opening screen without covering Gopal’s name or actions.
- Add several depth layers of stars across the entire portfolio, moving at different speeds with gentle camera drift and scroll-based travel.
- Shift all sections to a consistent galaxy-black space backdrop while preserving readable contrast and the existing glass panels.
- Keep pointer response on desktop, use lighter motion on phones, and stop nonessential animation when reduced motion is enabled.
- Verify the full experience on desktop and mobile, including movement, readability, loading, and error-free rendering.

## Technical details
- Use React Three Fiber and Three.js in a client-only page to prevent server rendering issues.
- Create the black hole procedurally with lightweight geometry and shader-driven motion; no ball or static circular crop remains.
- Cap pixel density and particle counts for mobile performance, with no external runtime assets.
