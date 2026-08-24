---
'@react-pdf/types': minor
'@react-pdf/layout': minor
'@react-pdf/renderer': minor
---

feat: add `conformance` Document prop for PDF/A output

Produces PDF/A-1/2/3 (b-level) output with XMP conformance metadata and an sRGB OutputIntent. `pdfVersion` defaults to what the chosen level requires. Fonts must be registered (not the built-in standard 14) to fully validate.
