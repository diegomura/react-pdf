import { fileURLToPath } from 'url';
import path from 'path';
import { describe, expect, it } from 'vitest';

import FontSource from '../src/font-source';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FONT_PATH = path.resolve(__dirname, './assets/font.ttf');

const loadFont = async () => {
  const source = new FontSource(FONT_PATH, 'Roboto');
  await source.load();
  return source.data!;
};

describe('glyph code points', () => {
  it('should keep code points of glyphs looked up by id before being laid out', async () => {
    const font = await loadFont();

    // Embedding a composite glyph (Ö = O + diaeresis) in a PDF subset looks
    // its components up by id only, as happens at the end of every document
    const subset = font.createSubset();
    subset.includeGlyph(font.glyphForCodePoint(0xd6).id);
    subset.encode();

    // Later documents lay out text with the same font instance
    const { glyphs } = font.layout('WO');

    expect(glyphs.map((glyph) => glyph.codePoints)).toEqual([[87], [79]]);
  });
});
