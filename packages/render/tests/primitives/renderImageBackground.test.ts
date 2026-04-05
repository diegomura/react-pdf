import { describe, expect, test, vi } from 'vitest';

import * as P from '@react-pdf/primitives';

import createCTX from '../ctx';
import renderImageBackground from '../../src/primitives/renderImageBackground';
import { Box, SafeImageBackgroundNode } from '@react-pdf/layout';

const imageData = Buffer.from('fake-image-data');

describe('primitive renderImageBackground', () => {
  test('should be scoped operation', () => {
    const ctx = createCTX();
    ctx.openImage = vi.fn().mockReturnValue({ embed: vi.fn() });
    const box = {
      top: 20,
      left: 40,
      width: 200,
      height: 300,
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      paddingLeft: 0,
    } as Box;
    const node = {
      type: P.ImageBackground,
      box,
      props: { src: 'http://example.com/image.png' },
      style: {},
      image: { data: imageData, width: 200, height: 300 },
    } as unknown as SafeImageBackgroundNode;

    renderImageBackground(ctx, node, {});

    expect(ctx.save.mock.calls).toHaveLength(1);
    expect(ctx.restore.mock.calls).toHaveLength(1);
  });

  test('should not render when no image', () => {
    const ctx = createCTX();
    const box = {
      top: 20,
      left: 40,
      width: 200,
      height: 300,
    } as Box;
    const node = {
      type: P.ImageBackground,
      box,
      props: { src: 'http://example.com/image.png' },
      style: {},
    } as SafeImageBackgroundNode;

    renderImageBackground(ctx, node, {});

    expect(ctx.save.mock.calls).toHaveLength(0);
    expect(ctx.image.mock.calls).toHaveLength(0);
  });

  test('should render image when data is present', () => {
    const ctx = createCTX();
    ctx.openImage = vi.fn().mockReturnValue({
      embed: vi.fn(),
    });
    const box = {
      top: 20,
      left: 40,
      width: 200,
      height: 300,
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      paddingLeft: 0,
    } as Box;
    const node = {
      type: P.ImageBackground,
      box,
      props: { src: 'http://example.com/image.png' },
      style: {},
      image: { data: imageData, width: 200, height: 300 },
    } as unknown as SafeImageBackgroundNode;

    renderImageBackground(ctx, node, {});

    expect(ctx.fillOpacity.mock.calls).toHaveLength(1);
    expect(ctx.image.mock.calls).toHaveLength(1);
  });

  test('should not render image when box is missing', () => {
    const ctx = createCTX();
    const node = {
      type: P.ImageBackground,
      props: { src: 'http://example.com/image.png' },
      style: {},
      image: { data: imageData, width: 200, height: 300 },
    } as unknown as SafeImageBackgroundNode;

    renderImageBackground(ctx, node, {});

    expect(ctx.image.mock.calls).toHaveLength(0);
  });

  test('should apply opacity from style', () => {
    const ctx = createCTX();
    ctx.openImage = vi.fn().mockReturnValue({
      embed: vi.fn(),
    });
    const box = {
      top: 0,
      left: 0,
      width: 100,
      height: 100,
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      paddingLeft: 0,
    } as Box;
    const node = {
      type: P.ImageBackground,
      box,
      props: { src: 'http://example.com/image.png' },
      style: { opacity: 0.5 },
      image: { data: imageData, width: 100, height: 100 },
    } as unknown as SafeImageBackgroundNode;

    renderImageBackground(ctx, node, {});

    expect(ctx.fillOpacity).toHaveBeenCalledWith(0.5);
  });

  test('should use image cache', () => {
    const ctx = createCTX();
    const cachedImage = { embed: vi.fn() };
    const imageCache = new Map([['test-key', cachedImage]]);
    const box = {
      top: 0,
      left: 0,
      width: 100,
      height: 100,
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      paddingLeft: 0,
    } as Box;
    const node = {
      type: P.ImageBackground,
      box,
      props: { src: 'http://example.com/image.png' },
      style: {},
      image: { data: imageData, width: 100, height: 100, key: 'test-key' },
    } as unknown as SafeImageBackgroundNode;

    renderImageBackground(ctx, node, { imageCache });

    expect(ctx.image).toHaveBeenCalledWith(cachedImage, 0, 0, {
      width: 100,
      height: 100,
    });
  });
});
