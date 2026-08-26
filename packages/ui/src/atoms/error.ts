import { atom } from 'jotai';

const errorAtom = atom<Error | null>(null);

export default errorAtom;
