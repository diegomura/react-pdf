import bidiFactory from 'bidi-js';
import { AttributedString, Run } from '../../types';

const bidi = bidiFactory();

const bidiEngine = () => {
  /**
   * @param attributedString - Attributed string
   * @returns Attributed string
   */
  return (attributedString: AttributedString) => {
    const { string } = attributedString;
    const direction = attributedString.runs[0]?.attributes.direction;

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
