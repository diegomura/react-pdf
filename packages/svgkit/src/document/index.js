import SVGPage from '../page';
import serialize from './serialize';
import { LinearGradient, RadialGradient } from '../gradient';

class SVGDocument {
  /**
   * @param {{ font?: Object }} [options]
   */
  constructor({ font } = {}) {
    this.info = {};
    /**
     * @type {Object[]}
     */
    this.pages = [];
    /**
     * @type {Object}
     */
    this.currentPage = null;
    /**
     * @type {Object}
     */
    this.defaultFont = font;
  }

  addPage(options = {}) {
    const page = new SVGPage(options);
    this.pages.push(page);
    this.currentPage = page;

    if (this.defaultFont) {
      this.font(this.defaultFont);
    }

    return this;
  }

  save() {
    this.currentPage.save();
    return this;
  }

  restore() {
    this.currentPage.restore();
    return this;
  }

  scale(x, y) {
    this.currentPage.scale(x, y);
    return this;
  }

  translate(x, y) {
    this.currentPage.translate(x, y);
    return this;
  }

  rotate(angle, options = {}) {
    const { origin } = options;
    this.currentPage.rotate(angle, origin);
    return this;
  }

  fillColor(color) {
    this.currentPage.fillColor(color);
    return this;
  }

  fillOpacity(opacity) {
    this.currentPage.fillOpacity(opacity);
    return this;
  }

  strokeColor(color) {
    this.currentPage.strokeColor(color);
    return this;
  }

  strokeOpacity(opacity) {
    this.currentPage.strokeOpacity(opacity);
    return this;
  }

  opacity(opacity) {
    this.currentPage.opacity(opacity);
    return this;
  }

  lineWidth(width) {
    this.currentPage.lineWidth(width);
    return this;
  }

  lineCap(value) {
    this.currentPage.lineCap(value);
    return this;
  }

  lineJoin(value) {
    this.currentPage.lineJoin(value);
    return this;
  }

  moveTo(x, y) {
    this.currentPage.moveTo(x, y);
    return this;
  }

  lineTo(x, y) {
    this.currentPage.lineTo(x, y);
    return this;
  }

  bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
    this.currentPage.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
    return this;
  }

  quadraticCurveTo(cpx, cpy, x, y) {
    this.currentPage.quadraticCurveTo(cpx, cpy, x, y);
    return this;
  }

  rect(x, y, width, height) {
    this.currentPage.rect(x, y, width, height);
    return this;
  }

  circle(x, y, radius) {
    this.currentPage.circle(x, y, radius);
    return this;
  }

  polygon(...points) {
    this.currentPage.moveTo(...Array.from(points.shift() || []));

    for (const point of Array.from(points)) {
      this.currentPage.lineTo(...Array.from(point || []));
    }
    return this.currentPage.closePath();
  }

  path(path) {
    this.currentPage.addPathCommand(path);
    return this;
  }

  fill(color, rule) {
    if (/(even-?odd)|(non-?zero)/.test(color)) {
      rule = color;
      color = null;
    }

    if (color) this.fillColor(color);
    if (rule) this.currentPage.fillRule(rule);

    this.currentPage.fill();

    return this;
  }

  stroke(color) {
    if (color) this.strokeColor(color);
    this.currentPage.stroke();
    return this;
  }

  fillAndStroke(fillColor, strokeColor, fillRule) {
    if (fillColor) this.fillColor(fillColor);
    if (strokeColor) this.strokeColor(strokeColor);
    if (fillRule) this.currentPage.fillRule(fillRule);

    this.currentPage.fillAndStroke();
  }

  clip() {
    this.currentPage.clip();
    return this;
  }

  closePath() {
    this.currentPage.closePath();
    return this;
  }

  dash(length, options) {
    let space;

    if (options == null) options = {};

    if (length == null) return this;

    if (Array.isArray(length)) {
      length = Array.from(length).join(' ');
    } else {
      space = options.space != null ? options.space : length;
    }

    this.currentPage.lineDash(length, space);

    return this;
  }

  undash() {
    this.currentPage.lineDash(0, 0);
    return this;
  }

  linearGradient(x1, y1, x2, y2) {
    return new LinearGradient(x1, y1, x2, y2);
  }

  radialGradient(x1, y1, r1, x2, y2, r2) {
    return new RadialGradient(x1, y1, r1, x2, y2, r2);
  }

  image(data, x, y, opts = {}) {
    const { width, height } = opts;

    if (!width || !height)
      throw new Error(
        'svgkit only supports image rendering with explicit width and height',
      );

    const href = `data:image;base64,${Buffer.from(data).toString('base64')}`;

    return this.currentPage.image(href, x, y, width, height);
  }

  font(src, family, size) {
    if (size) {
      this.fontSize(size);
    }

    if (typeof src === 'string') {
      this.currentPage.fontFamily(src);
      return this;
    }

    // const encodeGlyphs = glyphs => {
    //   const res = [];

    //   for (const glyph of Array.from(glyphs)) {
    //     for (const codePoint of glyph.codePoints) {
    //       res.push(`00${codePoint.toString(16)}`.slice(-2));
    //     }
    //   }

    //   return res;
    // };

    // this._font = { ...PDFFont.open(null, font), encodeGlyphs };

    return this;
  }

  fontSize(size) {
    this.currentPage.fontSize(size);
    return this;
  }

  text(text, x, y) {
    this.currentPage.text(text, x, y);
    return this;
  }

  // _glyphs(glyphs, positions, x, y, options) {
  //   this.currentPage.text(glyphs, positions, x, y, options);
  //   return this;
  // }

  note() {
    console.warn('note is not yet supported on svgkit');
    return this;
  }

  end() {
    this.serialized = this.pages.map((page) => serialize(page.root)).join('');
  }
}

export default SVGDocument;
