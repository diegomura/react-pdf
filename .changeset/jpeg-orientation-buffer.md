---
'@react-pdf/image': patch
---

fix: bump jay-peg to 1.1.2 so JPEG parsing no longer mutates image data, which left the EXIF orientation unreadable for pdfkit and drew rotated photos unrotated and stretched
