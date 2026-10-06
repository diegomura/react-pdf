import restoreLazy from '../lazy/restore';
import { DONE } from '../step';
import { State, StepResult } from '../types';

// Placed something already but can't fit current and have no better
// break to rewind to — stop here and let the next page continue.
const deferToNextPage = (state: State, i: number): StepResult => {
  const lazyIndex = restoreLazy(state);
  return DONE({
    placed: state.placed,
    remaining: state.fragments.slice(lazyIndex ?? i),
  });
};

export default deferToNextPage;
