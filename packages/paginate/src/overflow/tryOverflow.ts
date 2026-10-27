import canSplit from '../item/canSplit';
import fragmentHeight from '../fragment/height';
import restoreLazy from '../lazy/restore';

import deferToNextPage from './deferToNextPage';
import rewindToBestBreak from './rewindToBestBreak';
import spillOntoOwnPage from './spillOntoOwnPage';
import trySplitLeaf from './trySplitLeaf';
import { DONE } from '../step';
import { BestBreak, Fragment, State, StepResult } from '../types';

const canRewind = (
  bestBreak: BestBreak | null,
  i: number,
): bestBreak is BestBreak =>
  bestBreak !== null && bestBreak.remainingIndex < i + 1;

const tryOverflow = (
  state: State,
  fragment: Fragment,
  i: number,
): StepResult => {
  // A split is a break at the page bottom — not allowed inside a window.
  if (state.height >= state.forbidUntil && canSplit(fragment.item)) {
    const split = trySplitLeaf(state, i, fragment.item, fragment.isFirst);
    if (split !== null) return split;
  }

  // Rewind: end the page at the last spot where breaking was allowed.
  // Anything placed after that spot is taken back off this page and moves
  // to the next one — that's how FORBID groups travel together.
  if (canRewind(state.bestBreak, i)) {
    return rewindToBestBreak(state, state.bestBreak);
  }

  // No legal break on this page. Forcing bad output (spilling, breaking a
  // forbid) is only justified at the top of a page, where deferring would
  // loop forever; anywhere else, hand everything back and retry next page.
  if (!state.canForce) {
    restoreLazy(state);
    return DONE({ placed: [], remaining: state.fragments });
  }

  if (state.placed.length === 0) {
    const height = fragmentHeight(fragment);
    return spillOntoOwnPage(state, i, fragment, height);
  }

  return deferToNextPage(state, i);
};

export default tryOverflow;
