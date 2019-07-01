import * as R from 'ramda';

import { RULER_WIDTH } from '../constants';
import hasVerticalRuler from '../node/hasVerticalRuler';
import hasHorizontalRuler from '../node/hasHorizontalRuler';

/**
 * Adjust page size given ruler props
 *
 * @param {Object} page
 * @returns {boolean} page with size altered by ruler props
 */
const adjustPageSize = R.compose(
  R.when(
    hasVerticalRuler,
    R.evolve({
      box: { height: R.add(RULER_WIDTH) },
      children: R.map(
        R.evolve({
          box: { top: R.add(RULER_WIDTH) },
        }),
      ),
    }),
  ),
  R.when(
    hasHorizontalRuler,
    R.evolve({
      box: { width: R.add(RULER_WIDTH) },
      children: R.map(
        R.evolve({
          box: { left: R.add(RULER_WIDTH) },
        }),
      ),
    }),
  ),
);

/**
 * Adjust pages size given ruler props
 *
 * @param {Object} root
 * @returns {boolean} root with pages size altered by ruler props
 */
const resolveRulers = R.evolve({
  children: R.map(
    R.evolve({
      children: R.map(adjustPageSize),
    }),
  ),
});

export default resolveRulers;
