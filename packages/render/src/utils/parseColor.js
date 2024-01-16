import colorString from 'color-string';

const black = { value: [0, 0, 0], opacity: 1 };

const parseColor = hex => {
  const parsed = colorString.get(hex);

  if (!parsed) return black;

  const value = colorString.to.hex(parsed.value.slice(0, 3));
  const opacity = parsed.value[3];

  return { value, opacity };
};

export default parseColor;
