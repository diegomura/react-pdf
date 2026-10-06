import { Fragment, FillResult, State } from '../types';
import fillStep from './fillStep';

const fill = (
  fragments: Fragment[],
  height: number,
  pageNumber: number,
  canForce = false,
  contentAbove = false,
): FillResult => {
  const state: State = {
    fragments,
    height,
    placed: [],
    usedHeight: 0,
    bestBreak: null,
    pendingLazy: null,
    pageNumber,
    canForce,
    contentAbove,
    forbidUntil: 0,
  };

  for (let i = 0; i < state.fragments.length; i += 1) {
    const step = fillStep(state, i);
    if (step.kind === 'done') return step.result;
    if (step.kind === 'rewind') i -= 1;
  }

  return { placed: state.placed, remaining: [] };
};

export default fill;
