/**
 * Get lines width (if any)
 *
 * @param {Object} node
 * @returns {number} lines width
 */
const linesWidth = (node) => {
  if (!node.lines) return 0;

  return Math.max(0, ...node.lines.map((line) => line.xAdvance));
};

export default linesWidth;
