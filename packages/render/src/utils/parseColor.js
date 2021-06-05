import colorString from 'color-string';

const parseColor = hex => {
  const parsed = colorString.get(hex);
  const value = colorString.to.hex(parsed.value.slice(0, 3));
  const opacity = parsed.value[3];

  return { value, opacity };
};

export default parseColor;
