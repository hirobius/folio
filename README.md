# Adrian Milsap — Portfolio

A clean, single-page portfolio for a design engineer. Warm editorial aesthetic
(Playfair Display + Inter), a real-time WebGL **möbius** centerpiece, a
light/dark theme switch, and a small work grid.

## Stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **React Three Fiber** / **three.js** for the möbius (shader-driven twist,
  magnetic cursor response — ported from the original design system, trimmed)
- **next-themes** for the theme switch
- Plain CSS (`app/globals.css`) with theme tokens — no UI framework

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
npm run typecheck
```

## Where things live

| What | File |
| --- | --- |
| All copy (headline, intro, projects) | `lib/content.ts` |
| Theme tokens, type ramp, layout | `app/globals.css` |
| Page composition | `app/page.tsx` + `components/*` |
| Möbius (Canvas wrapper) | `components/mobius/Mobius.tsx` |
| Möbius scene, geometry & motion | `components/mobius/MobiusScene.tsx` |

### Editing content

Update `lib/content.ts` — headline, the "journey" intro, and the `projects`
array (title, blurb, kind, year, href, optional `cover` image in `/public`).

### Tuning the möbius

The centerpiece is a twisted, fluted triangular tube baked into a `BufferGeometry`,
shaded as frosted transmission glass (a `MeshPhysicalMaterial`) with a small "roll"
vertex shader that animates the twist in place. All of its shape / motion / material
values live in a **`MobiusConfig`** (`components/mobius/mobiusConfig.ts`) —
`DEFAULT_MOBIUS_CONFIG` is what ships.

Tune it live in the browser: append **`?tune`** to the URL for a dev panel with a
tab per control group (Geometry · Motion · Glass · Color · Inner · Lite), each with
a "copy json" button. Paste the copied values back into `DEFAULT_MOBIUS_CONFIG` to
lock them in. (The panel is dev-only — see `TODO.md` for removing it before launch.)

Color comes from the `--mobius-color` CSS var (flips with the theme; edit those
vars in `app/globals.css`). The möbius auto-fits and anchors to the hero band via
`[data-mobius-anchor="hero"]`. Architecture notes live in `CONTEXT.md`.

### Device tiers

`components/mobius/capability.ts` probes WebGL once on load and picks a render tier
so the same glass look runs on every device with a real GPU, scaling only fidelity:

- `glass-high` — full transmission glass (capable GPU)
- `glass-low` — same glass, lower transmission resolution / dpr / fps (constrained GPU)
- software rasterizer / no WebGL — the live canvas is skipped entirely; a static
  pre-rendered image (`public/mobius-fallback.png`, shown by `MobiusFallback`) fills
  the hero band instead — zero three.js, no render loop

Force a path for testing on a given device with `?glass`, `?glasslow`, or `?lite`
(these always mount the live canvas). The static image is a pre-rendered capture of
the glass möbius on a transparent background; regenerate it if the look changes.
