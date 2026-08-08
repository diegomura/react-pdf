---
'@react-pdf/pdfkit': patch
---

refactor(pdfkit): align annotations.js, attachments.js and spotcolor.js with upstream

Spot color names are now escaped as PDF Name objects, so names containing
spaces or delimiters (e.g. `PANTONE 123 C`) no longer emit a malformed
Separation color space.
