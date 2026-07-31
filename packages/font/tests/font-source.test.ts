import { readFile } from 'node:fs/promises';

import { beforeEach, describe, expect, it, vi } from 'vitest';

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
});
