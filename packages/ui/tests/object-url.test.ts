import { createStore } from 'jotai';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const doRender = vi.fn();
vi.mock('../src/render/render', () => ({
  render: (...args: unknown[]) => doRender(...(args as [])),
}));

import filesAtom from '../src/atoms/files';
import statusAtom from '../src/atoms/status';
import urlAtom from '../src/atoms/url';
import type { RenderFn, RenderResult } from '../src/types';

const result = (blob = new Blob(['pdf'])): RenderResult => ({
  blob,
  numPages: 1,
});

const DEBOUNCE_MS = 250;

const createObjectURL = vi.fn();
const revokeObjectURL = vi.fn();

/**
 * Waits for the pipeline to settle. Polling rather than draining a fixed
 * number of microtasks: how many promise hops a render takes is an
 * implementation detail, and hard-coding it makes the test fail on a slower
 * machine long before anything is actually wrong.
 */
const until = (predicate: () => boolean) =>
  vi.waitFor(() => {
    if (!predicate()) throw new Error('pipeline has not settled');
  });

/**
 * Every subscription is torn down in afterEach. A store left mounted keeps its
 * render pipeline alive into the next test, where it calls a mock whose
 * implementation has just been reset and gets `undefined` back.
 */
const mounted: Array<() => void> = [];

const mount = (render: RenderFn) => {
  doRender.mockImplementation(render);
  const store = createStore();
  store.set(filesAtom, [{ name: 'a.jsx', code: 'A' }]);
  const unmount = store.sub(urlAtom, () => {});
  mounted.push(unmount);
  store.get(urlAtom);
  return { store, unmount };
};

const edit = (store: ReturnType<typeof createStore>, code: string) => {
  store.set(filesAtom, [{ name: 'a.jsx', code }]);
  return vi.advanceTimersByTimeAsync(DEBOUNCE_MS);
};

// jsdom implements neither method, so they are added rather than spied on.
// Only these two are replaced: swapping the whole `URL` global takes the
// constructor with it, which other machinery still needs.
const patchUrl = () => {
  Object.defineProperty(URL, 'createObjectURL', {
    value: createObjectURL,
    configurable: true,
    writable: true,
  });
  Object.defineProperty(URL, 'revokeObjectURL', {
    value: revokeObjectURL,
    configurable: true,
    writable: true,
  });
};

const unpatchUrl = () => {
  delete (URL as Partial<typeof URL>).createObjectURL;
  delete (URL as Partial<typeof URL>).revokeObjectURL;
};

beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true });
  let next = 0;
  createObjectURL.mockReset().mockImplementation(() => {
    next += 1;
    return `blob:${next}`;
  });
  revokeObjectURL.mockReset();
  doRender.mockReset().mockImplementation(async () => result());
  patchUrl();
});

afterEach(() => {
  mounted.splice(0).forEach((unmount) => unmount());
  vi.useRealTimers();
  unpatchUrl();
});

describe('object url', () => {
  it('publishes a url for the rendered blob', async () => {
    const { store } = mount(async () => result());

    await until(() => createObjectURL.mock.calls.length > 0);

    expect(store.get(urlAtom)).toBe('blob:1');
  });

  it('revokes the previous url when a new blob arrives', async () => {
    const { store } = mount(async () => result());
    await until(() => store.get(urlAtom) === 'blob:1');

    await edit(store, 'B');
    await until(() => store.get(urlAtom) === 'blob:2');

    expect(revokeObjectURL).toHaveBeenCalledWith('blob:1');
  });

  it('revokes the outstanding url on unmount', async () => {
    const { store, unmount } = mount(async () => result());
    await until(() => store.get(urlAtom) === 'blob:1');

    unmount();

    expect(revokeObjectURL).toHaveBeenCalledWith('blob:1');
  });

  it('keeps the url of the last good render when one fails', async () => {
    const render = vi
      .fn<Parameters<RenderFn>, ReturnType<RenderFn>>()
      .mockImplementationOnce(async () => result(new Blob(['good'])))
      .mockImplementationOnce(async () => {
        throw new Error('boom');
      });

    const { store } = mount(render);
    await until(() => store.get(urlAtom) === 'blob:1');

    await edit(store, 'B');
    await until(() => store.get(statusAtom) === 'error');

    expect(store.get(urlAtom)).toBe('blob:1');
    expect(revokeObjectURL).not.toHaveBeenCalled();
  });

  it('creates nothing while there is nothing to render', async () => {
    const store = createStore();
    store.set(filesAtom, []);
    mounted.push(store.sub(urlAtom, () => {}));

    await until(() => store.get(statusAtom) === 'idle');

    expect(createObjectURL).not.toHaveBeenCalled();
    expect(store.get(urlAtom)).toBeNull();
  });
});
