import AttributedString from '@react-pdf/textkit/attributedString';

/**
 * Get lines width (if any)
 *
 * @param {Object} node
 * @returns {Number} lines width
 */
const linesWidth = node => {
  if (!node.lines) return -1;
  return Math.max(
    ...node.lines.map(line => AttributedString.advanceWidth(line)),
  );
};

export default linesWidth;
