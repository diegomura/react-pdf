import { createStore } from 'jotai';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import blobAtom from '../src/atoms/blob';
import debounceAtom from '../src/atoms/debounce';
import errorAtom from '../src/atoms/error';
import filesAtom from '../src/atoms/files';
import renderFnAtom from '../src/atoms/render-fn';
import statusAtom from '../src/atoms/status';
import renderEffect from '../src/effects/render';
import type { RenderFn } from '../src/types';

const FILES = [{ name: 'a.jsx', code: 'A' }];

/**
 * Drains the effect's promise chain. Microtask based rather than
 * `setImmediate`, which the fake timers replace.
 */
const flush = async () => {
  for (let i = 0; i < 10; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await Promise.resolve();
  }
};

const mount = (render: RenderFn, files = FILES) => {
  const store = createStore();
  store.get(renderFnAtom).current = render;
  store.set(filesAtom, files);
  const unmount = store.sub(renderEffect, () => {});
  return { store, unmount };
};

beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
  vi.useRealTimers();
});

describe('render effect', () => {
  it('renders immediately on mount without waiting for the debounce', async () => {
    const render = vi.fn(async () => new Blob(['pdf']));
    const { store } = mount(render);

    await flush();

    expect(render).toHaveBeenCalledTimes(1);
    expect(store.get(statusAtom)).toBe('ready');
    expect(store.get(blobAtom)).toBeInstanceOf(Blob);
  });

  it('debounces edits', async () => {
    const render = vi.fn(async () => new Blob(['pdf']));
    const { store } = mount(render);
    await flush();

    store.set(filesAtom, [{ name: 'a.jsx', code: 'B' }]);
    store.set(filesAtom, [{ name: 'a.jsx', code: 'C' }]);
    expect(render).toHaveBeenCalledTimes(1);

    await vi.advanceTimersByTimeAsync(500);
    await flush();

    expect(render).toHaveBeenCalledTimes(2);
    expect(render.mock.calls[1][0]).toEqual([{ name: 'a.jsx', code: 'C' }]);
  });

  it('discards a stale result', async () => {
    let resolveFirst: (blob: Blob) => void = () => {};
    const first = new Blob(['first']);
    const second = new Blob(['second']);

    const render = vi
      .fn<Parameters<RenderFn>, ReturnType<RenderFn>>()
      .mockImplementationOnce(
        () =>
          new Promise<Blob>((resolve) => {
            resolveFirst = resolve;
          }),
      )
      .mockImplementationOnce(async () => second);

    const { store } = mount(render);
    await flush();

    store.set(filesAtom, [{ name: 'a.jsx', code: 'B' }]);
    await vi.advanceTimersByTimeAsync(500);
    await flush();

    resolveFirst(first);
    await flush();

    expect(store.get(blobAtom)).toBe(second);
  });

  it('aborts a superseded render', async () => {
    const signals: AbortSignal[] = [];
    const render = vi.fn(async (_files, { signal }) => {
      signals.push(signal);
      return new Blob(['pdf']);
    });

    const { store } = mount(render);
    await flush();

    store.set(filesAtom, [{ name: 'a.jsx', code: 'B' }]);
    await vi.advanceTimersByTimeAsync(500);
    await flush();

    expect(signals[0].aborted).toBe(true);
    expect(signals[1].aborted).toBe(false);
  });

  it('keeps the last good blob when a render fails', async () => {
    const good = new Blob(['good']);
    const render = vi
      .fn<Parameters<RenderFn>, ReturnType<RenderFn>>()
      .mockImplementationOnce(async () => good)
      .mockImplementationOnce(async () => {
        throw new Error('boom');
      });

    const { store } = mount(render);
    await flush();

    store.set(filesAtom, [{ name: 'a.jsx', code: 'B' }]);
    await vi.advanceTimersByTimeAsync(500);
    await flush();

    expect(store.get(statusAtom)).toBe('error');
    expect(store.get(errorAtom)?.message).toBe('boom');
    expect(store.get(blobAtom)).toBe(good);
  });

  it('captures a synchronous throw', async () => {
    const render = vi.fn(() => {
      throw new Error('sync boom');
    }) as unknown as RenderFn;

    const { store } = mount(render);
    await flush();

    expect(store.get(statusAtom)).toBe('error');
    expect(store.get(errorAtom)?.message).toBe('sync boom');
  });

  it('wraps a non-Error rejection', async () => {
    const render = vi.fn(async () => {
      // eslint-disable-next-line no-throw-literal
      throw 'just a string';
    }) as unknown as RenderFn;

    const { store } = mount(render);
    await flush();

    expect(store.get(errorAtom)).toBeInstanceOf(Error);
    expect(store.get(errorAtom)?.message).toBe('just a string');
  });

  it('clears a previous error on the next success', async () => {
    const render = vi
      .fn<Parameters<RenderFn>, ReturnType<RenderFn>>()
      .mockImplementationOnce(async () => {
        throw new Error('boom');
      })
      .mockImplementationOnce(async () => new Blob(['ok']));

    const { store } = mount(render);
    await flush();
    expect(store.get(errorAtom)).not.toBeNull();

    store.set(filesAtom, [{ name: 'a.jsx', code: 'B' }]);
    await vi.advanceTimersByTimeAsync(500);
    await flush();

    expect(store.get(errorAtom)).toBeNull();
    expect(store.get(statusAtom)).toBe('ready');
  });

  it('stays idle with no files', async () => {
    const render = vi.fn(async () => new Blob(['pdf']));
    const { store } = mount(render, []);

    await flush();

    expect(render).not.toHaveBeenCalled();
    expect(store.get(statusAtom)).toBe('idle');
  });

  it('honours a custom debounce', async () => {
    const render = vi.fn(async () => new Blob(['pdf']));
    const store = createStore();
    store.get(renderFnAtom).current = render;
    store.set(debounceAtom, 50);
    store.set(filesAtom, FILES);
    store.sub(renderEffect, () => {});
    await flush();

    store.set(filesAtom, [{ name: 'a.jsx', code: 'B' }]);
    await vi.advanceTimersByTimeAsync(50);
    await flush();

    expect(render).toHaveBeenCalledTimes(2);
  });

  it('aborts the in-flight render on unmount', async () => {
    const signals: AbortSignal[] = [];
    const render = vi.fn(async (_files, { signal }) => {
      signals.push(signal);
      return new Blob(['pdf']);
    });

    const { unmount } = mount(render);
    await flush();
    unmount();

    expect(signals[0].aborted).toBe(true);
  });

  it('gives each store its own started flag', async () => {
    const renderA = vi.fn(async () => new Blob(['a']));
    const renderB = vi.fn(async () => new Blob(['b']));

    mount(renderA);
    mount(renderB);
    await flush();

    expect(renderA).toHaveBeenCalledTimes(1);
    expect(renderB).toHaveBeenCalledTimes(1);
  });
});
