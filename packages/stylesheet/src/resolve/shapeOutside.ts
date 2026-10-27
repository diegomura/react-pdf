import transformUnit from '../utils/units';
import {
  Container,
  Percentage,
  SafeStyle,
  ShapeOutside,
  ShapeRadius,
  ShapeScalar,
  Style,
  StyleKey,
} from '../types';

const H_KEYWORDS: Record<string, Percentage> = {
  left: '0%',
  center: '50%',
  right: '100%',
};

const V_KEYWORDS: Record<string, Percentage> = {
  top: '0%',
  center: '50%',
  bottom: '100%',
};

const splitTokens = (value: string): string[] =>
  value.trim().split(/\s+/).filter(Boolean);

const toScalar = (container: Container, token: string): ShapeScalar =>
  transformUnit(container, token) as ShapeScalar;

const parsePosition = (container: Container, position: string | undefined) => {
  let [x = 'center', y = 'center'] = position ? splitTokens(position) : [];

  if (x === 'top' || x === 'bottom' || y === 'left' || y === 'right') {
    [x, y] = [y, x];
  }

  return {
    cx: H_KEYWORDS[x] ?? toScalar(container, x),
    cy: V_KEYWORDS[y] ?? toScalar(container, y),
  };
};

const parseRadius = (container: Container, token: string): ShapeRadius => {
  if (!token || token === 'closest-side') return 'closest-side';
  if (token === 'farthest-side') return 'farthest-side';
  return toScalar(container, token);
};

const parseCircle = (container: Container, args: string): ShapeOutside => {
  const [radius, position] = args.split(/\bat\b/);

  return {
    type: 'circle',
    ...parsePosition(container, position),
    r: parseRadius(container, radius.trim()),
  };
};

const parseEllipse = (container: Container, args: string): ShapeOutside => {
  const [radii, position] = args.split(/\bat\b/);
  const [rx = '', ry = ''] = splitTokens(radii);

  return {
    type: 'ellipse',
    ...parsePosition(container, position),
    rx: parseRadius(container, rx),
    ry: parseRadius(container, ry),
  };
};

const parsePolygon = (
  container: Container,
  args: string,
): ShapeOutside | null => {
  const parts = args.split(',').map((part) => part.trim());

  if (parts[0] === 'nonzero' || parts[0] === 'evenodd') parts.shift();

  const points = parts.filter(Boolean).map((pair) => {
    const [x = '0', y = '0'] = splitTokens(pair);
    return { x: toScalar(container, x), y: toScalar(container, y) };
  });

  return points.length < 3 ? null : { type: 'polygon', points };
};

const parseInset = (
  container: Container,
  args: string,
): ShapeOutside | null => {
  const tokens = splitTokens(args.split(/\bround\b/)[0]);

  if (tokens.length === 0) return null;

  const [t, r = t, b = t, l = r] = tokens;

  return {
    type: 'inset',
    top: toScalar(container, t),
    right: toScalar(container, r),
    bottom: toScalar(container, b),
    left: toScalar(container, l),
  };
};

/**
 * Parse a CSS shape-outside basic shape. Lengths resolve to points here;
 * percentages and side keywords stay symbolic because they depend on the
 * float's laid-out box, which layout resolves later.
 * Unsupported values (url(), reference boxes, malformed input) drop the
 * property so layout falls back to the plain box exclusion.
 */
const parseShapeOutside = (
  container: Container,
  value: string,
): ShapeOutside | null => {
  const match = /^([a-z-]+)\((.*)\)$/i.exec(value.trim());

  if (!match) return null;

  const [, fn, args] = match;

  switch (fn) {
    case 'circle':
      return parseCircle(container, args);
    case 'ellipse':
      return parseEllipse(container, args);
    case 'polygon':
      return parsePolygon(container, args);
    case 'inset':
      return parseInset(container, args);
    default:
      return null;
  }
};

const processShapeOutside = (
  key: StyleKey,
  value: Style['shapeOutside'],
  container: Container,
): SafeStyle => {
  if (!value) return {};

  const shape =
    typeof value === 'string' ? parseShapeOutside(container, value) : value;

  return shape ? { shapeOutside: shape } : {};
};

const handlers = {
  shapeOutside: processShapeOutside,
};

export default handlers;
