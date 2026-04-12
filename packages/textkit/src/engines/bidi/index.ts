import bidiFactory from 'bidi-js';
import { AttributedString, Run } from '../../types';

const bidi = bidiFactory();

/**
 * Fast check: returns true if a string might contain RTL characters.
 * Checks specifically for Hebrew (U+0590-U+05FF), Arabic (U+0600-U+06FF),
 * and related RTL blocks up to U+08FF. Does not false-positive on CJK,
 * Thai, Indic, or emoji text.
 */
const mayContainRTL = (str: string) => {
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    if (c >= 0x0590 && c <= 0x08ff) return true;
  }
  return false;
};

const bidiEngine = () => {
  /**
   * @param attributedString - Attributed string
   * @returns Attributed string
   */
  return (attributedString: AttributedString) => {
    const { string } = attributedString;
    const direction = attributedString.runs[0]?.attributes.direction;

    // Fast path: skip expensive bidi analysis for LTR text without RTL chars
    if (direction !== 'rtl' && !mayContainRTL(string)) {
      const runs: Run[] = [
        {
          start: 0,
          end: string.length,
          attributes: { bidiLevel: 0 },
        },
      ];
      return { string, runs } as AttributedString;
    }

    const { levels } = bidi.getEmbeddingLevels(string, direction);

    let lastLevel = null;
    let lastIndex = 0;
    let index = 0;
    const runs: Run[] = [];

    for (let i = 0; i < levels.length; i += 1) {
      const level = levels[i];

      if (level !== lastLevel) {
        if (lastLevel !== null) {
          runs.push({
            start: lastIndex,
            end: index,
            attributes: { bidiLevel: lastLevel },
          });
        }

        lastIndex = index;
        lastLevel = level;
      }

      index += 1;
    }

    if (lastIndex < string.length) {
      runs.push({
        start: lastIndex,
        end: string.length,
        attributes: { bidiLevel: lastLevel },
      });
    }

    const result: AttributedString = { string, runs };

    return result;
  };
};

export default bidiEngine;
