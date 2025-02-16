import slice from './slice';
import indexAtOffset from './indexAtOffset';
import { AttributedString } from '../types';

/**
 * Slice attributed string at given offset
 *
 * @param offset - Offset
 * @param attributedString - Attributed string
 * @returns Attributed string
 */
const sliceAtOffset = (offset: number, attributedString: AttributedString) => {
  const index = indexAtOffset(offset, attributedString);
  return slice(0, index, attributedString);
};

export default sliceAtOffset;
