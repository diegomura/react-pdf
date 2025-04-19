---
'@react-pdf/layout': patch
---

Treat an explicit `wrap={undefined}` like an omitted `wrap` prop (default `true`). `null` and `false` still disable wrapping.
