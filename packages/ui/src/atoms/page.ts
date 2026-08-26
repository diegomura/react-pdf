import { atom } from 'jotai';

import numPagesAtom from './num-pages';

const pageAtom = atom(1);

const clamp = (page: number, numPages: number) =>
  Math.min(Math.max(page, 1), Math.max(numPages, 1));

export const setPageAtom = atom(null, (get, set, page: number) => {
  set(pageAtom, clamp(page, get(numPagesAtom)));
});

// Writes the clamped value rather than clamping on read, so a document that
// grows again does not jump back to a page the reader has already left.
export const setNumPagesAtom = atom(null, (get, set, numPages: number) => {
  set(numPagesAtom, numPages);
  set(pageAtom, clamp(get(pageAtom), numPages));
});

export const nextPageAtom = atom(null, (get, set) => {
  set(setPageAtom, get(pageAtom) + 1);
});

export const previousPageAtom = atom(null, (get, set) => {
  set(setPageAtom, get(pageAtom) - 1);
});

export default pageAtom;
