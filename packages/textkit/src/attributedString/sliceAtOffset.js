import slice from './slice';
import indexAtOffset from './indexAtOffset';

/**
 * Slice attributed string at given offset
 *
 * @param  {number}  offset
 * @param  {Object}  attributedString
 * @return {Object} attributedString
 */
const sliceAtOffset = (offset, string) => {
  const index = indexAtOffset(offset, string);
  return slice(0, index, string);
};

export default sliceAtOffset;
