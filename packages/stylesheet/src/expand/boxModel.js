import * as R from 'ramda';

const BOX_MODEL_REGEX = /-?\d+(\.\d+)?(px|in|mm|cm|pt|%|vw|vh|px)?/g;

const matchBoxModelValue = R.match(BOX_MODEL_REGEX);

const expandBoxModel = model => (key, value) => {
  if (value === 'auto')
    return {
      [`${model}Top`]: 'auto',
      [`${model}Right`]: 'auto',
      [`${model}Bottom`]: 'auto',
      [`${model}Left`]: 'auto',
    };

  const match = matchBoxModelValue(`${value}`);

  if (match) {
    const top = match[0];
    const right = match[1] || match[0];
    const bottom = match[2] || match[0];
    const left = match[3] || match[1] || match[0];

    if (key.match(/Horizontal$/)) {
      return {
        [`${model}Right`]: right,
        [`${model}Left`]: left,
      };
    }

    if (key.match(/Vertical$/)) {
      return {
        [`${model}Top`]: top,
        [`${model}Bottom`]: bottom,
      };
    }

    return {
      [`${model}Top`]: top,
      [`${model}Right`]: right,
      [`${model}Bottom`]: bottom,
      [`${model}Left`]: left,
    };
  }

  return value;
};

export default expandBoxModel;
