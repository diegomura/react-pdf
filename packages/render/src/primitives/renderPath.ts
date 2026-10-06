import { SafePathNode } from '@react-pdf/layout';
import absPath from 'abs-svg-path';
import parsePath from 'parse-svg-path';

import { Context } from '../types';

/**
 * pdfkit mishandles chained smooth quadratic commands (T): after drawing it
 * reflects the control point a second time, so every T after the first uses a
 * stale control point and curves render deformed. Expand T into explicit Q
 * commands with the correct reflection before handing the path to pdfkit.
 */
type Segment = (string | number)[];

const expandSmoothQuadratics = (d: string): string => {
  const segments: Segment[] = absPath(parsePath(d));

  let x = 0;
  let y = 0;
  let startX = 0;
  let startY = 0;
  let quadX: number | null = null;
  let quadY: number | null = null;

  const out = segments.map((segment: Segment) => {
    let seg = segment;
    const command = seg[0];

    if (command === 'T') {
      const cx = quadX === null ? x : 2 * x - quadX;
      const cy = quadY === null ? y : 2 * y - quadY;
      seg = ['Q', cx, cy, seg[1], seg[2]];
      quadX = cx;
      quadY = cy;
    } else if (command === 'Q') {
      quadX = seg[1] as number;
      quadY = seg[2] as number;
    } else {
      quadX = null;
      quadY = null;
    }

    if (command === 'M') {
      startX = seg[1] as number;
      startY = seg[2] as number;
    }

    if (command === 'H') {
      x = seg[1] as number;
    } else if (command === 'V') {
      y = seg[1] as number;
    } else if (command === 'Z') {
      x = startX;
      y = startY;
    } else {
      x = seg[seg.length - 2] as number;
      y = seg[seg.length - 1] as number;
    }

    return seg;
  });

  return out.map((seg: Segment) => seg[0] + seg.slice(1).join(' ')).join('');
};

const renderPath = (ctx: Context, node: SafePathNode) => {
  const d = node.props?.d;

  if (!d) return;

  ctx.path(/[Tt]/.test(d) ? expandSmoothQuadratics(d) : d);
};

export default renderPath;
