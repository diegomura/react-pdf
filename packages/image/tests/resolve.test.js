import { beforeEach, describe, expect, test } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import url from 'url';

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
    fetch.resetMocks();
    IMAGE_CACHE.reset();
  });

  test('Should fetch remote image using GET method by default', async () => {
    fetch.once(localJPGImage);

    await resolveImage({ uri: jpgImageUrl });

    expect(fetch.mock.calls[0][1].method).toBe('GET');
  });

  test('Should fetch remote image using passed method', async () => {
    fetch.once(localJPGImage);

    await resolveImage({ uri: jpgImageUrl, method: 'POST' });

    expect(fetch.mock.calls[0][1].method).toBe('POST');
  });

  test('Should fetch remote image using passed headers', async () => {
    fetch.once(localJPGImage);

    const headers = { Authorization: 'Bearer qwerty' };
    await resolveImage({ uri: jpgImageUrl, headers });

    expect(fetch.mock.calls[0][1].headers).toEqual(headers);
  });

  test('Should fetch remote image using passed body', async () => {
    fetch.once(localJPGImage);

    const body = 'qwerty';
    await resolveImage({ uri: jpgImageUrl, body });

    expect(fetch.mock.calls[0][1].body).toEqual(body);
  });

  test('Should fetch remote image using passed credentials', async () => {
    fetch.once(localJPGImage);

    const credentials = 'include';
    await resolveImage({ uri: jpgImageUrl, credentials });

    expect(fetch.mock.calls[0][1].credentials).toBe(credentials);
  });

  test('Should not include credentials if not exist', async () => {
    fetch.once(localJPGImage);

    await resolveImage({ uri: jpgImageUrl });

    expect(fetch.mock.calls[0][1].credentials).toBeUndefined();
  });

  test('Should render a jpeg image over http', async () => {
    fetch.once(localJPGImage);

    const image = await resolveImage({ uri: jpgImageUrl });

    expect(image.data).toBeTruthy();
    expect(image.width).toBeGreaterThan(0);
    expect(image.height).toBeGreaterThan(0);
  });

  test('Should render a png image over http', async () => {
    fetch.once(localPNGImage);

    const image = await resolveImage({ uri: pngImageUrl });

    expect(image.data).toBeTruthy();
    expect(image.width).toBeGreaterThan(0);
    expect(image.height).toBeGreaterThan(0);
  });

  test('Should render a local image from src object', async () => {
    const image = await resolveImage({
      uri: './packages/layout/tests/assets/test.jpg',
    });

    expect(image.data).toBeTruthy();
    expect(image.width).toBeGreaterThan(0);
    expect(image.height).toBeGreaterThan(0);
  });

  test('Should render a local image from data', async () => {
    const image = await resolveImage({ data: localJPGImage, format: 'jpg' });

    expect(image.data).toBeTruthy();
    expect(image.width).toBeGreaterThan(0);
    expect(image.height).toBeGreaterThan(0);
  });

  test('Should render a base64 image', async () => {
    const image = await resolveImage({
      uri:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg==',
    });

    expect(image.data).toBeTruthy();
    expect(image.width).toBeGreaterThan(0);
    expect(image.height).toBeGreaterThan(0);
  });

  test('Should render a buffer jpg image', async () => {
    const image = await resolveImage(localJPGImage);

    expect(image.data).toBeTruthy();
    expect(image.width).toBeGreaterThan(0);
    expect(image.height).toBeGreaterThan(0);
  });

  test('Should render a buffer png image', async () => {
    const image = await resolveImage(localPNGImage);

    expect(image.data).toBeTruthy();
    expect(image.width).toBeGreaterThan(0);
    expect(image.height).toBeGreaterThan(0);
  });

  test('Should not cache previously loaded remote images if flag false', async () => {
    fetch.mockResponse(localJPGImage);

    const image1 = await resolveImage({ uri: jpgImageUrl }, { cache: false });
    const image2 = await resolveImage({ uri: jpgImageUrl }, { cache: false });

    expect(image1).not.toBe(image2);
  });

  test('Should cache previously loaded local images by default', async () => {
    fetch.mockResponse(localJPGImage);

    const image1 = await resolveImage({ uri: jpgImageUrl });
    const image2 = await resolveImage({ uri: jpgImageUrl });

    expect(image1).toBe(image2);
  });

  test('Should not cache previously loaded local images if flag false', async () => {
    fetch.mockResponse(localJPGImage);

    const image1 = await resolveImage(localJPGImage, { cache: false });
    const image2 = await resolveImage(localJPGImage, { cache: false });

    expect(image1).not.toBe(image2);
  });
});
