export const isObjectPositionStyle = (key, value) =>
  key.match(/^objectPosition/) && typeof value === 'string';

const matchObjectPosition = value =>
  value.match(/\d+(px|in|mm|cm|pt|%|vw|vh)?/g);

// Transforms shorthand objectPosition values
export const processObjectPosition = (key, value) => {
  const match = matchObjectPosition(value);

  if (match) {
    if (key.match(/.X/)) {
      return match[0];
    } else if (key.match(/.Y/)) {
      return match[1];
    } else {
      throw new Error(`StyleSheet: Invalid '${value}' for '${key}'`);
    }
  }

  return value;
};
