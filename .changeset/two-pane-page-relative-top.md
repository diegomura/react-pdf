---
"@react-pdf/layout": patch
---

fix: synthesize page-relative `box.top` for nodes pushed to the next page during pagination so subsequent iterations match what a yoga relayout would have produced. This accounts for normal-flow fixed siblings (e.g., a fixed header above a flex:1 body) and for sibling margins (`marginTop`/`marginBottom`). Without these, common two-pane report layouts packed too much content onto subsequent pages, causing yoga to flex-shrink content and overflow page borders.
