import { isNil } from '@react-pdf/fns';

import renderGlyphs from './renderGlyphs';
import parseColor from '../utils/parseColor';
import { Context } from '../types';
import { SafeTextNode } from '@react-pdf/layout';
import {
  Attachment,
  AttributedString,
  DecorationLine,
  Paragraph,
  Rect,
  Run,
} from '@react-pdf/textkit';

const DEST_REGEXP = /^#.+/;

const isSrcId = (src: string) => src.match(DEST_REGEXP);

const renderAttachment = (ctx: Context, attachment: Attachment) => {
  const { xOffset = 0, yOffset = 0, width, height, image } = attachment;

  ctx.translate(-width + xOffset, -height + yOffset);

  ctx.image(image, 0, 0, {
    fit: [width, height],
    align: 'center',
    valign: 'bottom',
  });
};

const renderAttachments = (ctx: Context, run: Run) => {
  if (!run.glyphs) return;
  if (!run.positions) return;

  const { font } = run.attributes;
  if (!font) return;

  ctx.save();

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

const renderRun = (ctx: Context, run: Run) => {
  if (!run.glyphs) return;
  if (!run.positions) return;

  const { font, fontSize, link } = run.attributes;

  if (!font) return;

  const color = parseColor(run.attributes.color);
  const opacity = isNil(run.attributes.opacity)
    ? color.opacity
    : run.attributes.opacity;

  const { height = 0, descent = 0, xAdvance = 0 } = run;

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

  // @ts-expect-error figure out how this worked
  ctx.font(typeof font.name === 'string' ? font.name : font, fontSize);

  try {
    renderGlyphs(ctx, run.glyphs!, run.positions!, 0, 0);
  } catch (error) {
    console.log(error);
  }

  ctx.translate(xAdvance, 0);
};

const renderBackground = (
  ctx: Context,
  rect: Rect,
  backgroundColor: string,
) => {
  const color = parseColor(backgroundColor);

  ctx.save();
  ctx.fillOpacity(color.opacity);
  ctx.rect(rect.x, rect.y, rect.width, rect.height);
  ctx.fill(color.value);
  ctx.restore();
};

const renderDecorationLine = (ctx: Context, decorationLine: DecorationLine) => {
  ctx.save();
  ctx.lineWidth(decorationLine.rect.height);
  ctx.strokeOpacity(decorationLine.opacity);

  if (/dashed/.test(decorationLine.style)) {
    ctx.dash(3 * decorationLine.rect.height, {});
  } else if (/dotted/.test(decorationLine.style)) {
    ctx.dash(decorationLine.rect.height, {});
  }

  if (/wavy/.test(decorationLine.style)) {
    const dist = Math.max(2, decorationLine.rect.height);
    let step = 1.1 * dist;
    const stepCount = Math.floor(decorationLine.rect.width / (2 * step));

    // Adjust step to fill entire width
    const remainingWidth = decorationLine.rect.width - stepCount * 2 * step;
    const adjustment = remainingWidth / stepCount / 2;
    step += adjustment;

    const cp1y = decorationLine.rect.y + dist;
    const cp2y = decorationLine.rect.y - dist;
    let { x } = decorationLine.rect;

    ctx.moveTo(decorationLine.rect.x, decorationLine.rect.y);

    for (let i = 0; i < stepCount; i += 1) {
      ctx.bezierCurveTo(
        x + step,
        cp1y,
        x + step,
        cp2y,
        x + 2 * step,
        decorationLine.rect.y,
      );
      x += 2 * step;
    }
  } else {
    ctx.moveTo(decorationLine.rect.x, decorationLine.rect.y);
    ctx.lineTo(
      decorationLine.rect.x + decorationLine.rect.width,
      decorationLine.rect.y,
    );

    if (/double/.test(decorationLine.style)) {
      ctx.moveTo(
        decorationLine.rect.x,
        decorationLine.rect.y + decorationLine.rect.height * 2,
      );
      ctx.lineTo(
        decorationLine.rect.x + decorationLine.rect.width,
        decorationLine.rect.y + decorationLine.rect.height * 2,
      );
    }
  }

  ctx.stroke(decorationLine.color);
  ctx.restore();
};

const renderLine = (ctx: Context, line: AttributedString) => {
  if (!line.box) return;

  const lineAscent = line.ascent || 0;

  ctx.save();
  ctx.translate(line.box.x, line.box.y + lineAscent);

  for (let i = 0; i < line.runs.length; i += 1) {
    const run = line.runs[i];
    const isLastRun = i === line.runs.length - 1;

    if (run.attributes.backgroundColor) {
      const xAdvance = run.xAdvance ?? 0;
      const overflowRight = isLastRun ? line.overflowRight ?? 0 : 0;

      const backgroundRect = {
        x: 0,
        y: -lineAscent,
        height: line.box.height,
        width: xAdvance - overflowRight,
      };

      renderBackground(ctx, backgroundRect, run.attributes.backgroundColor);
    }
    renderRun(ctx, run);
  }

  ctx.restore();
  ctx.save();
  ctx.translate(line.box.x, line.box.y);

  if (line.decorationLines) {
    for (let i = 0; i < line.decorationLines.length; i += 1) {
      const decorationLine = line.decorationLines[i];
      renderDecorationLine(ctx, decorationLine);
    }
  }

  ctx.restore();
};

const renderBlock = (ctx: Context, block: Paragraph) => {
  block.forEach((line) => {
    renderLine(ctx, line);
  });
};

const renderText = (ctx: Context, node: SafeTextNode) => {
  if (!node.box) return;
  if (!node.lines) return;

  const { top, left } = node.box;
  const blocks = [node.lines];
  const paddingTop = node.box?.paddingTop || 0;
  const paddingLeft = node.box?.paddingLeft || 0;
  const initialY = node.lines[0] ? node.lines[0].box!.y : 0;
  const offsetX = node.alignOffset || 0;

  ctx.save();
  ctx.translate(left + paddingLeft - offsetX, top + paddingTop - initialY);

  blocks.forEach((block) => {
    renderBlock(ctx, block);
  });

  ctx.restore();
};

export default renderText;
