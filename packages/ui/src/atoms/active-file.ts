import { atom } from 'jotai';

import type { ReplFile } from '../types';

import activeFileNameAtom from './active-file-name';
import filesAtom from './files';

const activeFileAtom = atom<ReplFile | null>(
  (get) =>
    get(filesAtom).find((file) => file.name === get(activeFileNameAtom)) ??
    null,
);

export default activeFileAtom;
