import bidiFactory from 'bidi-js';
import { AttributedString, Run } from '../../types';

const bidi = bidiFactory();

/**
 * Fast check: returns true if a string might contain RTL characters.
 * Hebrew starts at U+0590, Arabic at U+0600. Scanning for char codes
 * >= 0x0590 catches all RTL scripts while skipping pure Latin text.
 */
const mayContainRTL = (str: string) => {
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) >= 0x0590) return true;
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
