import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

// Single-page portfolio — one canonical entry.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
