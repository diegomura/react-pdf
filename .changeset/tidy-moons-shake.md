---
'@react-pdf/render': patch
---

Fix deformed SVG paths with chained smooth quadratic (T) commands by expanding them to explicit Q commands before handing them to pdfkit
