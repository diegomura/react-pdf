const renderGlyphs = (ctx, glyphs, positions, x, y, options = {}) => {
  const scale = 1000 / ctx._fontSize;
  const unitsPerEm = ctx._font.font.unitsPerEm || 1000;
  const advanceWidthScale = 1000 / unitsPerEm;

  // Glyph encoding and positioning
  const encodedGlyphs = ctx._font.encodeGlyphs(glyphs);
  positions.forEach((pos, i) => {
    pos.xAdvance *= scale;
    pos.yAdvance *= scale;
    pos.advanceWidth = glyphs[i].advanceWidth * advanceWidthScale;
  });

  return ctx._glyphs(encodedGlyphs, positions, x, y, options);
};

export default renderGlyphs;
