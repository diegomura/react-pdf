---
'@react-pdf/textkit': patch
---

fix: keep the base letterform of decomposed characters (e.g. Arabic letters shaped as base + dot mark) when a run is sliced at their start
