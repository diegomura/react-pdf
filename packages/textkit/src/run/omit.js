/**
 * @typedef {import('../types.js').Attributes} Attributes
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Omit attribute from run
 *
 * @param {keyof Attributes} value attribute value
 * @param {Run} run run
 * @returns {Run} run without ommited attribute
 */
export default function omit(value, run) {
  const attributes = Object.assign({}, run.attributes);

  delete attributes[value];

  return Object.assign({}, run, { attributes });
}
