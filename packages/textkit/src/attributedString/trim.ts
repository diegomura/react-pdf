import { AttributedString } from '../types';
import slice from './slice';

const findCharIndex = (string: string) => {
  return string.search(/\S/g);
};

const findLastCharIndex = (string: string) => {
  const match = string.match(/\S/g);
  return match ? string.lastIndexOf(match[match.length - 1]) : -1;
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
