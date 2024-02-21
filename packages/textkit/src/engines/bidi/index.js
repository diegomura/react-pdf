import bidiFactory from 'bidi-js';

const bidi = bidiFactory();

/**
 * @param  {Object}  layout options
 * @param  {Object}  attributed string
 * @return {Object} attributed string
 */
const bidiEngine = () => (attributedString) => {
  const { string } = attributedString;
  const direction = attributedString.runs[0]?.attributes.direction;

  const { levels } = bidi.getEmbeddingLevels(string, direction);

  let lastLevel = null;
  let lastIndex = 0;
  let index = 0;
  const res = [];

  for (let i = 0; i < levels.length; i += 1) {
    const level = levels[i];

    if (level !== lastLevel) {
      if (lastLevel !== null) {
        res.push({
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
    res.push({
      start: lastIndex,
      end: string.length,
      attributes: { bidiLevel: lastLevel },
    });
  }

  return { string, runs: res };
};

export default bidiEngine;
