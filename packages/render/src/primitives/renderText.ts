import { isNil } from '@react-pdf/fns';

import renderGlyphs from './renderGlyphs';
import parseColor from '../utils/parseColor';
import { Context } from '../types';
import { SafeTextNode } from '@react-pdf/layout';
import {
  Attachment,
  AttributedString,
  DecorationLine,
  Glyph,
  Paragraph,
  Position,
  Rect,
  Run,
} from '@react-pdf/textkit';
import encodeGlyphs from '../operations/encodeGlyphs';

const DEST_REGEXP = /^#.+/;

const isSrcId = (src: string) => src.match(DEST_REGEXP);

const number = (n: number) => {
  if (n > -1e21 && n < 1e21) {
    return Math.round(n * 1e6) / 1e6;
  }
  throw new Error(`unsupported number: ${n}`);
};

/**
 * Render glyphs vertically (top-to-bottom) for CJK vertical text.
 * Each glyph is positioned individually using the Tm operator.
 *
 * Coordinate system: renderLine has already translated the CTM to the
 * column's (x, y).  We apply the same y-flip as horizontal renderGlyphs
 * (`transform(1,0,0,-1,0, pageHeight)`).  In the flipped space,
 * y = pageHeight maps back to the CTM origin (top of column) and
 * decreasing y moves DOWN the page.
 *
 * @returns {number} Total vertical advance in points.
 */
const renderGlyphsVertical = (
  ctx: Context,
  glyphs: Glyph[],
  positions: Position[],
  fontSize: number,
): number => {
  const unitsPerEm = ctx._font.font.unitsPerEm || 1000;
  const encodedGlyphs = encodeGlyphs(ctx._font, glyphs);
  const scale = fontSize / unitsPerEm;

  ctx.save();

  // Flip coordinate system (same as horizontal renderGlyphs)
  ctx.transform(1, 0, 0, -1, 0, ctx.page.height);

  // Add font to page if necessary
  if (ctx.page.fonts[ctx._font.id] == null) {
    ctx.page.fonts[ctx._font.id] = ctx._font.ref();
  }

  ctx.addContent('BT');
  ctx.addContent(`/${ctx._font.id} ${number(fontSize)} Tf`);

  // In the flipped coordinate space, y = pageHeight corresponds to the
  // CTM origin (the top of the column that renderLine translated to).
  // Each glyph advances downward (decreasing y in flipped space).
  let y = ctx.page.height;
  let totalAdvance = 0;

  for (let i = 0; i < encodedGlyphs.length; i += 1) {
    const pos = positions[i];

    // Glyph width in points (advanceWidth is in font units)
    const glyphWidth = (glyphs[i].advanceWidth * fontSize) / unitsPerEm;

    // Center the glyph horizontally within the column
    const x = (fontSize - glyphWidth) / 2;

    ctx.addContent(
      `1 0 0 1 ${number(x + (pos.xOffset || 0) * scale)} ${number(y + (pos.yOffset || 0) * scale)} Tm`,
    );
    ctx.addContent(`<${encodedGlyphs[i]}> Tj`);

    // In vertical CJK text each character occupies one em-height (fontSize).
    // Use the larger of the horizontal advance and fontSize to guarantee
    // glyphs never overlap, even when the font isn't fully loaded or when
    // proportional characters are mixed with full-width ones.
    const advance = Math.max(pos.xAdvance || 0, fontSize);
    y -= advance;
    totalAdvance += advance;
  }

  ctx.addContent('ET');
  ctx.restore();

  return totalAdvance;
};

const renderAttachment = (ctx: Context, attachment: Attachment) => {
  const { xOffset = 0, yOffset = 0, width, height, image } = attachment;

  ctx.translate(-width + xOffset, -height + yOffset);

  ctx.image(image, 0, 0, {
    fit: [width, height],
    align: 'center',
    valign: 'bottom',
  });
};

const renderAttachments = (ctx: Context, run: Run, glyphs: Run['glyphs']) => {
  if (!glyphs) return;
  if (!run.positions) return;

  const font = run.attributes.font?.[0];
  if (!font) return;

  ctx.save();

  const space = font.glyphForCodePoint(0x20);
  const objectReplacement = font.glyphForCodePoint(0xfffc);

  let attachmentAdvance = 0;
  for (let i = 0; i < glyphs.length; i += 1) {
    const position = run.positions[i];
    const glyph = glyphs[i];

    attachmentAdvance += position.xAdvance || 0;

    if (glyph.id === objectReplacement.id && run.attributes.attachment) {
      ctx.translate(attachmentAdvance, position.yOffset || 0);
      renderAttachment(ctx, run.attributes.attachment);
      glyphs[i] = space;
      attachmentAdvance = 0;
    }
  }

  ctx.restore();
};

const calcVerticalRunAdvance = (run: Run): number => {
  if (!run.positions || !run.attributes.fontSize) return 0;
  const fontSize = run.attributes.fontSize;
  let advance = 0;
  for (const pos of run.positions) {
    advance += Math.max(pos.xAdvance || 0, fontSize);
  }
  return advance;
};

const renderRun = (ctx: Context, run: Run, vertical = false) => {
  if (!run.glyphs) return;
  if (!run.positions) return;

  const font = run.attributes.font?.[0];
  if (!font) return;

  const { fontSize, link } = run.attributes;
  const color = parseColor(run.attributes.color);
  const opacity = isNil(run.attributes.opacity)
    ? color.opacity
    : run.attributes.opacity;

  const { height = 0, descent = 0, xAdvance = 0 } = run;

  ctx.fillColor(color.value);
  ctx.fillOpacity(opacity);

  if (link) {
    if (vertical) {
      const runAdvance = calcVerticalRunAdvance(run);
      const columnWidth = fontSize || 12;
      if (isSrcId(link)) {
        ctx.goTo(0, 0, columnWidth, runAdvance, link.slice(1));
      } else {
        ctx.link(0, 0, columnWidth, runAdvance, link);
      }
    } else if (isSrcId(link)) {
      ctx.goTo(0, -height - descent, xAdvance, height, link.slice(1));
    } else {
      ctx.link(0, -height - descent, xAdvance, height, link);
    }
  }

  // Copy glyphs to avoid mutating the original array
  const glyphs = [...run.glyphs];

  renderAttachments(ctx, run, glyphs);

  ctx.font(font.type === 'STANDARD' ? font.fullName : font, fontSize);

  if (vertical) {
    const advance = renderGlyphsVertical(ctx, glyphs, run.positions!, fontSize || 12);
    // Advance the CTM downward so the next run in this column
    // starts below the current one (analogous to horizontal ctx.translate(xAdvance, 0)).
    ctx.translate(0, advance);
  } else {
    try {
      renderGlyphs(ctx, glyphs, run.positions!, 0, 0);
    } catch (error) {
      console.log(error);
    }

    ctx.translate(xAdvance, 0);
  }
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
  const color = parseColor(decorationLine.color);

  const opacity = isNil(decorationLine.opacity)
    ? color.opacity
    : decorationLine.opacity;

  ctx.save();
  ctx.lineWidth(decorationLine.rect.height);
  ctx.strokeOpacity(opacity);

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

  ctx.stroke(color.value);
  ctx.restore();
};

const renderLine = (ctx: Context, line: AttributedString, vertical = false) => {
  if (!line.box) return;

  const lineAscent = line.ascent || 0;

  ctx.save();

  if (vertical) {
    // For vertical text, the line box represents a column
    // x = column's horizontal position, y = top of column
    ctx.translate(line.box.x, line.box.y);
  } else {
    ctx.translate(line.box.x, line.box.y + lineAscent);
  }

  for (let i = 0; i < line.runs.length; i += 1) {
    const run = line.runs[i];
    const isLastRun = i === line.runs.length - 1;

    if (run.attributes.backgroundColor) {
      const xAdvance = run.xAdvance ?? 0;
      const overflowRight = isLastRun ? line.overflowRight ?? 0 : 0;

      if (vertical) {
        const runAdvance = calcVerticalRunAdvance(run);
        const backgroundRect = {
          x: 0,
          y: 0,
          width: line.box.width,
          height: runAdvance,
        };
        renderBackground(ctx, backgroundRect, run.attributes.backgroundColor);
      } else {
        const backgroundRect = {
          x: 0,
          y: -lineAscent,
          height: line.box.height,
          width: xAdvance - overflowRight,
        };
        renderBackground(ctx, backgroundRect, run.attributes.backgroundColor);
      }
    }
    renderRun(ctx, run, vertical);
  }

  ctx.restore();

  if (!vertical) {
    ctx.save();
    ctx.translate(line.box.x, line.box.y);

    if (line.decorationLines) {
      for (let i = 0; i < line.decorationLines.length; i += 1) {
        const decorationLine = line.decorationLines[i];
        renderDecorationLine(ctx, decorationLine);
      }
    }

    ctx.restore();
  }
};

const renderBlock = (ctx: Context, block: Paragraph, vertical = false) => {
  block.forEach((line) => {
    renderLine(ctx, line, vertical);
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
  const vertical =
    node.style?.writingMode === 'vertical-rl' ||
    node.style?.writingMode === 'vertical-lr';

  ctx.save();
  ctx.translate(left + paddingLeft - offsetX, top + paddingTop - (vertical ? 0 : initialY));

  blocks.forEach((block) => {
    renderBlock(ctx, block, vertical);
  });

  ctx.restore();
};

export default renderText;
