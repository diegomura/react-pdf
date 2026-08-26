import { atom } from 'jotai';

const blobAtom = atom<Blob | null>(null);

export default blobAtom;
