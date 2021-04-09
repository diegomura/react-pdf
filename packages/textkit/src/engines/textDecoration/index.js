/* eslint-disable no-param-reassign */
import * as R from 'ramda';

import runAscent from '../../run/ascent';
import ascent from '../../attributedString/ascent';
import runAdvanceWidth from '../../run/advanceWidth';
import advanceWidth from '../../attributedString/advanceWidth';

// The base font size used for calculating underline thickness.
const BASE_FONT_SIZE = 12;

/**
 * Computes the intersections between an underline and the glyphs in
 * a line fragment. Returns an array of DecorationLines omitting the
 * intersections.
 */
// const intersectWithGlyphs = (line, lineFragment) => {
//   // Find intersection ranges between underline and glyphs
//   let x = 0;
//   let y = lineFragment.ascent;
//   const ranges = [];

//   for (const run of lineFragment.runs) {
//     if (!run.attributes.underline) {
//       x += run.advanceWidth;
//       continue;
//     }

//     for (let i = 0; i < run.glyphs.length; i++) {
//       const position = run.positions[i];

//       if (x >= line.rect.x && x <= line.rect.maxX) {
//         const gx = x + position.xOffset;
//         const gy = y + position.yOffset;

//         // Standard fonts may not have a path to intersect with
//         if (run.glyphs[i].path) {
//           const path = run.glyphs[i].path.scale(run.scale, -run.scale).translate(gx, gy);
//           const range = findPathIntersections(path, line.rect);

//           if (range) {
//             ranges.push(range);
//           }
//         }
//       }

//       x += position.xAdvance;
//       y += position.yAdvance;
//     }
//   }

//   if (ranges.length === 0) {
//     // No intersections. Return the original line.
//     return [line];
//   }

//   const merged = Range.merge(ranges);

//   // Generate underline segments omitting the intersections,
//   // but only if the space warrents an underline.
//   const lines = [];
//   x = line.rect.x;
//   for (const { start, end } of merged) {
//     if (start - x > line.rect.height) {
//       lines.push(line.slice(x, start));
//     }

//     x = end;
//   }

//   if (line.rect.maxX - x > line.rect.height) {
//     lines.push(line.slice(x, line.rect.maxX));
//   }

//   return lines;
// };

// const findIntersectionPoint = (y, x1, y1, x2, y2, range) => {
//   if ((y1 < y && y2 > y) || (y1 > y && y2 < y)) {
//     const x = x1 + ((y - y1) * (x2 - x1)) / (y2 - y1);
//     range.extend(x);
//   }
// };

/**
 * Finds the intersections between a glyph path and an underline rectangle.
 * It models each contour of the path a straight line, and returns a range
 * containing the leftmost and rightmost intersection points, if any.
 */
// const findPathIntersections = (path, rect) => {
//   let sx = 0;
//   let sy = 0;
//   let cx = 0;
//   let cy = 0;
//   let px = 0;
//   let py = 0;
//   const range = new Range(Infinity, -Infinity);
//   const y1 = rect.y;
//   const y2 = rect.maxY;
//   const dialation = Math.ceil(rect.height);

//   for (const { command, args } of path.commands) {
//     switch (command) {
//       case 'moveTo':
//         sx = cx = args[0];
//         sy = cy = args[1];
//         continue;

//       case 'lineTo':
//         px = args[0];
//         py = args[1];
//         break;

//       case 'quadraticCurveTo':
//         px = args[2];
//         py = args[3];
//         break;

//       case 'bezierCurveTo':
//         px = args[4];
//         py = args[5];
//         break;

//       case 'closePath':
//         px = sx;
//         py = sy;
//         break;

//       default:
//         break;
//     }

//     findIntersectionPoint(y1, cx, cy, px, py, range);
//     findIntersectionPoint(y2, cx, cy, px, py, range);

//     if ((cy >= y1 && cy <= y2) || (cy <= y1 && cy >= y2)) {
//       range.extend(cx);
//     }

//     cx = px;
//     cy = py;
//   }

//   if (range.start < range.end) {
//     range.start -= dialation;
//     range.end += dialation;
//     return range;
//   }

//   return null;
// };

/**
 * A TextDecorationEngine is used by a Typesetter to generate
 * DecorationLines for a line fragment, including underlines
 * and strikes.
 */
const textDecoration = () => lineFragment => {
  let x = R.propOr(0, 'overflowLeft', lineFragment);
  const overflowRight = R.propOr(0, 'overflowRight', lineFragment);
  const maxX = advanceWidth(lineFragment) - overflowRight;

  lineFragment.decorationLines = [];

  for (let i = 0; i < lineFragment.runs.length; i += 1) {
    const run = lineFragment.runs[i];

    const width = Math.min(maxX - x, runAdvanceWidth(run));
    const thickness = Math.max(
      0.5,
      Math.floor(run.attributes.fontSize / BASE_FONT_SIZE),
    );

    if (run.attributes.underline) {
      const rect = {
        x,
        y: ascent(lineFragment) + thickness * 2,
        width,
        height: thickness,
      };
      const line = {
        rect,
        opacity: run.attributes.opacity,
        color: run.attributes.underlineColor || 'black',
        style: run.attributes.underlineStyle || 'solid',
      };

      lineFragment.decorationLines.push(line);
    }

    if (run.attributes.strike) {
      const y = ascent(lineFragment) - runAscent(run) / 3;
      const rect = { x, y, width, height: thickness };
      const line = {
        rect,
        opacity: run.attributes.opacity,
        color: run.attributes.strikeColor || 'black',
        style: run.attributes.strikeStyle || 'solid',
      };

      lineFragment.decorationLines.push(line);
    }

    x += width;
  }

  // Adjust underline y positions, and intersect with glyph descenders.
  // for (const line of underlines) {
  //   lineFragment.decorationLines.push(...intersectWithGlyphs(line, lineFragment));
  // }

  return lineFragment;
};

export default textDecoration;
