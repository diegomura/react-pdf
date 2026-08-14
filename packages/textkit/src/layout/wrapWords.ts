import fromFragments from '../attributedString/fromFragments';
import { Engines } from '../engines';
import {
  AttributedString,
  HyphenatedWord,
  LayoutOptions,
  HyphenatedPart,
} from '../types';

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
 * @returns Word without soft hyphens
 * @param part
 */
const removeSoftHyphens = (part: HyphenatedPart) => {
  part.string = part.string.replaceAll(SOFT_HYPHEN, '');
  return part;
};

/**
 * Coerce a string or HyphenatedPart to a HyphenatedPart, and optionally enforce the
 * hyphenation character.
 * If the hyphenation character is not forced, it is set to a hyphen, except if the last
 * character of the syllable is already a hyphen.
 *
 * @param part
 * @param forceHyphen
 */
const normalizeHyphenatedPart = (
  part: string | HyphenatedPart,
  forceHyphen?: '-',
) => {
  const p = typeof part === 'string' ? { string: part, hyphen: '-' } : part;
  let hyphen = p.hyphen;
  if (hyphen !== '-' && hyphen !== null) hyphen = '-';
  if (typeof part === 'string' && part.slice(-1) === '-') hyphen = null;
  if (forceHyphen !== undefined) hyphen = forceHyphen;

  return { string: p.string, hyphen: hyphen as '-' };
};

/**
 * Convert the various supported output formats of hyphenation callbacks into
 * one single format: A list of Syllables.
 * For now, only a hyphen or null are supported as hyphenation character after a Syllable.
 * Also, the last syllable in a word is always forced to have no hyphen character.
 *
 * @param hyphenatedWord
 */
const normalizeHyphenatedWord: (HyphenatedWord) => HyphenatedPart[] = (
  hyphenatedWord: HyphenatedWord,
) => {
  const normalized =
    hyphenatedWord instanceof Array
      ? hyphenatedWord.map((part) => normalizeHyphenatedPart(part))
      : hyphenatedWord.parts.map((part) =>
          normalizeHyphenatedPart(
            part,
            hyphenatedWord.hyphen === null ? null : undefined,
          ),
        );
  if (normalized.length > 0) normalized[normalized.length - 1].hyphen = null;
  return normalized;
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
        const parts = normalizeHyphenatedWord(
          hyphenate(word, builtinHyphenate),
        ).map(removeSoftHyphens);

        syllables.push(...parts);
        string += parts.map((part) => part.string).join('');
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
