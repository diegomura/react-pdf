import runLeadingOffset from '../run/leadingOffset';

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 */

/**
 * Get attributed string leading white space offset
 *
 * @param {AttributedString} attributedString attributed string
 * @returns {number} leading white space offset
 */
const leadingOffset = (attributedString) => {
  const runs = attributedString.runs || [];

  return runLeadingOffset(runs[0]);
};

export default leadingOffset;
