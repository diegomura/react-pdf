import LineBreaker from 'linebreak';

import fromFragments from '../attributedString/fromFragments';
import { Engines } from '../engines';
import { AttributedString, LayoutOptions } from '../types';

const SOFT_HYPHEN = '\u00ad';

/**
 * Check if a character is prohibited at the start of a line using UAX #14.
 * Uses a CJK character as a neutral test character since CJK allows breaking after.
 */
const isLineStartProhibited = (char: string): boolean => {
  // Use a CJK character (あ) as neutral test character
  // CJK characters allow breaking after them by default in UAX #14
  const testStr = 'あ' + char;
  const breaker = new LineBreaker(testStr);
  const bk = breaker.nextBreak();
  // If first break is at position 1, breaking before char is allowed (not prohibited)
  // If first break is > 1 or null, char is line-start prohibited
  return bk === null || bk.position > 1;
};

/**
 * Apply line-breaking rules (UAX #14) to merge only line-start prohibited characters
 * with the preceding syllable. This preserves hyphenation points while handling
 * language-specific rules.
 *
 * @param syllables - Array of syllables
 * @returns Array of syllables with line-breaking rules applied
 */
const applyLineBreakingRules = (syllables: string[]): string[] => {
  if (syllables.length <= 1) return syllables;

  const result: string[] = [];

  for (let i = 0; i < syllables.length; i++) {
    const syllable = syllables[i];

    // Check if this syllable starts with a line-start prohibited character
    // and should be merged with the previous syllable
    if (
      result.length > 0 &&
      syllable.length > 0 &&
      !syllable[0].match(/\s/) && // Don't merge whitespace
      isLineStartProhibited(syllable[0])
    ) {
      // Merge with previous syllable
      result[result.length - 1] += syllable;
    } else {
      result.push(syllable);
    }
  }

  return result;
};

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
 * Split text using UAX #14 line break algorithm.
 * This properly handles CJK characters and other Unicode text.
 *
 * @param text - Text to split
 * @returns Array of segments
 */
const splitByLineBreak = (text: string): string[] => {
  const breaker = new LineBreaker(text);
  const segments: string[] = [];
  let lastBreak = 0;
  let bk;

  while ((bk = breaker.nextBreak())) {
    const segment = text.slice(lastBreak, bk.position);
    if (segment) segments.push(segment);
    lastBreak = bk.position;
  }

  return segments;
};

/**
 * Apply word-break rules to split parts into syllables.
 *
 * @param parts - Array of parts from hyphenation
 * @param wordBreak - Word break mode
 * @returns Array of syllables
 */
const applyWordBreak = (
  parts: string[],
  wordBreak: LayoutOptions['wordBreak'],
): string[] => {
  if (wordBreak === 'keep-all') {
    return parts;
  }

  const breakAll = wordBreak === 'break-all';
  const result: string[] = [];

  for (const part of parts) {
    // Whitespace is kept as-is
    if (part.trim() === '') {
      result.push(part);
      continue;
    }

    if (breakAll) {
      // break-all: split all characters
      result.push(...[...part]);
    } else {
      // normal (default): use UAX #14 to split at valid break points
      result.push(...splitByLineBreak(part));
    }
  }

  return result;
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
    const rawSyllables: string[] = [];
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
        const parts = hyphenate(word, builtinHyphenate).map(removeSoftHyphens);

        // Apply word-break rules to split parts further if needed
        const splitParts = applyWordBreak(parts, options.wordBreak);

        rawSyllables.push(...splitParts);
        string += splitParts.join('');
      }

      // Modify run start and end based on removed soft hyphens.
      const runOffset = run.end - run.start - string.length;
      const start = run.start - offset;
      const end = run.end - offset - runOffset;

      fragments.push({ ...run, start, end, string });

      offset += runOffset;
    }

    const syllables = applyLineBreakingRules(rawSyllables);

    const result: AttributedString = { ...fromFragments(fragments), syllables };

    return result;
  };
};

export default wrapWords;
