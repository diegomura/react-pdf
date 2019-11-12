import * as R from 'ramda';

import runWidth from '@react-pdf/textkit/run/advanceWidth';
import lineWidth from '@react-pdf/textkit/attributedString/advanceWidth';

const renderRun = (ctx, run) => {
  const runAdvanceWidth = runWidth(run);
  const { font, fontSize, color, opacity } = run.attributes;

  ctx.fillColor(color);
  ctx.fillOpacity(opacity);

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

const renderSpan = (ctx, line, textAnchor) => {
  ctx.save();

  const x = R.pathOr(0, ['box', 'x'], line);
  const y = R.pathOr(0, ['box', 'y'], line);
  const width = lineWidth(line);

  switch (textAnchor) {
    case 'middle':
      ctx.translate(x - width / 2, y);
      break;
    case 'end':
      ctx.translate(x - width, y);
      break;
    default:
      ctx.translate(x, y);
      break;
  }

  for (const run of line.runs) {
    renderRun(ctx, run);
  }

  ctx.restore();
};

const renderSvgText = ctx => node => {
  for (const span of node.children) {
    renderSpan(ctx, span.lines[0], span.props.textAnchor);
  }

  return node;
};

export default renderSvgText;
