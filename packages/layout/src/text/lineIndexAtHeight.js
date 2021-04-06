/**
 * Get line index at given height
 *
 * @param {Object} node
 * @param {Number} height
 */
const lineIndexAtHeight = (node, height) => {
  let y = 0;

  if (!node.lines) return 0;

  for (let i = 0; i < node.lines.length; i += 1) {
    const line = node.lines[i];
    if (y + line.box.height > height) return i;
    y += line.box.height;
  }

  return node.lines.length;
};

export default lineIndexAtHeight;
