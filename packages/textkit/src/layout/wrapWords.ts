import fromFragments from '../attributedString/fromFragments';
import { Engines } from '../engines';
import { AttributedString, LayoutOptions } from '../types';

/**
 * Default word hyphenation engine used when no one provided.
 * Does not perform word hyphenation at all
 *
 * @param word
 * @returns Same word
 */
const defaultHyphenationEngine = (word: string) => [word];

/**
 * Wrap words of attribute string
 *
 * @param engines layout engines
 * @param options layout options
 */
const wrapWords = (
  engines: Partial<Engines> = {},
  options: LayoutOptions = {},
) => {
  /**
   * @param attributedString - Attributed string
   * @returns Attributed string including syllables
   */
  return (attributedString: AttributedString) => {
    const syllables = [];
    const fragments = [];

    const hyphenateWord =
      options.hyphenationCallback ||
      engines.wordHyphenation?.() ||
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

    const result: AttributedString = { ...fromFragments(fragments), syllables };

    return result;
  };
};

export default wrapWords;
