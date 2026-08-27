import { createStore } from 'jotai';
import { describe, expect, it } from 'vitest';

import activeFileAtom from '../src/atoms/active-file';
import activeFileNameAtom from '../src/atoms/active-file-name';
import filesAtom from '../src/atoms/files';

const seed = () => {
  const store = createStore();
  store.set(filesAtom, [
    { name: 'a.jsx', code: 'A' },
    { name: 'b.jsx', code: 'B' },
    { name: 'c.jsx', code: 'C' },
  ]);
  return store;
};

describe('activeFileNameAtom', () => {
  it('defaults to the first file', () => {
    expect(seed().get(activeFileNameAtom)).toBe('a.jsx');
  });

  it('is null when there are no files', () => {
    expect(createStore().get(activeFileNameAtom)).toBeNull();
  });

  it('selects a file that exists', () => {
    const store = seed();
    store.set(activeFileNameAtom, 'b.jsx');
    expect(store.get(activeFileNameAtom)).toBe('b.jsx');
    expect(store.get(activeFileAtom)).toEqual({ name: 'b.jsx', code: 'B' });
  });

  it('ignores a name that does not exist', () => {
    const store = seed();
    store.set(activeFileNameAtom, 'nope.jsx');
    expect(store.get(activeFileNameAtom)).toBe('a.jsx');
  });
});

describe('activeFileAtom write', () => {
  it('writes to the active file only', () => {
    const store = seed();
    store.set(activeFileNameAtom, 'b.jsx');
    store.set(activeFileAtom, 'NEW');
    expect(store.get(filesAtom)).toEqual([
      { name: 'a.jsx', code: 'A' },
      { name: 'b.jsx', code: 'NEW' },
      { name: 'c.jsx', code: 'C' },
    ]);
  });

  it('does nothing when there are no files', () => {
    const store = createStore();
    store.set(filesAtom, []);
    store.set(activeFileAtom, 'NEW');
    expect(store.get(filesAtom)).toEqual([]);
    expect(store.get(activeFileAtom)).toBeNull();
  });
});
