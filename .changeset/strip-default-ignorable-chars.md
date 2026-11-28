---
"@react-pdf/layout": patch
---

fix(layout): strip default-ignorable characters (bidi controls, zero-width chars, BOM) so they are not rendered as fallback `.notdef` glyphs
