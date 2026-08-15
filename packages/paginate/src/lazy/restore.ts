import { State } from '../types';

// On overflow, decide whether the pending lazy committed (something from
// it landed on this page) or should be un-spliced and handed to the next
// page for re-materialization. Returns the lazy's restored index, or
// null if nothing was pending or the lazy already committed.
const restore = (state: State): number | null => {
  if (state.pendingLazy === null) return null;

  const { spliceStart, fragment, count, placedAtMaterialize } =
    state.pendingLazy;
  state.pendingLazy = null;

  if (state.placed.length > placedAtMaterialize) return null;

  state.fragments.splice(spliceStart, count, fragment);
  return spliceStart;
};

export default restore;
