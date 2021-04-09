import * as R from 'ramda';

/**
 * Checks if value is last of the list
 *
 * @param  {Array}  list
 * @param  {any}  value
 * @return {boolean} is last?
 */
const isLastItem = R.useWith(R.equals, [R.last, R.identity]);

export default isLastItem;
