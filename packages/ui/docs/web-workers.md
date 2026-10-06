# Rendering and Web Workers

`@react-pdf/ui` renders on the main thread. Measured in Chrome on the react-pdf
docs site's own examples, a warm render costs **4-25ms** for typical documents
and around **180ms** for a four-page document containing a photo. A worker buys
nothing at those numbers, and the render function is not pluggable today.

The docs site ran a shared worker with a request queue before moving to
main-thread rendering. It was removed because the measurements did not justify
it, not because it did not work.

## What a worker would buy

**Long renders block typing.** If documents take long enough that the freeze is
noticeable while someone edits, a worker keeps the editor responsive. The cost
is usually images and fonts, not layout.

**Throwing away renderer state.** This is the strong reason. `Font.register()`
permanently adds a family to the renderer instance that runs it, and
`Font.clear()` is not a fix because it also drops the built-in Helvetica,
Courier and Times. On the main thread there is no way to undo a registration. A
worker gives you one: destroy the worker.

Hyphenation and emoji callbacks do not need a worker; both reset to `null`
before every render.

## What it would take

A worker protocol stays cheap as long as only a string goes in and a `Blob`
comes out. React elements, prop callbacks and font callbacks are all created and
invoked inside the worker, so nothing has to survive structured cloning:

```ts
type Request = { id: number; code: string };
type Response =
  | { id: number; blob: Blob; numPages: number }
  | { id: number; error: string; line?: number };
```

The worker would run the same `transpile` and `evaluateDocument` this package
uses, then `pdf(element).toBlob()`. One worker per Playground is the isolating
option: recreating it drops the font registry. Sharing one worker across several
previews means serialising renders, since examples mutate the shared `Font`
store, and honouring the abort signal, or every superseded render runs to
completion and live editing gets slower the faster the user types.
