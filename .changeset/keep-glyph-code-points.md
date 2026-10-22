---
'@react-pdf/font': patch
---

fix: keep glyph code points intact across documents, so text rendered after another document that embedded composite glyphs (e.g. umlauts) no longer drops glyphs or writes empty ToUnicode entries
