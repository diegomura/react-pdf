const PROTOCOL_REGEXP = /^([a-z]+\:(\/\/)?)/i;

/**
 * Add protocol th URL if valid
 *
 * @param {String} value url
 * @returns {String} corrected url
 */
export const getURL = value => {
  if (!value) return '';

  if (typeof value === 'string' && !value.match(PROTOCOL_REGEXP)) {
    return `http://${value}`;
  }

  return value;
};
