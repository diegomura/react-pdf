import isRow from '../item/isRow';
import isColumn from '../item/isColumn';
import isLazy from '../item/isLazy';
import isPenalty from '../item/isPenalty';
import { Fragment } from '../types';

// Measures the children still to place (fragment.children), not the
// original item's — a continuation is shorter than the item it came from.
const height = (fragment: Fragment): number => {
  const { item } = fragment;

  if (isPenalty(item) || isLazy(item)) return 0;

  if (isRow(item)) {
    return fragment.children.reduce(
      (acc, child) => Math.max(acc, height(child)),
      0,
    );
  }

  if (isColumn(item)) {
    return fragment.children.reduce((acc, child) => acc + height(child), 0);
  }

  return item.height;
};

export default height;
