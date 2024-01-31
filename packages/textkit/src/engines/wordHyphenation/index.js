import hyphen from 'hyphen';
// This file is ran directly with Node - needs to have .js extension
// eslint-disable-next-line import/extensions
import pattern from 'hyphen/patterns/en-us.js';
import { isNil } from '@react-pdf/fns';

const SOFT_HYPHEN = '\u00ad';
const hyphenator = hyphen(pattern);

/**
 * @param {string} word
 * @returns {string[]} word parts
 */
function splitHyphen(word) {
  return word.split(SOFT_HYPHEN);
}

const cache = {};

/**
 * @param {string} word
 * @returns {string[]} word parts
 */
function getParts(word) {
  const base = word.includes(SOFT_HYPHEN) ? word : hyphenator(word);
  return splitHyphen(base);
}

export default function wordHyphenation() {
  /**
   * @param {string} word word
   * @returns {string[]} word parts
   */
  return (word) => {
    const cacheKey = `_${word}`;

    if (isNil(word)) return [];
    if (cache[cacheKey]) return cache[cacheKey];

    cache[cacheKey] = getParts(word);

    return cache[cacheKey];
  };
}
