import unicode from 'unicode-properties';

import empty from '../../attributedString/empty';
import { AttributedString, Run } from '../../types';

const ignoredScripts = ['Common', 'Inherited', 'Unknown'];

/**
 * Resolves unicode script in runs, grouping equal runs together
 */
const scriptItemizer = () => {
  /**
   * @param attributedString - Attributed string
   * @returns Attributed string
   */
  return (attributedString: AttributedString) => {
    const { string } = attributedString;

    let lastScript = 'Unknown';
    let lastIndex = 0;
    let index = 0;

    const runs: Run[] = [];

    if (!string) return empty();

    for (let i = 0; i < string.length; i += 1) {
      const char = string[i];

      const codePoint = char.codePointAt(0);
      const script = unicode.getScript(codePoint);

      if (script !== lastScript && !ignoredScripts.includes(script)) {
        if (lastScript !== 'Unknown') {
          runs.push({
            start: lastIndex,
            end: index,
            attributes: { script: lastScript },
          });
        }

        lastIndex = index;
        lastScript = script;
      }

      index += char.length;
    }

    if (lastIndex < string.length) {
      runs.push({
        start: lastIndex,
        end: string.length,
        attributes: { script: lastScript },
      });
    }

    const result: AttributedString = { string, runs: runs };

    return result;
  };
};

export default scriptItemizer;
