import { LineBreaker } from 'linebreak';

import fromFragments from '../attributedString/fromFragments';
import { Engines } from '../engines';
import {
  AttributedString,
  HyphenatedPart,
  HyphenatedWord,
  LayoutOptions,
} from '../types';

type Hyphen = '-' | null;

type Part = { string: string; hyphen: Hyphen; explicit: boolean };

const SOFT_HYPHEN = '­';

// Scripts whose parts take no hyphen unless the callback asks for one
const UNHYPHENATED_SCRIPTS = ['Han', 'Hiragana', 'Katakana', 'Bopomofo'];

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
 * @returns Word without soft hyphens
 * @param part
 */
const removeSoftHyphens = (part: Part) => {
  part.string = part.string.replaceAll(SOFT_HYPHEN, '');
  return part;
};

/**
 * Coerce hyphenation callback output into parts.
 * Whitespace and parts already ending in a hyphen don't get one, and only a
 * dash is supported for now, so any explicit value other than null is a dash.
 *
 * @param hyphenatedWord
 * @param defaultHyphen
 */
const normalizeHyphenatedWord = (
  hyphenatedWord: HyphenatedWord,
  defaultHyphen: Hyphen,
): Part[] =>
  hyphenatedWord.map((part) => {
    const { string, hyphen } =
      typeof part === 'string' ? { string: part, hyphen: undefined } : part;

    if (string.trim() === '') return { string, hyphen: null, explicit: false };

    if (hyphen === undefined) {
      const fallback = string.endsWith('-') ? null : defaultHyphen;
      return { string, hyphen: fallback, explicit: false };
    }

    return { string, hyphen: hyphen === null ? null : '-', explicit: true };
  });

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

  // CSS applies no hyphenation with break-all.
  const hyphenationOff = hyphens === 'none' || breakAll;

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
   * Hyphens the callback sets explicitly win. Otherwise soft wrap
   * opportunities break without a hyphen, and the other part ends break
   * where UAX #14 lets a line start and end.
   *
   * @param word - Word without white space
   * @param parts - Hyphenation parts by their end offset
   * @returns Hyphen at each offset where the word may break
   */
  const getWordBreaks = (word: string, parts: Map<number, Part>) => {
    const breaks = new Map<number, Hyphen>();
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
      const part = parts.get(offset);

      if (part?.explicit) {
        breaks.set(offset, part.hyphen);
      } else if (isSoftBreak(uax14.has(offset), before, after)) {
        breaks.set(offset, null);
      } else if (
        part &&
        !(keepAll && uax14.has(offset)) &&
        !isLineStartProhibited(after) &&
        !isLineEndProhibited(before)
      ) {
        breaks.set(offset, part.hyphen);
      }
    }

    return breaks;
  };

  /**
   * @param attributedString - Attributed string
   * @returns Attributed string including syllables
   */
  return (attributedString: AttributedString) => {
    const syllables: HyphenatedPart[] = [];
    const fragments = [];

    const builtinHyphenate = engines.wordHyphenation?.() || defaultHyphenate;

    const hyphenate = options.hyphenationCallback || builtinHyphenate;

    const splitWord = (word: string, defaultHyphen: Hyphen) => {
      let hyphenatedWord: HyphenatedWord;

      if (hyphenationOff) hyphenatedWord = [word];
      else if (hyphens === 'manual') hyphenatedWord = word.split(SOFT_HYPHEN);
      else hyphenatedWord = hyphenate(word, builtinHyphenate);

      return normalizeHyphenatedWord(hyphenatedWord, defaultHyphen).map(
        removeSoftHyphens,
      );
    };

    // false joins the syllable to the previous one. undefined keeps the
    // hyphen of the previous one.
    const push = (
      string: string,
      hyphen: Hyphen,
      breakBefore?: Hyphen | false,
    ) => {
      const previous = syllables[syllables.length - 1];

      if (!previous) {
        syllables.push({ string, hyphen });
        return;
      }

      if (breakBefore === false) {
        previous.string += string;
        previous.hyphen = hyphen;
        return;
      }

      if (breakBefore !== undefined) previous.hyphen = breakBefore;

      syllables.push({ string, hyphen });
    };

    let offset = 0;

    for (let i = 0; i < attributedString.runs.length; i += 1) {
      let string = '';

      const run = attributedString.runs[i];

      const unhyphenated = UNHYPHENATED_SCRIPTS.includes(
        run.attributes.script as string,
      );

      const defaultHyphen = unhyphenated || hyphenationOff ? null : '-';

      const words = attributedString.string
        .slice(run.start, run.end)
        .split(/([ ]+)/g)
        .filter(Boolean);

      for (let j = 0; j < words.length; j += 1) {
        const parts = splitWord(words[j], defaultHyphen);
        const word = parts.map((part) => part.string).join('');

        string += word;

        if (word === '') continue;

        if (word.trim() === '') {
          push(word, null);
          continue;
        }

        const previous = syllables[syllables.length - 1];

        // Words only meet without white space where a run ends inside a word.
        const joinsPrevious =
          previous !== undefined && previous.string.trim() !== '';

        let breakBefore: Hyphen | false | undefined;
        if (joinsPrevious) {
          const before = lastChar(previous.string);
          const after = firstChar(word);

          const uax14 = canBreakBetween(before, after);

          breakBefore = isSoftBreak(uax14, before, after) ? null : false;
        }

        const partsByEnd = new Map<number, Part>();
        let position = 0;
        for (const part of parts) {
          position += part.string.length;
          partsByEnd.set(position, part);
        }

        let start = 0;
        for (const [end, hyphen] of getWordBreaks(word, partsByEnd)) {
          push(word.slice(start, end), hyphen, breakBefore);
          breakBefore = hyphen;
          start = end;
        }

        push(word.slice(start), parts[parts.length - 1].hyphen, breakBefore);
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
