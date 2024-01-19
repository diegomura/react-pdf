/**
 * Get height for given text line index
 *
 * @param {Object} node
 * @param {number} index
 */
const heightAtLineIndex = (node, index) => {
  let counter = 0;

  if (!node.lines) return counter;

  for (let i = 0; i < index; i += 1) {
    const line = node.lines[i];

    if (!line) break;

    counter += line.box.height;
  }

  return counter;
};

export default heightAtLineIndex;
