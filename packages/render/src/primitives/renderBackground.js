import { isNil } from '@react-pdf/fns';

import clipNode from '../operations/clipNode';
import parseColor from '../utils/parseColor';

const drawBackground = (ctx, node) => {
  const { top, left, width, height } = node.box;
  const color = parseColor(node.style.backgroundColor);
  const nodeOpacity = isNil(node.style?.opacity) ? 1 : node.style.opacity;
  const opacity = Math.min(color.opacity, nodeOpacity);

  ctx
    .fillOpacity(opacity)
    .fillColor(color.value)
    .rect(left, top, width, height)
    .fill();
};

const drawBackgroundImage = (ctx, node) => {
  const { top, left, width, height } = node.box;
  const opacity = isNil(node.style?.opacity) ? 1 : node.style.opacity;
  const image = node?.backgroundImage;
  ctx
    .fillOpacity(opacity)
    .image(image, left, top , {
      fit: [width, height],
      align: 'center',
      valign: 'center',
    });
};

const renderBackground = (ctx, node) => {
  const hasBackground = !!node.box && !!node.style?.backgroundColor;

  if (hasBackground) {
    ctx.save();
    clipNode(ctx, node);
    drawBackground(ctx, node);
    ctx.restore();
  }

  const hasBackgroundImage = !!node.box && !!node.style?.backgroundImage;

  if (hasBackgroundImage) {
    ctx.save();
    // clipNode(ctx, node);
    drawBackgroundImage(ctx, node);
    ctx.restore();
  }
};

export default renderBackground;
