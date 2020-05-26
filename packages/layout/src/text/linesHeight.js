/**
 * Get lines height (if any)
 *
 * @param {Object} node
 * @returns {Number} lines height
 */
const linesHeight = node => {
  if (!node.lines) return -1;
  return node.lines.reduce((acc, line) => acc + line.box.height, 0);
};

export default linesHeight;
