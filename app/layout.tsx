import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ThemeProvider } from '@/components/ThemeProvider';
import { site } from '@/lib/content';
import './globals.css';

// Satoshi, self-hosted (Fontshare kit). One variable woff2 covers weights
// 300–900; Next fingerprints + preloads it and generates a size-adjusted
// fallback to avoid layout shift. Exposed as the --font-satoshi CSS var.
const satoshi = localFont({
  src: [
    { path: './fonts/Satoshi-Variable.woff2', weight: '300 900', style: 'normal' },
    { path: './fonts/Satoshi-VariableItalic.woff2', weight: '300 900', style: 'italic' },
  ],
  variable: '--font-satoshi',
  display: 'swap',
});

const description =
  'Adrian Milsap — Design Systems Engineer. I build the design systems teams ship on: DTCG tokens, accessibility enforced in CI, and libraries built for AI agents to extend safely.';

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description,
  // Text-only social tags (no metadataBase needed). The share image + canonical
  // URL land with the production domain — see TODO.md / the "social share" issue.
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description,
    type: 'website',
    siteName: site.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.role}`,
    description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={satoshi.variable}>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
