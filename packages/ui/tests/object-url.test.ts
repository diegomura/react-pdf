import { createStore } from 'jotai';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import blobAtom from '../src/atoms/blob';
import urlAtom from '../src/atoms/url';
import objectUrlEffect from '../src/effects/object-url';

const createObjectURL = vi.fn();
const revokeObjectURL = vi.fn();

beforeEach(() => {
  let next = 0;
  createObjectURL.mockReset().mockImplementation(() => {
    next += 1;
    return `blob:${next}`;
  });
  revokeObjectURL.mockReset();
  vi.stubGlobal('URL', { createObjectURL, revokeObjectURL });
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('object url effect', () => {
  it('publishes a url for the current blob', () => {
    const store = createStore();
    store.sub(objectUrlEffect, () => {});
    store.set(blobAtom, new Blob(['pdf']));

    expect(store.get(urlAtom)).toBe('blob:1');
  });

  it('revokes the previous url when the blob is replaced', () => {
    const store = createStore();
    store.sub(objectUrlEffect, () => {});
    store.set(blobAtom, new Blob(['one']));
    store.set(blobAtom, new Blob(['two']));

    expect(revokeObjectURL).toHaveBeenCalledWith('blob:1');
    expect(store.get(urlAtom)).toBe('blob:2');
  });

  it('revokes the outstanding url on unmount', () => {
    const store = createStore();
    const unmount = store.sub(objectUrlEffect, () => {});
    store.set(blobAtom, new Blob(['pdf']));
    unmount();

    expect(revokeObjectURL).toHaveBeenCalledWith('blob:1');
  });

  it('creates nothing while there is no blob', () => {
    const store = createStore();
    store.sub(objectUrlEffect, () => {});

    expect(createObjectURL).not.toHaveBeenCalled();
    expect(store.get(urlAtom)).toBeNull();
  });
});
