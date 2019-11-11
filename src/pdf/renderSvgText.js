import * as R from 'ramda';

// import runHeight from '@react-pdf/textkit/run/height';
// import runDescent from '@react-pdf/textkit/run/descent';
// import advanceWidth from '@react-pdf/textkit/run/advanceWidth';

const renderRun = (ctx, run) => {
  const { font, fontSize, color, link, opacity } = run.attributes;

  // const height = runHeight(run);
  const height = 40;
  const descent = -4;
  // const descent = runDescent(run);
  const runAdvanceWidth = 99;
  // const runAdvanceWidth = advanceWidth(run);

  ctx.fillColor(color);
  ctx.fillOpacity(opacity);

  if (link) {
    ctx.link(0, -height - descent, runAdvanceWidth, height, link);
  }

  if (font.sbix || (font.COLR && font.CPAL)) {
    ctx.save();
    ctx.translate(0, -run.ascent);

    for (let i = 0; i < run.glyphs.length; i++) {
      const position = run.positions[i];
      const glyph = run.glyphs[i];

      ctx.save();
      ctx.translate(position.xOffset, position.yOffset);

      glyph.render(ctx, fontSize);

      ctx.restore();
      ctx.translate(position.xAdvance, position.yAdvance);
    }

    ctx.restore();
  } else {
    ctx.font(typeof font.name === 'string' ? font.name : font, fontSize);

    try {
      ctx._addGlyphs(run.glyphs, run.positions, 0, 0);
    } catch (error) {
      console.log(error);
    }
  }

  ctx.translate(runAdvanceWidth, 0);
};

const renderSpan = (ctx, line, options) => {
  ctx.save();

  const x = R.pathOr(0, ['box', 'x'], line);
  const y = R.pathOr(0, ['box', 'y'], line);

  ctx.translate(x, y);

  for (const run of line.runs) {
    renderRun(ctx, run, options);
  }

  ctx.restore();
};

const renderSvgText = ctx => node => {
  for (const span of node.children) {
    renderSpan(ctx, span.lines[0]);
  }

  return node;
};

export default renderSvgText;
