import start from './start';
import end from './end';

/**
 * Get attributed string length
 *
 * @param  {Object}  glyph string
 * @return {number} end
 */
const length = attributedString => {
  return end(attributedString) - start(attributedString);
};

export default length;
