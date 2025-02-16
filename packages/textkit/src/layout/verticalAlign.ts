import { AttributedString } from '../types';

/**
 * Apply scaling and yOffset for verticalAlign 'sub' and 'super'.
 */
const verticalAlignment = () => {
  /**
   * @param attributedString - Attributed string
   * @returns Attributed string
   */
  return (attributedString: AttributedString) => {
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
