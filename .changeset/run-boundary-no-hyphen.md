---
'@react-pdf/textkit': patch
---

Stop treating the boundary between two text runs as a hyphenation point, so a period after a nested `<Text>` no longer wraps alone or gets a hyphen
