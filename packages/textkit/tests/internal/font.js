const shortLigature = { id: 64257, codePoints: [102, 105], advanceWidth: 10 };

const longLigature = {
  id: 64259,
  codePoints: [102, 102, 105],
  advanceWidth: 10,
};

const glyphForCodePoint = v => {
  if (v === 64257) return shortLigature;
  if (v === 64259) return longLigature;

  return { id: v, codePoints: [v], advanceWidth: 8 };
};

const glyphFromChar = v => glyphForCodePoint(v.codePointAt(0));

const layoutGlyphs = v => {
  const splits = v.split(/(ffi|fi|.)/g);
  const result = splits.map(s => {
    if (s === 'fi') return [shortLigature];
    if (s === 'ffi') return [longLigature];

    return s.split('').map(glyphFromChar);
  });

  return result.flat();
};

const layoutPositions = positions => {
  return positions.map(pos => ({
    xAdvance: pos.advanceWidth || 0,
    yAdvance: 0,
    xOffset: 0,
    yOffset: 0,
  }));
};

const layoutStringIndices = glyphs => {
  let counter = 0;
  const stringIndices = [];

  for (let i = 0; i < glyphs.length; i += 1) {
    const glyph = glyphs[i];
    stringIndices.push(counter);
    counter += glyph.codePoints.length;
  }

  return stringIndices;
};

const layout = string => {
  const glyphs = layoutGlyphs(string);
  const positions = layoutPositions(glyphs);
  const stringIndices = layoutStringIndices(glyphs);

  return {
    glyphs,
    positions,
    stringIndices,
  };
};

export default {
  layout,
  glyphForCodePoint,
  unitsPerEm: 2,
  ascent: 2,
  descent: -2,
};
