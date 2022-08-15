/**
 * Slice block at given height
 *
 * @param  {number}  height
 * @param  {Object}  paragraph block
 * @return {number} sliced paragraph block
 */
const sliceAtHeight = (height, block) => {
  const newBlock = [];

  let counter = 0;

  for (let i = 0; i < block.length; i += 1) {
    const line = block[i];

    counter += line.box.height;

    if (counter < height) {
      newBlock.push(line);
    } else {
      break;
    }
  }

  return newBlock;
};

export default sliceAtHeight;
