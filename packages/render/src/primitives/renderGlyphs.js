const renderGlyphs = (ctx, glyphs, positions, x, y, options = {}) => {
  const scale = 1000 / ctx._fontSize;
  const unitsPerEm = ctx._font.font.unitsPerEm || 1000;
  const advanceWidthScale = 1000 / unitsPerEm;

  // Glyph encoding and positioning
  const encodedGlyphs = ctx._font.encodeGlyphs(glyphs);
  const encodedPositions = positions.map((pos, i) => ({
    xAdvance: pos.xAdvance * scale,
    yAdvance: pos.yAdvance * scale,
    xOffset: pos.xOffset,
    yOffset: pos.yOffset,
    advanceWidth: glyphs[i].advanceWidth * advanceWidthScale,
  }));

  return ctx._glyphs(encodedGlyphs, encodedPositions, x, y, options);
};

export default renderGlyphs;
