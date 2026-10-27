import { atom } from 'jotai';

import type { PlaygroundFile } from '../types';

const filesAtom = atom<PlaygroundFile[]>([]);

export default filesAtom;
