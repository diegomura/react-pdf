import isColumn from '../item/isColumn';
import isRow from '../item/isRow';
import fragmentHeight from '../fragment/height';
import isForbidPenalty from '../item/isForbidPenalty';
import { CONTINUE } from '../step';
import { Fragment, State, StepResult } from '../types';
import fitColumn from './column';
import fitLeaf from './leaf';
import fitRow from './row';

// Attempt to place the fragment at the current position. Declines when it
// can't contribute anything here (a leaf that doesn't fit, a container whose
// children all decline) — the overflow cascade decides what happens.
const fit = (state: State, fragment: Fragment, index: number): StepResult => {
  let step: StepResult;

  if (isColumn(fragment.item)) {
    step = fitColumn(state, fragment, index);
  } else if (isRow(fragment.item)) {
    step = fitRow(state, fragment, index);
  } else {
    step = fitLeaf(state, fragment);
  }

  if (step.kind !== 'continue') return step;

  state.usedHeight += fragmentHeight(fragment);

  const next = state.fragments[index + 1];
  const insideWindow = state.usedHeight < state.forbidUntil;
  if ((next === undefined || !isForbidPenalty(next.item)) && !insideWindow) {
    state.bestBreak = {
      remainingIndex: index + 1,
      placedCount: state.placed.length,
    };
  }

  return CONTINUE();
};

export default fit;
