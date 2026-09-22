---
'@react-pdf/font': patch
'@react-pdf/renderer': patch
---

Bump pdfkit to 0.20.2 so file tracers and bundlers pick up the CommonJS standard-font modules the Node build actually loads, instead of failing at first render with `Cannot find module .../standard-fonts/Helvetica.cjs` in traced deployments (e.g. Next.js standalone output).
