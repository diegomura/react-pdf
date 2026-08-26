import { atom } from 'jotai';

import type { ReplFile } from '../types';

import activeFileNameAtom from './active-file-name';
import filesAtom from './files';

export const selectFileAtom = atom(null, (get, set, name: string) => {
  if (!get(filesAtom).some((file) => file.name === name)) return;
  set(activeFileNameAtom, name);
});

export const addFileAtom = atom(null, (get, set, file: ReplFile) => {
  const files = get(filesAtom);
  if (files.some((existing) => existing.name === file.name)) return;
  set(filesAtom, [...files, file]);
});

export const renameFileAtom = atom(
  null,
  (get, set, name: string, next: string) => {
    const files = get(filesAtom);
    if (!files.some((file) => file.name === name)) return;
    if (files.some((file) => file.name === next)) return;

    set(
      filesAtom,
      files.map((file) =>
        file.name === name ? { ...file, name: next } : file,
      ),
    );

    if (get(activeFileNameAtom) === name) set(activeFileNameAtom, next);
  },
);

export const removeFileAtom = atom(null, (get, set, name: string) => {
  const files = get(filesAtom);
  const index = files.findIndex((file) => file.name === name);
  if (index === -1) return;

  const next = files.filter((file) => file.name !== name);
  set(filesAtom, next);

  if (get(activeFileNameAtom) !== name) return;

  // whatever slid into the vacated slot, or the new last file if it was last
  const neighbour = next[index] ?? next[next.length - 1] ?? null;
  set(activeFileNameAtom, neighbour?.name ?? null);
});

export const updateSourceAtom = atom(null, (get, set, code: string) => {
  const name = get(activeFileNameAtom);
  if (name === null) return;

  set(
    filesAtom,
    get(filesAtom).map((file) =>
      file.name === name ? { ...file, code } : file,
    ),
  );
});
