---
'@react-pdf/paginate': patch
---

Split a column whose children lie past 2^15 pt. Yoga's float32 rounding made touching siblings overlap there, so the column was mistaken for a wrapped one and drawn on a single page.
