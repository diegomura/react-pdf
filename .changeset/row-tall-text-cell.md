---
'@react-pdf/layout': patch
---

Split rows with a long text cell across pages. With the new pagination engine, the shorter cells were paginated at the height the row stretched them to, so the row could not break and the long cell's text was cut off at the page bottom.
