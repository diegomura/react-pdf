import start from './start';
import end from './end';

/**
 * Get attributed string length
 *
 * @param {Object} attributedString glyph string
 * @returns {number} end
 */
const length = attributedString => {
  return end(attributedString) - start(attributedString);
};

export default length;
