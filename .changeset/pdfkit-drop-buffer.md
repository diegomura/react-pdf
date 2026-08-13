---
'@react-pdf/pdfkit': patch
---

Replace Node Buffer usage with Uint8Array. `image()` and `file()` now accept any Uint8Array, not just Buffers
