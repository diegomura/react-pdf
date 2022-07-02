import { cache } from '../decorators';
import Path from './Path';
import unicode from 'unicode-properties';
import StandardNames from './StandardNames';

/**
 * Glyph objects represent a glyph in the font. They have various properties for accessing metrics and
 * the actual vector path the glyph represents, and methods for rendering the glyph to a graphics context.
 *
 * You do not create glyph objects directly. They are created by various methods on the font object.
 * There are several subclasses of the base Glyph class internally that may be returned depending
 * on the font format, but they all inherit from this class.
 */
export default class Glyph {
  constructor(id, codePoints, font) {
    /**
     * The glyph id in the font
     * @type {number}
     */
    this.id = id;

    /**
     * An array of unicode code points that are represented by this glyph.
     * There can be multiple code points in the case of ligatures and other glyphs
     * that represent multiple visual characters.
     * @type {number[]}
     */
    this.codePoints = codePoints;
    this._font = font;

    // TODO: get this info from GDEF if available
    this.isMark = this.codePoints.length > 0 && this.codePoints.every(unicode.isMark);
    this.isLigature = this.codePoints.length > 1;
  }

  _getPath() {
    return new Path();
  }

  _getCBox() {
    return this.path.cbox;
  }

  _getBBox() {
    return this.path.bbox;
  }

  _getTableMetrics(table) {
    if (this.id < table.metrics.length) {
      return table.metrics.get(this.id);
    }

    let metric = table.metrics.get(table.metrics.length - 1);
    let res = {
      advance: metric ? metric.advance : 0,
      bearing: table.bearings.get(this.id - table.metrics.length) || 0
    };

    return res;
  }

  _getMetrics(cbox) {
    if (this._metrics) { return this._metrics; }

    let {advance:advanceWidth, bearing:leftBearing} = this._getTableMetrics(this._font.hmtx);

    // For vertical metrics, use vmtx if available, or fall back to global data from OS/2 or hhea
    if (this._font.vmtx) {
      var {advance:advanceHeight, bearing:topBearing} = this._getTableMetrics(this._font.vmtx);

    } else {
      let os2;
      if (typeof cbox === 'undefined' || cbox === null) { ({ cbox } = this); }

      if ((os2 = this._font['OS/2']) && os2.version > 0) {
        var advanceHeight = Math.abs(os2.typoAscender - os2.typoDescender);
        var topBearing = os2.typoAscender - cbox.maxY;

      } else {
        let { hhea } = this._font;
        var advanceHeight = Math.abs(hhea.ascent - hhea.descent);
        var topBearing = hhea.ascent - cbox.maxY;
      }
    }

    if (this._font._variationProcessor && this._font.HVAR) {
      advanceWidth += this._font._variationProcessor.getAdvanceAdjustment(this.id, this._font.HVAR);
    }

    return this._metrics = { advanceWidth, advanceHeight, leftBearing, topBearing };
  }

  /**
   * The glyph’s control box.
   * This is often the same as the bounding box, but is faster to compute.
   * Because of the way bezier curves are defined, some of the control points
   * can be outside of the bounding box. Where `bbox` takes this into account,
   * `cbox` does not. Thus, cbox is less accurate, but faster to compute.
   * See [here](http://www.freetype.org/freetype2/docs/glyphs/glyphs-6.html#section-2)
   * for a more detailed description.
   *
   * @type {BBox}
   */
  @cache
  get cbox() {
    return this._getCBox();
  }

  /**
   * The glyph’s bounding box, i.e. the rectangle that encloses the
   * glyph outline as tightly as possible.
   * @type {BBox}
   */
  @cache
  get bbox() {
    return this._getBBox();
  }

  /**
   * A vector Path object representing the glyph outline.
   * @type {Path}
   */
  @cache
  get path() {
    // Cache the path so we only decode it once
    // Decoding is actually performed by subclasses
    return this._getPath();
  }

  /**
   * Returns a path scaled to the given font size.
   * @param {number} size
   * @return {Path}
   */
  getScaledPath(size) {
    let scale = 1 / this._font.unitsPerEm * size;
    return this.path.scale(scale);
  }

  /**
   * The glyph's advance width.
   * @type {number}
   */
  @cache
  get advanceWidth() {
    return this._getMetrics().advanceWidth;
  }

  /**
   * The glyph's advance height.
   * @type {number}
   */
  @cache
  get advanceHeight() {
    return this._getMetrics().advanceHeight;
  }

  get ligatureCaretPositions() {}

  _getName() {
    let { post } = this._font;
    if (!post) {
      return null;
    }

    switch (post.version) {
      case 1:
        return StandardNames[this.id];

      case 2:
        let id = post.glyphNameIndex[this.id];
        if (id < StandardNames.length) {
          return StandardNames[id];
        }

        return post.names[id - StandardNames.length];

      case 2.5:
        return StandardNames[this.id + post.offsets[this.id]];

      case 4:
        return String.fromCharCode(post.map[this.id]);
    }
  }

  /**
   * The glyph's name
   * @type {string}
   */
  @cache
  get name() {
    return this._getName();
  }

  /**
   * Renders the glyph to the given graphics context, at the specified font size.
   * @param {CanvasRenderingContext2d} ctx
   * @param {number} size
   */
  render(ctx, size) {
    ctx.save();

    let scale = 1 / this._font.head.unitsPerEm * size;
    ctx.scale(scale, scale);

    let fn = this.path.toFunction();
    fn(ctx);
    ctx.fill();

    ctx.restore();
  }
}
