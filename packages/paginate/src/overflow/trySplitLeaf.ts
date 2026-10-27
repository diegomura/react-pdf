import { DONE } from '../step';
import { SplittableLeaf, State, StepResult } from '../types';

const trySplitLeaf = (
  state: State,
  i: number,
  item: SplittableLeaf,
  isFirst: boolean,
): StepResult | null => {
  const availHeight = state.height - state.usedHeight;
  const result = item.split(availHeight);

  if (!result) return null;

  state.placed.push({
    item: result.current,
    y: state.usedHeight,
    height: result.current.height,
    part: { isFirst, isLast: false },
  });

  const remainingFragment = { item: result.next, isFirst: false, children: [] };

  return DONE({
    placed: state.placed,
    remaining: [remainingFragment, ...state.fragments.slice(i + 1)],
  });
};

export default trySplitLeaf;
