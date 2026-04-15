---
'@react-pdf/textkit': patch
---

Fix NFD decomposition breaking Latin diacritics rendering by only decomposing complex scripts (Bengali, Devanagari, etc.) that need it for glyph mapping
