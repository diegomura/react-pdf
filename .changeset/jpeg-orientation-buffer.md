---
'@react-pdf/image': patch
---

fix: stop JPEG parsing from mutating image data, which left the EXIF orientation unreadable for pdfkit and drew rotated photos unrotated and stretched
