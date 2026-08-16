import toFragments from '../fragment/toFragments';
import { Fragment, LazyItem, State, StepResult } from '../types';
import { REWIND } from '../step';

// Run the user's materialize(ctx), replace the lazy with its output,
// and rewind so the new fragments flow through normal placement logic.
const materialize = (
  state: State,
  fragment: Fragment,
  index: number,
): StepResult => {
  const item = fragment.item as LazyItem;
  const produced = item.materialize({ pageNumber: state.pageNumber });
  const materialized = toFragments(produced);

  state.fragments.splice(index, 1, ...materialized);

  if (materialized.length > 0) {
    state.pendingLazy = {
      spliceStart: index,
      fragment,
      count: materialized.length,
      placedAtMaterialize: state.placed.length,
    };
  }

  return REWIND();
};

export default materialize;
