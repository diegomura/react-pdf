import * as R from 'ramda';

/**
 * Get image source
 *
 * @param {Object} image node
 * @returns {String} image src
 */
const getSource = R.compose(
  R.when(R.is(String), src => ({ uri: src })),
  R.either(R.path(['props', 'src']), R.path(['props', 'source'])),
);

export default getSource;
