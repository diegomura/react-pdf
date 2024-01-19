/* eslint-disable no-restricted-syntax */

/**
 * @typedef {Function} VerticalAlignment
 * @param {Object} attributedString attributed string
 * @returns {Object} attributed string
 */

/**
 * Apply scaling and yOffset for verticalAlign 'sub' and 'super'.
 *
 * @returns {VerticalAlignment} verticalAlignment
 */
const verticalAlignment = () => attributedString => {
  attributedString.runs.forEach(run => {
    const { attributes } = run;
    const { verticalAlign } = attributes;

    if (verticalAlign === 'sub') {
      attributes.yOffset = -0.2;
    } else if (verticalAlign === 'super') {
      attributes.yOffset = 0.4;
    }
  });
  return attributedString;
};

export default verticalAlignment;
