import { last } from '@react-pdf/fns';
import { AttributedString } from '../types';

/**
 * Get attributed string end value
 *
 * @param attributedString - Attributed string
 * @returns End
 */
const end = (attributedString: AttributedString) => {
  const { runs } = attributedString;
  return runs.length === 0 ? 0 : last(runs).end;
};

export default end;
