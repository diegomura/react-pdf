import { atom } from 'jotai';

// The first render fires immediately and only later edits are debounced; this
// is what the render effect uses to tell them apart. Per-store for the same
// reason as render-fn, and mutated rather than `set` so reading it does not
// subscribe the effect to its own bookkeeping.
const startedAtom = atom(() => ({ value: false }));

export default startedAtom;
