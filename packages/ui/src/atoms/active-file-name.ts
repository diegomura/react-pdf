import { atom } from 'jotai';

const activeFileNameAtom = atom<string | null>(null);

export default activeFileNameAtom;
