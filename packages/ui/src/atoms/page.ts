import { atom } from 'jotai';

import numPagesAtom from './num-pages';

const selected = atom(1);

const clamp = (value: number, total: number) =>
  Math.min(Math.max(value, 1), Math.max(total, 1));

/**
 * Clamped on read as well as on write, so a document that shrinks pulls the
 * current page back into range without `num-pages` having to know this atom
 * exists.
 */
const pageAtom = atom(
  (get) => clamp(get(selected), get(numPagesAtom)),
  (get, set, next: number) => {
    set(selected, clamp(next, get(numPagesAtom)));
  },
);

export default pageAtom;
