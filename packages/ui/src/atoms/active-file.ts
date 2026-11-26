import { atom } from 'jotai';

import type { PlaygroundFile } from '../types';

import activeFileNameAtom from './active-file-name';
import filesAtom from './files';

const activeFileAtom = atom(
  (get): PlaygroundFile | null => {
    const name = get(activeFileNameAtom);
    return get(filesAtom).find((file) => file.name === name) ?? null;
  },
  (get, set, code: string) => {
    const name = get(activeFileNameAtom);
    if (!name) return;

    set(
      filesAtom,
      get(filesAtom).map((file) =>
        file.name === name ? { ...file, code } : file,
      ),
    );
  },
);

export default activeFileAtom;
