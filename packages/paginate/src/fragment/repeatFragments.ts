import toFragments from './toFragments';
import isRepeat from '../item/isRepeat';
import { FillResult, Fragment, Item, PlacedItem } from '../types';

const fullyPlaced = (placed: PlacedItem[], item: Item) =>
  placed.some((p) => p.item === item && p.part.isLast);

// Fresh copies of the repeat children that fully placed on this page, to
// head the continuation. Mid-split and unplaced items carry over on their
// own; materialized ones re-emit their source lazy for the next page.
const repeatFragments = (
  fragment: Fragment,
  inner: FillResult,
  contentAbove: boolean,
): Fragment[] => {
  // A fill that placed only repeats, with nothing but repeats above it,
  // would recur identically forever — stop repeating so content can advance.
  // Below real content the page was just nearly full; keep repeating.
  const isRepeatPlacement = (p: PlacedItem) =>
    isRepeat(p.item) ||
    fragment.children.some((f) => f.origin !== undefined && f.item === p.item);

  if (
    !contentAbove &&
    inner.placed.length > 0 &&
    inner.placed.every(isRepeatPlacement)
  )
    return [];

  const sources: Item[] = [];

  for (const child of fragment.children) {
    if (child.origin !== undefined) {
      const { origin } = child;
      if (sources.includes(origin)) continue;

      const output = fragment.children.filter((f) => f.origin === origin);
      if (output.every((f) => fullyPlaced(inner.placed, f.item)))
        sources.push(origin);

      continue;
    }

    if (isRepeat(child.item) && fullyPlaced(inner.placed, child.item)) {
      sources.push(child.item);
    }
  }

  return toFragments(sources);
};

export default repeatFragments;
