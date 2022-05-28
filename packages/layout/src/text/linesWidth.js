import advanceWidth from '@react-pdf/textkit/lib/attributedString/advanceWidth';

/**
 * Get lines width (if any)
 *
 * @param {Object} node
 * @returns {Number} lines width
 */
const linesWidth = node => {
  if (!node.lines) return -1;
  return Math.max(...node.lines.map(line => advanceWidth(line)));
};

export default linesWidth;
