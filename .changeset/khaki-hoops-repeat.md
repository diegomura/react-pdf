---
'@react-pdf/mermaid': patch
---

Fix rendering inside a Web Worker. elkjs read `self` without `document` as "I am the elk worker script", hijacked the host's `onmessage` and exported no layout engine, so the first diagram threw.

Fix `theme` prop being ignored. Named themes are palettes in beautiful-mermaid, not a render option, so they are now expanded into colors before rendering.
