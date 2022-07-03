/**
 * Get line index at given height
 *
 * @param {Object} node
 * @param {Number} height
 */
const lineIndexAtHeight = (node, height) => {
  if (!node.lines) return 0;

  for (let i = 0; i < node.lines.length; i += 1) {
    const line = node.lines[i];
    if (line.box.y + line.box.height > height) return i;
  }

  return node.lines.length;
};

export default lineIndexAtHeight;
