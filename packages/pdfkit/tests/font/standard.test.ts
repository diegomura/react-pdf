import { describe, expect, it } from 'vitest';

import '../../src/document.node.js';
import PDFFontFactory from '../../src/font_factory.js';

describe('standard fonts', () => {
  it('should resolve advanceWidth of soft hyphen to be zero', () => {
    const SOFT_HYPHEN = '\u00AD';
    const font = PDFFontFactory.open({}, 'Helvetica', 'Helvetica', 'foobar');

    expect(font.encode(SOFT_HYPHEN)[1][0].advanceWidth).toBe(0);
  });

  // Guards the generated AFM data against a bad regeneration: widths and the
  // delta-encoded kern pairs must still match the original Adobe metrics.
  it.each([
    ['Helvetica', 'W', 944, 'A', 'V', -70],
    ['Times-Roman', 'W', 944, 'A', 'V', -135],
    ['Courier', 'W', 600, 'A', 'V', 0],
  ])('%s keeps its AFM metrics', (name, glyph, width, left, right, kern) => {
    const { font } = PDFFontFactory.open({}, name, name, 'id');

    expect(font.widthOfGlyph(glyph)).toBe(width);
    expect(font.getKernPair(left, right)).toBe(kern);
  });
});
