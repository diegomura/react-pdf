import { atom } from 'jotai';

import type { ReplFile } from '../types';

const filesAtom = atom<ReplFile[]>([]);

export default filesAtom;
