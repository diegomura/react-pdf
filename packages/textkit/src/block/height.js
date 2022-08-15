/**
 * Get paragraph block height
 *
 * @param  {Object}  paragraph block
 * @return {number} paragraph block height
 */
const height = paragraph => {
  return paragraph.reduce((acc, block) => acc + block.box.height, 0);
};

export default height;
