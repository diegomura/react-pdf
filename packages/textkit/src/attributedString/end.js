import { last } from '@react-pdf/fns';

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 */

/**
 * Get attributed string end value
 *
 * @param {AttributedString} attributedString attributed string
 * @returns {number} end
 */
const end = (attributedString) => {
  const { runs } = attributedString;
  return runs.length === 0 ? 0 : last(runs).end;
};

export default end;
