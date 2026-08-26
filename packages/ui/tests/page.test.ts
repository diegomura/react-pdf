import { createStore } from 'jotai';
import { describe, expect, it } from 'vitest';

import numPagesAtom from '../src/atoms/num-pages';
import pageAtom, {
  nextPageAtom,
  previousPageAtom,
  setNumPagesAtom,
  setPageAtom,
} from '../src/atoms/page';

const seed = (numPages: number) => {
  const store = createStore();
  store.set(setNumPagesAtom, numPages);
  return store;
};

describe('page state', () => {
  it('starts on page one with nothing loaded', () => {
    const store = createStore();
    expect(store.get(pageAtom)).toBe(1);
    expect(store.get(numPagesAtom)).toBe(0);
  });

  it('clamps a selection above the page count', () => {
    const store = seed(3);
    store.set(setPageAtom, 99);
    expect(store.get(pageAtom)).toBe(3);
  });

  it('clamps a selection below one', () => {
    const store = seed(3);
    store.set(setPageAtom, 0);
    expect(store.get(pageAtom)).toBe(1);
  });

  it('clamps down when a shorter document loads', () => {
    const store = seed(10);
    store.set(setPageAtom, 8);
    store.set(setNumPagesAtom, 2);
    expect(store.get(pageAtom)).toBe(2);
  });

  it('does not move when a longer document loads', () => {
    const store = seed(3);
    store.set(setPageAtom, 2);
    store.set(setNumPagesAtom, 10);
    expect(store.get(pageAtom)).toBe(2);
  });

  it('stays on page one when the page count drops to zero', () => {
    const store = seed(5);
    store.set(setPageAtom, 4);
    store.set(setNumPagesAtom, 0);
    expect(store.get(pageAtom)).toBe(1);
  });

  it('steps forward and stops at the last page', () => {
    const store = seed(2);
    store.set(nextPageAtom);
    expect(store.get(pageAtom)).toBe(2);
    store.set(nextPageAtom);
    expect(store.get(pageAtom)).toBe(2);
  });

  it('steps back and stops at the first page', () => {
    const store = seed(2);
    store.set(setPageAtom, 2);
    store.set(previousPageAtom);
    expect(store.get(pageAtom)).toBe(1);
    store.set(previousPageAtom);
    expect(store.get(pageAtom)).toBe(1);
  });
});
