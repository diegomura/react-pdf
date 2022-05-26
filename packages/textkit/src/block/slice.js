/**
 * Slice block lines
 *
 * @param  {number}  lines quantity
 * @param  {Object}  paragraph block
 * @return {Object} sliced paragraph block
 */
const sliceBlock = (lines, block) => block.slice(0, lines);

export default sliceBlock;
