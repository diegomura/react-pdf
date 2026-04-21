import { isNil } from '@react-pdf/fns';

import clipNode from '../operations/clipNode';
import parseColor from '../utils/parseColor';
import { Context } from '../types';
import { SafeNode } from '@react-pdf/layout';

// Small bleed to prevent anti-aliasing artifacts between adjacent elements.
// PDF viewers often render a thin hairline gap between shapes that share
// an exact edge. Expanding the fill slightly creates overlap that masks this.
// 0.5pt ≈ 0.18mm — invisible to the eye but enough to cover the artifact.
const BLEED = 0.5;

const hasBorderRadius = (node: SafeNode) => {
  const s = node.style;
  return (
    ((s?.borderTopLeftRadius as number) || 0) > 0 ||
    ((s?.borderTopRightRadius as number) || 0) > 0 ||
    ((s?.borderBottomRightRadius as number) || 0) > 0 ||
    ((s?.borderBottomLeftRadius as number) || 0) > 0
  );
};

const drawBackground = (ctx: Context, node: SafeNode) => {
  if (!node.box) return;

  const { top, left, width, height } = node.box;
  const color = parseColor(node.style.backgroundColor);
  const nodeOpacity = isNil(node.style?.opacity) ? 1 : node.style.opacity;
  const opacity = Math.min(color.opacity, nodeOpacity);

  ctx.fillOpacity(opacity).fillColor(color.value);

  if (hasBorderRadius(node)) {
    ctx.rect(left, top, width, height).fill();
  } else {
    ctx
      .rect(left - BLEED, top - BLEED, width + 2 * BLEED, height + 2 * BLEED)
      .fill();
  }
};

const renderBackground = (ctx: Context, node: SafeNode) => {
  const hasBackground = !!node.box && !!node.style?.backgroundColor;

  if (hasBackground) {
    ctx.save();
    if (hasBorderRadius(node)) clipNode(ctx, node);
    drawBackground(ctx, node);
    ctx.restore();
  }
};

export default renderBackground;
