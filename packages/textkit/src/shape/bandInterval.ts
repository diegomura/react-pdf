import { Coordinate, ExclusionShape } from '../types';

export type Interval = { x0: number; x1: number };

const ellipseInterval = (
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  y0: number,
  y1: number,
): Interval | null => {
  if (y1 <= cy - ry || y0 >= cy + ry) return null;

  // The ellipse is widest at the band y closest to its center
  const y = Math.min(Math.max(cy, y0), y1);
  const t = ry === 0 ? 0 : (y - cy) / ry;
  const halfWidth = rx * Math.sqrt(1 - t * t);

  return { x0: cx - halfWidth, x1: cx + halfWidth };
};

const polygonInterval = (
  points: Coordinate[],
  y0: number,
  y1: number,
): Interval | null => {
  const xs: number[] = [];

  for (let i = 0; i < points.length; i += 1) {
    const a = points[i];
    const b = points[(i + 1) % points.length];

    if (a.y >= y0 && a.y <= y1) xs.push(a.x);

    const crossings = [y0, y1];

    for (let j = 0; j < crossings.length; j += 1) {
      const y = crossings[j];
      if ((a.y < y && b.y > y) || (a.y > y && b.y < y)) {
        xs.push(a.x + ((y - a.y) / (b.y - a.y)) * (b.x - a.x));
      }
    }
  }

  if (xs.length === 0) return null;

  return { x0: Math.min(...xs), x1: Math.max(...xs) };
};

/**
 * Horizontal extent a shape occupies within the y band [y0, y1].
 * Conservative for polygons: concavities inside a band are filled,
 * matching line-granularity flow in browsers.
 *
 * @param shape - Exclusion shape
 * @param y0 - Band top
 * @param y1 - Band bottom
 * @returns Occupied x interval, or null if the shape misses the band
 */
const bandInterval = (
  shape: ExclusionShape,
  y0: number,
  y1: number,
): Interval | null => {
  let interval: Interval | null;

  if (shape.type === 'ellipse') {
    interval = ellipseInterval(shape.cx, shape.cy, shape.rx, shape.ry, y0, y1);
  } else if (shape.type === 'polygon') {
    interval = polygonInterval(shape.points, y0, y1);
  } else {
    interval =
      y1 <= shape.y || y0 >= shape.y + shape.height
        ? null
        : { x0: shape.x, x1: shape.x + shape.width };
  }

  if (!interval || interval.x1 - interval.x0 <= 0) return null;

  return interval;
};

export default bandInterval;
