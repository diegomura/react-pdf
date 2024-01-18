import fromFragments from '../attributedString/fromFragments';

/**
 * Default word hyphenation engine used when no one provided.
 * Does not perform word hyphenation at all
 *
 * @param {string} word
 * @returns {[string]} same word
 */
const defaultHyphenationEngine = (word) => [word];

/**
 * @typedef {Function} HyphenationCallback
 * @param {Object} attributedString attributed string
 * @returns {Object} attributed string including syllables
 */

/**
 * Wrap words of attribute string
 *
 * @param {Object} engines layout engines
 * @param {Object} options layout options
 * @returns {HyphenationCallback} hyphenation callback
 */
const wrapWords =
  (engines = {}, options = {}) =>
  (attributedString) => {
    const syllables = [];
    const fragments = [];

    const hyphenateWord =
      options.hyphenationCallback ||
      engines.wordHyphenation?.(options) ||
      defaultHyphenationEngine;

    for (let i = 0; i < attributedString.runs.length; i += 1) {
      let string = '';
      const run = attributedString.runs[i];
      const words = attributedString.string
        .slice(run.start, run.end)
        .split(/([ ]+)/g)
        .filter(Boolean);

      for (let j = 0; j < words.length; j += 1) {
        const word = words[j];
        const parts = hyphenateWord(word);

        syllables.push(...parts);
        string += parts.join('');
      }

      fragments.push({ string, attributes: run.attributes });
    }

    return { ...fromFragments(fragments), syllables };
  };

export default wrapWords;
