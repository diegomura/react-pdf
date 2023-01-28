const initFont = font => {
  return [font.FontName, { attributes: font, glyphWidths: {}, kernPairs: {} }];
};

const expandData = data => {
  const { attributes, glyphWidths, kernPairs } = data;
  const fonts = attributes.map(initFont);

  Object.keys(glyphWidths).forEach(key => {
    glyphWidths[key].forEach((value, index) => {
      if (value) fonts[index][1].glyphWidths[key] = value;
    });
  });

  Object.keys(kernPairs).forEach(key => {
    kernPairs[key].forEach((value, index) => {
      if (value) fonts[index][1].kernPairs[key] = value;
    });
  });

  return Object.fromEntries(fonts);
};

export default expandData;
