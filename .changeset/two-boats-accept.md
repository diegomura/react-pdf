---
"@react-pdf/layout": minor
---

perf: Optimize page splitting and relayout, so both per-iteration costs drop from O(remaining-children) to O(children-per-page)