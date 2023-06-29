import StandardFont from './standardFont';

const fontCache = {};

const getFontSize = node => node.attributes.fontSize || 12;

const getOrCreateFont = name => {
  if (fontCache[name]) return fontCache[name];

  const font = new StandardFont(name);
  fontCache[name] = font;

  return font;
};

const fontSubstitution = () => attributedString => {
  const { runs } = attributedString;

  for (let i = 0; i < runs.length; i += 1) {
    const run = runs[i];

    const defaultFont =
      typeof run.attributes.font === 'string'
        ? getOrCreateFont(run.attributes.font)
        : run.attributes.font;

    run.attributes.font = defaultFont;
    run.attributes.scale = getFontSize(run) / defaultFont.unitsPerEm;
  }
  return attributedString;
};

export default fontSubstitution;
