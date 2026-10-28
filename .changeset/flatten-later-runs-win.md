---
'@react-pdf/textkit': patch
---

fix: let substituted fonts win over the font stack in multi-child text, so characters at fragment boundaries (e.g. `{value}%`) no longer render with the first font of the stack
