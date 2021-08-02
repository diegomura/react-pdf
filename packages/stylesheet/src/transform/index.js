import transformUnits from './units';
import transformColor from './colors';
import processTransform from './transform';
import processFontWeight from './fontWeight';
import processObjectPosition from './objectPosition';
import processTransformOrigin from './transformOrigin';
import castFloat from '../utils/castFloat';

const handlers = {
  transform: processTransform,
  fontWeight: processFontWeight,
  objectPositionX: processObjectPosition,
  objectPositionY: processObjectPosition,
  transformOriginX: processTransformOrigin,
  transformOriginY: processTransformOrigin,
};

const transformStyle = (key, value, container) => {
  const result = handlers[key] ? handlers[key](value) : value;

  return transformColor(transformUnits(container, castFloat(result)));
};

/**
 * Transform styles values
 *
 * @param {Object} styles object
 * @returns {Object} transformed styles
 */
const transform = container => style => {
  if (!style) return style;

  const propsArray = Object.keys(style);
  const resolvedStyle = {};

  for (let i = 0; i < propsArray.length; i += 1) {
    const key = propsArray[i];
    const value = style[key];
    const transformed = transformStyle(key, value, container);

    resolvedStyle[key] = transformed;
  }

  return resolvedStyle;
};

export default transform;
