---
'@react-pdf/layout': patch
---

fix(layout): paginate nested first children that do not fit instead of clipping them

When a node's children all move to the next page, `splitNodes` kept the node on the current page whenever it had no earlier siblings, assuming the page was empty. That also fired for a node that was merely the first child of its parent further down a page, so its content was clamped to the page edge and drawn past the bottom margin. The page-start check now follows the node's ancestors, and `minPresenceAhead` is honoured on a first child that is not at the top of the page.
