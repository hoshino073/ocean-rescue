# Ocean Rescue: Marine Prosthetics Lab

A small, polished educational web app that teaches how prosthetics and supportive
devices can help injured marine animals during rehabilitation.

Explore four themed 3D ocean exhibits — a healthy coral reef, a bleached reef, a
cove full of marine debris, and a rehabilitation bay — meet six animals recovering
from fictional injuries, and play the **Prosthetic Fitting Lab**: choose the right
device, position and rotate it into place, then watch a short swim test and get a
score. Every animal you help moves to the Rehabilitation Bay to keep recovering.

Every animal, injury, and case in this app is fictional and simplifies real
veterinary care — it's meant to teach the idea, not replace expert guidance.

## Tech stack

- React + TypeScript + Vite
- React Three Fiber + drei (the 3D aquarium and animals)
- Framer Motion (UI transitions)
- Tailwind CSS
- Zustand (game state, persisted rescue progress)

No backend, no accounts — all progress is stored locally in your browser.

## Running locally

```bash
npm install
npm run dev
```

Then open the printed local URL. To type-check and build for production:

```bash
npm run build
```

## Accessibility

The fitting activity is fully playable with a mouse/touch drag **or** with
keyboard-only controls (arrow keys to move, `[`/`]` to rotate, `Enter` to check
the fit), and respects `prefers-reduced-motion`.
