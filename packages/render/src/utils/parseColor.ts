import colorString from 'color-string';

const black = { value: '#000', opacity: 1 };

// TODO: parse to number[] in layout to avoid this step
const parseColor = (hex?: string) => {
  if (!hex) return black;

  const parsed = colorString.get(hex);

  if (!parsed) return black;

  const value = colorString.to.hex(parsed.value.slice(0, 3));
  const opacity = parsed.value[3];

  return { value, opacity };
};

export default parseColor;
