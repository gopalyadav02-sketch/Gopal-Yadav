# Black Hole Hero Upgrade

## Goal
Replace the blue hero orb with a cinematic, high-resolution black hole and make the opening background a rich field of deep-space stars.

## Changes
- Generate a premium black-hole visual with an elegant accretion disk and realistic gravitational glow.
- Integrate it into the existing interactive hero while preserving pointer movement and reduced-motion behavior.
- Extend the starfield across the opening screen with brighter depth layers, subtle nebula haze, and strong text contrast.
- Keep the existing white-to-deep-space scroll transition intact below the opening.
- Verify desktop and mobile framing, readability, animation, and loading behavior.

## Technical details
- Store the generated image inside the project and render it as the hero’s primary visual.
- Use semantic color tokens and restrained CSS effects for blending, glow, and motion.
- Retain accessible decorative-image handling and motion fallbacks.
