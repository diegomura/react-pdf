import hyphen from 'hyphen';
// This file is ran directly with Node - needs to have .js extension
// eslint-disable-next-line import/extensions
import pattern from 'hyphen/patterns/en-us.js';
import { isNil } from '@react-pdf/fns';

const SOFT_HYPHEN = '\u00ad';
const hyphenator = hyphen(pattern);
const splitHyphen = (word) => word.split(SOFT_HYPHEN);

const cache = {};

const getParts = (word) => {
  const base = word.includes(SOFT_HYPHEN) ? word : hyphenator(word);
  return splitHyphen(base);
};

const wordHyphenation = () => (word) => {
  const cacheKey = `_${word}`;

  if (isNil(word)) return [];
  if (cache[cacheKey]) return cache[cacheKey];

  cache[cacheKey] = getParts(word);

  return cache[cacheKey];
};

export default wordHyphenation;
