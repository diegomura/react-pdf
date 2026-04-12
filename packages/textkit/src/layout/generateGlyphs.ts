import scale from '../run/scale';
import resolveStringIndices from '../string-indices/resolve';
import resolveGlyphIndices from '../glyph-indices/resolve';
import { AttributedString, Position, Run } from '../types';

// Cache font.layout() results by font instance + string.
// font.layout() has no internal caching and is expensive (GSUB/GPOS processing).
// Cached glyphs are read-only — downstream code must not mutate them.
const MAX_CACHE_SIZE = 2000;
const layoutCache = new WeakMap<object, Map<string, any>>();

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

    const fontObj = font[0];

    // Check cache before calling expensive font.layout()
    let fontCache = layoutCache.get(fontObj);
    if (!fontCache) {
      fontCache = new Map();
      layoutCache.set(fontObj, fontCache);
    }

    let glyphRun = fontCache.get(runString);
    if (!glyphRun) {
      // passing LTR to force fontkit to not reverse the string
      glyphRun = fontObj.layout(
        runString,
        undefined,
        undefined,
        undefined,
        'ltr',
      );
      if (fontCache.size >= MAX_CACHE_SIZE) fontCache.clear();
      fontCache.set(runString, glyphRun);
    }

    const positions = scalePositions(run, glyphRun.positions);
    const stringIndices = resolveStringIndices(glyphRun.glyphs);
    const glyphIndices = resolveGlyphIndices(glyphRun.glyphs);

    const result: Run = {
      ...run,
      positions,
      stringIndices,
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
