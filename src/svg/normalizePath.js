import arcToCurve from 'svg-arc-to-cubic-bezier';

// From https://github.com/jkroso/normalize-svg-path/blob/master/index.js
// Copied here because an import issue with 'svg-arc-to-cubic-bezier'
const normalizePath = path => {
  const result = [];

  let prev;
  let bezierX = 0;
  let bezierY = 0;
  let startX = 0;
  let startY = 0;
  let quadX = null;
  let quadY = null;
  let x = 0;
  let y = 0;

  for (let i = 0, len = path.length; i < len; i++) {
    let seg = path[i];
    const command = seg[0];

    switch (command) {
      case 'M':
        startX = seg[1];
        startY = seg[2];
        break;
      case 'A':
        const curves = arcToCurve({
          px: x,
          py: y,
          cx: seg[6],
          cy: seg[7],
          rx: seg[1],
          ry: seg[2],
          xAxisRotation: seg[3],
          largeArcFlag: seg[4],
          sweepFlag: seg[5],
        });

        // null-curves
        if (!curves.length) continue;

        for (let j = 0, c; j < curves.length; j++) {
          c = curves[j];
          seg = ['C', c.x1, c.y1, c.x2, c.y2, c.x, c.y];
          if (j < curves.length - 1) result.push(seg);
        }

        break;
      case 'S':
        // default control point
        let cx = x;
        let cy = y;
        if (prev === 'C' || prev === 'S') {
          cx += cx - bezierX; // reflect the previous command's control
          cy += cy - bezierY; // point relative to the current point
        }
        seg = ['C', cx, cy, seg[1], seg[2], seg[3], seg[4]];
        break;
      case 'T':
        if (prev === 'Q' || prev === 'T') {
          quadX = x * 2 - quadX; // as with 'S' reflect previous control point
          quadY = y * 2 - quadY;
        } else {
          quadX = x;
          quadY = y;
        }
        seg = quadratic(x, y, quadX, quadY, seg[1], seg[2]);
        break;
      case 'Q':
        quadX = seg[1];
        quadY = seg[2];
        seg = quadratic(x, y, seg[1], seg[2], seg[3], seg[4]);
        break;
      case 'L':
        seg = line(x, y, seg[1], seg[2]);
        break;
      case 'H':
        seg = line(x, y, seg[1], y);
        break;
      case 'V':
        seg = line(x, y, x, seg[1]);
        break;
      case 'Z':
        seg = line(x, y, startX, startY);
        break;
      default:
        break;
    }

    // update state
    prev = command;
    x = seg[seg.length - 2];
    y = seg[seg.length - 1];
    if (seg.length > 4) {
      bezierX = seg[seg.length - 4];
      bezierY = seg[seg.length - 3];
    } else {
      bezierX = x;
      bezierY = y;
    }
    result.push(seg);
  }

  return result;
};

const line = (x1, y1, x2, y2) => {
  return ['C', x1, y1, x2, y2, x2, y2];
};

const quadratic = (x1, y1, cx, cy, x2, y2) => {
  return [
    'C',
    x1 / 3 + (2 / 3) * cx,
    y1 / 3 + (2 / 3) * cy,
    x2 / 3 + (2 / 3) * cx,
    y2 / 3 + (2 / 3) * cy,
    x2,
    y2,
  ];
};

export default normalizePath;
