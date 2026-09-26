import { ogImageAlt, ogImageSize, renderOgImage } from '@/lib/og-image';

export const runtime = 'nodejs';
export const alt = ogImageAlt;
export const size = ogImageSize;
export const contentType = 'image/png';

export default function Image() {
  return renderOgImage();
}
