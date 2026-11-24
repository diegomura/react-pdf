---
'@react-pdf/render': patch
---

Write checkbox `V` and `DV` as name objects instead of literal strings, so a reader that checks the field value (`pdf-lib`, mupdf, anything rebuilding appearances from `/V`) sees a checked box rather than `(/Yes)`.
