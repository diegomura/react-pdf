import scale from '../run/scale';
import resolveGlyphIndices from '../indices/resolve';
import { AttributedString, Position, Run } from '../types';

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

    if (!font) return { ...run, glyphs: [], glyphIndices: [], positions: [] };

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

    const positions = scalePositions(run, glyphRun.positions);
    const glyphIndices = resolveGlyphIndices(glyphRun.glyphs);

    const result: Run = {
      ...run,
      positions,
      glyphIndices,
      glyphs: glyphRun.glyphs,
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
