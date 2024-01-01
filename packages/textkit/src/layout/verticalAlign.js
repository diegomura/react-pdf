/* eslint-disable no-restricted-syntax */

/**
 * Apply scaling and yOffset for verticalAlign 'sub' and 'super'.
 *
 * @param  {Object} layout options
 * @param  {Object} attributed string
 * @return {Object} attributed string
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
