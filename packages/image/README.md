<p align="center">
  <img src="https://user-images.githubusercontent.com/5600341/27505816-c8bc37aa-587f-11e7-9a86-08a2d081a8b9.png" height="280px">
</p>

# @react-pdf/image

Image parsing and resolution library for react-pdf. Handles PNG, JPEG and WebP images from various sources including local files, remote URLs, base64 data URIs, buffers, and blobs.

## Installation

```bash
yarn add @react-pdf/image
```

## Usage

```js
import resolveImage from '@react-pdf/image';

const image = await resolveImage({ uri: './path/to/image.png' });

console.log(image.width); // Image width in pixels
console.log(image.height); // Image height in pixels
console.log(image.format); // 'png' or 'jpeg'
console.log(image.data); // Buffer containing image data
```

## Image Sources

The library supports multiple image source types:

### Local File

```js
const image = await resolveImage({ uri: './image.png' });
// or
const image = await resolveImage({ uri: '/absolute/path/to/image.jpg' });
```

> **Note:** Local file resolution is only available in Node.js environments.

### Remote URL

```js
const image = await resolveImage({ uri: 'https://example.com/image.png' });
```

With custom request options:

```js
const image = await resolveImage({
  uri: 'https://example.com/image.png',
  method: 'GET',
  headers: {
    Authorization: 'Bearer token',
  },
  body: null,
  credentials: 'include',
});
```

### Base64 Data URI

```js
const image = await resolveImage({
  uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
});
```

### Buffer

```js
import fs from 'fs';

const buffer = fs.readFileSync('./image.png');
const image = await resolveImage(buffer);
```

### Blob (Browser)

```js
const response = await fetch('https://example.com/image.png');
const blob = await response.blob();
const image = await resolveImage(blob);
```

### Data Object

```js
const image = await resolveImage({
  data: imageBuffer,
  format: 'png', // 'png', 'jpg', 'jpeg', 'svg', or 'webp'
});
```

## Caching

Images are cached by default to avoid redundant processing. You can disable caching for individual requests:

```js
const image = await resolveImage({ uri: './image.png' }, { cache: false });
```

The cache has a default limit of 30 entries and uses LRU (Least Recently Used) eviction.

## Types

### Image

The resolved image object:

```ts
interface Image {
  width: number;
  height: number;
  data: Buffer;
  format: 'jpeg' | 'png';
  key?: string;
}
```

### ImageSrc

All supported image source types:

```ts
type ImageSrc =
  | Blob
  | Buffer
  | DataImageSrc
  | LocalImageSrc
  | RemoteImageSrc
  | Base64ImageSrc;

type DataImageSrc = {
  data: Buffer;
  format: 'jpg' | 'jpeg' | 'png' | 'svg' | 'webp';
};

type LocalImageSrc = {
  uri: string;
  format?: 'jpg' | 'jpeg' | 'png' | 'svg' | 'webp';
};

type RemoteImageSrc = {
  uri: string;
  method?: 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  format?: 'jpg' | 'jpeg' | 'png' | 'svg' | 'webp';
  body?: any;
  credentials?: 'omit' | 'same-origin' | 'include';
};

type Base64ImageSrc = {
  uri: `data:image${string}`;
};
```

## Supported Formats

- **PNG** - Portable Network Graphics
- **JPEG/JPG** - Joint Photographic Experts Group
- **SVG** - Scalable Vector Graphics
- **WebP** - transcoded to PNG, see below

JPEG images with EXIF orientation data are automatically handled, with width and height adjusted accordingly.

### WebP

A PDF image can carry JPEG (`DCTDecode`) or raw pixels (`FlateDecode`, what a PNG decodes
into) — the format has no filter for a VP8/VP8L bitstream. WebP therefore cannot be embedded
as-is: it is decoded and re-encoded to PNG while the image is resolved, and the resolved
`image.format` is `'png'`.

In the **browser** this is free and automatic — `createImageBitmap` plus a canvas do the work
with the libwebp the browser already ships.

**Node** has no image decoder at all, so you have to supply one. Nothing is guessed: without a
transcoder, resolving a WebP throws instead of silently dropping the image.

```js
import sharp from 'sharp';
import { registerWebpTranscoder } from '@react-pdf/image';

registerWebpTranscoder((data) => sharp(data).png().toBuffer());
```

The transcoder receives the original WebP bytes and returns PNG or JPEG bytes (a `Buffer`, or a
promise of one). Registering one also overrides the browser's built-in path — pass `null` to
remove it.

## License

MIT
