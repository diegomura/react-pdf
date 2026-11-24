import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import fetchImage from '../../src/image/fetchImage';

vi.mock('@react-pdf/image', () => ({
  default: vi.fn(async () => ({ width: 10, height: 10, data: new Uint8Array() })),
}));

const imageNode = (src: unknown) =>
  ({ type: 'IMAGE', props: { src }, style: {} }) as any;

describe('image fetchImage', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    warn.mockRestore();
    vi.unstubAllGlobals();
  });

  it('keys an image loaded from a url', async () => {
    const node = imageNode('https://example.com/image.png');

    await fetchImage(node, 100);

    expect(node.image.key).toBe('https://example.com/image.png');
    expect(warn).not.toHaveBeenCalled();
  });

  it('keys an image loaded from a url where Buffer is not defined, as in browsers', async () => {
    vi.stubGlobal('Buffer', undefined);
    const node = imageNode('https://example.com/image.png');

    await fetchImage(node, 100);

    expect(node.image.key).toBe('https://example.com/image.png');
    expect(warn).not.toHaveBeenCalled();
  });

  it('does not key an image loaded from a buffer or a blob', async () => {
    const fromBuffer = imageNode(Buffer.from('gotcha'));
    const fromBlob = imageNode(new Blob(['gotcha'], { type: 'image/png' }));

    await fetchImage(fromBuffer, 100);
    await fetchImage(fromBlob, 100);

    expect(fromBuffer.image.key).toBeUndefined();
    expect(fromBlob.image.key).toBeUndefined();
    expect(warn).not.toHaveBeenCalled();
  });
});
