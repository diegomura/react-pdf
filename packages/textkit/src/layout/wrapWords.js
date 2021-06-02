import * as R from 'ramda';

import fromFragments from '../attributedString/fromFragments';

/**
 * Default word hyphenation engine used when no one provided.
 * Does not perform word hyphenation at all
 *
 * @param  {String} word
 * @return {Array} same word
 */
const defaultHyphenationEngine = word => [word];

/**
 * Wrap words of attribute string
 *
 * @param  {Object} layout engines
 * @param  {Object}  layout options
 * @param  {Object}  attributed string
 * @return {Object} attributed string including syllables
 */
const wrapWords = (engines = {}, options = {}, attributedString) => {
  const syllables = [];
  const fragments = [];

  const hyphenateWord =
    options.hyphenationCallback ||
    (engines.wordHyphenation && engines.wordHyphenation(options)) ||
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

    fragments.push({ ...run, string });
  }

  return { ...fromFragments(fragments), syllables };
};

export default R.curryN(3, wrapWords);
