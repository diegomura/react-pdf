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
    const { verticalAlign, fontSize } = attributes;

    if (verticalAlign === 'sub') {
      attributes.fontSize = fontSize * 0.75;
      attributes.yOffset = -0.2;
      attributes.characterSpacing = (fontSize - attributes.fontSize) / -2.45;
    } else if (verticalAlign === 'super') {
      attributes.fontSize = fontSize * 0.75;
      attributes.yOffset = 0.4;
      attributes.characterSpacing = (fontSize - attributes.fontSize) / -2.45;
    }
  });
  return attributedString;
};

export default verticalAlignment;
