import fs from 'fs';
import path from 'path';

import fetchImage from '../../src/image/fetchImage';
import { IMAGE_CACHE } from '../../src/image/resolveImage';

const jpgImageUrl = 'https://react-pdf.org/static/images/quijote1.jpg';
const pngImageUrl = 'https://react-pdf.org/static/images/quijote2.png';
const jpgLogalPath = path.join(__dirname, '../assets/test.jpg');
const localJPGImage = fs.readFileSync(jpgLogalPath);
const pngLogalPath = path.join(__dirname, '../assets/test.png');
const localPNGImage = fs.readFileSync(pngLogalPath);
const base64Image =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg==';

describe('image fetchImage', () => {
  beforeEach(() => {
    fetch.resetMocks();
    IMAGE_CACHE.reset();
  });

  test('Should fetch remote image using passed options', async () => {
    fetch.once(localJPGImage);

    const method = 'POST';
    const body = 'qwerty';
    const headers = { Authorization: 'Bearer qwerty' };
    const node = {
      type: 'IMAGE',
      props: { src: { uri: jpgImageUrl, method, headers, body } },
    };

    await fetchImage(node);

    expect(fetch.mock.calls[0][1].method).toBe(method);
    expect(fetch.mock.calls[0][1].body).toEqual(body);
    expect(fetch.mock.calls[0][1].headers).toEqual(headers);
  });

  test('Should fetch remote jpg image with src prop', async () => {
    fetch.once(localJPGImage);

    const node = { type: 'IMAGE', props: { src: jpgImageUrl } };

    await fetchImage(node);

    expect(node.image).toBeTruthy();
    expect(node.image.width).toBeGreaterThan(0);
    expect(node.image.height).toBeGreaterThan(0);
  });

  test('Should fetch remote jpg image with href prop', async () => {
    fetch.once(localJPGImage);

    const node = { type: 'IMAGE', props: { href: jpgImageUrl } };

    await fetchImage(node);

    expect(node.image).toBeTruthy();
    expect(node.image.width).toBeGreaterThan(0);
    expect(node.image.height).toBeGreaterThan(0);
  });

  test('Should fetch remote jpg image with source prop', async () => {
    fetch.once(localJPGImage);

    const node = { type: 'IMAGE', props: { source: jpgImageUrl } };

    await fetchImage(node);

    expect(node.image).toBeTruthy();
    expect(node.image.width).toBeGreaterThan(0);
    expect(node.image.height).toBeGreaterThan(0);
  });

  test('Should fetch remote png image with src prop', async () => {
    fetch.once(localPNGImage);

    const node = { type: 'IMAGE', props: { src: pngImageUrl } };

    await fetchImage(node);

    expect(node.image).toBeTruthy();
    expect(node.image.width).toBeGreaterThan(0);
    expect(node.image.height).toBeGreaterThan(0);
  });

  test('Should fetch remote png image with href prop', async () => {
    fetch.once(localPNGImage);

    const node = { type: 'IMAGE', props: { href: pngImageUrl } };

    await fetchImage(node);

    expect(node.image).toBeTruthy();
    expect(node.image.width).toBeGreaterThan(0);
    expect(node.image.height).toBeGreaterThan(0);
  });

  test('Should fetch remote png image with source prop', async () => {
    fetch.once(localPNGImage);

    const node = { type: 'IMAGE', props: { source: pngImageUrl } };

    await fetchImage(node);

    expect(node.image).toBeTruthy();
    expect(node.image.width).toBeGreaterThan(0);
    expect(node.image.height).toBeGreaterThan(0);
  });

  test('Should fetch local jpg image with src prop', async () => {
    const node = { type: 'IMAGE', props: { src: localJPGImage } };

    await fetchImage(node);

    expect(node.image).toBeTruthy();
    expect(node.image.width).toBeGreaterThan(0);
    expect(node.image.height).toBeGreaterThan(0);
  });

  test('Should fetch local jpg image with href prop', async () => {
    const node = { type: 'IMAGE', props: { href: localJPGImage } };

    await fetchImage(node);

    expect(node.image).toBeTruthy();
    expect(node.image.width).toBeGreaterThan(0);
    expect(node.image.height).toBeGreaterThan(0);
  });

  test('Should fetch local jpg image with source prop', async () => {
    const node = { type: 'IMAGE', props: { source: localJPGImage } };

    await fetchImage(node);

    expect(node.image).toBeTruthy();
    expect(node.image.width).toBeGreaterThan(0);
    expect(node.image.height).toBeGreaterThan(0);
  });

  test('Should fetch local png image with src prop', async () => {
    const node = { type: 'IMAGE', props: { src: localPNGImage } };

    await fetchImage(node);

    expect(node.image).toBeTruthy();
    expect(node.image.width).toBeGreaterThan(0);
    expect(node.image.height).toBeGreaterThan(0);
  });

  test('Should fetch local png image with href prop', async () => {
    const node = { type: 'IMAGE', props: { href: localPNGImage } };

    await fetchImage(node);

    expect(node.image).toBeTruthy();
    expect(node.image.width).toBeGreaterThan(0);
    expect(node.image.height).toBeGreaterThan(0);
  });

  test('Should fetch local png image with source prop', async () => {
    const node = { type: 'IMAGE', props: { source: localPNGImage } };

    await fetchImage(node);

    expect(node.image).toBeTruthy();
    expect(node.image.width).toBeGreaterThan(0);
    expect(node.image.height).toBeGreaterThan(0);
  });

  test('Should fetch base64 image with src prop', async () => {
    const node = { type: 'IMAGE', props: { src: base64Image } };

    await fetchImage(node);

    expect(node.image).toBeTruthy();
    expect(node.image.width).toBeGreaterThan(0);
    expect(node.image.height).toBeGreaterThan(0);
  });

  test('Should fetch base64 image with href prop', async () => {
    const node = { type: 'IMAGE', props: { href: base64Image } };

    await fetchImage(node);

    expect(node.image).toBeTruthy();
    expect(node.image.width).toBeGreaterThan(0);
    expect(node.image.height).toBeGreaterThan(0);
  });

  test('Should fetch base64 image with source prop', async () => {
    const node = { type: 'IMAGE', props: { source: base64Image } };

    await fetchImage(node);

    expect(node.image).toBeTruthy();
    expect(node.image.width).toBeGreaterThan(0);
    expect(node.image.height).toBeGreaterThan(0);
  });
});
