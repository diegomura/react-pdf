import { createStore } from 'jotai';
import { describe, expect, it } from 'vitest';

import activeFileAtom from '../src/atoms/active-file';
import activeFileNameAtom from '../src/atoms/active-file-name';
import {
  addFileAtom,
  removeFileAtom,
  renameFileAtom,
  selectFileAtom,
  updateSourceAtom,
} from '../src/atoms/file-operations';
import filesAtom from '../src/atoms/files';

const seed = () => {
  const store = createStore();
  store.set(filesAtom, [
    { name: 'a.jsx', code: 'A' },
    { name: 'b.jsx', code: 'B' },
    { name: 'c.jsx', code: 'C' },
  ]);
  store.set(activeFileNameAtom, 'a.jsx');
  return store;
};

describe('selectFileAtom', () => {
  it('selects a file that exists', () => {
    const store = seed();
    store.set(selectFileAtom, 'b.jsx');
    expect(store.get(activeFileNameAtom)).toBe('b.jsx');
  });

  it('ignores a name that does not exist', () => {
    const store = seed();
    store.set(selectFileAtom, 'nope.jsx');
    expect(store.get(activeFileNameAtom)).toBe('a.jsx');
  });
});

describe('addFileAtom', () => {
  it('appends without changing the active file', () => {
    const store = seed();
    store.set(addFileAtom, { name: 'd.jsx', code: 'D' });
    expect(store.get(filesAtom).map((file) => file.name)).toEqual([
      'a.jsx',
      'b.jsx',
      'c.jsx',
      'd.jsx',
    ]);
    expect(store.get(activeFileNameAtom)).toBe('a.jsx');
  });

  it('ignores a duplicate name', () => {
    const store = seed();
    store.set(addFileAtom, { name: 'b.jsx', code: 'OTHER' });
    expect(store.get(filesAtom)).toHaveLength(3);
    expect(store.get(filesAtom)[1].code).toBe('B');
  });
});

describe('renameFileAtom', () => {
  it('renames in place', () => {
    const store = seed();
    store.set(renameFileAtom, 'b.jsx', 'z.jsx');
    expect(store.get(filesAtom).map((file) => file.name)).toEqual([
      'a.jsx',
      'z.jsx',
      'c.jsx',
    ]);
  });

  it('follows the active file when it is the one renamed', () => {
    const store = seed();
    store.set(renameFileAtom, 'a.jsx', 'z.jsx');
    expect(store.get(activeFileNameAtom)).toBe('z.jsx');
  });

  it('is a no-op when the target name is taken', () => {
    const store = seed();
    store.set(renameFileAtom, 'a.jsx', 'b.jsx');
    expect(store.get(filesAtom).map((file) => file.name)).toEqual([
      'a.jsx',
      'b.jsx',
      'c.jsx',
    ]);
    expect(store.get(activeFileNameAtom)).toBe('a.jsx');
  });

  it('ignores a source name that does not exist', () => {
    const store = seed();
    store.set(renameFileAtom, 'nope.jsx', 'z.jsx');
    expect(store.get(filesAtom).map((file) => file.name)).toEqual([
      'a.jsx',
      'b.jsx',
      'c.jsx',
    ]);
  });
});

describe('removeFileAtom', () => {
  it('removes a file that is not active', () => {
    const store = seed();
    store.set(removeFileAtom, 'b.jsx');
    expect(store.get(filesAtom).map((file) => file.name)).toEqual([
      'a.jsx',
      'c.jsx',
    ]);
    expect(store.get(activeFileNameAtom)).toBe('a.jsx');
  });

  it('moves to the file that slid into the slot when the active one goes', () => {
    const store = seed();
    store.set(selectFileAtom, 'b.jsx');
    store.set(removeFileAtom, 'b.jsx');
    expect(store.get(activeFileNameAtom)).toBe('c.jsx');
  });

  it('moves to the new last file when the active one was last', () => {
    const store = seed();
    store.set(selectFileAtom, 'c.jsx');
    store.set(removeFileAtom, 'c.jsx');
    expect(store.get(activeFileNameAtom)).toBe('b.jsx');
  });

  it('leaves no active file when the last file is removed', () => {
    const store = createStore();
    store.set(filesAtom, [{ name: 'only.jsx', code: 'X' }]);
    store.set(activeFileNameAtom, 'only.jsx');
    store.set(removeFileAtom, 'only.jsx');
    expect(store.get(filesAtom)).toEqual([]);
    expect(store.get(activeFileNameAtom)).toBeNull();
    expect(store.get(activeFileAtom)).toBeNull();
  });

  it('ignores a name that does not exist', () => {
    const store = seed();
    store.set(removeFileAtom, 'nope.jsx');
    expect(store.get(filesAtom)).toHaveLength(3);
  });
});

describe('updateSourceAtom', () => {
  it('writes to the active file only', () => {
    const store = seed();
    store.set(updateSourceAtom, 'NEW');
    expect(store.get(filesAtom)).toEqual([
      { name: 'a.jsx', code: 'NEW' },
      { name: 'b.jsx', code: 'B' },
      { name: 'c.jsx', code: 'C' },
    ]);
  });

  it('does nothing when there is no active file', () => {
    const store = seed();
    store.set(activeFileNameAtom, null);
    store.set(updateSourceAtom, 'NEW');
    expect(store.get(filesAtom)[0].code).toBe('A');
  });
});
