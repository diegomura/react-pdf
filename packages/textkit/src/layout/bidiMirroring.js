import bidiFactory from 'bidi-js';
import { repeat } from '@react-pdf/fns';

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 * @typedef {import('../types.js').Run} Run
 */

const bidi = bidiFactory();

/**
 * @param {Run[]} runs
 * @returns {number[]} bidi levels
 */
const getBidiLevels = (runs) => {
  return runs.reduce((acc, run) => {
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
   * @param {AttributedString} attributedString attributed string
   * @returns {AttributedString} attributed string
   */
  return (attributedString) => {
    const levels = getBidiLevels(attributedString.runs);

    let updatedString = '';
    attributedString.string.split('').forEach((char, index) => {
      const isRTL = levels[index] % 2 === 1;
      const mirroredChar = isRTL
        ? bidi.getMirroredCharacter(attributedString.string.charAt(index))
        : null;
      updatedString += mirroredChar || char;
    });

    return { ...attributedString, string: updatedString, levels };
  };
};

export default mirrorString;
