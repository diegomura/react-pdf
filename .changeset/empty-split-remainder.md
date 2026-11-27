---
'@react-pdf/layout': patch
---

Don't open a page for a split half that has nothing left to render, such as a box whose bottom padding or the bottom margin of its last child alone crosses the page edge
