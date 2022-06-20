import intersects from '../rect/intersects';
import partition from '../rect/partition';

const getLineFragment = (lineRect, excludeRect) => {
  if (!intersects(excludeRect, lineRect)) return [lineRect];

  const eStart = excludeRect.x;
  const eEnd = excludeRect.x + excludeRect.width;
  const lStart = lineRect.x;
  const lEnd = lineRect.x + lineRect.width;

  const a = Object.assign({}, lineRect, { width: eStart - lStart });
  const b = Object.assign({}, lineRect, { x: eEnd, width: lEnd - eEnd });

  return [a, b].filter(r => r.width > 0);
};

const getLineFragments = (rect, excludeRects) => {
  let fragments = [rect];

  for (let i = 0; i < excludeRects.length; i += 1) {
    const excludeRect = excludeRects[i];

    fragments = fragments.reduce((acc, fragment) => {
      const pieces = getLineFragment(fragment, excludeRect);
      return acc.concat(pieces);
    }, []);
  }

  return fragments;
};

const generateLineRects = (container, height) => {
  const { excludeRects, ...rect } = container;

  if (!excludeRects) return [rect];

  const lineRects = [];
  const maxY = Math.max(...excludeRects.map(r => r.y + r.height));

  let currentRect = rect;

  while (currentRect.y < maxY) {
    const [lineRect, rest] = partition(currentRect, height);
    const lineRectFragments = getLineFragments(lineRect, excludeRects);

    currentRect = rest;
    lineRects.push(...lineRectFragments);
  }

  return [...lineRects, currentRect];
};

export default generateLineRects;
