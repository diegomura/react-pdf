---
'@react-pdf/layout': patch
---

Fix SVG definitions being ignored when an `<Svg>` has more than one `<Defs>`. Gradients, clip paths and markers are now read from every top-level `<Defs>`, not just the first one. If the same id is defined more than once, the first definition is used, like in browsers.
