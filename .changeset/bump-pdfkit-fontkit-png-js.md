---
'@react-pdf/renderer': patch
'@react-pdf/font': patch
'@react-pdf/image': patch
'@react-pdf/textkit': patch
---

Bump pdfkit to 0.21.0, fontkit to 3.0.0, png-js to 3.0.0 and unicode-properties to 2.0.2, picking up fixes for a PNG parser denial of service and several malformed font crashes. Thai and Lao SARA AM now decompose before shaping to match fontkit 3, which fixes the last glyph being dropped after it
