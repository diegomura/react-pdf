import { AttributedString, Fragment, Run } from '../types';

/**
 * Create attributed string from text fragments
 *
 * @param fragments - Fragments
 * @returns Attributed string
 */
const fromFragments = (fragments: Fragment[]): AttributedString => {
  let offset = 0;
  const strings: string[] = [];
  const runs: Run[] = [];

  for (let i = 0; i < fragments.length; i += 1) {
    const fragment = fragments[i];
    const fragmentLength = fragment.string.length;

    strings.push(fragment.string);

    runs.push({
      ...fragment,
      start: offset,
      end: offset + fragmentLength,
      attributes: fragment.attributes || {},
    });

    offset += fragmentLength;
  }

  return { string: strings.join(''), runs };
};

export default fromFragments;
