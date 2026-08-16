import isRow from '../item/isRow';
import restoreLazy from '../lazy/restore';
import { DONE } from '../step';
import { place as placeRow } from '../fit/row';
import { Fragment, State, StepResult } from '../types';

const spillOntoOwnPage = (
  state: State,
  i: number,
  fragment: Fragment,
  height: number,
): StepResult => {
  const lazyIndex = restoreLazy(state);

  // Nothing fit, but a lazy was pending — hand it back to the next
  // page so it can re-materialize with the updated pageNumber.
  if (lazyIndex !== null) {
    return DONE({ placed: [], remaining: state.fragments.slice(lazyIndex) });
  }

  const { item, isFirst } = fragment;
  const label = 'id' in item && item.id ? ` "${item.id}"` : '';

  // eslint-disable-next-line no-console
  console.warn(
    `[paginate] Item${label} of height ${height} exceeds available height ${state.height}; placing on its own page.`,
  );

  if (isRow(item)) {
    const placedChildren =
      placeRow(fragment, height, state.pageNumber, true)?.placed ?? [];

    const placed = [
      {
        item,
        y: 0,
        height,
        part: { isFirst, isLast: true },
        children: placedChildren,
      },
    ];

    return DONE({ placed, remaining: state.fragments.slice(i + 1) });
  }

  return DONE({
    placed: [{ item, y: 0, height, part: { isFirst, isLast: true } }],
    remaining: state.fragments.slice(i + 1),
  });
};

export default spillOntoOwnPage;
