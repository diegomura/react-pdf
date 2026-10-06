import fill from '../fill/fill';
import reach from '../fragment/reach';
import repeatFragments from '../fragment/repeatFragments';
import hasContentAbove from '../fill/hasContentAbove';
import { CONTINUE, DECLINE, DONE } from '../step';
import { ColumnItem, Fragment, State, StepResult } from '../types';

// Fill the column's children into the space left on the page. Declines when
// nothing places, so the column moves whole to the next page.
const fit = (state: State, fragment: Fragment, index: number): StepResult => {
  const { isFirst } = fragment;
  const item = fragment.item as ColumnItem;

  const availableHeight = state.height - state.usedHeight;

  if (availableHeight <= 0) return DECLINE();

  // Children may only force-place if this column is the first thing on the
  // page; anywhere else, moving to the next page is still an option.
  const canForce = state.canForce && state.placed.length === 0;

  const contentAbove = hasContentAbove(state);

  const inner = fill(
    fragment.children,
    availableHeight,
    state.pageNumber,
    canForce,
    contentAbove,
  );

  const broke = inner.remaining.length > 0;

  if (broke && inner.placed.length === 0) {
    // Nothing placed. If every child remains, the column doesn't fit here — decline.
    if (inner.remaining.length === fragment.children.length) return DECLINE();

    // Fewer remaining means a forced break fired before anything
    // placed: end the page, keeping isFirst for the continuation.
    const remaining = [
      { item, isFirst, children: inner.remaining },
      ...state.fragments.slice(index + 1),
    ];

    return DONE({ placed: state.placed, remaining });
  }

  state.placed.push({
    item,
    y: state.usedHeight,
    height: broke ? availableHeight : reach(inner.placed),
    part: { isFirst, isLast: !broke },
    children: inner.placed,
  });

  if (!broke) return CONTINUE();

  const repeats = repeatFragments(fragment, inner, contentAbove);

  const continuation: Fragment = {
    item,
    isFirst: false,
    children: [...repeats, ...inner.remaining],
  };

  return DONE({
    placed: state.placed,
    remaining: [continuation, ...state.fragments.slice(index + 1)],
  });
};

export default fit;
