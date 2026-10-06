import restoreLazy from '../lazy/restore';
import { DONE } from '../step';
import { BestBreak, State, StepResult } from '../types';

// Can't fit here — end the page at the last clean break instead.
// Any items placed after that break are dropped from this page and
// will reappear on the next one. If some of those dropped items
// came from a lazy node, the next page will re-run it fresh.
const rewindToBestBreak = (state: State, bestBreak: BestBreak): StepResult => {
  state.placed.length = bestBreak.placedCount;

  const lazyIndex = restoreLazy(state);
  const remaining = state.fragments.slice(
    lazyIndex ?? bestBreak.remainingIndex,
  );

  return DONE({ placed: state.placed, remaining });
};

export default rewindToBestBreak;
