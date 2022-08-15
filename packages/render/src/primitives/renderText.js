/* eslint-disable no-param-reassign */
import { isNil } from '@react-pdf/fns';

import renderGlyphs from './renderGlyphs';
import parseColor from '../utils/parseColor';

const DEST_REGEXP = /^#.+/;

const isSrcId = src => src.match(DEST_REGEXP);

const renderAttachment = (ctx, attachment) => {
  const { xOffset = 0, yOffset = 0, width, height, image } = attachment;

  ctx.translate(-width + xOffset, -height + yOffset);

  ctx.image(image, 0, 0, {
    fit: [width, height],
    align: 'center',
    valign: 'bottom',
  });
};

const renderAttachments = (ctx, run) => {
  ctx.save();

  const { font } = run.attributes;
  const space = font.glyphForCodePoint(0x20);
  const objectReplacement = font.glyphForCodePoint(0xfffc);

  let attachmentAdvance = 0;
  for (let i = 0; i < run.glyphs.length; i += 1) {
    const position = run.positions[i];
    const glyph = run.glyphs[i];

    attachmentAdvance += position.xAdvance || 0;

    if (glyph.id === objectReplacement.id && run.attributes.attachment) {
      ctx.translate(attachmentAdvance, position.yOffset || 0);
      renderAttachment(ctx, run.attributes.attachment);
      run.glyphs[i] = space;
      attachmentAdvance = 0;
    }
  }

  ctx.restore();
};

const renderRun = (ctx, run, options) => {
  const { font, fontSize, link } = run.attributes;
  const color = parseColor(run.attributes.color);
  const opacity = isNil(run.attributes.opacity)
    ? color.opacity
    : run.attributes.opacity;

  const { height, descent, xAdvance } = run;

  if (options.outlineRuns) {
    ctx.rect(0, -height, xAdvance, height).stroke();
  }

  ctx.fillColor(color.value);
  ctx.fillOpacity(opacity);

  if (link) {
    if (isSrcId(link)) {
      ctx.goTo(0, -height - descent, xAdvance, height, link.slice(1));
    } else {
      ctx.link(0, -height - descent, xAdvance, height, link);
    }
  }

  renderAttachments(ctx, run);

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

  ctx.translate(xAdvance, 0);
};

const renderBackground = (ctx, rect, backgroundColor) => {
  const color = parseColor(backgroundColor);

  ctx.save();
  ctx.fillOpacity(color.opacity);
  ctx.rect(rect.x, rect.y, rect.width, rect.height);
  ctx.fill(color.value);
  ctx.restore();
};

const renderDecorationLine = (ctx, line) => {
  ctx.save();
  ctx.lineWidth(line.rect.height);
  ctx.strokeOpacity(line.opacity);

  if (/dashed/.test(line.style)) {
    ctx.dash(3 * line.rect.height);
  } else if (/dotted/.test(line.style)) {
    ctx.dash(line.rect.height);
  }

  if (/wavy/.test(line.style)) {
    const dist = Math.max(2, line.rect.height);
    let step = 1.1 * dist;
    const stepCount = Math.floor(line.rect.width / (2 * step));

    // Adjust step to fill entire width
    const remainingWidth = line.rect.width - stepCount * 2 * step;
    const adjustment = remainingWidth / stepCount / 2;
    step += adjustment;

    const cp1y = line.rect.y + dist;
    const cp2y = line.rect.y - dist;
    let { x } = line.rect;

    ctx.moveTo(line.rect.x, line.rect.y);

    for (let i = 0; i < stepCount; i += 1) {
      ctx.bezierCurveTo(
        x + step,
        cp1y,
        x + step,
        cp2y,
        x + 2 * step,
        line.rect.y,
      );
      x += 2 * step;
    }
  } else {
    ctx.moveTo(line.rect.x, line.rect.y);
    ctx.lineTo(line.rect.x + line.rect.width, line.rect.y);

    if (/double/.test(line.style)) {
      ctx.moveTo(line.rect.x, line.rect.y + line.rect.height * 2);
      ctx.lineTo(
        line.rect.x + line.rect.width,
        line.rect.y + line.rect.height * 2,
      );
    }
  }

  ctx.stroke(line.color);
  ctx.restore();
};

const renderLine = (ctx, line, options) => {
  const lineAscent = line.ascent;

  if (options.outlineLines) {
    ctx.rect(line.box.x, line.box.y, line.box.width, line.box.height).stroke();
  }

  ctx.save();
  ctx.translate(line.box.x, line.box.y + lineAscent);

  for (let i = 0; i < line.runs.length; i += 1) {
    const run = line.runs[i];
    const isLastRun = i === line.runs.length - 1;

    if (run.attributes.backgroundColor) {
      const overflowRight = isLastRun ? line.overflowRight : 0;

      const backgroundRect = {
        x: 0,
        y: -lineAscent,
        height: line.box.height,
        width: run.xAdvance - overflowRight,
      };

      renderBackground(ctx, backgroundRect, run.attributes.backgroundColor);
    }
    renderRun(ctx, run, options);
  }

  ctx.restore();
  ctx.save();
  ctx.translate(line.box.x, line.box.y);

  for (let i = 0; i < line.decorationLines.length; i += 1) {
    const decorationLine = line.decorationLines[i];
    renderDecorationLine(ctx, decorationLine);
  }

  ctx.restore();
};

const renderBlock = (ctx, block, options) => {
  block.forEach(line => {
    renderLine(ctx, line, options);
  });
};

const renderText = (ctx, node) => {
  const { top, left } = node.box;
  const blocks = [node.lines];
  const paddingTop = node.box?.paddingTop || 0;
  const paddingLeft = node.box?.paddingLeft || 0;
  const initialY = node.lines[0] ? node.lines[0].box.y : 0;
  const offsetX = node.alignOffset || 0;

  ctx.save();
  ctx.translate(left + paddingLeft - offsetX, top + paddingTop - initialY);

  blocks.forEach(block => {
    renderBlock(ctx, block, {});
  });

  ctx.restore();
};

export default renderText;
