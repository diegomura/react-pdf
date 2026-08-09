---
'@react-pdf/pdfkit': patch
'@react-pdf/render': patch
---

Sync pdfkit acroform mixin with upstream. Form field dictionaries no longer leak internal options like `fontSize` into the PDF.
