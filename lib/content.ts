/**
 * Site content — all editable copy and project data lives here so the rest of
 * the app stays presentational. Edit this file to update the page.
 */

export const site = {
  name: 'Adrian Milsap',
  role: 'Design Systems Engineer',
  // One sharp title for now. To bring back the rotating mix, add more entries:
  // 'Design Engineer', 'Product Engineer', 'Creative Technologist', etc.
  roles: ['Design Systems Engineer'],
  location: 'Spokane, WA',
  email: 'adrian.milsap@gmail.com',
};

/**
 * What hds CI actually checks for accessibility: the WCAG AA contrast gate on
 * 21 core token pairs (light + dark) and zero-warning jsx-a11y lint. axe-core
 * is a Storybook panel, not a CI gate. Keep every a11y claim on this site
 * derived from this string (npm run check:claims guards the stale wording).
 */
export const a11yEvidence =
  'a WCAG AA contrast gate on 21 core token pairs (light + dark) and zero-warning jsx-a11y lint in CI';

/**
 * Public component modules in hds. Hardcoded, not imported across repos: the
 * hds README ("109 public component modules, exported from src/index.ts")
 * as of 2026-09-29. Bump this when that number changes.
 */
const HDS_COMPONENT_COUNT = 109;

/**
 * Hero copy — editorial headline above the möbius, a quiet line beneath.
 */
export const hero = {
  headlineTop: 'I build the design systems',
  headlineBottom: 'teams ship on.',
  tagline: `DTCG tokens, ${a11yEvidence}, and a library built for AI agents to extend safely.`,
  // Grounding line beneath the hero (role · location).
  meta: 'Design Systems Engineer · Spokane, WA',
};

/**
 * Positioning statement above the work — ownership in plain language.
 */
export const intro =
  'I build and own the component systems product teams ship on — design tokens as the single source of truth, accessibility treated as engineering, and the React/TypeScript infrastructure underneath.';

/** Brand-free seniority signal beneath the intro. */
export const credibility = 'Ten years in enterprise design systems.';

export type Project = {
  title: string;
  blurb: string;
  /** e.g. role / discipline */
  kind: string;
  year: string;
  href: string;
  /** optional supporting detail, rendered as a short list */
  highlights?: string[];
  /** optional cover image in /public; falls back to a tinted panel */
  cover?: string;
  /** optional extra links, rendered under the card (kept outside the card anchor) */
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    title: 'Hirobius Design System',
    kind: 'Design System',
    year: '2026',
    href: 'https://hirobius-design-system.vercel.app',
    blurb: `A published, governed component library — ${HDS_COMPONENT_COUNT} components, multi-theme, with DTCG tokens as the single source of truth and Figma sync. CI runs ${a11yEvidence}. Built to be safely extended by AI agents; the first outside field report is public at hds#92 / PR #99.`,
    highlights: ['10 npm releases, 455 stories, 2 product apps + 4 token-level sites'],
    links: [
      { label: 'Storybook', href: 'https://hirobius-design-system.vercel.app' },
      { label: 'npm', href: 'https://www.npmjs.com/package/@hirobius/design-system' },
      { label: 'GitHub', href: 'https://github.com/hirobius/hds' },
    ],
  },
  {
    title: 'Veteran Resource Navigator',
    kind: 'Product · Accessibility',
    year: '2026',
    href: 'https://veteran-resource-navigator.vercel.app/',
    blurb:
      'An accessible navigator that helps veterans find and reach the benefits and resources they qualify for.',
  },
];

type Sketch = { title: string; blurb: string; href: string };

/**
 * Sketchbook — lighter-weight interactive experiments. Dump entries here; the
 * section only renders once it has at least one. Each is { title, blurb, href }.
 */
export const sketches: { heading: string; lead: string; items: Sketch[] } = {
  heading: 'Sketchbook',
  lead: 'Interactive experiments and creative-engineering bits.',
  items: [],
};

/** Engineering-scoped tools row — no comms tools (Slack/Teams/Discord left off). */
export const stack = [
  'React',
  'TypeScript',
  'Node.js',
  'Design Tokens (DTCG)',
  'Figma',
  'Storybook',
  'Vitest',
  'axe-core (Storybook panel)',
  'Vercel',
  'GitHub Actions',
  'LLMs (Claude, GPT, Gemini)',
];

export const footer = {
  note: 'Built in the open.',
};

/**
 * Closing "Let's connect" CTA.
 */
export const contact = {
  heading: "Let's connect",
  line: 'Building a design system, or just want to talk shop? Reach out.',
  links: [
    { label: 'Email', href: 'mailto:adrian.milsap@gmail.com' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/adrianmilsap' },
    { label: 'GitHub', href: 'https://github.com/adr-eng' },
  ],
};
