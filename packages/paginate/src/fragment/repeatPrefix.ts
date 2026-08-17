import toFragments from './toFragments';
import isRepeat from '../item/isRepeat';
import { FillResult, Fragment, Item, PlacedItem } from '../types';

const fullyPlaced = (placed: PlacedItem[], item: Item) =>
  placed.some((p) => p.item === item && p.part.isLast);

// Fresh fragments of the container's completed repeat children, prepended to
// its continuation. Only an item that fully placed on this page re-emits: a
// mid-split item continues its own remainder instead, and an unplaced one is
// still in `remaining` and needs no copy.
const repeatPrefix = (fragment: Fragment, inner: FillResult): Fragment[] => {
  const completed = fragment.children
    .map((child) => child.item)
    .filter((item) => isRepeat(item) && fullyPlaced(inner.placed, item));

  return toFragments(completed);
};

export default repeatPrefix;
