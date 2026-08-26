import { createStore } from 'jotai';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import copyStateAtom, { copyAtom } from '../src/atoms/copy-state';
import copyResetEffect from '../src/effects/copy-reset';

const writeText = vi.fn();

beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true });
  writeText.mockReset().mockResolvedValue(undefined);
  vi.stubGlobal('navigator', { clipboard: { writeText } });
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe('copy state', () => {
  it('starts idle', () => {
    const store = createStore();
    expect(store.get(copyStateAtom)).toBe('idle');
  });

  it('reports copied on success', async () => {
    const store = createStore();
    await store.set(copyAtom, 'hello');

    expect(writeText).toHaveBeenCalledWith('hello');
    expect(store.get(copyStateAtom)).toBe('copied');
  });

  it('reports failed when the clipboard rejects', async () => {
    writeText.mockRejectedValue(new Error('denied'));
    const store = createStore();
    await store.set(copyAtom, 'hello');

    expect(store.get(copyStateAtom)).toBe('failed');
  });

  it('returns to idle after the reset delay', async () => {
    const store = createStore();
    store.sub(copyResetEffect, () => {});
    await store.set(copyAtom, 'hello');
    expect(store.get(copyStateAtom)).toBe('copied');

    await vi.advanceTimersByTimeAsync(1500);

    expect(store.get(copyStateAtom)).toBe('idle');
  });

  it('returns to idle after a failure too', async () => {
    writeText.mockRejectedValue(new Error('denied'));
    const store = createStore();
    store.sub(copyResetEffect, () => {});
    await store.set(copyAtom, 'hello');

    await vi.advanceTimersByTimeAsync(1500);

    expect(store.get(copyStateAtom)).toBe('idle');
  });

  it('restarts the delay when the state changes again', async () => {
    const store = createStore();
    store.sub(copyResetEffect, () => {});
    await store.set(copyAtom, 'one');

    await vi.advanceTimersByTimeAsync(1000);
    store.set(copyStateAtom, 'failed');
    await vi.advanceTimersByTimeAsync(1000);

    expect(store.get(copyStateAtom)).toBe('failed');

    await vi.advanceTimersByTimeAsync(500);
    expect(store.get(copyStateAtom)).toBe('idle');
  });
});
