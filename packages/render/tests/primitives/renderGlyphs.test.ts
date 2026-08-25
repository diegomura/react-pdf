import { describe, expect, test, vi } from 'vitest';

import renderGlyphs from '../../src/primitives/renderGlyphs';

describe('renderGlyphs ctx.glyphs seam', () => {
  test('hands raw glyphs to a ctx that implements glyphs()', () => {
    const ctx: any = { glyphs: vi.fn(), addContent: vi.fn() };
    const glyphs: any[] = [{ id: 65, advanceWidth: 500 }];
    const positions: any[] = [
      { xAdvance: 10, yAdvance: 0, xOffset: 0, yOffset: 0 },
    ];

    renderGlyphs(ctx, glyphs, positions, 5, 6);

    expect(ctx.glyphs).toHaveBeenCalledWith(glyphs, positions, 5, 6);
    expect(ctx.addContent).not.toHaveBeenCalled();
    expect(ctx.glyphs.mock.calls[0][0]).toBe(glyphs);
    expect(ctx.glyphs.mock.calls[0][1]).toBe(positions);
  });
});
