# @react-pdf/ui

Headless React primitives for building PDF preview and editor interfaces.

The library holds the state and the behaviour. You provide every pixel.

## Install

```sh
yarn add @react-pdf/ui
```

`react` and `@react-pdf/renderer` are peer dependencies.

## Usage

Every primitive takes a `Component` prop and renders it with state and
handlers. It renders no DOM of its own, and `className` and `style` are
forwarded to your component untouched.

```jsx
import { Playground } from '@react-pdf/ui';

const files = [
  {
    name: 'index.jsx',
    code: `ReactPDF.render(
  <Document>
    <Page><Text>Hello</Text></Page>
  </Document>
);`,
  },
];

function Editor() {
  return (
    <Playground files={files}>
      <Playground.Files Component={FileTabs} />
      <Playground.Editor Component={CodeMirrorEditor} />
      <Playground.Document Component={PdfCanvas} />
      <Playground.Pagination Component={Pager} />
      <Playground.DownloadButton Component={Button} />
    </Playground>
  );
}
```

## What it does and does not do

It owns file state, transpiling and evaluating the source, render
orchestration (debounce, abort on supersede, keeping the last good document
when a render fails), object URL lifecycle, status and error, page state and
clamping, the copy state machine and the download trigger.

It does not rasterise PDF pages, so it does not depend on `pdfjs-dist`. Your
`Document` component decides how a page is painted and how large it is.

## Rendering

Rendering is built in. Sources are transpiled with sucrase and evaluated, and
the resulting document is rendered to a `Blob` on the main thread, which costs
4-25ms for typical documents.

The evaluated code must hand the library a document:

```jsx
ReactPDF.render(<MyDocument />);
```

Inside that code, `React`, `ReactPDF` and every `@react-pdf/renderer` export are
in scope as globals, and `import`/`require` of `react` and `@react-pdf/renderer`
resolve. `@react-pdf/math` and `@react-pdf/mermaid` are optional peers, loaded
lazily the first time an example imports one. Nothing else resolves; there is no
module resolution between files either, so files are concatenated in array order
and a declaration has to appear before the file that uses it.

Examples share one renderer instance, so `Font.register` families persist for
the session. Hyphenation and emoji callbacks are reset before every render. See
[docs/web-workers.md](./docs/web-workers.md) for why that is not worth a worker
by default.

## Root

| Prop | Type | Default |
| --- | --- | --- |
| `files` | `{ name, code }[]` | required |
| `id` | `string` | none |
| `onFilesChange` | `(files) => void` | none |
| `onActiveFileChange` | `(name) => void` | none |
| `filename` | `string` | `'document.pdf'` |

The first render fires immediately; edits are debounced by a fixed 250ms.
State is uncontrolled: `files` seeds it, `onFilesChange` observes it, and
changing `id` resets everything. The file set itself is fixed; only file
contents change.

## Primitives

| Primitive | Props passed to `Component` |
| --- | --- |
| `Playground.Files` | `files`, `activeFile`, `onSelect` |
| `Playground.Editor` | `value`, `onChange`, `fileName`, `error` |
| `Playground.Document` | `url`, `blob`, `page`, `numPages`, `rendering`, `error` |
| `Playground.Pagination` | `page`, `numPages`, `canPrevious`, `canNext`, `onPrevious`, `onNext`, `onSelect` |
| `Playground.Status` | `status`, `error` |
| `Playground.CopyButton` | `onPress`, `state` |
| `Playground.DownloadButton` | `onPress`, `href`, `filename`, `disabled` |

`numPages` comes from the rendered document's own layout, so `Playground.Pagination`
is correct without your `Document` component reporting anything back.

`Playground.Editor` renders `null` when there is no active file.

`Playground.CopyButton` copies the active file's source; `state` goes back to
`'idle'` 1.5s after a copy.

`Playground.DownloadButton` provides both handles, so `<a href download>` works as
well as `<button onClick>`.

## Errors

A render failure reaches `Playground.Status`, `Playground.Document` and
`Playground.Editor` as an `Error`. Syntax errors carry a `line`; everything else
is the error the evaluated code threw, untouched, because attributing it to a
file or a position is guesswork once files are concatenated.

A failed render keeps the last good document on screen, so a preview does not
blank out on a typo.

## Types

`PlaygroundFile`, `PlaygroundStatus`, `PlaygroundError`, `CopyState`,
`RenderResult`, `RootProps` and a `<Name>ComponentProps` type for each
primitive are exported.
