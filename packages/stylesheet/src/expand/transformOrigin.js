const Y_AXIS_SHORTHANDS = { top: true, bottom: true };

const sortTransformOriginPair = (a, b) => {
  if (Y_AXIS_SHORTHANDS[a]) return 1;
  if (Y_AXIS_SHORTHANDS[b]) return -1;
  return 0;
};

const getTransformOriginPair = (values) => {
  if (!values || values.length === 0) return ['center', 'center'];

  const pair = values.length === 1 ? [values[0], 'center'] : values;

  return pair.sort(sortTransformOriginPair);
};

// Transforms shorthand transformOrigin values
const expandTransformOrigin = (key, value) => {
  const match = `${value}`.split(' ');

  const pair = getTransformOriginPair(match);

  return {
    transformOriginX: pair[0],
    transformOriginY: pair[1],
  };
};

export default expandTransformOrigin;
