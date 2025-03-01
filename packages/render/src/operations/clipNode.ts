// This constant is used to approximate a symmetrical arc using a cubic

import { SafeNode } from '@react-pdf/layout';
import { Context } from '../types';

// Bezier curve.
const KAPPA = 4.0 * ((Math.sqrt(2) - 1.0) / 3.0);

const clipNode = (ctx: Context, node: SafeNode) => {
  if (!node.box) return;
  if (!node.style) return;

  const { top, left, width, height } = node.box;

  const {
    borderTopLeftRadius = 0,
    borderTopRightRadius = 0,
    borderBottomRightRadius = 0,
    borderBottomLeftRadius = 0,
  } = node.style;

  // Border top
  // @ts-expect-error this is always a number due to resolve border radius step
  const rtr = Math.min(borderTopRightRadius, 0.5 * width, 0.5 * height);
  const ctr = rtr * (1.0 - KAPPA);

  ctx.moveTo(left + rtr, top);
  ctx.lineTo(left + width - rtr, top);
  ctx.bezierCurveTo(
    left + width - ctr,
    top,
    left + width,
    top + ctr,
    left + width,
    top + rtr,
  );

  // Border right
  // @ts-expect-error this is always a number due to resolve border radius step
  const rbr = Math.min(borderBottomRightRadius, 0.5 * width, 0.5 * height);
  const cbr = rbr * (1.0 - KAPPA);

  ctx.lineTo(left + width, top + height - rbr);
  ctx.bezierCurveTo(
    left + width,
    top + height - cbr,
    left + width - cbr,
    top + height,
    left + width - rbr,
    top + height,
  );

  // Border bottom
  // @ts-expect-error this is always a number due to resolve border radius step
  const rbl = Math.min(borderBottomLeftRadius, 0.5 * width, 0.5 * height);
  const cbl = rbl * (1.0 - KAPPA);

  ctx.lineTo(left + rbl, top + height);
  ctx.bezierCurveTo(
    left + cbl,
    top + height,
    left,
    top + height - cbl,
    left,
    top + height - rbl,
  );

  // Border left
  // @ts-expect-error this is always a number due to resolve border radius step
  const rtl = Math.min(borderTopLeftRadius, 0.5 * width, 0.5 * height);
  const ctl = rtl * (1.0 - KAPPA);

  ctx.lineTo(left, top + rtl);
  ctx.bezierCurveTo(left, top + ctl, left + ctl, top, left + rtl, top);
  ctx.closePath();
  ctx.clip();
};

export default clipNode;
