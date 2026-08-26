import { atom } from 'jotai';

import type { CopyState } from '../types';

const copyStateAtom = atom<CopyState>('idle');

export const copyAtom = atom(null, (_get, set, text: string) =>
  navigator.clipboard.writeText(text).then(
    () => set(copyStateAtom, 'copied'),
    () => set(copyStateAtom, 'failed'),
  ),
);

export default copyStateAtom;
