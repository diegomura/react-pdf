import { atom } from 'jotai';

import resultAtom from './result';

/**
 * Page count of the last rendered document, taken from its layout. Knows
 * nothing about the current page; `pageAtom` clamps itself against this.
 */
const numPagesAtom = atom((get) => get(resultAtom).data?.numPages ?? 0);

export default numPagesAtom;
