import scale from '../run/scale';
import resolveStringIndices from '../string-indices/resolve';
import resolveGlyphIndices from '../glyph-indices/resolve';
import { AttributedString, Glyph, Position, Run } from '../types';

const codePointsFromString = (string: string): number[] => {
  const result: number[] = [];

  for (const char of string) {
    const codePoint = char.codePointAt(0);

    if (codePoint !== undefined) result.push(codePoint);
  }

  return result;
};

const sequenceStartsAt = (
  values: number[],
  sequence: number[],
  start: number,
) => sequence.every((value, index) => values[start + index] === value);

const findSequence = (values: number[], sequence: number[], start: number) => {
  if (sequence.length === 0) return start;

  for (let i = start; i <= values.length - sequence.length; i += 1) {
    if (sequenceStartsAt(values, sequence, i)) return i;
  }

  return -1;
};

const cloneGlyph = (glyph: Glyph, codePoints: number[]): Glyph =>
  Object.assign(Object.create(Object.getPrototypeOf(glyph)), glyph, {
    codePoints,
  });

const assignPendingCodePoints = (
  glyphs: Glyph[],
  pendingGlyphs: number[],
  codePoints: number[],
) => {
  if (pendingGlyphs.length === 0 || codePoints.length === 0) return;

  let codePointIndex = 0;

  for (let i = 0; i < pendingGlyphs.length; i += 1) {
    const remainingGlyphs = pendingGlyphs.length - i;
    const remainingCodePoints = codePoints.length - codePointIndex;
    const length = Math.max(1, remainingCodePoints - remainingGlyphs + 1);
    const glyphIndex = pendingGlyphs[i];

    glyphs[glyphIndex] = cloneGlyph(
      glyphs[glyphIndex],
      codePoints.slice(codePointIndex, codePointIndex + length),
    );

    codePointIndex += length;
  }
};

const normalizeGlyphCodePoints = (glyphs: Glyph[], string: string): Glyph[] => {
  const codePoints = codePointsFromString(string);
  const result = [...glyphs];
  const pendingGlyphs: number[] = [];
  let isAligned = true;
  let cursor = 0;

  for (let i = 0; i < glyphs.length; i += 1) {
    const glyph = glyphs[i];
    const glyphCodePoints = glyph.codePoints || [];

    if (!isAligned) continue;

    if (glyphCodePoints.length === 0) {
      pendingGlyphs.push(i);
      continue;
    }

    if (pendingGlyphs.length > 0) {
      const foundIndex = findSequence(codePoints, glyphCodePoints, cursor);

      if (foundIndex < cursor) {
        pendingGlyphs.length = 0;
        isAligned = false;
        continue;
      }

      assignPendingCodePoints(
        result,
        pendingGlyphs,
        codePoints.slice(cursor, foundIndex),
      );

      pendingGlyphs.length = 0;
      cursor = foundIndex + glyphCodePoints.length;
      continue;
    }

    if (sequenceStartsAt(codePoints, glyphCodePoints, cursor)) {
      cursor += glyphCodePoints.length;
    } else {
      isAligned = false;
    }
  }

  if (isAligned) {
    assignPendingCodePoints(result, pendingGlyphs, codePoints.slice(cursor));
  }

  return result;
};

const getCharacterSpacing = (run: Run) => {
  return run.attributes?.characterSpacing || 0;
};

/**
 * Scale run positions
 *
 * @param  run
 * @param  positions
 * @returns Scaled positions
 */
const scalePositions = (run: Run, positions: Position[]): Position[] => {
  const runScale = scale(run);
  const characterSpacing = getCharacterSpacing(run);

  return positions.map((position, i) => {
    const isLast = i === positions.length;
    const xSpacing = isLast ? 0 : characterSpacing;

    return Object.assign({}, position, {
      xAdvance: position.xAdvance * runScale + xSpacing,
      yAdvance: position.yAdvance * runScale,
      xOffset: position.xOffset * runScale,
      yOffset: position.yOffset * runScale,
    });
  });
};

/**
 * Create glyph run
 *
 * @param string string
 */
const layoutRun = (string: string) => {
  /**
   * @param run - Run
   * @returns Glyph run
   */
  return (run: Run) => {
    const { start, end, attributes = {} } = run;
    const { font } = attributes;

    if (!font)
      return {
        ...run,
        glyphs: [],
        stringIndices: [],
        glyphIndices: [],
        positions: [],
      };

    const runString = string.slice(start, end);

    if (typeof font === 'string') throw new Error('Invalid font');

    // passing LTR To force fontkit to not reverse the string
    const glyphRun = font[0].layout(
      runString,
      undefined,
      undefined,
      undefined,
      'ltr',
    );

    const glyphs = normalizeGlyphCodePoints(glyphRun.glyphs, runString);
    const positions = scalePositions(run, glyphRun.positions);
    const stringIndices = resolveStringIndices(glyphs);
    const glyphIndices = resolveGlyphIndices(glyphs);

    const result: Run = {
      ...run,
      positions,
      stringIndices,
      glyphIndices,
      glyphs,
    };

    return result;
  };
};

/**
 * Generate glyphs for single attributed string
 */
const generateGlyphs = () => {
  /**
   * @param attributedString - Attributed string
   * @returns Attributed string with glyphs
   */
  return (attributedString: AttributedString) => {
    const runs = attributedString.runs.map(layoutRun(attributedString.string));
    const res: AttributedString = Object.assign({}, attributedString, { runs });
    return res;
  };
};

export default generateGlyphs;
