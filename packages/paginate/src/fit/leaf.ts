import { CONTINUE, DECLINE } from '../step';
import { Fragment, LeafItem, SpacerItem, State, StepResult } from '../types';

const fit = (state: State, fragment: Fragment): StepResult => {
  const item = fragment.item as LeafItem | SpacerItem;

  if (state.usedHeight + item.height > state.height) return DECLINE();

  state.placed.push({
    item,
    y: state.usedHeight,
    height: item.height,
    part: { isFirst: fragment.isFirst, isLast: true },
  });

  return CONTINUE();
};

export default fit;
