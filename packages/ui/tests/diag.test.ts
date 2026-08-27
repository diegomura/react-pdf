import { createStore } from 'jotai';
import { describe, expect, it, vi } from 'vitest';

const doRender = vi.fn();
vi.mock('../src/render/render', () => ({
  render: (...args: unknown[]) => doRender(...(args as [])),
}));

import { atom } from 'jotai';
import { withAtomEffect } from 'jotai-effect';

import blobAtom from '../src/atoms/blob';
import filesAtom from '../src/atoms/files';
import resultAtom from '../src/atoms/result';
import statusAtom from '../src/atoms/status';
import urlAtom from '../src/atoms/url';

// TEMPORARY: reports pipeline state so CI can say what differs from local.
describe('diagnostics', () => {
  it('reports environment and pipeline state', async () => {
    const log = (...args: unknown[]) => {
      // eslint-disable-next-line no-console
      console.log('DIAG', ...args);
    };

    // does jotai-effect run its effect at all here?
    let effectRuns = 0;
    const plain = atom(0);
    const probe = withAtomEffect(plain, () => {
      effectRuns += 1;
    });
    const probeStore = createStore();
    const unsubProbe = probeStore.sub(probe, () => {});
    probeStore.get(probe);
    await new Promise((r) => {
      setTimeout(r, 50);
    });
    log('withAtomEffect runs', effectRuns);
    log('jotai version', String((await import('jotai/package.json', { with: { type: 'json' } }).catch(() => ({ default: {} }))).default?.version));
    unsubProbe();

    log('NODE_ENV', JSON.stringify(process.env.NODE_ENV));
    log('REACT_VERSION', JSON.stringify(process.env.REACT_VERSION));
    log('has URL ctor', typeof URL);
    log('has createObjectURL', typeof (URL as { createObjectURL?: unknown }).createObjectURL);
    log('has Blob', typeof Blob);

    const created: string[] = [];
    Object.defineProperty(URL, 'createObjectURL', {
      value: () => {
        created.push('called');
        return 'blob:diag';
      },
      configurable: true,
      writable: true,
    });
    Object.defineProperty(URL, 'revokeObjectURL', {
      value: () => {},
      configurable: true,
      writable: true,
    });

    doRender.mockImplementation(async () => ({
      blob: new Blob(['pdf']),
      numPages: 1,
    }));

    const store = createStore();
    store.set(filesAtom, [{ name: 'a.jsx', code: 'A' }]);

    const unsubUrl = store.sub(urlAtom, () => {});
    store.get(urlAtom);

    // real timers here, so a plain sleep drains everything
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });

    log('files length seen by store', store.get(filesAtom).length);
    log('doRender calls via urlAtom', doRender.mock.calls.length);

    // bypass urlAtom: subscribe to the result directly
    const direct = createStore();
    direct.set(filesAtom, [{ name: 'b.jsx', code: 'B' }]);
    const unsubDirect = direct.sub(resultAtom, () => {});
    direct.get(resultAtom);
    await new Promise((r) => {
      setTimeout(r, 500);
    });
    log('doRender calls after direct result sub', doRender.mock.calls.length);
    log('direct result', JSON.stringify({
      pending: direct.get(resultAtom).pending,
      hasData: Boolean(direct.get(resultAtom).data),
      error: String(direct.get(resultAtom).error),
    }));
    log('direct status', direct.get(statusAtom));
    unsubDirect();
    log('status', store.get(statusAtom));
    log('result', JSON.stringify({
      pending: store.get(resultAtom).pending,
      hasData: Boolean(store.get(resultAtom).data),
      error: String(store.get(resultAtom).error),
    }));
    log('blob is null?', store.get(blobAtom) === null);
    log('createObjectURL invocations', created.length);
    log('urlAtom', String(store.get(urlAtom)));

    log('unsub start');
    try {
      unsubUrl();
      log('unsub ok');
    } catch (error) {
      log('unsub threw', String(error));
    }
    expect(true).toBe(true);
  });
});
