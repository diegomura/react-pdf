export const STANDARD_FONT_NAMES = [
  'Courier',
  'Courier-Bold',
  'Courier-BoldOblique',
  'Courier-Oblique',
  'Helvetica',
  'Helvetica-Bold',
  'Helvetica-BoldOblique',
  'Helvetica-Oblique',
  'Symbol',
  'Times-Bold',
  'Times-BoldItalic',
  'Times-Italic',
  'Times-Roman',
  'ZapfDingbats',
];

const STANDARD_FONT_NAME_SET = new Set(STANDARD_FONT_NAMES);

const validateFontData = (fontData, expectedName) => {
  if (
    fontData == null ||
    typeof fontData !== 'object' ||
    !STANDARD_FONT_NAME_SET.has(fontData.name) ||
    (expectedName != null && fontData.name !== expectedName)
  ) {
    throw new TypeError('Invalid standard font data.');
  }
};

const standardFonts = new Map();

export const isStandardFont = (name) => STANDARD_FONT_NAME_SET.has(name);

export const registerStdFonts = (...fontData) => {
  for (const data of fontData) {
    validateFontData(data);
    standardFonts.set(data.name, data);
  }
};

export const registerStdFontLoaders = (loaders) => {
  for (const [name, loader] of Object.entries(loaders)) {
    if (!STANDARD_FONT_NAME_SET.has(name) || typeof loader !== 'function') {
      throw new TypeError('Invalid standard font loader.');
    }

    standardFonts.set(name, loader);
  }
};

export const getStandardFont = (name) => {
  if (!STANDARD_FONT_NAME_SET.has(name)) {
    return null;
  }

  const font = standardFonts.get(name);
  if (font == null) {
    throw new Error(
      `Standard font "${name}" is not registered. ` +
        'Call registerStdFonts() before using it.',
    );
  }

  if (typeof font !== 'function') {
    return font;
  }

  const data = font();
  validateFontData(data, name);
  standardFonts.set(name, data);
  return data;
};
