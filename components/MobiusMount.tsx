'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { MobiusErrorBoundary } from './mobius/MobiusErrorBoundary';
import { resolveMobiusMode } from './mobius/capability';

// The möbius is a WebGL canvas — it can't server-render, so load it client-only.
const Mobius = dynamic(() => import('./mobius/Mobius').then((m) => m.Mobius), {
  ssr: false,
});

export function MobiusMount() {
  // Canvas vs static, resolved after mount (the WebGL probe is client-only). Starts
  // 'pending' so SSR and the first client render agree; the canvas only ever mounts
  // once this lands on 'canvas', so it never mounts on low-power devices (they get
  // the static image via MobiusFallback in the hero).
  const [mode, setMode] = useState<'pending' | 'canvas' | 'static'>('pending');

  useEffect(() => {
    setMode(resolveMobiusMode());
  }, []);

  return (
    <div className="mobius-layer" aria-hidden="true">
      {mode === 'canvas' && (
        <MobiusErrorBoundary>
          <Mobius />
        </MobiusErrorBoundary>
      )}
    </div>
  );
}
