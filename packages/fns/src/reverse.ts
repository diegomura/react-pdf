/**
 * Reverses the list
 *
 * @template T
 * @param list - List to be reversed
 * @returns Reversed list
 */
const reverse = <T = any>(list: T[]): T[] =>
  Array.prototype.slice.call(list, 0).reverse();

export default reverse;
