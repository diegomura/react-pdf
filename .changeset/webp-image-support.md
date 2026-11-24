---
'@react-pdf/image': minor
'@react-pdf/layout': minor
'@react-pdf/renderer': minor
'@react-pdf/types': minor
---

Support WebP images.

PDF has no WebP format, so WebP is decoded and re-encoded to PNG while the image is resolved.
Browsers do this with the decoder they already ship, so `<Image src="photo.webp" />` works with
no setup. Node has no image decoder, so register one — without it, a WebP image throws instead
of rendering blank:

```js
import sharp from 'sharp';
import { registerWebpTranscoder } from '@react-pdf/renderer';

registerWebpTranscoder((data) => sharp(data).png().toBuffer());
```
