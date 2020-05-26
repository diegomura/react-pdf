import * as R from 'ramda';

import firstPass from '../utils/firstPass';

/**
 * Get image source
 *
 * @param {Object} image node
 * @returns {String} image src
 */
const getSource = R.compose(
  R.when(R.is(String), src => ({ uri: src })),
  firstPass(
    R.path(['props', 'src']),
    R.path(['props', 'source']),
    R.path(['props', 'href']),
  ),
);

export default getSource;
