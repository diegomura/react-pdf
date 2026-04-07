import { AttributedString } from '../types';
import slice from './slice';

const WHITESPACE_REGEX = /\S/;

/**
 * Find index of first non-whitespace character
 *
 * @param string - String to search
 * @returns Index of first non-whitespace character, or -1 if not found
 */
const findCharIndex = (string: string) => {
  return string.search(WHITESPACE_REGEX);
};

/**
 * Find index of last non-whitespace character
 *
 * @param string - String to search
 * @returns Index of last non-whitespace character, or -1 if not found
 */
const findLastCharIndex = (string: string) => {
  for (let i = string.length - 1; i >= 0; i -= 1) {
    if (WHITESPACE_REGEX.test(string[i])) return i;
  }
  return -1;
};

/**
 * Removes (strips) whitespace from both ends of the attributted string.
 *
 * @param attributedString - Attributed string
 * @returns Attributed string
 */
const trim = (attributedString: AttributedString) => {
  const start = findCharIndex(attributedString.string);
  const end = findLastCharIndex(attributedString.string);

  return slice(start, end + 1, attributedString);
};

export default trim;
