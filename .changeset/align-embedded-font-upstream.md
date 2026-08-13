---
'@react-pdf/pdfkit': patch
---

Align embedded font with upstream: subset tags are now derived from the font id instead of `Math.random()`, so font objects are reproducible across runs; spaces in PostScript names are escaped; the ToUnicode CMap is written as `bfrange` instead of `bfchar`; and a `CIDSet` is emitted for PDF/A-1 and PDF/UA
