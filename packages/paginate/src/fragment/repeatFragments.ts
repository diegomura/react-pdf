import toFragments from './toFragments';
import isRepeat from '../item/isRepeat';
import { FillResult, Fragment, Item, PlacedItem } from '../types';

const fullyPlaced = (placed: PlacedItem[], item: Item) =>
  placed.some((p) => p.item === item && p.part.isLast);

// Fresh fragments of the container's completed repeat children, prepended to
// its continuation. Only an item that fully placed on this page re-emits: a
// mid-split item continues its own remainder instead, and an unplaced one is
// still in `remaining` and needs no copy. A materialized fragment re-emits
// its source lazy instead of its own item, so the lazy re-materializes next
// page with a fresh page number.
const repeatFragments = (fragment: Fragment, inner: FillResult): Fragment[] => {
  // A page that placed nothing but repeats made no progress — stop repeating
  // so content can advance (MAX_PAGES remains the backstop). Once dropped,
  // the items are gone from children and repetition ends for this container.
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
