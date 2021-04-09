import * as R from 'ramda';

/**
 * Map list by index
 * Accepts up to 3 functions:
 *   - Will apply first function to first value
 *   - Will apply last function to last value
 *   - Will apply the other function to the rest of values
 *
 * @param  {Array}  list
 * @param  {Array}  functions
 * @return {Array} mapped array
 */
const mapIndexed = (fns = [], list = []) => {
  const length = list.length - 1;

  return R.addIndex(R.map)((value, idx) => {
    if (idx === 0) return R.head(fns)(value, idx);
    if (idx === length) return R.last(fns)(value, idx);
    return (fns[1] || fns[0])(value, idx);
  })(list);
};

export default R.curryN(2, mapIndexed);
