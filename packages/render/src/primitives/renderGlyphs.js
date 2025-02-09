/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-return-assign */
/* eslint-disable no-nested-ternary */

const number = (n) => {
  if (n > -1e21 && n < 1e21) {
    return Math.round(n * 1e6) / 1e6;
  }

  throw new Error(`unsupported number: ${n}`);
};

const _renderGlyphs = (ctx, encoded, positions, x, y, options) => {
  const commands = [];
  const scale = ctx._fontSize / 1000;

  let i;
  let last = 0;
  let hadOffset = false;

  ctx.save();

  // flip coordinate system
  ctx.transform(1, 0, 0, -1, 0, ctx.page.height);
  y = ctx.page.height - y;

  // add current font to page if necessary
  if (ctx.page.fonts[ctx._font.id] == null) {
    ctx.page.fonts[ctx._font.id] = ctx._font.ref();
  }

  // begin the text object
  ctx.addContent('BT');

  // text position
  ctx.addContent(`1 0 0 1 ${number(x)} ${number(y)} Tm`);

  // font and font size
  ctx.addContent(`/${ctx._font.id} ${number(ctx._fontSize)} Tf`);

  // rendering mode
  const mode = options.fill && options.stroke ? 2 : options.stroke ? 1 : 0;
  if (mode) {
    ctx.addContent(`${mode} Tr`);
  }

  // Adds a segment of text to the TJ command buffer
  const addSegment = (cur) => {
    if (last < cur) {
      const hex = encoded.slice(last, cur).join('');
      const advance =
        positions[cur - 1].xAdvance - positions[cur - 1].advanceWidth;
      commands.push(`<${hex}> ${number(-advance)}`);
    }

    return (last = cur);
  };

  // Flushes the current TJ commands to the output stream
  const flush = (s) => {
    addSegment(s);

    if (commands.length > 0) {
      ctx.addContent(`[${commands.join(' ')}] TJ`);
      return (commands.length = 0);
    }
  };

  for (i = 0; i < positions.length; i += 1) {
    // If we have an x or y offset, we have to break out of the current TJ command
    // so we can move the text position.
    const pos = positions[i];
    if (pos.xOffset || pos.yOffset) {
      // Flush the current buffer
      flush(i);

      // Move the text position and flush just the current character
      ctx.addContent(
        `1 0 0 1 ${number(x + pos.xOffset * scale)} ${number(
          y + pos.yOffset * scale,
        )} Tm`,
      );
      flush(i + 1);

      hadOffset = true;
    } else {
      // If the last character had an offset, reset the text position
      if (hadOffset) {
        ctx.addContent(`1 0 0 1 ${number(x)} ${number(y)} Tm`);
        hadOffset = false;
      }

      // Group segments that don't have any advance adjustments
      if (pos.xAdvance - pos.advanceWidth !== 0) {
        addSegment(i + 1);
      }
    }

    x += pos.xAdvance * scale;
  }

  // Flush any remaining commands
  flush(i);

  // end the text object
  ctx.addContent('ET');

  // restore flipped coordinate system
  return ctx.restore();
};

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

  return _renderGlyphs(ctx, encodedGlyphs, encodedPositions, x, y, options);
};

export default renderGlyphs;
