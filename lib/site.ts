/**
 * Canonical production URL, used for `metadataBase`, Open Graph, robots, sitemap.
 *
 * On Vercel, `VERCEL_PROJECT_PRODUCTION_URL` is the project's production domain — a
 * custom domain if one is assigned, otherwise the `*.vercel.app` alias — so this
 * auto-tracks a future custom domain with no code change. The fallback is the
 * current production alias (for local dev / non-Vercel builds).
 */
export const siteUrl =
  'https://' + (process.env.VERCEL_PROJECT_PRODUCTION_URL ?? 'portfolio-brown-five-43.vercel.app');
