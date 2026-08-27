import { createStore } from 'jotai';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const doRender = vi.fn();
vi.mock('../src/render/render', () => ({
  render: (...args: unknown[]) => doRender(...(args as [])),
}));

import filesAtom from '../src/atoms/files';
import urlAtom from '../src/atoms/url';
import type { RenderFn, RenderResult } from '../src/types';

const result = (blob = new Blob(['pdf'])): RenderResult => ({
  blob,
  numPages: 1,
});

const DEBOUNCE_MS = 250;

const createObjectURL = vi.fn();
const revokeObjectURL = vi.fn();

const flush = async () => {
  for (let i = 0; i < 20; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await Promise.resolve();
  }
};

const mount = (render: RenderFn) => {
  doRender.mockImplementation(render);
  const store = createStore();
  store.set(filesAtom, [{ name: 'a.jsx', code: 'A' }]);
  const unmount = store.sub(urlAtom, () => {});
  store.get(urlAtom);
  return { store, unmount };
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
  vi.stubGlobal('URL', { createObjectURL, revokeObjectURL });
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe('object url', () => {
  it('publishes a url for the rendered blob', async () => {
    const { store } = mount(async () => result());
    await flush();

    expect(store.get(urlAtom)).toBe('blob:1');
  });

  it('revokes the previous url when a new blob arrives', async () => {
    const { store } = mount(async () => result());
    await flush();

    store.set(filesAtom, [{ name: 'a.jsx', code: 'B' }]);
    await vi.advanceTimersByTimeAsync(DEBOUNCE_MS);
    await flush();

    expect(revokeObjectURL).toHaveBeenCalledWith('blob:1');
    expect(store.get(urlAtom)).toBe('blob:2');
  });

  it('revokes the outstanding url on unmount', async () => {
    const { unmount } = mount(async () => result());
    await flush();
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
    await flush();

    store.set(filesAtom, [{ name: 'a.jsx', code: 'B' }]);
    await vi.advanceTimersByTimeAsync(DEBOUNCE_MS);
    await flush();

    expect(store.get(urlAtom)).toBe('blob:1');
    expect(revokeObjectURL).not.toHaveBeenCalled();
  });

  it('creates nothing while there is nothing to render', async () => {
    const store = createStore();
    store.set(filesAtom, []);
    store.sub(urlAtom, () => {});
    await flush();

    expect(createObjectURL).not.toHaveBeenCalled();
    expect(store.get(urlAtom)).toBeNull();
  });
});
