---
'@react-pdf/stylesheet': patch
---

Fix percentage `letterSpacing` (e.g. `'-1.1%'`) crashing the render with "unsupported number: NaN". Percentages are now resolved against the element's font size, the same way `lineHeight` percentages already are.
