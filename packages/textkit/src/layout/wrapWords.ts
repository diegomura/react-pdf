import fromFragments from '../attributedString/fromFragments';
import { Engines } from '../engines';
import { AttributedString, LayoutOptions } from '../types';

const SOFT_HYPHEN = '\u00ad';

/**
 * Default word hyphenation engine used when no one provided.
 * Does not perform word hyphenation at all
 *
 * @param word
 * @returns Same word
 */
const defaultHyphenate = (word: string) => [word];

/**
 * Remove soft hyphens from word
 *
 * @param word
 * @returns Word without soft hyphens
 */
const removeSoftHyphens = (word: string) => {
  return word.replaceAll(SOFT_HYPHEN, '');
};

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

    console.log('>>>> attributedString', attributedString);

    const builtinHyphenate = engines.wordHyphenation?.() || defaultHyphenate;

    const hyphenate = options.hyphenationCallback || builtinHyphenate;

    let offset = 0;

    for (let i = 0; i < attributedString.runs.length; i += 1) {
      let string = '';

      const run = attributedString.runs[i];

      const words = attributedString.string
        .slice(run.start, run.end)
        .split(/([ ]+)/g)
        .filter(Boolean);

      for (let j = 0; j < words.length; j += 1) {
        const word = words[j];
        const parts = hyphenate(word, builtinHyphenate).map(removeSoftHyphens);

        syllables.push(...parts);
        string += parts.join('');
      }

      // Modify run start and end based on removed soft hyphens.
      const runOffset = run.end - run.start - string.length;
      const start = run.start - offset;
      const end = run.end - offset - runOffset;

      fragments.push({ ...run, start, end, string });

      offset += runOffset;
    }

    const result: AttributedString = { ...fromFragments(fragments), syllables };

    return result;
  };
};

export default wrapWords;
