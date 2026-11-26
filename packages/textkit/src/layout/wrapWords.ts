import fromFragments from '../attributedString/fromFragments';
import { Engines } from '../engines';
import {
  AttributedString,
  HyphenatedWord,
  LayoutOptions,
  HyphenatedPart,
} from '../types';

const SOFT_HYPHEN = '\u00ad';

// Scripts that wrap between any two characters and never take a hyphen
const UNHYPHENATED_SCRIPTS = ['Han', 'Hiragana', 'Katakana', 'Bopomofo'];

/**
 * Default word hyphenation engine used when no one provided.
 * Does not perform word hyphenation at all
 *
 * @param word
 * @returns Same word
 */
const defaultHyphenate = (word: string) => [word];

const IDEOGRAPH = UNHYPHENATED_SCRIPTS.map((s) => `\\p{sc=${s}}`).join('');

// Breaks only before an ideograph, so numbers, marks and closing punctuation
// stay attached to the ideograph they follow
const IDEOGRAPH_SEGMENT = new RegExp(
  `[^${IDEOGRAPH}]*[${IDEOGRAPH}][^${IDEOGRAPH}]*|[^${IDEOGRAPH}]+`,
  'gu',
);

/**
 * Split word into break opportunities between ideographs
 *
 * @param word
 * @returns Word parts
 */
const splitIdeographs = (word: string) => word.match(IDEOGRAPH_SEGMENT) || [];

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

// Only a dash is supported for now, so any other value means a dash
const toHyphen = (hyphen: unknown, defaultHyphen: '-' | null) => {
  if (hyphen === undefined) return defaultHyphen;
  return hyphen === null ? null : '-';
};

/**
 * Coerce hyphenation callback output into parts.
 * Parts already ending in a hyphen don't get another one, and the last part
 * of a word never gets one.
 *
 * @param hyphenatedWord
 * @param defaultHyphen
 */
const normalizeHyphenatedWord = (
  hyphenatedWord: HyphenatedWord,
  defaultHyphen: '-' | null,
): HyphenatedPart[] => {
  const parts = hyphenatedWord.map((part) =>
    typeof part === 'string'
      ? { string: part, hyphen: part.endsWith('-') ? null : defaultHyphen }
      : { string: part.string, hyphen: toHyphen(part.hyphen, defaultHyphen) },
  );

  if (parts.length > 0) parts[parts.length - 1].hyphen = null;

  return parts;
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

    let offset = 0;

    for (let i = 0; i < attributedString.runs.length; i += 1) {
      let string = '';

      const run = attributedString.runs[i];

      const unhyphenated = UNHYPHENATED_SCRIPTS.includes(
        run.attributes.script as string,
      );

      const fallback = unhyphenated ? splitIdeographs : builtinHyphenate;
      const hyphenate = options.hyphenationCallback || fallback;

      const words = attributedString.string
        .slice(run.start, run.end)
        .split(/([ ]+)/g)
        .filter(Boolean);

      for (let j = 0; j < words.length; j += 1) {
        const word = words[j];
        const parts = normalizeHyphenatedWord(
          hyphenate(word, fallback),
          unhyphenated ? null : '-',
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
