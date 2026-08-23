import bandInterval from '../shape/bandInterval';
import shapeMaxY from '../shape/maxY';
import partition from '../rect/partition';
import { Container, ExclusionShape, Rect } from '../types';

const getLineFragments = (rect: Rect, shapes: ExclusionShape[]) => {
  let fragments = [rect];

  for (let i = 0; i < shapes.length; i += 1) {
    const shape = shapes[i];
    const interval = bandInterval(shape, rect.y, rect.y + rect.height);

    if (!interval) continue;

    // extend stretches the exclusion to the line edge on the float side,
    // so text never lands between a floated shape and its own margin edge
    const x0 = shape.extend === 'left' ? -Infinity : interval.x0;
    const x1 = shape.extend === 'right' ? Infinity : interval.x1;

    fragments = fragments.reduce((acc: Rect[], fragment) => {
      const fStart = fragment.x;
      const fEnd = fragment.x + fragment.width;

      if (x1 <= fStart || x0 >= fEnd) return acc.concat(fragment);

      const a = Object.assign({}, fragment, { width: x0 - fStart });
      const b = Object.assign({}, fragment, { x: x1, width: fEnd - x1 });

      return acc.concat([a, b].filter((r) => r.width > 0));
    }, []);
  }

  return fragments;
};

const generateLineRects = (container: Container, height: number) => {
  const { exclusions, ...rect } = container;

  if (!exclusions || exclusions.length === 0) return [rect];

  const lineRects: Rect[] = [];
  const maxY = Math.max(...exclusions.map(shapeMaxY));

  let currentRect = rect;

  while (currentRect.y < maxY) {
    const [lineRect, rest] = partition(currentRect, height);
    const lineRectFragments = getLineFragments(lineRect, exclusions);

    currentRect = rest;
    lineRects.push(...lineRectFragments);
  }

  return [...lineRects, currentRect];
};

export default generateLineRects;
