import { AttributedString } from '../types';

/**
 * Get attributed string start value
 *
 * @param attributedString - Attributed string
 * @returns Start
 */
const start = (attributedString: AttributedString) => {
  const { runs } = attributedString;
  return runs.length === 0 ? 0 : runs[0].start;
};

export default start;
