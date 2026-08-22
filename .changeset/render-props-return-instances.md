---
'@react-pdf/layout': major
'@react-pdf/renderer': minor
---

Move render-prop element conversion from layout to the renderer

Render props are now wrapped at the reconciler boundary: by the time layout
calls them they return internal instances, not React elements. Layout's
`createInstances` is deleted and `resolvePagination` consumes instances
directly.

**Breaking (layout):** anyone calling `@react-pdf/layout` directly with
trees whose render props return React elements must convert the result
before handing it to layout — the contract is now instance arrays. Users of
`@react-pdf/renderer` are unaffected: the renderer performs the conversion.
