'use client';

import { useEffect, useState } from 'react';
import { resolveMobiusMode } from './capability';

/**
 * MobiusFallback — the static möbius image for low-power devices.
 *
 * Rendered inside the hero's möbius anchor band. On devices with no real GPU
 * (software rasterizers / no WebGL) the live canvas never mounts (see MobiusMount);
 * this shows a pre-rendered möbius instead — zero three.js, no render loop, no
 * battery cost. On capable devices (and in the tuner) it renders nothing.
 *
 * Decided after mount (not via lazy init) so the server/first-paint markup matches
 * — the band is reserved either way, so there's no layout shift when it appears.
 */
export function MobiusFallback() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(resolveMobiusMode() === 'static');
  }, []);

  if (!show) return null;
  // WebP first, PNG second: this renders on the devices least able to afford
  // the bytes — no GPU, often a slow link — and the WebP is 36 KB against the
  // PNG's 321 KB. The <picture> keeps the PNG as the fallback source rather
  // than replacing it, so a browser without WebP support still gets an image.
  return (
    <picture>
      <source srcSet="/mobius-fallback.webp" type="image/webp" />
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative, fixed asset */}
      <img className="hero__mobius-img" src="/mobius-fallback.png" alt="" aria-hidden="true" />
    </picture>
  );
}
