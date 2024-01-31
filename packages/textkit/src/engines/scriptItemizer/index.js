import unicode from 'unicode-properties';

import empty from '../../attributedString/empty';

const ignoredScripts = ['Common', 'Inherited', 'Unknown'];

/**
 * @typedef {import('../../types.js').AttributedString} AttributedString
 */

/**
 * Resolves unicode script in runs, grouping equal runs together
 */
export default function scriptItemizer() {
  /**
   * @param {AttributedString} attributedString attributed string
   * @returns {AttributedString} attributed string
   */
  return (attributedString) => {
    const { string } = attributedString;

    let lastScript = 'Unknown';
    let lastIndex = 0;
    let index = 0;
    const res = [];

    if (!string) return empty();

    for (let i = 0; i < string.length; i += 1) {
      const char = string[i];

      const codePoint = char.codePointAt();
      const script = unicode.getScript(codePoint);

      if (script !== lastScript && !ignoredScripts.includes(script)) {
        if (lastScript !== 'Unknown') {
          res.push({
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
      res.push({
        start: lastIndex,
        end: string.length,
        attributes: { script: lastScript },
      });
    }

    return { string, runs: res };
  };
}
