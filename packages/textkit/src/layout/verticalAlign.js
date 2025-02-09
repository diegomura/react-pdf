/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 */

/**
 * Apply scaling and yOffset for verticalAlign 'sub' and 'super'.
 */
const verticalAlignment = () => {
  /**
   * @param {AttributedString} attributedString attributed string
   * @returns {AttributedString} attributed string
   */
  return (attributedString) => {
    attributedString.runs.forEach((run) => {
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
};

export default verticalAlignment;
