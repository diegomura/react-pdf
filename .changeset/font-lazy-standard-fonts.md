---
'@react-pdf/font': patch
'@react-pdf/renderer': patch
---

Load standard font metrics lazily through dynamic imports of `pdfkit/standard-fonts/*` and register them with pdfkit on first use, so a bundled Node build can render, and the browser build no longer registers all fourteen fonts on import. The renderer waits for Helvetica before it creates the pdfkit document.
