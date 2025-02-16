import bidiFactory from 'bidi-js';
import { repeat } from '@react-pdf/fns';
import { AttributedString, Run } from '../types';

const bidi = bidiFactory();

/**
 * @param runs
 * @returns Bidi levels
 */
const getBidiLevels = (runs: Run[]) => {
  return runs.reduce((acc: number[], run) => {
    const length = run.end - run.start;
    const levels = repeat(run.attributes.bidiLevel, length);
    return acc.concat(levels);
  }, []);
};

/**
 * Perform bidi mirroring
 */
const mirrorString = () => {
  /**
   * @param attributedString - Attributed string
   * @returns Attributed string
   */
  return (attributedString: AttributedString) => {
    const levels = getBidiLevels(attributedString.runs);

    let updatedString = '';
    attributedString.string.split('').forEach((char, index) => {
      const isRTL = levels[index] % 2 === 1;
      const mirroredChar = isRTL
        ? bidi.getMirroredCharacter(attributedString.string.charAt(index))
        : null;
      updatedString += mirroredChar || char;
    });

    const result: AttributedString = {
      ...attributedString,
      string: updatedString,
    };

    return result;
  };
};

export default mirrorString;
