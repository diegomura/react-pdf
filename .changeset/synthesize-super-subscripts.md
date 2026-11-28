---
'@react-pdf/font': patch
'@react-pdf/layout': patch
---

fix: render Unicode superscript and subscript characters (U+2070 to U+209F) the font lacks as smaller raised or lowered base characters, and stop standard fonts from drawing unrelated characters for code points outside their encoding
