---
'@react-pdf/layout': patch
---

Fix the `Buffer is not defined` warning logged in browsers for each image: `fetchImage` no longer reads the `Buffer` global once the image is loaded, so images from a url or a data URI get their cache key again.
