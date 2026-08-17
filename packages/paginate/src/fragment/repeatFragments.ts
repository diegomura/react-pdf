import toFragments from './toFragments';
import isRepeat from '../item/isRepeat';
import { FillResult, Fragment, Item, PlacedItem } from '../types';

const fullyPlaced = (placed: PlacedItem[], item: Item) =>
  placed.some((p) => p.item === item && p.part.isLast);

// Fresh fragments of the repeat children that fully placed on this page,
// for the head of the continuation. Mid-split and unplaced items already
// carry over on their own. Materialized fragments re-emit their source
// lazy, so it materializes again with the next page number.
const repeatFragments = (fragment: Fragment, inner: FillResult): Fragment[] => {
  // A page holding only repeats made no progress — stop repeating so
  // content can advance.
  const isRepeatPlacement = (p: PlacedItem) =>
    isRepeat(p.item) ||
    fragment.children.some((f) => f.origin !== undefined && f.item === p.item);

  if (inner.placed.length > 0 && inner.placed.every(isRepeatPlacement))
    return [];

  const sources: Item[] = [];

  for (const child of fragment.children) {
    if (child.origin !== undefined) {
      const { origin } = child;
      if (sources.includes(origin)) continue;

      const output = fragment.children.filter((f) => f.origin === origin);
      if (output.every((f) => fullyPlaced(inner.placed, f.item)))
        sources.push(origin);
    } else if (isRepeat(child.item) && fullyPlaced(inner.placed, child.item)) {
      sources.push(child.item);
    }
  }

  return toFragments(sources);
};

export default repeatFragments;
