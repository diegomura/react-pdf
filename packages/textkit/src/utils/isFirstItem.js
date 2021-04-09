import * as R from 'ramda';

/**
 * Checks if value is first of the list
 *
 * @param  {Array}  list
 * @param  {any}  value
 * @return {boolean} is first?
 */
const isFirstItem = R.useWith(R.equals, [R.head, R.identity]);

export default isFirstItem;
