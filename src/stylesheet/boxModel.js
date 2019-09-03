export const isBoxModelStyle = (key, value) =>
  key.match(/^(margin)|(padding)/) && typeof value === 'string';

const matchBoxModel = value => value.match(/\d+(px|in|mm|cm|pt|%|vw|vh)?/g);

// Transforms shorthand margin and padding values
export const processBoxModel = (key, value) => {
  const match = matchBoxModel(value);

  if (match) {
    if (key.match(/.Top/)) {
      return match[0];
    } else if (key.match(/.Right/)) {
      return match[1] || match[0];
    } else if (key.match(/.Bottom/)) {
      return match[2] || match[0];
    } else if (key.match(/.Left/)) {
      return match[3] || match[1] || match[0];
    } else {
      throw new Error(`StyleSheet: Invalid '${value}' for '${key}'`);
    }
  }

  return value;
};
