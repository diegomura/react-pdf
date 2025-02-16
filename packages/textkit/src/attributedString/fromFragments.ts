import { AttributedString, Fragment } from '../types';

/**
 * Create attributed string from text fragments
 *
 * @param fragments - Fragments
 * @returns Attributed string
 */
const fromFragments = (fragments: Fragment[]): AttributedString => {
  let offset = 0;
  let string = '';
  const runs = [];

  fragments.forEach((fragment) => {
    string += fragment.string;

    runs.push({
      ...fragment,
      start: offset,
      end: offset + fragment.string.length,
      attributes: fragment.attributes || {},
    });

    offset += fragment.string.length;
  });

  return { string, runs };
};

export default fromFragments;
