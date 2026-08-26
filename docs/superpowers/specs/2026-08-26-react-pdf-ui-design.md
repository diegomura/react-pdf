# `@react-pdf/ui` design

Headless React primitives for building code editor plus PDF preview interfaces.

## Problem

`apps/site` builds the same interface five times with small variations, and the
variations are all presentational while the logic underneath is identical.

| Call site | Layout | Code | Render path |
| --- | --- | --- | --- |
| `components/repl/repl.tsx` (playground) | resizable horizontal split on desktop, tabs on mobile | one file, live editing | `use-repl.ts` |
| `components/hero/mini-repl.tsx` | fixed two column, stacks on mobile | four files as tabs, live editing | `use-repl.ts` |
| `components/usage/*` (docs) | code above, preview inside `<details>` | shiki, read only | `render-pool.ts` |
| `components/go-to-example/example-block.tsx` | preview above, code collapses under | shiki, read only | `render-pool.ts` |
| `components/repl/viewer.tsx` | shared by the four above | | |

Concrete duplication:

- Two worker wrappers doing the same job. `use-repl.ts` owns a worker, debounces
  at 500ms and restarts on `resetKey`. `render-pool.ts` shares one serialised
  worker, renders once and times out at 30s. Both re-implement blob URL
  lifecycle, stale response rejection and error normalisation.
- `Skeleton` and `PREVIEW_HEIGHT` are copy pasted byte for byte between
  `usage-preview.tsx:7-17` and `example-block.tsx:7-17`.
- Lazy boot gating written twice, differently: `<details onToggle>` against
  `IntersectionObserver`.
- The error overlay written twice with subtly different rules. `repl.tsx:110`
  hides on no URL, `mini-repl.tsx:105` drops the line number because sources are
  concatenated.
- Pagination is hardcoded inside `viewer.tsx:118-145` and cannot be swapped,
  which is the exact thing a headless library exists to fix.

## Prior art

Modelled on `@amadeus/score-ui`, which is where the conventions come from.

- **`Component` prop, not `asChild`.** A part reads state, computes handlers and
  renders `<Component {...state} />`. No DOM in the library. Its two most complex
  parts, `score.tsx:41` and `keyboard.tsx:39`, hold this line.
- **Jotai.** State in `atoms/`, external wiring in `effects/`, and a
  `<Provider key={id}>` in `Root` so instances are isolated.
- **`parts/<name>/<name>.tsx` plus an `index.ts` barrel**, gathered into a
  namespace with `Object.assign(Root, {...})`.
- **Root takes an injected engine instance** plus plain data. Parts never
  construct the engine. In score-ui that is `audio: Audio`. Here it is `render`.
- Platform neutral handler names, and parts may render `null`
  (`countdown.tsx:15`).

Three deliberate departures. score-ui passes `className` through on `Tracks` and
`SongInfo` only; here every primitive forwards `className` and `style`
uniformly. score-ui is private with `"main": "./src/index.ts"`; this package is
published and needs a real build. And score-ui default exports its namespace,
while this package uses a named export, since `@react-pdf/ui` should have room
for headless sets other than the repl.

## Package

`packages/ui`, published as `@react-pdf/ui`. Covered by the existing
`packages/*` workspace glob. Rollup build matching the other packages
(`"main": "./lib/index.js"`, `"files": ["lib"]`, `build` and `watch` and
`typecheck` scripts). ESM.

- Dependencies: `jotai`, `jotai-effect`
- Peer dependency: `react`
- No dependency on `@react-pdf/renderer`, `pdfjs-dist` or `react-pdf`

That last point is the reason the design holds together. The library never
compiles code and never rasterises a page, so it inherits neither toolchain.

## Public API

```jsx
import { Repl } from '@react-pdf/ui'

<Repl render={renderToBlob} defaultFiles={files}>
  <Repl.Files Component={FileTabs} />
  <Repl.Editor Component={CodeMirrorEditor} />
  <Repl.Document Component={PdfCanvas} className="flex-1" />
  <Repl.Pagination Component={Pager} />
  <Repl.Status Component={StatusDot} />
  <Repl.DownloadButton Component={Button} />
</Repl>
```

### Root

```ts
type ReplFile = { name: string; code: string }

type ReplStatus = 'idle' | 'rendering' | 'ready' | 'error'

interface RootProps {
  id?: string
  render: (files: ReplFile[], ctx: { signal: AbortSignal }) => Promise<Blob>
  defaultFiles: ReplFile[]
  defaultActiveFile?: string
  onFilesChange?: (files: ReplFile[]) => void
  onActiveFileChange?: (name: string) => void
  debounce?: number
  filename?: string
  children: ReactNode
}
```

`debounce` defaults to 500, `filename` to `'document.pdf'`, `defaultActiveFile`
to the first file's name.

`render` is injected the way score-ui injects `audio`. Transpiling, module
resolution, workers and pooling all live in the consuming app. The library only
knows it receives files and gets a `Blob` back.

State is uncontrolled. `defaultFiles` seeds it, `onFilesChange` observes it, and
changing `id` remounts the Jotai `Provider` and resets everything. A controlled
mode would double the state paths for no call site that needs it, so it stays
out until one does.

### Primitives

Every primitive takes a `Component` prop plus optional `className` and `style`,
which are forwarded to `Component` untouched. Nothing else, and no DOM.

| Primitive | Props passed to `Component` |
| --- | --- |
| `Repl.Files` | `files`, `activeFile`, `onSelect(name)`, `onAdd(file)`, `onRename(name, next)`, `onRemove(name)` |
| `Repl.Editor` | `value`, `onChange(value)`, `fileName` |
| `Repl.Document` | `url`, `blob`, `page`, `numPages`, `rendering`, `error`, `onLoad({ numPages })` |
| `Repl.Pagination` | `page`, `numPages`, `canPrevious`, `canNext`, `onPrevious`, `onNext`, `onSelect(page)` |
| `Repl.Status` | `status`, `error` |
| `Repl.CopyButton` | `onPress`, `state` |
| `Repl.DownloadButton` | `onPress`, `href`, `filename`, `disabled` |

Notes on individual primitives:

- `Repl.Editor` renders `null` when there is no active file.
- `Repl.Document` treats `numPages` as a controlled input. The consumer's PDF
  renderer reports it through `onLoad`, and `Repl.Pagination` reads it back.
  Page sizing and fit-to-pane math are the consumer's, since how large a page
  should be is a layout decision.
- `Repl.CopyButton` takes an optional `value` prop and otherwise copies the
  active file's source. `state` is `'idle' | 'copied' | 'failed'` and returns to
  `'idle'` 1500ms after a copy attempt.
- `Repl.DownloadButton` provides both handles so an `<a download>` works as well
  as a `<button>`. `href` is the current object URL or `undefined`.
- `Repl.Pagination` always renders. Hiding a single page document is a
  presentational choice and belongs in the `Component`.

### Exported atoms

`index.ts` re-exports a small set of atoms for consumers that need to reach past
the primitives, mirroring `score-ui/src/index.ts:47-51`: `filesAtom`,
`activeFileAtom`, `statusAtom`, `blobAtom`.

## Internals

```
packages/ui/src/
  atoms/
    files.ts          active-file.ts   source.ts
    blob.ts           url.ts           status.ts
    error.ts          num-pages.ts     page.ts
    copy-state.ts     render-fn.ts     request-id.ts
    filename.ts       debounce.ts
  effects/
    render.ts         object-url.ts    unmount.ts
  parts/
    root/ files/ editor/ document/ pagination/
    status/ copy-button/ download-button/
  types.ts
  index.ts
```

`Root` follows score-ui's split: an outer component rendering
`<Provider key={id}>`, and an inner `Content` that hydrates injected props into
atoms, activates the effects with `useAtom(...)`, and returns `children`.

### Render orchestration

`effects/render.ts` is an `atomEffect` watching the file sources. It is the
behaviour currently duplicated across `use-repl.ts` and `render-pool.ts`, and it
is the part worth testing.

1. Mount renders immediately. Debounce applies to edits only, so a docs preview
   is not idle for `debounce` ms when it opens.
2. Every render is issued a monotonically increasing id. A result arriving with
   an id that is not the latest is discarded, as in `use-repl.ts:67`.
3. Superseding a render aborts its `AbortSignal`, so an app backed by a worker
   can terminate it.
4. Success revokes the previous object URL, publishes the new one, sets status
   to `'ready'` and clears the error.
5. Failure sets status to `'error'` and stores the error, and **keeps the last
   good blob and URL**. The preview keeps showing the last document that
   rendered, which is what `repl.tsx:110` relies on.
6. Unmount revokes any outstanding object URL.
7. A rejected promise and a synchronous throw from `render` are both caught.

Errors are stored as the thrown `Error`, unmodified. The library does not parse
`loc.line` or attribute an error to a file, because that is the app's
transpiler talking. Apps attach their own fields to the errors they throw and
read them back in their `Status` component.

### File operations

- `onAdd(file)` appends and does not change the active file.
- `onRename(name, next)` renames in place and follows the active file if it was
  the one renamed. A rename to a name already in use is rejected silently, the
  file map stays unchanged.
- `onRemove(name)` removes, and if it was active moves to the neighbour, or to
  `null` if it was the last file.
- Removing every file leaves `Repl.Editor` rendering `null` and puts status at
  `'idle'` with no render issued.

### Page state

`page` is 1 based and clamped to `[1, numPages]`. When a shorter document loads,
`page` clamps down rather than going out of range, matching `viewer.tsx:90`.
`numPages` of 0 means nothing has loaded and `page` stays at 1.

## Site migration

Sequenced after the first publish. `apps/site` is not a root workspace and
installs standalone, so it consumes `@react-pdf/ui` from npm the same way it
already consumes `@react-pdf/renderer`.

| Today | After |
| --- | --- |
| `use-repl.ts` | a thin `render` function wrapping the worker, orchestration deleted |
| `render-pool.ts` | a thin `render` function wrapping the pooled worker, orchestration deleted |
| `viewer.tsx` | the site's `Document` component, keeping fit math, react-pdf and styling |
| pager in `viewer.tsx:118-145` | a `Pagination` component |
| `status.tsx` | a `Status` component, unchanged |
| duplicate `Skeleton` in two files | one site component |
| `mini-repl.tsx` tab bar | a `Files` component |

Behaviour does not change anywhere. The hero's reverse concatenation
(`hero-files.ts:5`, `mini-repl.tsx:29`) stays exactly as it is and moves into
that app's `render` function, which is where it belongs.

## Tests

Vitest, `packages/ui` added to `vitest.workspace.js`, jsdom environment.
`render` is a fake promise in every test, so no worker and no PDF is involved.

- a stale result is discarded when a newer render has been issued
- debounce applies to edits and not to mount
- the abort signal fires when a render is superseded
- the previous blob and URL survive a failed render
- the object URL is revoked on replacement and on unmount
- a rejected promise and a synchronous throw are both captured as `'error'`
- file add, rename, remove, including removing the active file and the last file
- a rename onto an existing name is a no-op
- `page` clamps down when a shorter document loads
- the copy state machine, including the return to `'idle'`
- changing `id` resets files, status and page

## Explicitly out of scope

- Compiling, transpiling or evaluating code. The `render` function owns it.
- Rasterising PDF pages. No `pdfjs-dist` or `react-pdf` dependency.
- Fit-to-pane sizing. A layout decision, and the site already has it in one
  place.
- Zoom. No call site has it today.
- Controlled `files`.
- Share link encoding. `compress.ts` and the playground URL scheme stay in the
  site.
