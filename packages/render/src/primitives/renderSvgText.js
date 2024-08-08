import renderGlyphs from './renderGlyphs';

const renderRun = (ctx, run) => {
  const runAdvanceWidth = run.xAdvance;
  const { font, fontSize, color, opacity } = run.attributes;

  ctx.fillColor(color);
  ctx.fillOpacity(opacity);

  if (font.sbix || (font.COLR && font.CPAL)) {
    ctx.save();
    ctx.translate(0, -run.ascent);

    for (let i = 0; i < run.glyphs.length; i += 1) {
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
      renderGlyphs(ctx, run.glyphs, run.positions, 0, 0);
    } catch (error) {
      console.log(error);
    }
  }

  ctx.translate(runAdvanceWidth, 0);
};

const renderSpan = (ctx, line, textAnchor, dominantBaseline) => {
  ctx.save();

  const x = line.box?.x || 0;
  const y = line.box?.y || 0;
  const font = line.runs[0]?.attributes.font;
  const scale = line.runs[0]?.attributes?.scale || 1;
  const width = line.xAdvance;

  const ascent = font.ascent * scale;
  const xHeight = font.xHeight * scale;
  const descent = font.descent * scale;
  const capHeight = font.capHeight * scale;

  let xTranslate = x;
  let yTranslate = y;

  switch (textAnchor) {
    case 'middle':
      xTranslate = x - width / 2;
      break;
    case 'end':
      xTranslate = x - width;
      break;
    default:
      xTranslate = x;
      break;
  }

  switch (dominantBaseline) {
    case 'middle':
    case 'central':
      yTranslate = y + capHeight / 2;
      break;
    case 'hanging':
      yTranslate = y + capHeight;
      break;
    case 'mathematical':
      yTranslate = y + xHeight;
      break;
    case 'text-after-edge':
      yTranslate = y + descent;
      break;
    case 'text-before-edge':
      yTranslate = y + ascent;
      break;
    default:
      yTranslate = y;
      break;
  }

  ctx.translate(xTranslate, yTranslate);

  line.runs.forEach((run) => renderRun(ctx, run));

  ctx.restore();
};

const renderSvgText = (ctx, node) => {
  node.children.forEach((span) =>
    renderSpan(
      ctx,
      span.lines[0],
      span.props.textAnchor,
      span.props.dominantBaseline,
    ),
  );
};

export default renderSvgText;
