export const isBorderStyle = (key, value) =>
  key.match(/^border/) && typeof value === 'string';

const matchBorderShorthand = value =>
  value.match(/(\d+(px|in|mm|cm|pt|vw|vh)?)\s(\S+)\s(\S+)/);

// Transforms shorthand border values
export const processBorders = (key, value) => {
  const match = matchBorderShorthand(value);

  if (match) {
    if (key.match(/.Color/)) {
      return match[4];
    } else if (key.match(/.Style/)) {
      return match[3];
    } else if (key.match(/.Width/)) {
      return match[1];
    } else {
      throw new Error(`StyleSheet: Invalid '${value}' for '${key}'`);
    }
  }

  return value;
};
