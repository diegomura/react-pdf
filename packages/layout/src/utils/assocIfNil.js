import * as R from 'ramda';

/**
 * Add empt box prop if not present in node
 *
 * @param {Object} node
 * @returns {Object} node with box prop
 */
const assocIfNil = (key, value, target) =>
  R.when(
    R.compose(
      R.isNil,
      R.prop(key),
    ),
    R.assoc(key, value),
  )(target);

export default R.curryN(3, assocIfNil);
