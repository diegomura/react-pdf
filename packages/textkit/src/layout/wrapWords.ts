import LineBreaker from 'linebreak';

import fromFragments from '../attributedString/fromFragments';
import { Engines } from '../engines';
import { AttributedString, LayoutOptions, SyllableBreak } from '../types';

const SOFT_HYPHEN = '\u00ad';

// break-all and keep-all act on letters and digits. A combining mark belongs
// to the letter before it, so nothing may break before one.
const LETTER = /^[\p{L}\p{N}\p{M}]/u;
const LETTER_START = /^[\p{L}\p{N}]/u;

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

const firstChar = (text: string) => /^[\s\S]/u.exec(text)![0];

const lastChar = (text: string) => /[\s\S]$/u.exec(text)![0];

const pairBreaks = new Map<string, boolean>();

/**
 * Whether UAX #14 allows a line break between two characters
 *
 * @param before - Character before the break
 * @param after - Character after the break
 * @returns Whether a break is allowed
 */
const canBreakBetween = (before: string, after: string) => {
  const key = `${before}\u0000${after}`;
  let result = pairBreaks.get(key);

  if (result === undefined) {
    const position = new LineBreaker(before + after).nextBreak()?.position;
    result = position === before.length;
    pairBreaks.set(key, result);
  }

  return result;
};

// U+3042 allows a break on both sides, so pairing with it isolates the rule
// of the other character.
const isLineStartProhibited = (char: string) => !canBreakBetween('あ', char);

const isLineEndProhibited = (char: string) => !canBreakBetween(char, 'あ');

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
  const { hyphens, wordBreak } = options;

  const breakAll = wordBreak === 'break-all';
  const keepAll = wordBreak === 'keep-all';

  /**
   * @param uax14 - Whether UAX #14 allows the break
   * @param before - Character before the break
   * @param after - Character after the break
   * @returns Whether the break is a soft wrap opportunity under word-break
   */
  const isSoftBreak = (uax14: boolean, before: string, after: string) => {
    if (keepAll && LETTER.test(before) && LETTER.test(after)) return false;
    if (breakAll && LETTER.test(before) && LETTER_START.test(after)) {
      return true;
    }

    return uax14;
  };

  /**
   * @param word - Word without white space
   * @param hyphenAt - Offsets of hyphenation opportunities
   * @returns Line break kind at each offset where the word may break
   */
  const getWordBreaks = (word: string, hyphenAt: Set<number>) => {
    const breaks = new Map<number, SyllableBreak>();
    const breaker = new LineBreaker(word);
    const chars = Array.from(word);

    const uax14 = new Set<number>();
    let bk;
    while ((bk = breaker.nextBreak())) uax14.add(bk.position);

    let offset = 0;

    for (let i = 1; i < chars.length; i += 1) {
      offset += chars[i - 1].length;

      const before = chars[i - 1];
      const after = chars[i];

      if (isSoftBreak(uax14.has(offset), before, after)) {
        breaks.set(offset, 'soft');
      } else if (
        hyphenAt.has(offset) &&
        !(keepAll && uax14.has(offset)) &&
        !isLineStartProhibited(after) &&
        !isLineEndProhibited(before)
      ) {
        breaks.set(offset, 'hyphen');
      }
    }

    return breaks;
  };

  /**
   * @param attributedString - Attributed string
   * @returns Attributed string including syllables
   */
  return (attributedString: AttributedString) => {
    const syllables: string[] = [];
    const syllableBreaks: SyllableBreak[] = [];
    const fragments = [];

    const builtinHyphenate = engines.wordHyphenation?.() || defaultHyphenate;

    const hyphenate = options.hyphenationCallback || builtinHyphenate;

    // CSS applies no hyphenation with break-all.
    const splitWord = (word: string): string[] => {
      if (hyphens === 'none' || breakAll) return [removeSoftHyphens(word)];
      if (hyphens === 'manual') return word.split(SOFT_HYPHEN);

      return hyphenate(word, builtinHyphenate).map(removeSoftHyphens);
    };

    // A null break joins the syllable to the previous one.
    const push = (syllable: string, breakBefore: SyllableBreak | null) => {
      const last = syllables.length - 1;

      if (last >= 0 && breakBefore === null) {
        syllables[last] += syllable;
        return;
      }

      if (last >= 0) syllableBreaks[last] = breakBefore!;

      syllables.push(syllable);
      syllableBreaks.push('soft');
    };

    let offset = 0;

    for (let i = 0; i < attributedString.runs.length; i += 1) {
      let string = '';

      const run = attributedString.runs[i];

      const words = attributedString.string
        .slice(run.start, run.end)
        .split(/([ ]+)/g)
        .filter(Boolean);

      for (let j = 0; j < words.length; j += 1) {
        const parts = splitWord(words[j]);
        const word = parts.join('');

        string += word;

        if (word === '') continue;

        const previous = syllables[syllables.length - 1];

        if (word.trim() === '') {
          push(word, 'soft');
          continue;
        }

        // Words only meet without white space where a run ends inside a word.
        const joinsPrevious = previous !== undefined && previous.trim() !== '';

        let breakBefore: SyllableBreak | null = 'soft';
        if (joinsPrevious) {
          const before = lastChar(previous);
          const after = firstChar(word);

          const uax14 = canBreakBetween(before, after);

          breakBefore = isSoftBreak(uax14, before, after) ? 'soft' : null;
        }

        const hyphenAt = new Set<number>();
        let position = 0;
        for (const part of parts) {
          position += part.length;
          hyphenAt.add(position);
        }

        let start = 0;
        for (const [end, kind] of getWordBreaks(word, hyphenAt)) {
          push(word.slice(start, end), breakBefore);
          breakBefore = kind;
          start = end;
        }

        push(word.slice(start), breakBefore);
      }

      // Modify run start and end based on removed soft hyphens.
      const runOffset = run.end - run.start - string.length;
      const start = run.start - offset;
      const end = run.end - offset - runOffset;

      fragments.push({ ...run, start, end, string });

      offset += runOffset;
    }

    const result: AttributedString = {
      ...fromFragments(fragments),
      syllables,
      syllableBreaks,
    };

    return result;
  };
};

export default wrapWords;
