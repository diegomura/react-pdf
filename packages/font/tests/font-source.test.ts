import { readFile } from 'node:fs/promises';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import FontStore from '../src/index';
import FontSource from '../src/font-source';

const fontPath = new URL('../../layout/tests/assets/font.ttf', import.meta.url);

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

  it('loads buffer sources registered through FontStore', async () => {
    const buffer = await readFile(fontPath);
    const fontStore = new FontStore();

    fontStore.register({
      family: 'BufferFont',
      src: { buffer },
    });

    await fontStore.load({ fontFamily: 'BufferFont' });

    expect(fontStore.getFont({ fontFamily: 'BufferFont' }).data).not.toBeNull();
  });
});
