import isLazy from '../item/isLazy';
import fit from '../fit';
import tryOverflow from '../overflow/tryOverflow';
import isForcePenalty from '../item/isForcePenalty';
import { State, StepResult } from '../types';
import materialize from '../lazy/materialize';
import { CONTINUE, DONE } from '../step';
import isForbidPenalty from '../item/isForbidPenalty';

const fillStep = (state: State, index: number): StepResult => {
  const fragment = state.fragments[index];

  if (isForcePenalty(fragment.item)) {
    const placed = state.placed;
    const remaining = state.fragments.slice(index + 1);
    return DONE({ placed, remaining });
  }

  if (isForbidPenalty(fragment.item)) {
    // A window only arms when a break exists before the preceding item —
    // with nowhere to rewind to, moving it wouldn't improve its presence.
    const { ahead } = fragment.item;
    if (ahead && state.bestBreak !== null) {
      state.forbidUntil = Math.max(state.forbidUntil, state.usedHeight + ahead);
    }
    return CONTINUE();
  }

  if (isLazy(fragment.item)) {
    return materialize(state, fragment, index);
  }

  const step = fit(state, fragment, index);

  if (step.kind === 'decline') {
    return tryOverflow(state, fragment, index);
  }

  return step;
};

export default fillStep;
