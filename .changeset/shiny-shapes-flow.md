---
'@react-pdf/textkit': major
'@react-pdf/layout': patch
---

Support ellipse and polygon exclusion shapes for text wrapping, groundwork for CSS `shape-outside`. Breaking: the `Container.excludeRects` prop is renamed to `exclusions` and now accepts `ExclusionShape[]` (rect, ellipse, or polygon, each with an optional `extend` side)
