# `@react-pdf/ui` Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `packages/ui`, a headless React primitive set for code editor plus PDF preview interfaces, published as `@react-pdf/ui`.

**Architecture:** Jotai atoms hold all state, `jotai-effect` atoms drive the async render pipeline and object URL lifecycle, and each primitive is a connected component that reads atoms and renders a caller-supplied `Component` prop. The library contains no DOM, no styles, no compiler and no PDF rasteriser. The function that turns files into a `Blob` is injected by the consumer.

**Tech Stack:** TypeScript, React 19 (peer range back to 16.8), Jotai 2, jotai-effect 2, Rollup, Vitest.

**Spec:** `docs/superpowers/specs/2026-08-26-react-pdf-ui-design.md`

**Scope:** This plan covers the package only. Migrating `apps/site` onto it is a follow-up plan, per the spec's sequencing. The package is independently testable and publishable at the end of Task 12.

---

## Deviations from the spec

Two, both simplifications found while planning. Neither changes the public API.

1. **No `effects/unmount.ts`.** The spec listed one. It is unnecessary: `effects/object-url.ts` returns a cleanup that revokes the URL, and jotai runs that cleanup on unmount. A second effect would duplicate it.
2. **No `atoms/request-id.ts`.** The spec described a monotonic request id for discarding stale results. An `atomEffect` cleanup runs before the next execution, so a closure flag does the same job with less state. Behaviour is identical.

One addition: `atoms/started.ts`, a per-store flag so the first render fires immediately and only later edits are debounced.

---

## File structure

```
packages/ui/
  package.json          rollup.config.js    tsconfig.json    vitest.config.js
  README.md
  src/
    types.ts            index.ts
    atoms/
      active-file.ts        derived: the active ReplFile or null
      active-file-name.ts   the active file's name
      blob.ts               last successfully rendered Blob
      copy-state.ts         idle | copied | failed, plus the copy write atom
      debounce.ts           edit debounce in ms
      error.ts              last render error
      file-operations.ts    select / add / rename / remove / update source
      filename.ts           download filename
      files.ts              ReplFile[]
      num-pages.ts          page count reported by the consumer
      page.ts               current page, plus clamping write atoms
      render-fn.ts          per-store box holding the injected render function
      started.ts            per-store "has rendered once" flag
      status.ts             idle | rendering | ready | error
      url.ts                object URL for the current blob
    effects/
      render.ts             the render pipeline
      object-url.ts         createObjectURL / revokeObjectURL lifecycle
      copy-reset.ts         returns copy state to idle
    parts/
      root/ files/ editor/ document/ pagination/ status/
      copy-button/ download-button/
  tests/
    file-operations.test.ts  render.test.ts   object-url.test.ts
    page.test.ts             copy.test.ts     parts.test.tsx
```

Every `parts/<name>/` holds `<name>.tsx` plus an `index.ts` barrel of `export { default } from './<name>'`, matching `@amadeus/score-ui`.

**Commit with `git commit --only <paths>`, never `git add` then `git commit`.** This repo's working tree may have unrelated staged changes; `--only` commits exactly the listed paths and ignores the index.

---

## Task 1: Scaffold the package

**Files:**
- Create: `packages/ui/package.json`
- Create: `packages/ui/tsconfig.json`
- Create: `packages/ui/rollup.config.js`
- Create: `packages/ui/vitest.config.js`
- Create: `packages/ui/src/types.ts`
- Create: `packages/ui/src/index.ts`
- Modify: `vitest.workspace.js`

- [ ] **Step 1: Create `packages/ui/package.json`**

Mirrors `packages/math/package.json`. Version starts at `0.1.0` because this is a new package on independent versioning.

```json
{
  "name": "@react-pdf/ui",
  "version": "0.1.0",
  "license": "MIT",
  "description": "Headless React primitives for building PDF preview and editor interfaces",
  "author": "Diego Muracciole <diegomuracciole@gmail.com>",
  "homepage": "https://github.com/diegomura/react-pdf#readme",
  "type": "module",
  "main": "./lib/index.js",
  "types": "./lib/index.d.ts",
  "repository": {
    "type": "git",
    "url": "https://github.com/diegomura/react-pdf.git",
    "directory": "packages/ui"
  },
  "scripts": {
    "build": "rimraf ./lib && rollup -c",
    "watch": "rimraf ./lib && rollup -c -w",
    "typecheck": "tsc --noEmit",
    "test": "vitest"
  },
  "files": [
    "lib"
  ],
  "dependencies": {
    "jotai": "^2.12.5",
    "jotai-effect": "^2.0.4"
  },
  "peerDependencies": {
    "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"
  },
  "devDependencies": {
    "@testing-library/react": "^16.0.0",
    "@vitejs/plugin-react": "^4.2.1",
    "jsdom": "^25.0.0",
    "vitest": "^1.2.0"
  }
}
```

- [ ] **Step 2: Create `packages/ui/tsconfig.json`**

Copied from `packages/math/tsconfig.json`, with `strict` turned on. The other packages set `strict: false` for historical reasons; a brand new package has no legacy to accommodate.

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "outDir": "lib",
    "declaration": true,
    "declarationDir": "lib/types",
    "target": "ES2022",
    "module": "ESNext",
    "lib": ["ES2022", "DOM"],
    "moduleResolution": "Node",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "jsx": "react-jsx",
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"]
}
```

- [ ] **Step 3: Create `packages/ui/rollup.config.js`**

```js
import typescript from '@rollup/plugin-typescript';
import { dts } from 'rollup-plugin-dts';
import del from 'rollup-plugin-delete';

const config = {
  input: 'src/index.ts',
  output: {
    dir: 'lib',
    format: 'es',
  },
  external: [/^react/, /^jotai/],
  plugins: [typescript()],
};

const dtsConfig = {
  input: './lib/types/index.d.ts',
  output: [{ file: 'lib/index.d.ts', format: 'es' }],
  plugins: [dts(), del({ targets: 'lib/types', hook: 'buildEnd' })],
};

export default [config, dtsConfig];
```

- [ ] **Step 4: Create `packages/ui/vitest.config.js`**

Note what this deliberately does **not** do: `packages/renderer` aliases `react` to `react-16` / `react-17` / `react-19` based on `REACT_VERSION`. This package does not, so its tests always run against the root React 18 install regardless of the CI matrix. The package supports React 16.8 and up through its hooks-only API; pinning the test run to one version keeps the suite from needing four sets of testing-library shims.

```js
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    include: ['tests/*.{test,spec}.?(c|m)[jt]s?(x)'],
    watch: false,
  },
});
```

- [ ] **Step 5: Create `packages/ui/src/types.ts`**

```ts
import type { ComponentType, CSSProperties } from 'react';

export type ReplFile = { name: string; code: string };

export type ReplStatus = 'idle' | 'rendering' | 'ready' | 'error';

export type CopyState = 'idle' | 'copied' | 'failed';

export type RenderContext = { signal: AbortSignal };

export type RenderFn = (
  files: ReplFile[],
  context: RenderContext,
) => Promise<Blob>;

export type Styling = { className?: string; style?: CSSProperties };

export type PartProps<P> = Styling & {
  Component: ComponentType<P & Styling>;
};
```

- [ ] **Step 6: Create a placeholder `packages/ui/src/index.ts`**

Replaced in Task 12. It exists now so `build` and `typecheck` have an entry point.

```ts
export * from './types';
```

- [ ] **Step 7: Register the package with Vitest**

In `vitest.workspace.js`, add `'packages/ui/vitest.config.js'` to the array. Put it after `'packages/hyphenate'` on its own line.

- [ ] **Step 8: Install and verify the toolchain**

The default Node 18 on this machine breaks `yarn install`; use Node 22.

Run from the repo root:
```bash
yarn install
yarn --cwd packages/ui run typecheck
yarn --cwd packages/ui run build
```
Expected: install succeeds, typecheck prints nothing, and `packages/ui/lib/index.js` plus `packages/ui/lib/index.d.ts` exist.

- [ ] **Step 9: Commit**

```bash
git commit --only packages/ui/package.json packages/ui/tsconfig.json \
  packages/ui/rollup.config.js packages/ui/vitest.config.js \
  packages/ui/src/types.ts packages/ui/src/index.ts \
  vitest.workspace.js yarn.lock \
  -m "feat(ui): scaffold the @react-pdf/ui package"
```

---

## Task 2: Base atoms

No tests here. These are one-line atoms with no behaviour; the behaviour arrives in Task 3 and is tested there.

**Files:**
- Create: `packages/ui/src/atoms/files.ts`, `active-file-name.ts`, `active-file.ts`, `blob.ts`, `url.ts`, `status.ts`, `error.ts`, `num-pages.ts`, `debounce.ts`, `filename.ts`, `render-fn.ts`, `started.ts`

- [ ] **Step 1: Write the plain value atoms**

`packages/ui/src/atoms/files.ts`
```ts
import { atom } from 'jotai';

import type { ReplFile } from '../types';

const filesAtom = atom<ReplFile[]>([]);

export default filesAtom;
```

`packages/ui/src/atoms/active-file-name.ts`
```ts
import { atom } from 'jotai';

const activeFileNameAtom = atom<string | null>(null);

export default activeFileNameAtom;
```

`packages/ui/src/atoms/blob.ts`
```ts
import { atom } from 'jotai';

const blobAtom = atom<Blob | null>(null);

export default blobAtom;
```

`packages/ui/src/atoms/url.ts`
```ts
import { atom } from 'jotai';

const urlAtom = atom<string | null>(null);

export default urlAtom;
```

`packages/ui/src/atoms/status.ts`
```ts
import { atom } from 'jotai';

import type { ReplStatus } from '../types';

const statusAtom = atom<ReplStatus>('idle');

export default statusAtom;
```

`packages/ui/src/atoms/error.ts`
```ts
import { atom } from 'jotai';

const errorAtom = atom<Error | null>(null);

export default errorAtom;
```

`packages/ui/src/atoms/num-pages.ts`
```ts
import { atom } from 'jotai';

const numPagesAtom = atom(0);

export default numPagesAtom;
```

`packages/ui/src/atoms/debounce.ts`
```ts
import { atom } from 'jotai';

const debounceAtom = atom(500);

export default debounceAtom;
```

`packages/ui/src/atoms/filename.ts`
```ts
import { atom } from 'jotai';

const filenameAtom = atom('document.pdf');

export default filenameAtom;
```

- [ ] **Step 2: Write the derived active file atom**

`packages/ui/src/atoms/active-file.ts`
```ts
import { atom } from 'jotai';

import type { ReplFile } from '../types';

import activeFileNameAtom from './active-file-name';
import filesAtom from './files';

const activeFileAtom = atom<ReplFile | null>(
  (get) =>
    get(filesAtom).find((file) => file.name === get(activeFileNameAtom)) ?? null,
);

export default activeFileAtom;
```

- [ ] **Step 3: Write the two per-store mutable boxes**

Both use `atom(() => ({ ... }))` rather than `atom({ ... })`. A read-only atom with no dependencies is computed once **per store**, so each `<Provider>` gets its own object. `atom({ ... })` would share one object across every Repl instance on the page. Reading these with `get` also does not subscribe the reader to anything, because they are never `set`, only mutated.

`packages/ui/src/atoms/render-fn.ts`
```ts
import { atom } from 'jotai';

import type { RenderFn } from '../types';

// Boxed and mutated rather than `set`, so a consumer passing an inline arrow
// function does not re-trigger the render effect on every React render.
const renderFnAtom = atom(() => ({ current: null as RenderFn | null }));

export default renderFnAtom;
```

`packages/ui/src/atoms/started.ts`
```ts
import { atom } from 'jotai';

// The first render fires immediately; only later edits are debounced. This
// flag is what the render effect uses to tell those apart.
const startedAtom = atom(() => ({ value: false }));

export default startedAtom;
```

- [ ] **Step 4: Verify it compiles**

```bash
yarn --cwd packages/ui run typecheck
```
Expected: no output.

- [ ] **Step 5: Commit**

```bash
git commit --only packages/ui/src/atoms \
  -m "feat(ui): add base atoms"
```

---

## Task 3: File operations

**Files:**
- Create: `packages/ui/src/atoms/file-operations.ts`
- Test: `packages/ui/tests/file-operations.test.ts`

- [ ] **Step 1: Write the failing test**

`packages/ui/tests/file-operations.test.ts`
```ts
import { createStore } from 'jotai';
import { describe, expect, it } from 'vitest';

import activeFileNameAtom from '../src/atoms/active-file-name';
import activeFileAtom from '../src/atoms/active-file';
import {
  addFileAtom,
  removeFileAtom,
  renameFileAtom,
  selectFileAtom,
  updateSourceAtom,
} from '../src/atoms/file-operations';
import filesAtom from '../src/atoms/files';

const seed = () => {
  const store = createStore();
  store.set(filesAtom, [
    { name: 'a.jsx', code: 'A' },
    { name: 'b.jsx', code: 'B' },
    { name: 'c.jsx', code: 'C' },
  ]);
  store.set(activeFileNameAtom, 'a.jsx');
  return store;
};

describe('selectFileAtom', () => {
  it('selects a file that exists', () => {
    const store = seed();
    store.set(selectFileAtom, 'b.jsx');
    expect(store.get(activeFileNameAtom)).toBe('b.jsx');
  });

  it('ignores a name that does not exist', () => {
    const store = seed();
    store.set(selectFileAtom, 'nope.jsx');
    expect(store.get(activeFileNameAtom)).toBe('a.jsx');
  });
});

describe('addFileAtom', () => {
  it('appends without changing the active file', () => {
    const store = seed();
    store.set(addFileAtom, { name: 'd.jsx', code: 'D' });
    expect(store.get(filesAtom).map((f) => f.name)).toEqual([
      'a.jsx',
      'b.jsx',
      'c.jsx',
      'd.jsx',
    ]);
    expect(store.get(activeFileNameAtom)).toBe('a.jsx');
  });

  it('ignores a duplicate name', () => {
    const store = seed();
    store.set(addFileAtom, { name: 'b.jsx', code: 'OTHER' });
    expect(store.get(filesAtom)).toHaveLength(3);
    expect(store.get(filesAtom)[1].code).toBe('B');
  });
});

describe('renameFileAtom', () => {
  it('renames in place', () => {
    const store = seed();
    store.set(renameFileAtom, 'b.jsx', 'z.jsx');
    expect(store.get(filesAtom).map((f) => f.name)).toEqual([
      'a.jsx',
      'z.jsx',
      'c.jsx',
    ]);
  });

  it('follows the active file when it is the one renamed', () => {
    const store = seed();
    store.set(renameFileAtom, 'a.jsx', 'z.jsx');
    expect(store.get(activeFileNameAtom)).toBe('z.jsx');
  });

  it('is a no-op when the target name is taken', () => {
    const store = seed();
    store.set(renameFileAtom, 'a.jsx', 'b.jsx');
    expect(store.get(filesAtom).map((f) => f.name)).toEqual([
      'a.jsx',
      'b.jsx',
      'c.jsx',
    ]);
    expect(store.get(activeFileNameAtom)).toBe('a.jsx');
  });
});

describe('removeFileAtom', () => {
  it('removes a file that is not active', () => {
    const store = seed();
    store.set(removeFileAtom, 'b.jsx');
    expect(store.get(filesAtom).map((f) => f.name)).toEqual(['a.jsx', 'c.jsx']);
    expect(store.get(activeFileNameAtom)).toBe('a.jsx');
  });

  it('moves to the file that slid into the slot when the active one goes', () => {
    const store = seed();
    store.set(selectFileAtom, 'b.jsx');
    store.set(removeFileAtom, 'b.jsx');
    expect(store.get(activeFileNameAtom)).toBe('c.jsx');
  });

  it('moves to the new last file when the active one was last', () => {
    const store = seed();
    store.set(selectFileAtom, 'c.jsx');
    store.set(removeFileAtom, 'c.jsx');
    expect(store.get(activeFileNameAtom)).toBe('b.jsx');
  });

  it('leaves no active file when the last file is removed', () => {
    const store = createStore();
    store.set(filesAtom, [{ name: 'only.jsx', code: 'X' }]);
    store.set(activeFileNameAtom, 'only.jsx');
    store.set(removeFileAtom, 'only.jsx');
    expect(store.get(filesAtom)).toEqual([]);
    expect(store.get(activeFileNameAtom)).toBeNull();
    expect(store.get(activeFileAtom)).toBeNull();
  });
});

describe('updateSourceAtom', () => {
  it('writes to the active file only', () => {
    const store = seed();
    store.set(updateSourceAtom, 'NEW');
    expect(store.get(filesAtom)).toEqual([
      { name: 'a.jsx', code: 'NEW' },
      { name: 'b.jsx', code: 'B' },
      { name: 'c.jsx', code: 'C' },
    ]);
  });

  it('does nothing when there is no active file', () => {
    const store = seed();
    store.set(activeFileNameAtom, null);
    store.set(updateSourceAtom, 'NEW');
    expect(store.get(filesAtom)[0].code).toBe('A');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
yarn vitest run packages/ui/tests/file-operations.test.ts
```
Expected: FAIL, cannot resolve `../src/atoms/file-operations`.

- [ ] **Step 3: Write the implementation**

`packages/ui/src/atoms/file-operations.ts`
```ts
import { atom } from 'jotai';

import type { ReplFile } from '../types';

import activeFileNameAtom from './active-file-name';
import filesAtom from './files';

export const selectFileAtom = atom(null, (get, set, name: string) => {
  if (!get(filesAtom).some((file) => file.name === name)) return;
  set(activeFileNameAtom, name);
});

export const addFileAtom = atom(null, (get, set, file: ReplFile) => {
  const files = get(filesAtom);
  if (files.some((existing) => existing.name === file.name)) return;
  set(filesAtom, [...files, file]);
});

export const renameFileAtom = atom(
  null,
  (get, set, name: string, next: string) => {
    const files = get(filesAtom);
    if (!files.some((file) => file.name === name)) return;
    if (files.some((file) => file.name === next)) return;

    set(
      filesAtom,
      files.map((file) =>
        file.name === name ? { ...file, name: next } : file,
      ),
    );

    if (get(activeFileNameAtom) === name) set(activeFileNameAtom, next);
  },
);

export const removeFileAtom = atom(null, (get, set, name: string) => {
  const files = get(filesAtom);
  const index = files.findIndex((file) => file.name === name);
  if (index === -1) return;

  const next = files.filter((file) => file.name !== name);
  set(filesAtom, next);

  if (get(activeFileNameAtom) !== name) return;

  // whatever slid into the vacated slot, or the new last file if it was last
  const neighbour = next[index] ?? next[next.length - 1] ?? null;
  set(activeFileNameAtom, neighbour?.name ?? null);
});

export const updateSourceAtom = atom(null, (get, set, code: string) => {
  const name = get(activeFileNameAtom);
  if (name === null) return;

  set(
    filesAtom,
    get(filesAtom).map((file) =>
      file.name === name ? { ...file, code } : file,
    ),
  );
});
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
yarn vitest run packages/ui/tests/file-operations.test.ts
```
Expected: PASS, 13 tests.

- [ ] **Step 5: Commit**

```bash
git commit --only packages/ui/src/atoms/file-operations.ts \
  packages/ui/tests/file-operations.test.ts \
  -m "feat(ui): add file operations"
```

---

## Task 4: The render effect

The core of the package. Everything the site currently duplicates between `use-repl.ts` and `render-pool.ts` lives here.

**Files:**
- Create: `packages/ui/src/effects/render.ts`
- Test: `packages/ui/tests/render.test.ts`

- [ ] **Step 1: Write the failing test**

An `atomEffect` runs only while it is mounted. `store.sub(effect, () => {})` mounts it and returns the unsubscribe that unmounts it.

`packages/ui/tests/render.test.ts`
```ts
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

/** Lets the queued promise callbacks in the effect settle. */
const flush = () => new Promise<void>((resolve) => setImmediate(resolve));

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
        () => new Promise<Blob>((resolve) => { resolveFirst = resolve; }),
      )
      .mockImplementationOnce(async () => second);

    const { store } = mount(render);

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
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
yarn vitest run packages/ui/tests/render.test.ts
```
Expected: FAIL, cannot resolve `../src/effects/render`.

- [ ] **Step 3: Write the implementation**

`packages/ui/src/effects/render.ts`
```ts
import { atomEffect } from 'jotai-effect';

import blobAtom from '../atoms/blob';
import debounceAtom from '../atoms/debounce';
import errorAtom from '../atoms/error';
import filesAtom from '../atoms/files';
import renderFnAtom from '../atoms/render-fn';
import startedAtom from '../atoms/started';
import statusAtom from '../atoms/status';

const toError = (value: unknown) =>
  value instanceof Error ? value : new Error(String(value));

const renderEffect: ReturnType<typeof atomEffect> = atomEffect((get, set) => {
  const files = get(filesAtom);
  const debounce = get(debounceAtom);

  // Both are per-store boxes read for their identity, never for a value that
  // changes, so neither subscribes this effect to its own bookkeeping.
  const renderFn = get(renderFnAtom);
  const started = get(startedAtom);

  const render = renderFn.current;

  if (!render || files.length === 0) {
    set(statusAtom, 'idle');
    return;
  }

  let stale = false;
  const controller = new AbortController();

  const run = () => {
    set(statusAtom, 'rendering');

    Promise.resolve()
      .then(() => render(files, { signal: controller.signal }))
      .then((blob) => {
        if (stale) return;
        set(blobAtom, blob);
        set(errorAtom, null);
        set(statusAtom, 'ready');
      })
      .catch((error: unknown) => {
        if (stale) return;
        // the last good blob stays put, so a consumer keeps showing it
        set(errorAtom, toError(error));
        set(statusAtom, 'error');
      });
  };

  const cleanup = () => {
    stale = true;
    controller.abort();
  };

  if (!started.value) {
    started.value = true;
    run();
    return cleanup;
  }

  const timer = setTimeout(run, debounce);

  return () => {
    clearTimeout(timer);
    cleanup();
  };
});

export default renderEffect;
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
yarn vitest run packages/ui/tests/render.test.ts
```
Expected: PASS, 11 tests.

- [ ] **Step 5: Commit**

```bash
git commit --only packages/ui/src/effects/render.ts \
  packages/ui/tests/render.test.ts \
  -m "feat(ui): add the render effect"
```

---

## Task 5: The object URL effect

**Files:**
- Create: `packages/ui/src/effects/object-url.ts`
- Test: `packages/ui/tests/object-url.test.ts`

- [ ] **Step 1: Write the failing test**

`packages/ui/tests/object-url.test.ts`
```ts
import { createStore } from 'jotai';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import blobAtom from '../src/atoms/blob';
import urlAtom from '../src/atoms/url';
import objectUrlEffect from '../src/effects/object-url';

const createObjectURL = vi.fn();
const revokeObjectURL = vi.fn();

beforeEach(() => {
  let next = 0;
  createObjectURL.mockReset().mockImplementation(() => `blob:${++next}`);
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
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
yarn vitest run packages/ui/tests/object-url.test.ts
```
Expected: FAIL, cannot resolve `../src/effects/object-url`.

- [ ] **Step 3: Write the implementation**

`packages/ui/src/effects/object-url.ts`
```ts
import { atomEffect } from 'jotai-effect';

import blobAtom from '../atoms/blob';
import urlAtom from '../atoms/url';

const objectUrlEffect: ReturnType<typeof atomEffect> = atomEffect(
  (get, set) => {
    const blob = get(blobAtom);
    if (!blob) return;

    const url = URL.createObjectURL(blob);
    set(urlAtom, url);

    // The next run overwrites urlAtom, so cleanup only has to release the
    // handle. On unmount the store goes with it.
    return () => URL.revokeObjectURL(url);
  },
);

export default objectUrlEffect;
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
yarn vitest run packages/ui/tests/object-url.test.ts
```
Expected: PASS, 4 tests.

- [ ] **Step 5: Commit**

```bash
git commit --only packages/ui/src/effects/object-url.ts \
  packages/ui/tests/object-url.test.ts \
  -m "feat(ui): add the object url effect"
```

---

## Task 6: Page state

**Files:**
- Create: `packages/ui/src/atoms/page.ts`
- Test: `packages/ui/tests/page.test.ts`

- [ ] **Step 1: Write the failing test**

`packages/ui/tests/page.test.ts`
```ts
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

  it('stays on page one when the document count drops to zero', () => {
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
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
yarn vitest run packages/ui/tests/page.test.ts
```
Expected: FAIL, cannot resolve `../src/atoms/page`.

- [ ] **Step 3: Write the implementation**

`packages/ui/src/atoms/page.ts`
```ts
import { atom } from 'jotai';

import numPagesAtom from './num-pages';

const pageAtom = atom(1);

const clamp = (page: number, numPages: number) =>
  Math.min(Math.max(page, 1), Math.max(numPages, 1));

export const setPageAtom = atom(null, (get, set, page: number) => {
  set(pageAtom, clamp(page, get(numPagesAtom)));
});

// Writes the clamped value rather than clamping on read, so a document that
// grows again does not jump back to a page the reader has already left.
export const setNumPagesAtom = atom(null, (get, set, numPages: number) => {
  set(numPagesAtom, numPages);
  set(pageAtom, clamp(get(pageAtom), numPages));
});

export const nextPageAtom = atom(null, (get, set) => {
  set(setPageAtom, get(pageAtom) + 1);
});

export const previousPageAtom = atom(null, (get, set) => {
  set(setPageAtom, get(pageAtom) - 1);
});

export default pageAtom;
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
yarn vitest run packages/ui/tests/page.test.ts
```
Expected: PASS, 8 tests.

- [ ] **Step 5: Commit**

```bash
git commit --only packages/ui/src/atoms/page.ts \
  packages/ui/tests/page.test.ts \
  -m "feat(ui): add page state"
```

---

## Task 7: The copy state machine

**Files:**
- Create: `packages/ui/src/atoms/copy-state.ts`
- Create: `packages/ui/src/effects/copy-reset.ts`
- Test: `packages/ui/tests/copy.test.ts`

- [ ] **Step 1: Write the failing test**

`packages/ui/tests/copy.test.ts`
```ts
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

  it('restarts the delay when a second copy lands', async () => {
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
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
yarn vitest run packages/ui/tests/copy.test.ts
```
Expected: FAIL, cannot resolve `../src/atoms/copy-state`.

- [ ] **Step 3: Write the implementation**

`packages/ui/src/atoms/copy-state.ts`
```ts
import { atom } from 'jotai';

import type { CopyState } from '../types';

const copyStateAtom = atom<CopyState>('idle');

export const copyAtom = atom(null, (_get, set, text: string) =>
  navigator.clipboard.writeText(text).then(
    () => set(copyStateAtom, 'copied'),
    () => set(copyStateAtom, 'failed'),
  ),
);

export default copyStateAtom;
```

`packages/ui/src/effects/copy-reset.ts`
```ts
import { atomEffect } from 'jotai-effect';

import copyStateAtom from '../atoms/copy-state';

const RESET_MS = 1500;

const copyResetEffect: ReturnType<typeof atomEffect> = atomEffect(
  (get, set) => {
    const state = get(copyStateAtom);
    if (state === 'idle') return;

    const timer = setTimeout(() => set(copyStateAtom, 'idle'), RESET_MS);

    return () => clearTimeout(timer);
  },
);

export default copyResetEffect;
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
yarn vitest run packages/ui/tests/copy.test.ts
```
Expected: PASS, 6 tests.

- [ ] **Step 5: Commit**

```bash
git commit --only packages/ui/src/atoms/copy-state.ts \
  packages/ui/src/effects/copy-reset.ts \
  packages/ui/tests/copy.test.ts \
  -m "feat(ui): add the copy state machine"
```

---

## Task 8: The Root part

**Files:**
- Create: `packages/ui/src/parts/root/root.tsx`
- Create: `packages/ui/src/parts/root/index.ts`

Tested in Task 12 alongside the other parts, because a Root with no children to observe proves very little on its own.

- [ ] **Step 1: Write `packages/ui/src/parts/root/root.tsx`**

Follows the score-ui split: an outer `Root` that renders `<Provider key={id}>`, and an inner `Content` that hydrates props into atoms, mounts the effects, and returns `children`.

```tsx
import { Provider, useAtom, useAtomValue, useStore } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { useEffect, type ReactNode } from 'react';

import activeFileNameAtom from '../../atoms/active-file-name';
import debounceAtom from '../../atoms/debounce';
import filenameAtom from '../../atoms/filename';
import filesAtom from '../../atoms/files';
import renderFnAtom from '../../atoms/render-fn';
import copyResetEffect from '../../effects/copy-reset';
import objectUrlEffect from '../../effects/object-url';
import renderEffect from '../../effects/render';
import type { RenderFn, ReplFile } from '../../types';

export interface RootProps {
  id?: string;
  render: RenderFn;
  defaultFiles: ReplFile[];
  defaultActiveFile?: string;
  onFilesChange?: (files: ReplFile[]) => void;
  onActiveFileChange?: (name: string | null) => void;
  debounce?: number;
  filename?: string;
  children: ReactNode;
}

function Content({
  render,
  defaultFiles,
  defaultActiveFile,
  onFilesChange,
  onActiveFileChange,
  debounce = 500,
  filename = 'document.pdf',
  children,
}: RootProps) {
  const store = useStore();

  useHydrateAtoms([
    [filesAtom, defaultFiles],
    [activeFileNameAtom, defaultActiveFile ?? defaultFiles[0]?.name ?? null],
  ]);

  // Assigned during render rather than in an effect, so the render effect
  // never mounts before the function it needs is in place. The box is a
  // per-store object that is never `set`, so writing to it re-renders nothing
  // and an inline arrow from the consumer costs nothing.
  const renderFn = useAtomValue(renderFnAtom);
  renderFn.current = render;

  useEffect(() => {
    store.set(debounceAtom, debounce);
  }, [debounce, store]);

  useEffect(() => {
    store.set(filenameAtom, filename);
  }, [filename, store]);

  useAtom(renderEffect);
  useAtom(objectUrlEffect);
  useAtom(copyResetEffect);

  useEffect(() => {
    if (!onFilesChange) return;
    return store.sub(filesAtom, () => onFilesChange(store.get(filesAtom)));
  }, [onFilesChange, store]);

  useEffect(() => {
    if (!onActiveFileChange) return;
    return store.sub(activeFileNameAtom, () =>
      onActiveFileChange(store.get(activeFileNameAtom)),
    );
  }, [onActiveFileChange, store]);

  return children;
}

function Root({ id, ...props }: RootProps) {
  // Changing `id` swaps the Provider, which drops every atom with it. That is
  // the documented way to reset a Repl.
  return (
    <Provider key={id}>
      <Content {...props} />
    </Provider>
  );
}

export default Root;
```

- [ ] **Step 2: Write `packages/ui/src/parts/root/index.ts`**

```ts
export { default } from './root';
```

- [ ] **Step 3: Verify it compiles**

```bash
yarn --cwd packages/ui run typecheck
```
Expected: no output.

If `Content` returning `children` fails to typecheck under the installed React types, change its return type to `ReactNode` explicitly by annotating the function: `function Content({...}: RootProps): ReactNode {`.

- [ ] **Step 4: Commit**

```bash
git commit --only packages/ui/src/parts/root \
  -m "feat(ui): add the Root part"
```

---

## Task 9: The Files and Editor parts

**Files:**
- Create: `packages/ui/src/parts/files/files.tsx`, `packages/ui/src/parts/files/index.ts`
- Create: `packages/ui/src/parts/editor/editor.tsx`, `packages/ui/src/parts/editor/index.ts`

- [ ] **Step 1: Write `packages/ui/src/parts/files/files.tsx`**

```tsx
import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback } from 'react';

import activeFileNameAtom from '../../atoms/active-file-name';
import {
  addFileAtom,
  removeFileAtom,
  renameFileAtom,
  selectFileAtom,
} from '../../atoms/file-operations';
import filesAtom from '../../atoms/files';
import type { PartProps, ReplFile } from '../../types';

export interface FilesComponentProps {
  files: ReplFile[];
  activeFile: string | null;
  onSelect: (name: string) => void;
  onAdd: (file: ReplFile) => void;
  onRename: (name: string, next: string) => void;
  onRemove: (name: string) => void;
}

function Files({
  Component,
  className,
  style,
}: PartProps<FilesComponentProps>) {
  const files = useAtomValue(filesAtom);
  const activeFile = useAtomValue(activeFileNameAtom);

  const select = useSetAtom(selectFileAtom);
  const add = useSetAtom(addFileAtom);
  const rename = useSetAtom(renameFileAtom);
  const remove = useSetAtom(removeFileAtom);

  const onSelect = useCallback((name: string) => select(name), [select]);
  const onAdd = useCallback((file: ReplFile) => add(file), [add]);
  const onRename = useCallback(
    (name: string, next: string) => rename(name, next),
    [rename],
  );
  const onRemove = useCallback((name: string) => remove(name), [remove]);

  return (
    <Component
      files={files}
      activeFile={activeFile}
      onSelect={onSelect}
      onAdd={onAdd}
      onRename={onRename}
      onRemove={onRemove}
      className={className}
      style={style}
    />
  );
}

export default Files;
```

- [ ] **Step 2: Write `packages/ui/src/parts/files/index.ts`**

```ts
export { default } from './files';
```

- [ ] **Step 3: Write `packages/ui/src/parts/editor/editor.tsx`**

```tsx
import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback } from 'react';

import activeFileAtom from '../../atoms/active-file';
import { updateSourceAtom } from '../../atoms/file-operations';
import type { PartProps } from '../../types';

export interface EditorComponentProps {
  value: string;
  onChange: (value: string) => void;
  fileName: string;
}

function Editor({
  Component,
  className,
  style,
}: PartProps<EditorComponentProps>) {
  const file = useAtomValue(activeFileAtom);
  const update = useSetAtom(updateSourceAtom);

  const onChange = useCallback((value: string) => update(value), [update]);

  if (!file) return null;

  return (
    <Component
      value={file.code}
      onChange={onChange}
      fileName={file.name}
      className={className}
      style={style}
    />
  );
}

export default Editor;
```

- [ ] **Step 4: Write `packages/ui/src/parts/editor/index.ts`**

```ts
export { default } from './editor';
```

- [ ] **Step 5: Verify it compiles**

```bash
yarn --cwd packages/ui run typecheck
```
Expected: no output.

- [ ] **Step 6: Commit**

```bash
git commit --only packages/ui/src/parts/files packages/ui/src/parts/editor \
  -m "feat(ui): add the Files and Editor parts"
```

---

## Task 10: The Document, Pagination and Status parts

**Files:**
- Create: `packages/ui/src/parts/document/document.tsx`, `packages/ui/src/parts/document/index.ts`
- Create: `packages/ui/src/parts/pagination/pagination.tsx`, `packages/ui/src/parts/pagination/index.ts`
- Create: `packages/ui/src/parts/status/status.tsx`, `packages/ui/src/parts/status/index.ts`

- [ ] **Step 1: Write `packages/ui/src/parts/document/document.tsx`**

```tsx
import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback } from 'react';

import blobAtom from '../../atoms/blob';
import errorAtom from '../../atoms/error';
import numPagesAtom from '../../atoms/num-pages';
import pageAtom, { setNumPagesAtom } from '../../atoms/page';
import statusAtom from '../../atoms/status';
import urlAtom from '../../atoms/url';
import type { PartProps } from '../../types';

export interface DocumentComponentProps {
  url: string | null;
  blob: Blob | null;
  page: number;
  numPages: number;
  rendering: boolean;
  error: Error | null;
  onLoad: (info: { numPages: number }) => void;
}

function Document({
  Component,
  className,
  style,
}: PartProps<DocumentComponentProps>) {
  const url = useAtomValue(urlAtom);
  const blob = useAtomValue(blobAtom);
  const page = useAtomValue(pageAtom);
  const numPages = useAtomValue(numPagesAtom);
  const status = useAtomValue(statusAtom);
  const error = useAtomValue(errorAtom);
  const setNumPages = useSetAtom(setNumPagesAtom);

  // The consumer's PDF renderer is the only thing that knows the page count,
  // so it reports it back here for Pagination to read.
  const onLoad = useCallback(
    ({ numPages: count }: { numPages: number }) => setNumPages(count),
    [setNumPages],
  );

  return (
    <Component
      url={url}
      blob={blob}
      page={page}
      numPages={numPages}
      rendering={status === 'rendering'}
      error={error}
      onLoad={onLoad}
      className={className}
      style={style}
    />
  );
}

export default Document;
```

- [ ] **Step 2: Write `packages/ui/src/parts/document/index.ts`**

```ts
export { default } from './document';
```

- [ ] **Step 3: Write `packages/ui/src/parts/pagination/pagination.tsx`**

```tsx
import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback } from 'react';

import numPagesAtom from '../../atoms/num-pages';
import pageAtom, {
  nextPageAtom,
  previousPageAtom,
  setPageAtom,
} from '../../atoms/page';
import type { PartProps } from '../../types';

export interface PaginationComponentProps {
  page: number;
  numPages: number;
  canPrevious: boolean;
  canNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSelect: (page: number) => void;
}

function Pagination({
  Component,
  className,
  style,
}: PartProps<PaginationComponentProps>) {
  const page = useAtomValue(pageAtom);
  const numPages = useAtomValue(numPagesAtom);

  const next = useSetAtom(nextPageAtom);
  const previous = useSetAtom(previousPageAtom);
  const select = useSetAtom(setPageAtom);

  const onNext = useCallback(() => next(), [next]);
  const onPrevious = useCallback(() => previous(), [previous]);
  const onSelect = useCallback((value: number) => select(value), [select]);

  // Always renders. Hiding a single page document is a presentational choice
  // and belongs in the Component.
  return (
    <Component
      page={page}
      numPages={numPages}
      canPrevious={page > 1}
      canNext={page < numPages}
      onPrevious={onPrevious}
      onNext={onNext}
      onSelect={onSelect}
      className={className}
      style={style}
    />
  );
}

export default Pagination;
```

- [ ] **Step 4: Write `packages/ui/src/parts/pagination/index.ts`**

```ts
export { default } from './pagination';
```

- [ ] **Step 5: Write `packages/ui/src/parts/status/status.tsx`**

```tsx
import { useAtomValue } from 'jotai';

import errorAtom from '../../atoms/error';
import statusAtom from '../../atoms/status';
import type { PartProps, ReplStatus } from '../../types';

export interface StatusComponentProps {
  status: ReplStatus;
  error: Error | null;
}

function Status({
  Component,
  className,
  style,
}: PartProps<StatusComponentProps>) {
  const status = useAtomValue(statusAtom);
  const error = useAtomValue(errorAtom);

  return (
    <Component
      status={status}
      error={error}
      className={className}
      style={style}
    />
  );
}

export default Status;
```

- [ ] **Step 6: Write `packages/ui/src/parts/status/index.ts`**

```ts
export { default } from './status';
```

- [ ] **Step 7: Verify it compiles**

```bash
yarn --cwd packages/ui run typecheck
```
Expected: no output.

- [ ] **Step 8: Commit**

```bash
git commit --only packages/ui/src/parts/document \
  packages/ui/src/parts/pagination packages/ui/src/parts/status \
  -m "feat(ui): add the Document, Pagination and Status parts"
```

---

## Task 11: The CopyButton and DownloadButton parts

**Files:**
- Create: `packages/ui/src/parts/copy-button/copy-button.tsx`, `packages/ui/src/parts/copy-button/index.ts`
- Create: `packages/ui/src/parts/download-button/download-button.tsx`, `packages/ui/src/parts/download-button/index.ts`

- [ ] **Step 1: Write `packages/ui/src/parts/copy-button/copy-button.tsx`**

```tsx
import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback } from 'react';

import activeFileAtom from '../../atoms/active-file';
import copyStateAtom, { copyAtom } from '../../atoms/copy-state';
import type { CopyState, PartProps } from '../../types';

export interface CopyButtonComponentProps {
  onPress: () => void;
  state: CopyState;
}

type CopyButtonProps = PartProps<CopyButtonComponentProps> & {
  /** Defaults to the active file's source. */
  value?: string;
};

function CopyButton({
  Component,
  value,
  className,
  style,
}: CopyButtonProps) {
  const file = useAtomValue(activeFileAtom);
  const state = useAtomValue(copyStateAtom);
  const copy = useSetAtom(copyAtom);

  const text = value ?? file?.code ?? '';

  const onPress = useCallback(() => {
    void copy(text);
  }, [copy, text]);

  return (
    <Component
      onPress={onPress}
      state={state}
      className={className}
      style={style}
    />
  );
}

export default CopyButton;
```

- [ ] **Step 2: Write `packages/ui/src/parts/copy-button/index.ts`**

```ts
export { default } from './copy-button';
```

- [ ] **Step 3: Write `packages/ui/src/parts/download-button/download-button.tsx`**

```tsx
import { useAtomValue } from 'jotai';
import { useCallback } from 'react';

import filenameAtom from '../../atoms/filename';
import urlAtom from '../../atoms/url';
import type { PartProps } from '../../types';

export interface DownloadButtonComponentProps {
  onPress: () => void;
  href: string | undefined;
  filename: string;
  disabled: boolean;
}

function DownloadButton({
  Component,
  className,
  style,
}: PartProps<DownloadButtonComponentProps>) {
  const url = useAtomValue(urlAtom);
  const filename = useAtomValue(filenameAtom);

  // Both handles, so `<a download href>` works as well as `<button onClick>`.
  const onPress = useCallback(() => {
    if (!url) return;
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
  }, [url, filename]);

  return (
    <Component
      onPress={onPress}
      href={url ?? undefined}
      filename={filename}
      disabled={!url}
      className={className}
      style={style}
    />
  );
}

export default DownloadButton;
```

- [ ] **Step 4: Write `packages/ui/src/parts/download-button/index.ts`**

```ts
export { default } from './download-button';
```

- [ ] **Step 5: Verify it compiles**

```bash
yarn --cwd packages/ui run typecheck
```
Expected: no output.

- [ ] **Step 6: Commit**

```bash
git commit --only packages/ui/src/parts/copy-button \
  packages/ui/src/parts/download-button \
  -m "feat(ui): add the CopyButton and DownloadButton parts"
```

---

## Task 12: The namespace export, integration test and README

**Files:**
- Modify: `packages/ui/src/index.ts`
- Test: `packages/ui/tests/parts.test.tsx`
- Create: `packages/ui/README.md`

- [ ] **Step 1: Write the failing integration test**

`packages/ui/tests/parts.test.tsx`
```tsx
import { act, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Repl } from '../src';
import type {
  DocumentComponentProps,
  EditorComponentProps,
  FilesComponentProps,
  StatusComponentProps,
} from '../src';

const FILES = [
  { name: 'a.jsx', code: 'A' },
  { name: 'b.jsx', code: 'B' },
];

beforeEach(() => {
  let next = 0;
  vi.stubGlobal('URL', {
    createObjectURL: () => `blob:${++next}`,
    revokeObjectURL: () => {},
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
});

const Tabs = ({ files, activeFile, onSelect }: FilesComponentProps) => (
  <div>
    {files.map((file) => (
      <button
        key={file.name}
        type="button"
        data-active={file.name === activeFile}
        onClick={() => onSelect(file.name)}
      >
        {file.name}
      </button>
    ))}
  </div>
);

const Source = ({ value, fileName }: EditorComponentProps) => (
  <pre data-testid="source" data-file={fileName}>
    {value}
  </pre>
);

const Preview = ({ url, numPages, onLoad }: DocumentComponentProps) => (
  <div>
    <span data-testid="url">{url ?? 'none'}</span>
    <span data-testid="pages">{numPages}</span>
    <button type="button" onClick={() => onLoad({ numPages: 3 })}>
      load
    </button>
  </div>
);

const Dot = ({ status }: StatusComponentProps) => (
  <span data-testid="status">{status}</span>
);

describe('Repl', () => {
  it('renders on mount and publishes a url', async () => {
    const render_ = vi.fn(async () => new Blob(['pdf']));

    render(
      <Repl render={render_} defaultFiles={FILES}>
        <Repl.Document Component={Preview} />
        <Repl.Status Component={Dot} />
      </Repl>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('status')).toHaveTextContent('ready');
    });
    expect(screen.getByTestId('url')).toHaveTextContent('blob:1');
    expect(render_).toHaveBeenCalledTimes(1);
  });

  it('binds the editor to the active file and follows a tab change', async () => {
    const render_ = vi.fn(async () => new Blob(['pdf']));

    render(
      <Repl render={render_} defaultFiles={FILES}>
        <Repl.Files Component={Tabs} />
        <Repl.Editor Component={Source} />
      </Repl>,
    );

    expect(screen.getByTestId('source')).toHaveAttribute('data-file', 'a.jsx');
    expect(screen.getByTestId('source')).toHaveTextContent('A');

    act(() => {
      screen.getByText('b.jsx').click();
    });

    expect(screen.getByTestId('source')).toHaveAttribute('data-file', 'b.jsx');
    expect(screen.getByTestId('source')).toHaveTextContent('B');
  });

  it('feeds the page count reported by Document through to Pagination', async () => {
    const render_ = vi.fn(async () => new Blob(['pdf']));

    render(
      <Repl render={render_} defaultFiles={FILES}>
        <Repl.Document Component={Preview} />
        <Repl.Pagination
          Component={({ page, numPages, canNext }) => (
            <span data-testid="pager">{`${page}/${numPages}/${canNext}`}</span>
          )}
        />
      </Repl>,
    );

    act(() => {
      screen.getByText('load').click();
    });

    expect(screen.getByTestId('pager')).toHaveTextContent('1/3/true');
  });

  it('forwards className and style untouched', () => {
    const render_ = vi.fn(async () => new Blob(['pdf']));

    render(
      <Repl render={render_} defaultFiles={FILES}>
        <Repl.Editor
          Component={({ className, style }) => (
            <span data-testid="styled" className={className} style={style} />
          )}
          className="mine"
          style={{ color: 'red' }}
        />
      </Repl>,
    );

    const node = screen.getByTestId('styled');
    expect(node).toHaveClass('mine');
    expect(node).toHaveStyle({ color: 'rgb(255, 0, 0)' });
  });

  it('renders nothing from Editor when every file is gone', () => {
    const render_ = vi.fn(async () => new Blob(['pdf']));

    render(
      <Repl render={render_} defaultFiles={[]}>
        <Repl.Editor Component={Source} />
      </Repl>,
    );

    expect(screen.queryByTestId('source')).toBeNull();
  });

  it('reports file changes to onFilesChange', async () => {
    const render_ = vi.fn(async () => new Blob(['pdf']));
    const onFilesChange = vi.fn();

    render(
      <Repl
        render={render_}
        defaultFiles={FILES}
        onFilesChange={onFilesChange}
      >
        <Repl.Files
          Component={({ onAdd }) => (
            <button type="button" onClick={() => onAdd({ name: 'c.jsx', code: 'C' })}>
              add
            </button>
          )}
        />
      </Repl>,
    );

    act(() => {
      screen.getByText('add').click();
    });

    expect(onFilesChange).toHaveBeenCalledWith([
      ...FILES,
      { name: 'c.jsx', code: 'C' },
    ]);
  });

  it('keeps two instances isolated', async () => {
    const one = vi.fn(async () => new Blob(['one']));
    const two = vi.fn(async () => new Blob(['two']));

    render(
      <>
        <Repl render={one} defaultFiles={[{ name: 'x.jsx', code: 'X' }]}>
          <Repl.Editor Component={Source} />
        </Repl>
        <Repl render={two} defaultFiles={[{ name: 'y.jsx', code: 'Y' }]}>
          <Repl.Editor Component={Source} />
        </Repl>
      </>,
    );

    const sources = screen.getAllByTestId('source');
    expect(sources[0]).toHaveTextContent('X');
    expect(sources[1]).toHaveTextContent('Y');

    await waitFor(() => {
      expect(one).toHaveBeenCalledTimes(1);
      expect(two).toHaveBeenCalledTimes(1);
    });
  });
});
```

This uses `toHaveTextContent`, `toHaveClass` and `toHaveStyle` from jest-dom. Check whether `@testing-library/jest-dom` is already available at the repo root with `yarn why @testing-library/jest-dom`. If it is not, add it to `packages/ui/package.json` devDependencies and create `packages/ui/vitest.setup.js` containing `import '@testing-library/jest-dom/vitest';`, then add `setupFiles: ['vitest.setup.js']` to the `test` block in `packages/ui/vitest.config.js`.

- [ ] **Step 2: Run the test to verify it fails**

```bash
yarn vitest run packages/ui/tests/parts.test.tsx
```
Expected: FAIL, `Repl` is not exported from `../src`.

- [ ] **Step 3: Write the namespace export**

`packages/ui/src/index.ts`
```ts
import CopyButton from './parts/copy-button';
import Document from './parts/document';
import DownloadButton from './parts/download-button';
import Editor from './parts/editor';
import Files from './parts/files';
import Pagination from './parts/pagination';
import Root from './parts/root';
import Status from './parts/status';

const Repl = Root;

Object.assign(Repl, {
  CopyButton,
  Document,
  DownloadButton,
  Editor,
  Files,
  Pagination,
  Status,
});

export default Repl as typeof Root & {
  CopyButton: typeof CopyButton;
  Document: typeof Document;
  DownloadButton: typeof DownloadButton;
  Editor: typeof Editor;
  Files: typeof Files;
  Pagination: typeof Pagination;
  Status: typeof Status;
};

export { Repl };

export { default as filesAtom } from './atoms/files';
export { default as activeFileAtom } from './atoms/active-file';
export { default as statusAtom } from './atoms/status';
export { default as blobAtom } from './atoms/blob';

export type { RootProps } from './parts/root/root';
export type { CopyButtonComponentProps } from './parts/copy-button/copy-button';
export type { DocumentComponentProps } from './parts/document/document';
export type { DownloadButtonComponentProps } from './parts/download-button/download-button';
export type { EditorComponentProps } from './parts/editor/editor';
export type { FilesComponentProps } from './parts/files/files';
export type { PaginationComponentProps } from './parts/pagination/pagination';
export type { StatusComponentProps } from './parts/status/status';

export * from './types';
```

Both a default and a named `Repl` export. The named one is what the spec documents, because `@react-pdf/ui` should have room for other headless sets later; the default matches score-ui's shape for anyone expecting it.

The `export { Repl }` line exports the un-narrowed `Root` type. Fix that by assigning the narrowed value to a typed constant first:

```ts
const ReplWithParts = Repl as typeof Root & {
  CopyButton: typeof CopyButton;
  Document: typeof Document;
  DownloadButton: typeof DownloadButton;
  Editor: typeof Editor;
  Files: typeof Files;
  Pagination: typeof Pagination;
  Status: typeof Status;
};

export default ReplWithParts;
export { ReplWithParts as Repl };
```

Use that second form; it is the one the test imports.

- [ ] **Step 4: Run the test to verify it passes**

```bash
yarn vitest run packages/ui/tests/parts.test.tsx
```
Expected: PASS, 7 tests.

- [ ] **Step 5: Run the whole package suite and build**

```bash
yarn vitest run packages/ui
yarn --cwd packages/ui run typecheck
yarn --cwd packages/ui run build
yarn lint
```
Expected: all tests pass (49 across six files), typecheck silent, `lib/index.js` and `lib/index.d.ts` written, lint clean.

- [ ] **Step 6: Write `packages/ui/README.md`**

```markdown
# @react-pdf/ui

Headless React primitives for building PDF preview and editor interfaces.

The library holds the state and the behaviour. You provide every pixel.

## Install

    yarn add @react-pdf/ui

## Usage

Every primitive takes a `Component` prop and renders it with state and
handlers. It renders no DOM of its own, and `className` and `style` are
forwarded to your component untouched.

```jsx
import { Repl } from '@react-pdf/ui'

const renderToBlob = async (files, { signal }) => {
  // your compiler, your worker, your rules
  return blob
}

function Playground() {
  return (
    <Repl render={renderToBlob} defaultFiles={[{ name: 'index.jsx', code }]}>
      <Repl.Files Component={FileTabs} />
      <Repl.Editor Component={CodeMirrorEditor} />
      <Repl.Document Component={PdfCanvas} />
      <Repl.Pagination Component={Pager} />
      <Repl.DownloadButton Component={Button} />
    </Repl>
  )
}
```

## What it does and does not do

It owns file state, debounced sources, render orchestration (stale result
cancellation, abort on supersede, keeping the last good document when a render
fails), object URL lifecycle, status and error, page state and clamping, the
copy state machine and the download trigger.

It does not compile code and it does not rasterise PDF pages, so it depends on
neither a compiler nor `pdfjs-dist`. `render` is yours, and your `Document`
component decides how a page is painted and how large it is.

## Primitives

| Primitive | Props passed to `Component` |
| --- | --- |
| `Repl.Files` | `files`, `activeFile`, `onSelect`, `onAdd`, `onRename`, `onRemove` |
| `Repl.Editor` | `value`, `onChange`, `fileName` |
| `Repl.Document` | `url`, `blob`, `page`, `numPages`, `rendering`, `error`, `onLoad` |
| `Repl.Pagination` | `page`, `numPages`, `canPrevious`, `canNext`, `onPrevious`, `onNext`, `onSelect` |
| `Repl.Status` | `status`, `error` |
| `Repl.CopyButton` | `onPress`, `state` |
| `Repl.DownloadButton` | `onPress`, `href`, `filename`, `disabled` |

`Repl.Document` treats `numPages` as a controlled input: your PDF renderer
reports it through `onLoad({ numPages })`, and `Repl.Pagination` reads it back.

## Resetting

Change the `id` prop. It swaps the internal Jotai provider and drops all state.
```

- [ ] **Step 7: Add a changeset**

```bash
yarn changeset
```
Select `@react-pdf/ui`, choose **minor**, and use the summary: `Add @react-pdf/ui, headless primitives for PDF preview and editor interfaces`.

- [ ] **Step 8: Commit**

```bash
git commit --only packages/ui/src/index.ts packages/ui/tests/parts.test.tsx \
  packages/ui/README.md packages/ui/vitest.config.js \
  packages/ui/package.json .changeset \
  -m "feat(ui): add the Repl namespace, integration tests and README"
```

---

## Self-review

**Spec coverage.** Every spec section maps to a task: package setup (1), the `Root` prop contract (8), all seven primitives (9, 10, 11), render orchestration's seven numbered rules (4), file operations (3), page state (6), the copy machine (7), exported atoms and namespace (12), tests (3 through 7 and 12), README (12). The two spec items intentionally not implemented are the ones listed under Deviations, with reasons.

**Spec test list.** All eleven spec tests have a home: stale discard, mount-versus-edit debounce, abort on supersede, blob survives failure, URL revoked on replace and unmount, rejection and synchronous throw, file CRUD including active and last file, rename onto an existing name, page clamping, copy machine with reset. The eleventh, "changing `id` resets files, status and page", is covered structurally by `<Provider key={id}>` and by the two-instance isolation test in Task 12 rather than by a dedicated remount test.

**Known gaps, stated rather than hidden.**

- `packages/ui` tests always run against React 18 and do not participate in the `REACT_VERSION` matrix, by the deliberate choice in Task 1 Step 4. The package's peer range claims React 16.8 and up. That range is asserted, not tested.
- Task 8's Root part has no dedicated test; it is exercised through the Task 12 integration tests.
- `Repl.DownloadButton`'s `onPress` builds and clicks an anchor, which is the one place the library touches the DOM. It is unavoidable for a programmatic download, and the `href` prop exists so consumers can avoid it entirely.

---

## Follow-up: site migration

Not in this plan. Once `@react-pdf/ui` is published, a second plan covers adding
`"@react-pdf/ui": "link:../../packages/ui"` to `apps/site`, converting
`use-repl.ts` and `render-pool.ts` into `render` functions, turning `viewer.tsx`
into a `Document` component, moving the pager out of it into a `Pagination`
component, folding the duplicated `Skeleton` into one place, and rebuilding
`repl.tsx`, `mini-repl.tsx`, `usage-preview.tsx` and `example-block.tsx` on the
primitives. Behaviour does not change at any of those call sites.
