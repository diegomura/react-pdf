---
'@react-pdf/textkit': patch
'@react-pdf/render': patch
'@react-pdf/svgkit': patch
---

Draw glyph offsets from the font at their real size, so Arabic dots and other marks are placed where the font puts them, and sub/super shifts stay correct for fonts that are not 1000 units per em
