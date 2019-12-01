import * as R from 'ramda';

/**
 * Removes margins on node
 *
 * @param {Object} node
 * @returns {Object} node without margins
 */
const removeMargins = R.compose(
  R.dissocPath(['style', 'margin']),
  R.dissocPath(['style', 'marginTop']),
  R.dissocPath(['style', 'marginRight']),
  R.dissocPath(['style', 'marginBottom']),
  R.dissocPath(['style', 'marginLeft']),
  R.dissocPath(['style', 'marginHorizontal']),
  R.dissocPath(['style', 'marginVertical']),
);

export default removeMargins;
