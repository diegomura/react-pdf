/**
 * Checks if a value is null or undefined.
 *
 * @template {unknown} T
 * @param {T} value the value to check
 * @returns {T is null | undefined} true if the value is null or undefined, false otherwise
 */
const isNil = (value) => value === null || value === undefined;

export default isNil;
