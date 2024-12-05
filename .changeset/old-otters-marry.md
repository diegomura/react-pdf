---
"@react-pdf/stylesheet": minor
"@react-pdf/layout": minor
---

Changed unit behavior according to PDF spec. Please note that all unitless values are considered as user unit which is a 72dpi equality of the value. This is according to PDF spec and ensures a consistent layout independent of the dpi setting.
