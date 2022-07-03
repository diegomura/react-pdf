/**
 * Get lines height (if any)
 *
 * @param {Object} node
 * @returns {Number} lines height
 */
const linesHeight = node => {
  if (!node.lines) return -1;

  let minY =  node.lines[0].box.y
  let maxY =  minY + node.lines[0].box.height

  for (let i = 0; i < node.lines.length; i += 1) {
    const line = node.lines[i];

    minY = Math.min(minY, line.box.y)
    maxY = Math.max(maxY, line.box.y + line.box.height)
  }

  return maxY - minY
};

export default linesHeight;
