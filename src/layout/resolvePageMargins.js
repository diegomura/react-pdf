import * as R from 'ramda';

import removeMargins from '../node/removeMargins';

/**
 * Remove page margins
 *
 * @param {Object} document root
 * @returns {Object} documrnt root without margins on pages
 */
const resolvePageMargins = R.evolve({
  children: R.map(removeMargins),
});

export default resolvePageMargins;
