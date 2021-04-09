import * as R from 'ramda';

import append from '../attributedString/append';
import trim from '../attributedString/trim';

/**
 * Trucante block with ellipsis
 *
 * @param  {number}  lines quantity
 * @param  {Object}  paragraph block
 * @return {Object} sliced paragraph block
 */
const truncate = block => {
  const runs = R.propOr([], 'runs', R.last(block));
  const font = R.path(['attributes', 'font'], R.last(runs));

  if (font) {
    return R.adjust(
      -1,
      R.compose(append(font.glyphForCodePoint(8230)), trim),
    )(block);
  }

  return block;
};

export default truncate;
