import { createStore } from 'jotai';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const doRender = vi.fn();
vi.mock('../src/render/render', () => ({
  render: (...args: unknown[]) => doRender(...(args as [])),
}));

import blobAtom from '../src/atoms/blob';
import errorAtom from '../src/atoms/error';
import filesAtom from '../src/atoms/files';
import statusAtom from '../src/atoms/status';
import type { RenderFn, RenderResult } from '../src/types';

const result = (blob = new Blob(['pdf']), numPages = 1): RenderResult => ({
  blob,
  numPages,
});

const FILES = [{ name: 'a.jsx', code: 'A' }];

const DEBOUNCE_MS = 250;

/** Drains the promise chain. Microtask based; fake timers replace setImmediate. */
const flush = async () => {
  for (let i = 0; i < 20; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await vi.advanceTimersByTimeAsync(0);
  }
};

/**
 * Subscribing to statusAtom mounts the whole pipeline, the same way Root's
 * object-url effect does in the real tree.
 */
/** Torn down in afterEach: a live pipeline would call the next test's mock. */
const mounted: Array<() => void> = [];

const mount = (render: RenderFn, files = FILES) => {
  doRender.mockImplementation(render);
  const store = createStore();
  store.set(filesAtom, files);
  const unmount = store.sub(statusAtom, () => {});
  mounted.push(unmount);
  store.get(statusAtom);
  return { store, unmount };
};

const edit = async (store: ReturnType<typeof createStore>, code: string) => {
  store.set(filesAtom, [{ name: 'a.jsx', code }]);
  await vi.advanceTimersByTimeAsync(DEBOUNCE_MS);
  await flush();
};

beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true });
  doRender.mockReset();
});

afterEach(() => {
  mounted.splice(0).forEach((unmount) => unmount());
  vi.useRealTimers();
});

describe('render pipeline', () => {
  it('renders immediately on mount without waiting for the debounce', async () => {
    const render = vi.fn(async () => result());
    const { store } = mount(render);

    await flush();

    expect(render).toHaveBeenCalledTimes(1);
    expect(store.get(statusAtom)).toBe('ready');
    expect(store.get(blobAtom)).toBeInstanceOf(Blob);
  });

  it('debounces edits', async () => {
    const render = vi.fn(async () => result());
    const { store } = mount(render);
    await flush();

    store.set(filesAtom, [{ name: 'a.jsx', code: 'B' }]);
    store.set(filesAtom, [{ name: 'a.jsx', code: 'C' }]);
    expect(render).toHaveBeenCalledTimes(1);

    await vi.advanceTimersByTimeAsync(DEBOUNCE_MS);
    await flush();

    expect(render).toHaveBeenCalledTimes(2);
    expect(render.mock.calls[1][0]).toEqual([{ name: 'a.jsx', code: 'C' }]);
  });

  it('reports rendering from the first keystroke, through the debounce', async () => {
    const render = vi.fn(async () => result());
    const { store } = mount(render);
    await flush();
    expect(store.get(statusAtom)).toBe('ready');

    store.set(filesAtom, [{ name: 'a.jsx', code: 'B' }]);
    await flush();

    expect(store.get(statusAtom)).toBe('rendering');
  });

  it('discards a stale result', async () => {
    let resolveFirst: (value: RenderResult) => void = () => {};
    const first = new Blob(['first']);
    const second = new Blob(['second']);

    const render = vi
      .fn<Parameters<RenderFn>, ReturnType<RenderFn>>()
      .mockImplementationOnce(
        () =>
          new Promise<RenderResult>((resolve) => {
            resolveFirst = resolve;
          }),
      )
      .mockImplementationOnce(async () => result(second));

    const { store } = mount(render);
    await flush();

    await edit(store, 'B');

    resolveFirst(result(first));
    await flush();

    expect(store.get(blobAtom)).toBe(second);
  });

  // Only in-flight work is aborted. A render that already settled has nothing
  // to cancel, so its signal stays clean.
  it('aborts a render that is still in flight when superseded', async () => {
    const signals: AbortSignal[] = [];
    const render = vi.fn(
      (_files: unknown, { signal }: { signal: AbortSignal }) => {
        signals.push(signal);
        return new Promise<RenderResult>(() => {});
      },
    ) as unknown as RenderFn;

    const { store } = mount(render);
    await flush();
    expect(signals[0].aborted).toBe(false);

    await edit(store, 'B');

    expect(signals[0].aborted).toBe(true);
    expect(signals[1].aborted).toBe(false);
  });

  it('does not surface an aborted wait as an error', async () => {
    const render = vi.fn(async () => result());
    const { store } = mount(render);
    await flush();

    // two edits inside one debounce window: the first wait is aborted
    store.set(filesAtom, [{ name: 'a.jsx', code: 'B' }]);
    await flush();
    store.set(filesAtom, [{ name: 'a.jsx', code: 'C' }]);
    await vi.advanceTimersByTimeAsync(DEBOUNCE_MS);
    await flush();

    expect(store.get(errorAtom)).toBeNull();
    expect(store.get(statusAtom)).toBe('ready');
    expect(render).toHaveBeenCalledTimes(2);
  });

  it('keeps the last good blob when a render fails', async () => {
    const good = new Blob(['good']);
    const render = vi
      .fn<Parameters<RenderFn>, ReturnType<RenderFn>>()
      .mockImplementationOnce(async () => result(good))
      .mockImplementationOnce(async () => {
        throw new Error('boom');
      });

    const { store } = mount(render);
    await flush();

    await edit(store, 'B');

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
      .mockImplementationOnce(async () => result(new Blob(['ok'])));

    const { store } = mount(render);
    await flush();
    expect(store.get(errorAtom)).not.toBeNull();

    await edit(store, 'B');

    expect(store.get(errorAtom)).toBeNull();
    expect(store.get(statusAtom)).toBe('ready');
  });

  it('stays idle with no files', async () => {
    const render = vi.fn(async () => result());
    const { store } = mount(render, []);

    await flush();

    expect(render).not.toHaveBeenCalled();
    expect(store.get(statusAtom)).toBe('idle');
  });

  // Jotai aborts on recomputation, not on unmount. Documented rather than
  // worked around: a render function owning something expensive (a worker)
  // already tears it down from its own React cleanup, which is a firmer
  // guarantee than a signal.
  it('does not abort on unmount', async () => {
    const signals: AbortSignal[] = [];
    const render = vi.fn(
      (_files: unknown, { signal }: { signal: AbortSignal }) => {
        signals.push(signal);
        return new Promise<RenderResult>(() => {});
      },
    ) as unknown as RenderFn;

    const { unmount } = mount(render);
    await flush();
    unmount();
    await flush();

    expect(signals[0].aborted).toBe(false);
  });

  it('gives each store its own cache and started flag', async () => {
    const renderA = vi.fn(async () => result(new Blob(['a'])));
    const renderB = vi.fn(async () => result(new Blob(['b'])));

    const a = mount(renderA);
    const b = mount(renderB);
    await flush();

    expect(renderA).toHaveBeenCalledTimes(1);
    expect(renderB).toHaveBeenCalledTimes(1);
    expect(a.store.get(blobAtom)).not.toBe(b.store.get(blobAtom));
  });
});
