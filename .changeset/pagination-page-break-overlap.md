---
'@react-pdf/layout': patch
---

Fix content overlapping itself at a page break. A node that is the sole child of its container and lands near the bottom of a page (e.g. a `wrap={false}` block, or an element taller than the space left) was force-fit into the remaining space instead of moving to the next page, drawing its lines on top of each other. Pagination now bases that decision on whether the page is actually empty above the node, which also avoids an infinite page loop. Closes #3449.
