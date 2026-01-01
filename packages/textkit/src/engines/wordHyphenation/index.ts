import hyphen from 'hyphen';
import pattern from 'hyphen/patterns/en-us.js';
import { isNil } from '@react-pdf/fns';
import { HyphenatedWord } from '../../types';

const SOFT_HYPHEN = '\u00ad';
const hyphenator = hyphen(pattern);

/**
 * @param word
 * @returns Word parts
 */
const splitHyphen = (word: string) => {
  return word.split(SOFT_HYPHEN).flatMap((part) => part.split(/(?<=[-])/g));
};

const cache: Record<string, HyphenatedWord> = {};

/**
 * @param word
 * @returns Word parts
 */
const getParts = (word: string) => {
  const base = word.includes(SOFT_HYPHEN) ? word : hyphenator(word);
  return { parts: splitHyphen(base), hyphen: '-' as const };
};

const wordHyphenation = () => {
  /**
   * @param word - Word
   * @returns Word parts
   */
  return (word: string | null) => {
    const cacheKey = `_${word}`;

    if (isNil(word)) return { parts: [], hyphen: '-' as const };
    if (cache[cacheKey]) return cache[cacheKey];

    cache[cacheKey] = getParts(word);

    return cache[cacheKey];
  };
};

export default wordHyphenation;
