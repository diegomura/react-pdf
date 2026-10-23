---
'@react-pdf/layout': patch
---

Fix `flexShrink: 0` (and `flex: 'none'`, Tailwind `shrink-0`) being reset to `1`, so the node still shrank.
