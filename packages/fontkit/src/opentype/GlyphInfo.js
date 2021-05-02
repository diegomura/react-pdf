// TO-UPDATE

import unicode from '@react-pdf/unicode-properties';
import OTProcessor from './OTProcessor';

export default class GlyphInfo {
  constructor(font, id, codePoints = [], features, stringIndex) {
    this._font = font;
    this.codePoints = codePoints;
    this.stringIndex = stringIndex;
    this.id = id;

    this.features = {};
    if (Array.isArray(features)) {
      for (let i = 0; i < features.length; i++) {
        let feature = features[i];
        this.features[feature] = true;
      }
    } else if (typeof features === 'object') {
      Object.assign(this.features, features);
    }

    this.ligatureID = null;
    this.ligatureComponent = null;
    this.isLigated = false;
    this.cursiveAttachment = null;
    this.markAttachment = null;
    this.shaperInfo = null;
    this.substituted = false;
    this.isMultiplied = false;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
    this.substituted = true;

    let GDEF = this._font.GDEF;
    if (GDEF && GDEF.glyphClassDef) {
      // TODO: clean this up
      let classID = OTProcessor.prototype.getClassID(id, GDEF.glyphClassDef);
      this.isBase = classID === 1;
      this.isLigature = classID === 2;
      this.isMark = classID === 3;
      this.markAttachmentType = GDEF.markAttachClassDef
        ? OTProcessor.prototype.getClassID(id, GDEF.markAttachClassDef)
        : 0;
    } else {
      this.isMark =
        this.codePoints.length > 0 && this.codePoints.every(unicode.isMark);
      this.isBase = !this.isMark;
      this.isLigature = this.codePoints.length > 1;
      this.markAttachmentType = 0;
    }
  }

  get advanceWidth() {
    return this._font.getGlyph(this.id, this.codePoints).advanceWidth;
  }

  copy() {
    return new GlyphInfo(
      this._font,
      this.id,
      this.codePoints,
      this.features,
      this.stringIndex,
    );
  }
}
