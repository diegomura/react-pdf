import { Font } from '../types';

type Metrics = {
  ascent: number;
  descent: number;
  lineGap: number;
};

/**
 * Prefer OS/2 typographic metrics over hhea, falling back when absent.
 *
 * @param font - Font
 * @returns Metrics
 */
const resolveTypoMetrics = (font: Font | undefined): Metrics => {
  const os2 = font?.['OS/2'] as
    | {
        typoAscender?: number;
        typoDescender?: number;
        typoLineGap?: number;
      }
    | undefined;

  if (
    !os2 ||
    typeof os2.typoAscender !== 'number' ||
    typeof os2.typoDescender !== 'number'
  ) {
    return {
      ascent: font?.ascent || 0,
      descent: font?.descent || 0,
      lineGap: font?.lineGap || 0,
    };
  }

  return {
    ascent: os2.typoAscender,
    descent: os2.typoDescender,
    lineGap:
      typeof os2.typoLineGap === 'number'
        ? os2.typoLineGap
        : font?.lineGap || 0,
  };
};

export default resolveTypoMetrics;
