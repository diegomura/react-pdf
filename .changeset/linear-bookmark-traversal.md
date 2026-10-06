---
'@react-pdf/layout': patch
---

perf: traverse the tree by index in resolveBookmarks instead of shift(), which was quadratic on documents with many elements
