import { createStore } from 'jotai';
import { describe, expect, it, vi } from 'vitest';

const doRender = vi.fn();
vi.mock('../src/render/render', () => ({
  render: (...args: unknown[]) => doRender(...(args as [])),
}));

import { atom } from 'jotai';
import { unwrap } from 'jotai/utils';
import { withAtomEffect } from 'jotai-effect';

import blobAtom from '../src/atoms/blob';
import startedAtom from '../src/atoms/started';
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

    // does unwrap honour the fallback, and does it pull the source atom?
    const PENDING = Symbol('pending');
    let sourceRuns = 0;
    const src = atom(async () => {
      sourceRuns += 1;
      return 42;
    });
    const un = unwrap(src, () => PENDING);
    const us = createStore();
    const unsubUn = us.sub(un, () => {});
    log('unwrap immediate', String(us.get(un)), 'sourceRuns', sourceRuns);
    await new Promise((r) => {
      setTimeout(r, 300);
    });
    log('unwrap later', String(us.get(un)), 'sourceRuns', sourceRuns);
    unsubUn();

    // replicate result.ts inline, logging every hop
    {
      const PEND = Symbol('pend');
      let srcRuns = 0;
      let filesSeen = -1;
      let startedSeen = 'n/a';
      const inlineSource = atom(async (get) => {
        srcRuns += 1;
        const f = get(filesAtom);
        filesSeen = f.length;
        const st = get(startedAtom);
        startedSeen = JSON.stringify(st);
        if (f.length === 0) return null;
        return { blob: new Blob(['x']), numPages: 1 };
      });
      const inlineUnwrapped = unwrap(inlineSource, () => PEND);
      const inlineResult = atom((get) => {
        const raw = get(inlineUnwrapped);
        return { isPending: raw === PEND, raw: String(raw), type: typeof raw };
      });
      const st2 = createStore();
      st2.set(filesAtom, [{ name: 'c.jsx', code: 'C' }]);
      const unsub2 = st2.sub(inlineResult, () => {});
      log('inline immediate', JSON.stringify(st2.get(inlineResult)));
      await new Promise((r) => {
        setTimeout(r, 300);
      });
      log('inline later', JSON.stringify(st2.get(inlineResult)));
      log('inline srcRuns', srcRuns, 'filesSeen', filesSeen, 'startedSeen', startedSeen);
      unsub2();
    }

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
