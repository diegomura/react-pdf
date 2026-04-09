import { AttributedString, Run } from '../types';

const isCustomFont = (run: Run): boolean => {
  const font = run.attributes?.font?.[0];
  return !!font && font.type !== 'STANDARD';
};

/**
 * Normalize the string of an attributed string using NFD (Canonical Decomposition).
 * Decomposes each run's text into its base characters and combining marks,
 * then recalculates run start/end offsets to account for any length changes.
 *
 * @returns Layout step that transforms an attributed string with NFD-normalized text
 */
const decomposeUnicode = () => {
  return (attributedString: AttributedString): AttributedString => {
    let string = '';
    let offset = 0;

    const runs: Run[] = [];

    for (let i = 0; i < attributedString.runs.length; i += 1) {
      const run = attributedString.runs[i];

      const rawString = attributedString.string.slice(run.start, run.end);

      const runString = isCustomFont(run)
        ? rawString.normalize('NFD')
        : rawString;

      const fragmentLength = runString.length;

      runs.push({
        ...run,
        start: offset,
        end: offset + fragmentLength,
      });

      offset += fragmentLength;

      string += runString;
    }

    return { ...attributedString, string, runs };
  };
};

export default decomposeUnicode;
