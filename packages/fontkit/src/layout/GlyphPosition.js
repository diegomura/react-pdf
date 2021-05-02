// Updated: 417af0c79c5664271a07a783574ec7fac7ebad0c

/**
 * Represents positioning information for a glyph in a GlyphRun.
 */
export default class GlyphPosition {
  constructor(xAdvance = 0, yAdvance = 0, xOffset = 0, yOffset = 0) {
    /**
     * The amount to move the virtual pen in the X direction after rendering this glyph.
     * @type {number}
     */
    this.xAdvance = xAdvance;

    /**
     * The amount to move the virtual pen in the Y direction after rendering this glyph.
     * @type {number}
     */
    this.yAdvance = yAdvance;

    /**
     * The offset from the pen position in the X direction at which to render this glyph.
     * @type {number}
     */
    this.xOffset = xOffset;

    /**
     * The offset from the pen position in the Y direction at which to render this glyph.
     * @type {number}
     */
    this.yOffset = yOffset;
  }
}
