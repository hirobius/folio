/**
 * Base material color for the möbius. This is only the seed value used before
 * the live theme color (read from the `--mobius-color` CSS var) lerps in at
 * runtime, so it just needs to be a sensible neutral.
 *
 * Numeric three.js colour — kept as-is per hirobius/folio#21 (the möbius must
 * look unchanged; three.js needs a concrete value here, not a CSS var).
 */
export const MOBIUS_BASE_COLOR = '#3a4fe6';
