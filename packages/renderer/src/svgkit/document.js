import { PDFFont } from '@react-pdf/pdfkit';

import SVGPage from './page';
import serializeXML from './serializeXML';

const encodeGlyphs = glyphs => {
  const res = [];

  for (let glyph of Array.from(glyphs)) {
    for (let codePoint of glyph.codePoints) {
      res.push(`00${codePoint.toString(16)}`.slice(-2));
    }
  }

  return res;
};

class SVGDocument {
  constructor() {
    this.info = {};
    this.pages = [];
    this.currentPage = null;

    this._fontSize = 12;
  }

  addPage({ size }) {
    const page = new SVGPage(size[0], size[1]);
    this.pages.push(page);
    this.currentPage = page;
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

  fillColor(color) {
    this.currentPage.fillStyle = color;
    return this;
  }

  fillOpacity(opacity) {
    this.currentPage.globalAlpha = opacity;
    return this;
  }

  strokeColor(color) {
    this.currentPage.strokeStyle = color;
    return this;
  }

  strokeOpacity(opacity) {
    this.currentPage.globalAlpha = opacity;
    return this;
  }

  opacity(opacity) {
    this.currentPage.globalAlpha = opacity;
    return this;
  }

  lineWidth(width) {
    this.currentPage.lineWidth = width;
    return this;
  }

  lineJoin(value) {
    this.currentPage.lineJoin = value;
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

  rect(x, y, width, height) {
    this.currentPage.rect(x, y, width, height);
    return this;
  }

  circle(x, y, radius) {
    this.currentPage.circle(x, y, radius);
    return this;
  }

  path(path) {
    this.currentPage.beginPath();
    this.currentPage.addPathCommand(path);
    this.currentPage.closePath();
  }

  fill(color) {
    if (color) this.fillColor(color);
    this.currentPage.fill();
    return this;
  }

  stroke(color) {
    if (color) this.strokeColor(color);
    this.currentPage.stroke();
    return this;
  }

  fillAndStroke() {
    this.currentPage.fill();
    this.currentPage.stroke();
  }

  clip() {
    this.currentPage.clip();
    return this;
  }

  closePath() {
    this.currentPage.closePath();
    return this;
  }

  font(font, size) {
    const name = typeof font === 'string' ? font : font.fullName;

    this.currentPage.font = `${size}px ${name}`;

    if (size) {
      this.fontSize(size);
    }

    this._font = { ...PDFFont.open(null, font), encodeGlyphs };

    return this;
  }

  dash() {
    // noop
    return this;
  }

  undash() {
    // noop
    return this;
  }

  fontSize(size) {
    this._fontSize = size;
    return this;
  }

  text() {
    // noop
    return this;
  }

  linearGradient() {
    // noop
    return {
      stop: () => {},
    };
  }

  image(data, x, y, opts = {}) {
    const { width, height } = opts;

    const href = `data:image;base64,${Buffer.from(data).toString('base64')}`;

    return this.currentPage.image(href, x, y, width, height);
  }

  _glyphs(glyphs, positions, x, y, options) {
    this.currentPage.text(glyphs, positions, x, y, options);
    return this;
  }

  end() {
    this.serialized = this.pages.map(page => serializeXML(page.root));
  }
}

export default SVGDocument;
