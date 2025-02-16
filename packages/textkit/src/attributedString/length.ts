import start from './start';
import end from './end';
import { AttributedString } from '../types';

/**
 * Get attributed string length
 *
 * @param attributedString - Attributed string
 * @returns End
 */
const length = (attributedString: AttributedString) => {
  return end(attributedString) - start(attributedString);
};

export default length;
