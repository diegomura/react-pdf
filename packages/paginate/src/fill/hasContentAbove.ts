import isRepeat from '../item/isRepeat';
import isRepeatPlaced from '../item/isRepeatPlaced';
import { PlacedItem, State } from '../types';

// Has non-repeat content been placed above this point on the page?
// Materialized items match via their origin, where the repeat flag lives.
const hasContentAbove = (state: State): boolean => {
  const fromRepeatLazy = (placed: PlacedItem) =>
    state.fragments.some(
      (f) =>
        f.origin !== undefined && isRepeat(f.origin) && f.item === placed.item,
    );

  return (
    state.contentAbove ||
    state.placed.some((p) => !isRepeatPlaced(p) && !fromRepeatLazy(p))
  );
};

export default hasContentAbove;
