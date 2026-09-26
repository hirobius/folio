import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { site } from '@/lib/content';

/**
 * Shared social share card renderer — the möbius mark
 * (public/mobius-bg.png) full-bleed, name + role laid over it.
 * Used by both app/opengraph-image.tsx and app/twitter-image.tsx (see #1);
 * each of those files must keep its own literal `size`/`contentType`/
 * `runtime` exports — Next.js only recognizes those as string/object
 * literals in the route file itself, not re-exported from elsewhere.
 */
export const ogImageSize = { width: 1200, height: 630 };
export const ogImageAlt = `${site.name} — ${site.role}`;

export async function renderOgImage() {
  const bg = await readFile(path.join(process.cwd(), 'public', 'mobius-bg.png'));
  const bgSrc = `data:image/png;base64,${bg.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        <img
          src={bgSrc}
          alt=""
          width={ogImageSize.width}
          height={ogImageSize.height}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            padding: '64px 72px',
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: '#f1ebe1',
              letterSpacing: '-0.02em',
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              marginTop: 12,
              fontSize: 34,
              fontWeight: 500,
              color: '#c7cdfb',
            }}
          >
            {site.role}
          </div>
        </div>
      </div>
    ),
    { ...ogImageSize }
  );
}
