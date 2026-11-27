import { readFile } from 'node:fs/promises';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import FontStore from '../src/index';
import FontSource from '../src/font-source';
import { FontSourceData } from '../src/types';

const fontPath = new URL('../../layout/tests/assets/font.ttf', import.meta.url);

const loadFamilyName = async (src: FontSourceData) => {
  const source = new FontSource(src, 'BytesFont');

  await source.load();

  return source.data?.familyName;
};

describe('FontSource', () => {
  beforeEach(() => {
    vi.stubGlobal('BROWSER', false);
  });

  it('loads blob URLs', async () => {
    const font = await readFile(fontPath);
    const src = URL.createObjectURL(new Blob([font], { type: 'font/ttf' }));

    try {
      const source = new FontSource(src, 'BlobFont');

      await source.load();

      expect(source.data).not.toBeNull();
    } finally {
      URL.revokeObjectURL(src);
    }
  });

  it('loads Uint8Array sources', async () => {
    const font = await readFile(fontPath);

    expect(await loadFamilyName(new Uint8Array(font))).toBeTruthy();
  });

  it('loads Buffer sources', async () => {
    expect(await loadFamilyName(await readFile(fontPath))).toBeTruthy();
  });

  it('loads byte views with a non-zero offset', async () => {
    const font = await readFile(fontPath);
    const padded = new Uint8Array(font.length + 16);
    padded.set(font, 16);

    expect(await loadFamilyName(padded.subarray(16))).toBeTruthy();
  });

  it('loads ArrayBuffer sources', async () => {
    const font = await readFile(fontPath);
    const arrayBuffer = font.buffer.slice(
      font.byteOffset,
      font.byteOffset + font.byteLength,
    );

    expect(await loadFamilyName(arrayBuffer)).toBeTruthy();
  });

  it('loads byte sources registered through FontStore', async () => {
    const fontStore = new FontStore();

    fontStore.register({
      family: 'BufferFont',
      src: await readFile(fontPath),
    });

    await fontStore.load({ fontFamily: 'BufferFont' });

    expect(fontStore.getFont({ fontFamily: 'BufferFont' }).data).not.toBeNull();
  });
});
