---
'@react-pdf/render': patch
---

fix: don't select a font for a text run with no glyphs, so a paragraph's removed trailing newline no longer adds an unembedded Helvetica to every page
