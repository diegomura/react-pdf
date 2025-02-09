/**
 * Reverses the list
 *
 * @template {unknown} T
 * @param {T[]} list list to be reversed
 * @returns {T[]} reversed list
 */
const reverse = (list) => Array.prototype.slice.call(list, 0).reverse();

export default reverse;
