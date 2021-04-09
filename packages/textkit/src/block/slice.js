import * as R from 'ramda';

/**
 * Slice block lines
 *
 * @param  {number}  lines quantity
 * @param  {Object}  paragraph block
 * @return {Object} sliced paragraph block
 */
const sliceBlock = (lines, block) => R.slice(0, lines, block);

export default sliceBlock;
