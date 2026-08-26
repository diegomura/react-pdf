# @react-pdf/ui

Headless React primitives for building PDF preview and editor interfaces.

The library holds the state and the behaviour. You provide every pixel.

## Install

```sh
yarn add @react-pdf/ui
```

## Usage

Every primitive takes a `Component` prop and renders it with state and
handlers. It renders no DOM of its own, and `className` and `style` are
forwarded to your component untouched.

```jsx
import { Repl } from '@react-pdf/ui';

const renderToBlob = async (files, { signal }) => {
  // your compiler, your worker, your rules
  return blob;
};

function Playground() {
  return (
    <Repl render={renderToBlob} defaultFiles={[{ name: 'index.jsx', code }]}>
      <Repl.Files Component={FileTabs} />
      <Repl.Editor Component={CodeMirrorEditor} />
      <Repl.Document Component={PdfCanvas} />
      <Repl.Pagination Component={Pager} />
      <Repl.DownloadButton Component={Button} />
    </Repl>
  );
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

## Root

| Prop | Type | Default |
| --- | --- | --- |
| `render` | `(files, { signal }) => Promise<Blob>` | required |
| `defaultFiles` | `{ name, code }[]` | required |
| `id` | `string` | none |
| `defaultActiveFile` | `string` | the first file |
| `onFilesChange` | `(files) => void` | none |
| `onActiveFileChange` | `(name) => void` | none |
| `debounce` | `number` | `500` |
| `filename` | `string` | `'document.pdf'` |

The first render fires immediately; `debounce` applies only to later edits.
State is uncontrolled: `defaultFiles` seeds it, `onFilesChange` observes it, and
changing `id` resets everything.

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
Pagination is only correct if your `Document` component calls `onLoad`.

`Repl.Editor` renders `null` when there is no active file.

`Repl.CopyButton` takes an optional `value` prop and otherwise copies the active
file's source.

`Repl.DownloadButton` provides both handles, so `<a href download>` works as
well as `<button onClick>`.

## Errors

`render` may reject or throw. The error reaches `Repl.Status` and
`Repl.Document` as the thrown `Error`, untouched. The library does not parse
line numbers or attribute an error to a file, because that is your compiler
talking. Attach your own fields to the errors you throw and read them back in
your component.

A failed render keeps the last good document on screen, so a preview does not
blank out on a typo.
