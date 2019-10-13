import * as R from 'ramda';

import matchPercent from '../utils/matchPercent';

/*
 * Translates page percentage horizontal paddings in fixed ones
 *
 * @param {Object} page container
 * @param {String} padding value
 * @returns {Object} translated padding value
 */
const resolvePageHorizontalPadding = container => value => {
  const match = matchPercent(value);
  return match ? match.percent * container.width : value;
};

/**
 * Translates page percentage vertical paddings in fixed ones
 *
 * @param {Object} page container
 * @param {String} padding value
 * @returns {Object} translated padding value
 */
const resolvePageVerticalPadding = container => value => {
  const match = matchPercent(value);
  return match ? match.percent * container.height : value;
};

/**
 * Translates page percentage paddings in fixed ones
 *
 * @param {Object} page
 * @returns {Object} page with fixed paddings
 */
const resolvePagePaddings = page =>
  R.evolve({
    style: R.evolve({
      paddingLeft: resolvePageHorizontalPadding(page.box),
      paddingRight: resolvePageHorizontalPadding(page.box),
      paddingTop: resolvePageVerticalPadding(page.box),
      paddingBottom: resolvePageVerticalPadding(page.box),
    }),
  })(page);

/**
 * Translates all pages percentage paddings in fixed ones
 *
 * @param {Object} document root
 * @returns {Object} document root with translated page paddings
 */
export default R.evolve({
  children: R.map(resolvePagePaddings),
});
