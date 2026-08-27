import { createStore } from 'jotai';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const doRender = vi.fn();
vi.mock('../src/render/render', () => ({
  render: (...args: unknown[]) => doRender(...(args as [])),
}));

import filesAtom from '../src/atoms/files';
import numPagesAtom from '../src/atoms/num-pages';
import pageAtom from '../src/atoms/page';

const DEBOUNCE_MS = 250;

const flush = async () => {
  for (let i = 0; i < 20; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await Promise.resolve();
  }
};

const renders = (numPages: number) => async () => ({
  blob: new Blob(['pdf']),
  numPages,
});

/** Renders a document of `numPages` pages and mounts the pipeline. */
const seed = async (numPages: number) => {
  doRender.mockImplementation(renders(numPages));
  const store = createStore();
  store.set(filesAtom, [{ name: 'a.jsx', code: 'A' }]);
  store.sub(numPagesAtom, () => {});
  await flush();
  return store;
};

const reload = async (
  store: ReturnType<typeof createStore>,
  numPages: number,
) => {
  doRender.mockImplementation(renders(numPages));
  store.set(filesAtom, [{ name: 'a.jsx', code: `A${numPages}` }]);
  await vi.advanceTimersByTimeAsync(DEBOUNCE_MS);
  await flush();
};

beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true });
  doRender.mockReset();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('page state', () => {
  it('starts on page one with nothing loaded', () => {
    const store = createStore();
    expect(store.get(pageAtom)).toBe(1);
    expect(store.get(numPagesAtom)).toBe(0);
  });

  it('takes the page count from the rendered layout', async () => {
    const store = await seed(3);
    expect(store.get(numPagesAtom)).toBe(3);
  });

  it('clamps a selection above the page count', async () => {
    const store = await seed(3);
    store.set(pageAtom, 99);
    expect(store.get(pageAtom)).toBe(3);
  });

  it('clamps a selection below one', async () => {
    const store = await seed(3);
    store.set(pageAtom, 0);
    expect(store.get(pageAtom)).toBe(1);
  });

  it('clamps down when a shorter document loads', async () => {
    const store = await seed(10);
    store.set(pageAtom, 8);
    await reload(store, 2);
    expect(store.get(pageAtom)).toBe(2);
  });

  it('does not move when a longer document loads', async () => {
    const store = await seed(3);
    store.set(pageAtom, 2);
    await reload(store, 10);
    expect(store.get(pageAtom)).toBe(2);
  });

  it('stays on page one when the page count drops to zero', async () => {
    const store = await seed(5);
    store.set(pageAtom, 4);
    await reload(store, 0);
    expect(store.get(pageAtom)).toBe(1);
  });

  // Clamping happens on read, so the underlying selection survives a shrink.
  // Reload a longer document and you land back where you were, rather than on
  // whatever page the short one clamped you to.
  it('returns to the same page when a document shrinks and grows again', async () => {
    const store = await seed(10);
    store.set(pageAtom, 8);

    await reload(store, 2);
    expect(store.get(pageAtom)).toBe(2);

    await reload(store, 10);
    expect(store.get(pageAtom)).toBe(8);
  });

  it('steps forward and stops at the last page', async () => {
    const store = await seed(2);
    store.set(pageAtom, store.get(pageAtom) + 1);
    expect(store.get(pageAtom)).toBe(2);
    store.set(pageAtom, store.get(pageAtom) + 1);
    expect(store.get(pageAtom)).toBe(2);
  });

  it('steps back and stops at the first page', async () => {
    const store = await seed(2);
    store.set(pageAtom, 2);
    store.set(pageAtom, store.get(pageAtom) - 1);
    expect(store.get(pageAtom)).toBe(1);
    store.set(pageAtom, store.get(pageAtom) - 1);
    expect(store.get(pageAtom)).toBe(1);
  });
});
