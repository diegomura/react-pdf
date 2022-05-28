import runLeadingOffset from '../run/leadingOffset';

/**
 * Get attributed string leading white space offset
 *
 * @param  {Object}  attributed string
 * @return {number} leading white space offset
 */
const leadingOffset = attributedString => {
  const runs = attributedString.runs || [];

  return runLeadingOffset(runs[0]);
};

export default leadingOffset;
