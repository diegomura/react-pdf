/*
PDF tiling pattern support. Uncolored only.
 */

const underlyingColorSpaces = ['DeviceCMYK', 'DeviceRGB'];

class PDFTilingPattern {
  constructor(doc, bBox, xStep, yStep, stream) {
    this.doc = doc;
    this.bBox = bBox;
    this.xStep = xStep;
    this.yStep = yStep;
    this.stream = stream;
  }

  createPattern() {
    // no resources needed for our current usage
    // required entry
    const resources = this.doc.ref();
    resources.end();
    // apply default transform matrix (flipped in the default doc._ctm)
    // see document.js & gradient.js
    const [m0, m1, m2, m3, m4, m5] = this.doc._ctm;
    const [m11, m12, m21, m22, dx, dy] = [1, 0, 0, 1, 0, 0];
    const m = [
      m0 * m11 + m2 * m12,
      m1 * m11 + m3 * m12,
      m0 * m21 + m2 * m22,
      m1 * m21 + m3 * m22,
      m0 * dx + m2 * dy + m4,
      m1 * dx + m3 * dy + m5
    ];
    const pattern = this.doc.ref({
      Type: 'Pattern',
      PatternType: 1, // tiling
      PaintType: 2, // 1-colored, 2-uncolored
      TilingType: 2, // 2-no distortion
      BBox: this.bBox,
      XStep: this.xStep,
      YStep: this.yStep,
      Matrix: m.map((v) => +v.toFixed(5)),
      Resources: resources
    });
    pattern.end(this.stream);
    return pattern;
  }

  embedPatternColorSpaces() {
    // map each pattern to an underlying color space
    // and embed on each page
    underlyingColorSpaces.forEach((csName) => {
      const csId = this.getPatternColorSpaceId(csName);

      if (this.doc.page.colorSpaces[csId]) return;
      const cs = this.doc.ref(['Pattern', csName]);
      cs.end();
      this.doc.page.colorSpaces[csId] = cs;
    });
  }

  getPatternColorSpaceId(underlyingColorspace) {
    return `CsP${underlyingColorspace}`;
  }

  embed() {
    if (!this.id) {
      this.doc._patternCount = this.doc._patternCount + 1;
      this.id = 'P' + this.doc._patternCount;
      this.pattern = this.createPattern();
    }

    // patterns are embedded in each page
    if (!this.doc.page.patterns[this.id]) {
      this.doc.page.patterns[this.id] = this.pattern;
    }
  }

  apply(stroke, patternColor) {
    // do any embedding/creating that might be needed
    this.embedPatternColorSpaces();
    this.embed();

    const normalizedColor = this.doc._normalizeColor(patternColor);
    if (!normalizedColor)
      throw Error(`invalid pattern color. (value: ${patternColor})`);

    // select one of the pattern color spaces
    const csId = this.getPatternColorSpaceId(
      this.doc._getColorSpace(normalizedColor)
    );
    this.doc._setColorSpace(csId, stroke);

    // stroke/fill using the pattern and color (in the above underlying color space)
    const op = stroke ? 'SCN' : 'scn';
    return this.doc.addContent(
      `${normalizedColor.join(' ')} /${this.id} ${op}`
    );
  }
}

export default { PDFTilingPattern };
