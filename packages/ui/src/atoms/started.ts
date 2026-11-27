import { atom } from 'jotai';

// Tells the first render from later edits. A mutable per-store box, so reading
// it does not subscribe the render to its own bookkeeping.
const startedAtom = atom(() => ({ value: false }));

export default startedAtom;
