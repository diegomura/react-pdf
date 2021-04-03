import * as R from 'ramda';
import colorString from 'color-string';

import save from '../operations/save';
import restore from '../operations/restore';
import clipNode from '../operations/clipNode';

const parseColor = hex => {
  const parsed = colorString.get(hex);
  const value = colorString.to.hex(parsed.value.slice(0, 3));
  const opacity = parsed.value[3];

  return { value, opacity };
};

const drawBackground = (ctx, node) => {
  if (node.box && node.style.backgroundColor) {
    const { top, left, width, height } = node.box;
    const color = parseColor(node.style.backgroundColor);
    const opacity = R.defaultTo(color.opacity, node.style?.opacity);

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
