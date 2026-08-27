import { atom } from 'jotai';

import filesAtom from './files';

const selected = atom<string | null>(null);

const activeFileNameAtom = atom(
  (get) => {
    const files = get(filesAtom);
    const name = get(selected);
    if (name && files.some((file) => file.name === name)) return name;
    return files[0]?.name ?? null;
  },
  (get, set, next: string) => {
    if (!get(filesAtom).some((file) => file.name === next)) return;
    set(selected, next);
  },
);

export default activeFileNameAtom;
