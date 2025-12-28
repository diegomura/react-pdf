import { beforeEach, describe, expect, test } from 'vitest';
import fs from 'fs';
import path from 'path';
import url from 'url';
import './types';

import resolveImage, { IMAGE_CACHE } from '../src/resolve';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const jpgImageUrl = 'https://react-pdf.org/static/images/quijote1.jpg';
const pngImageUrl = 'https://react-pdf.org/static/images/quijote2.png';
const jpgLogalPath = path.join(__dirname, './assets/test.jpg');
const localJPGImage = fs.readFileSync(jpgLogalPath);
const pngLogalPath = path.join(__dirname, './assets/test.png');
const localPNGImage = fs.readFileSync(pngLogalPath);

describe('image resolveImage', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    IMAGE_CACHE.reset();
  });

  test('Should fetch remote image using GET method by default', async () => {
    fetchMock.once(localJPGImage);

    await resolveImage({ uri: jpgImageUrl });

    expect(fetchMock.mock.calls[0]?.[1]?.method).toBe('GET');
  });

  test('Should fetch remote image using passed method', async () => {
    fetchMock.once(localJPGImage);

    await resolveImage({ uri: jpgImageUrl, method: 'POST' });

    expect(fetchMock.mock.calls[0]?.[1]?.method).toBe('POST');
  });

  test('Should fetch remote image using passed headers', async () => {
    fetchMock.once(localJPGImage);

    const headers = { Authorization: 'Bearer qwerty' };
    await resolveImage({ uri: jpgImageUrl, headers });

    expect(fetchMock.mock.calls[0]?.[1]?.headers).toEqual(headers);
  });

  test('Should fetch remote image using passed body', async () => {
    fetchMock.once(localJPGImage);

    const body = 'qwerty';
    await resolveImage({ uri: jpgImageUrl, body, method: 'POST' });

    expect(fetchMock.mock.calls[0]?.[1]?.body).toEqual(body);
  });

  test('Should fetch remote image using passed credentials', async () => {
    fetchMock.once(localJPGImage);

    const credentials = 'include';
    await resolveImage({ uri: jpgImageUrl, credentials });

    expect(fetchMock.mock.calls[0]?.[1]?.credentials).toBe(credentials);
  });

  test('Should not include credentials if not exist', async () => {
    fetchMock.once(localJPGImage);

    await resolveImage({ uri: jpgImageUrl });

    expect(fetchMock.mock.calls[0]?.[1]?.credentials).toBeUndefined();
  });

  test('Should render a jpeg image over http', async () => {
    fetchMock.once(localJPGImage);

    const image = await resolveImage({ uri: jpgImageUrl });

    expect(image?.data).toBeTruthy();
    expect(image?.width).toBeGreaterThan(0);
    expect(image?.height).toBeGreaterThan(0);
  });

  test('Should render a png image over http', async () => {
    fetchMock.once(localPNGImage);

    const image = await resolveImage({ uri: pngImageUrl });

    expect(image?.data).toBeTruthy();
    expect(image?.width).toBeGreaterThan(0);
    expect(image?.height).toBeGreaterThan(0);
  });

  test('Should render a local image from absolute path', async () => {
    const absolutePath = path.join(__dirname, './assets/test.jpg');
    const image = await resolveImage({ uri: absolutePath });

    expect(image?.data).toBeTruthy();
    expect(image?.width).toBeGreaterThan(0);
    expect(image?.height).toBeGreaterThan(0);
  });

  test('Should render a local image from relative path', async () => {
    const image = await resolveImage({
      uri: 'packages/layout/tests/assets/test.jpg',
    });

    expect(image?.data).toBeTruthy();
    expect(image?.width).toBeGreaterThan(0);
    expect(image?.height).toBeGreaterThan(0);
  });

  test('Should render a local image from src object', async () => {
    const image = await resolveImage({
      uri: './packages/layout/tests/assets/test.jpg',
    });

    expect(image?.data).toBeTruthy();
    expect(image?.width).toBeGreaterThan(0);
    expect(image?.height).toBeGreaterThan(0);
  });

  test('Should render a local image with spaces in filename', async () => {
    const image = await resolveImage({
      uri: './packages/image/tests/assets/test with spaces.jpg',
    });

    expect(image?.data).toBeTruthy();
    expect(image?.width).toBeGreaterThan(0);
    expect(image?.height).toBeGreaterThan(0);
  });

  test('Should render a local image with special characters in filename', async () => {
    const image = await resolveImage({
      uri: './packages/image/tests/assets/special_ _%20_@&é"\'(§è!çà)-^$ù`,;:=?.+%£¨*<>.jpg',
    });

    expect(image?.data).toBeTruthy();
    expect(image?.width).toBeGreaterThan(0);
    expect(image?.height).toBeGreaterThan(0);
  });

  test('Should render a local image from data', async () => {
    const image = await resolveImage({ data: localJPGImage, format: 'jpg' });

    expect(image?.data).toBeTruthy();
    expect(image?.width).toBeGreaterThan(0);
    expect(image?.height).toBeGreaterThan(0);
  });

  test('Should render a base64 image', async () => {
    const image = await resolveImage({
      uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg==',
    });

    expect(image?.data).toBeTruthy();
    expect(image?.width).toBeGreaterThan(0);
    expect(image?.height).toBeGreaterThan(0);
  });

  test('Should render a buffer jpg image', async () => {
    const image = await resolveImage(localJPGImage);

    expect(image?.data).toBeTruthy();
    expect(image?.width).toBeGreaterThan(0);
    expect(image?.height).toBeGreaterThan(0);
  });

  test('Should render a buffer png image', async () => {
    const image = await resolveImage(localPNGImage);

    expect(image?.data).toBeTruthy();
    expect(image?.width).toBeGreaterThan(0);
    expect(image?.height).toBeGreaterThan(0);
  });

  test('Should not cache previously loaded remote images if flag false', async () => {
    fetchMock.mockResponse(localJPGImage);

    const image1 = await resolveImage({ uri: jpgImageUrl }, { cache: false });
    const image2 = await resolveImage({ uri: jpgImageUrl }, { cache: false });

    expect(image1).not.toBe(image2);
  });

  test('Should cache previously loaded local images by default', async () => {
    fetchMock.mockResponse(localJPGImage);

    const image1 = await resolveImage({ uri: jpgImageUrl });
    const image2 = await resolveImage({ uri: jpgImageUrl });

    expect(image1).toBe(image2);
  });

  test('Should not cache previously loaded local images if flag false', async () => {
    fetchMock.mockResponse(localJPGImage);

    const image1 = await resolveImage(localJPGImage, { cache: false });
    const image2 = await resolveImage(localJPGImage, { cache: false });

    expect(image1).not.toBe(image2);
  });

  test('Should render a blob image', async () => {
    const blob = new Blob([localJPGImage], { type: 'image/jpeg' });
    const image = await resolveImage(blob);

    expect(image?.data).toBeTruthy();
    expect(image?.width).toBeGreaterThan(0);
    expect(image?.height).toBeGreaterThan(0);
  });

  test('Should render a blob without type', async () => {
    const blob = new Blob([localJPGImage]);
    const image = await resolveImage(blob);

    expect(image?.data).toBeTruthy();
    expect(image?.width).toBeGreaterThan(0);
    expect(image?.height).toBeGreaterThan(0);
  });

  test('Should render a blob image with type application/octet-stream', async () => {
    const blob = new Blob([localJPGImage], {
      type: 'application/octet-stream',
    });
    const image = await resolveImage(blob);

    expect(image?.data).toBeTruthy();
    expect(image?.width).toBeGreaterThan(0);
    expect(image?.height).toBeGreaterThan(0);
  });

  test('Should throw error for unsupported base64 format', async () => {
    await expect(
      resolveImage({
        uri: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
      }),
    ).rejects.toThrow('Base64 image invalid format: gif');
  });

  test('Should throw error for invalid base64 URI', async () => {
    await expect(
      resolveImage({ uri: 'data:image/pngbase64,invalid' } as any),
    ).rejects.toThrow('Invalid base64 image');
  });

  test('Should throw error for invalid blob type', async () => {
    const blob = new Blob([localJPGImage], { type: 'text/plain' });
    await expect(resolveImage(blob)).rejects.toThrow(
      'Invalid blob type: text/plain',
    );
  });

  test('Should throw error for unsupported blob image type', async () => {
    const blob = new Blob([localJPGImage], { type: 'image/gif' });
    await expect(resolveImage(blob)).rejects.toThrow(
      'Invalid blob type: image/gif',
    );
  });

  test('Should throw error for invalid data source', async () => {
    await expect(
      resolveImage({ data: undefined as any, format: 'jpg' }),
    ).rejects.toThrow('Invalid data given for local file');
  });

  test('Should throw error for non-existent local file', async () => {
    await expect(
      resolveImage({ uri: '/nonexistent/path/image.jpg' }),
    ).rejects.toThrow();
  });

  test('Should return null for invalid buffer', async () => {
    const invalidBuffer = Buffer.from('not an image');
    const image = await resolveImage(invalidBuffer);
    expect(image).toBeNull();
  });

  test('Should throw on network fetch failure', async () => {
    fetchMock.once(() => {
      throw new Error('Network error');
    });

    await expect(resolveImage({ uri: jpgImageUrl })).rejects.toThrow(
      'Network error',
    );
  });

  test('Should throw for unsupported remote image format', async () => {
    // GIF89a magic bytes - neither JPEG nor PNG
    const gifBuffer = Buffer.from([0x47, 0x49, 0x46, 0x38, 0x39, 0x61]);
    fetchMock.once(gifBuffer);

    await expect(
      resolveImage({ uri: 'https://example.com/image.gif' }),
    ).rejects.toThrow('Not valid image extension');
  });

  test('Should cache DataImageSrc images using base64 key', async () => {
    const image1 = await resolveImage({ data: localJPGImage, format: 'jpg' });
    const image2 = await resolveImage({ data: localJPGImage, format: 'jpg' });

    expect(image1).toBe(image2);
  });

  test('Should return null when getting cache with null key', () => {
    expect(IMAGE_CACHE.get(null)).toBeNull();
  });
});
