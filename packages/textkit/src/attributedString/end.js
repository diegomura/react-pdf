import { last } from '@react-pdf/fns';

/**
 * Get attributed string end value
 *
 * @param {Object} attributedString attributed string
 * @returns {number} end
 */
const end = attributedString => {
  const { runs } = attributedString;
  return runs.length === 0 ? 0 : last(runs).end;
};

export default end;
