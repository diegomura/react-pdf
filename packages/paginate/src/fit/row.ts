import isRow from '../item/isRow';
import isColumn from '../item/isColumn';
import isLeaf from '../item/isLeaf';
import hasContentAbove from '../fill/hasContentAbove';
import fill from '../fill/fill';
import fragmentHeight from '../fragment/height';
import reach from '../fragment/reach';
import repeatFragments from '../fragment/repeatFragments';
import {
  FillResult,
  Fragment,
  PlacedItem,
  RowItem,
  State,
  StepResult,
} from '../types';
import { CONTINUE, DECLINE, DONE } from '../step';

// Place every row child side by side at y=0. A break is one horizontal cut
// through all children at `height`: each keeps what fits above the line, and
// only children with leftovers reappear in the continuation. Returns null
// when a child can't fit or break — the whole row moves together.
export const place = (
  rowFragment: Fragment,
  height: number,
  pageNumber: number,
  canForce = false,
  contentAbove = false,
): FillResult | null => {
  const placed: PlacedItem[] = [];
  const remaining: Fragment[] = [];

  for (const childFragment of rowFragment.children) {
    const child = childFragment.item;
    const { isFirst } = childFragment;

    if (isRow(child) || isColumn(child)) {
      const inner = fill(
        childFragment.children,
        height,
        pageNumber,
        canForce,
        contentAbove,
      );
      const broke = inner.remaining.length > 0;

      // Children sit side by side, so one contributing nothing can't be
      // fixed by breaking — the whole row has to move.
      if (broke && inner.placed.length === 0) return null;

      placed.push({
        item: child,
        y: 0,
        height: broke ? height : reach(inner.placed),
        part: { isFirst, isLast: !broke },
        children: inner.placed,
      });

      if (broke) {
        const repeats = repeatFragments(childFragment, inner, contentAbove);

        remaining.push({
          item: child,
          isFirst: false,
          children: [...repeats, ...inner.remaining],
        });
      }

      continue;
    }

    // A leaf taller than the cut line must split exactly there; declining
    // would leave this child behind while its siblings move on.
    if (isLeaf(child) && child.height > height) {
      const split = child.split?.(height) ?? null;

      if (split === null) return null;

      placed.push({
        item: split.current,
        y: 0,
        height,
        part: { isFirst, isLast: false },
      });
      remaining.push({ item: split.next, isFirst: false, children: [] });

      continue;
    }

    placed.push({
      item: child,
      y: 0,
      height: fragmentHeight({ item: child, isFirst, children: [] }),
      part: { isFirst, isLast: true },
    });
  }

  return { placed, remaining };
};

// Place the row's children into the space left on the page. Declines when
// any child can't fit or break, so the row moves whole to the next page.
const fit = (state: State, fragment: Fragment, index: number): StepResult => {
  const { isFirst } = fragment;
  const item = fragment.item as RowItem;

  const availableHeight = state.height - state.usedHeight;

  if (availableHeight <= 0) return DECLINE();

  const canForce = state.canForce && state.placed.length === 0;
  const contentAbove = hasContentAbove(state);
  const inner = place(
    fragment,
    availableHeight,
    state.pageNumber,
    canForce,
    contentAbove,
  );

  if (inner === null) return DECLINE();

  const broke = inner.remaining.length > 0;

  // A row slice is a break at the page bottom — not allowed inside a window.
  if (broke && state.height < state.forbidUntil) return DECLINE();

  state.placed.push({
    item,
    y: state.usedHeight,
    height: broke
      ? availableHeight
      : inner.placed.reduce((acc, child) => Math.max(acc, child.height), 0),
    part: { isFirst, isLast: !broke },
    children: inner.placed,
  });

  if (!broke) return CONTINUE();

  const continuation: Fragment = {
    item,
    isFirst: false,
    children: inner.remaining,
  };

  return DONE({
    placed: state.placed,
    remaining: [continuation, ...state.fragments.slice(index + 1)],
  });
};

export default fit;
