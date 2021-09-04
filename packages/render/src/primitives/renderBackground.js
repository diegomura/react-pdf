import * as R from 'ramda';

import save from '../operations/save';
import restore from '../operations/restore';
import clipNode from '../operations/clipNode';
import parseColor from '../utils/parseColor';

const drawBackground = (ctx, node) => {
  if (node.box && node.style.backgroundColor) {
    const { top, left, width, height } = node.box;
    const color = parseColor(node.style.backgroundColor);
    const nodeOpacity = R.isNil(node.style?.opacity) ? 1 : node.style.opacity;
    const opacity = Math.min(color.opacity, nodeOpacity);

    ctx
      .fillOpacity(opacity)
      .fillColor(color.value)
      .rect(left, top, width, height)
      .fill();
  }

  return node;
};

const renderBackground = (ctx, node) => {
  const hasBackground = !!node.box && !!node.style?.backgroundColor;

  if (hasBackground) {
    save(ctx, node);
    clipNode(ctx, node);
    drawBackground(ctx, node);
    restore(ctx, node);
  }

  return node;
};

export default R.curryN(2, renderBackground);
