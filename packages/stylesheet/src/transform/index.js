import transformUnits from './units';
import transformColor from './colors';
import processTransform from './transform';
import processFontWeight from './fontWeight';
import processLineHeight from './lineHeight';
import processObjectPosition from './objectPosition';
import processTransformOrigin from './transformOrigin';
import castFloat from '../utils/castFloat';

const handlers = {
  transform: processTransform,
  fontWeight: processFontWeight,
  lineHeight: processLineHeight,
  objectPositionX: processObjectPosition,
  objectPositionY: processObjectPosition,
  transformOriginX: processTransformOrigin,
  transformOriginY: processTransformOrigin,
};

const transformStyle = (key, value, styles, container) => {
  const result = handlers[key] ? handlers[key](value, styles) : value;

  return transformColor(transformUnits(container, castFloat(result)));
};

/**
 * @typedef {Function} Transform
 * @param {Object} style styles object
 * @returns {Object} transformed styles
 */

/**
 * Transform styles values
 *
 * @param {Object} container
 * @returns {Transform} transform function
 */
const transform = (container) => (styles) => {
  if (!styles) return styles;

  const propsArray = Object.keys(styles);
  const resolvedStyle = {};

  for (let i = 0; i < propsArray.length; i += 1) {
    const key = propsArray[i];
    const value = styles[key];
    const transformed = transformStyle(key, value, styles, container);

    resolvedStyle[key] = transformed;
  }

  return resolvedStyle;
};

export default transform;
