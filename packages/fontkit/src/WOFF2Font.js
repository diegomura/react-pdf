import r from 'restructure';
import brotli from 'brotli/decompress';
import TTFFont from './TTFFont';
import TTFGlyph, { Point } from './glyph/TTFGlyph';
import WOFF2Glyph from './glyph/WOFF2Glyph';
import WOFF2Directory from './tables/WOFF2Directory';

/**
 * Subclass of TTFFont that represents a TTF/OTF font compressed by WOFF2
 * See spec here: http://www.w3.org/TR/WOFF2/
 */
export default class WOFF2Font extends TTFFont {
  static probe(buffer) {
    return buffer.toString('ascii', 0, 4) === 'wOF2';
  }

  _decodeDirectory() {
    this.directory = WOFF2Directory.decode(this.stream);
    this._dataPos = this.stream.pos;
  }

  _decompress() {
    // decompress data and setup table offsets if we haven't already
    if (!this._decompressed) {
      this.stream.pos = this._dataPos;
      let buffer = this.stream.readBuffer(this.directory.totalCompressedSize);

      let decompressedSize = 0;
      for (let tag in this.directory.tables) {
        let entry = this.directory.tables[tag];
        entry.offset = decompressedSize;
        decompressedSize += (entry.transformLength != null) ? entry.transformLength : entry.length;
      }

      let decompressed = brotli(buffer, decompressedSize);
      if (!decompressed) {
        throw new Error('Error decoding compressed data in WOFF2');
      }

      this.stream = new r.DecodeStream(new Buffer(decompressed));
      this._decompressed = true;
    }
  }

  _decodeTable(table) {
    this._decompress();
    return super._decodeTable(table);
  }

  // Override this method to get a glyph and return our
  // custom subclass if there is a glyf table.
  _getBaseGlyph(glyph, characters = []) {
    if (!this._glyphs[glyph]) {
      if (this.directory.tables.glyf && this.directory.tables.glyf.transformed) {
        if (!this._transformedGlyphs) { this._transformGlyfTable(); }
        return this._glyphs[glyph] = new WOFF2Glyph(glyph, characters, this);

      } else {
        return super._getBaseGlyph(glyph, characters);
      }
    }
  }

  _transformGlyfTable() {
    this._decompress();
    this.stream.pos = this.directory.tables.glyf.offset;
    let table = GlyfTable.decode(this.stream);
    let glyphs = [];

    for (let index = 0; index < table.numGlyphs; index++) {
      let glyph = {};
      let nContours = table.nContours.readInt16BE();
      glyph.numberOfContours = nContours;

      if (nContours > 0) { // simple glyph
        let nPoints = [];
        let totalPoints = 0;

        for (let i = 0; i < nContours; i++) {
          let r = read255UInt16(table.nPoints);
          totalPoints += r;
          nPoints.push(totalPoints);
        }

        glyph.points = decodeTriplet(table.flags, table.glyphs, totalPoints);
        for (let i = 0; i < nContours; i++) {
          glyph.points[nPoints[i] - 1].endContour = true;
        }

        var instructionSize = read255UInt16(table.glyphs);

      } else if (nContours < 0) { // composite glyph
        let haveInstructions = TTFGlyph.prototype._decodeComposite.call({ _font: this }, glyph, table.composites);
        if (haveInstructions) {
          var instructionSize = read255UInt16(table.glyphs);
        }
      }

      glyphs.push(glyph);
    }

    this._transformedGlyphs = glyphs;
  }
}

// Special class that accepts a length and returns a sub-stream for that data
class Substream {
  constructor(length) {
    this.length = length;
    this._buf = new r.Buffer(length);
  }

  decode(stream, parent) {
    return new r.DecodeStream(this._buf.decode(stream, parent));
  }
}

// This struct represents the entire glyf table
let GlyfTable = new r.Struct({
  version: r.uint32,
  numGlyphs: r.uint16,
  indexFormat: r.uint16,
  nContourStreamSize: r.uint32,
  nPointsStreamSize: r.uint32,
  flagStreamSize: r.uint32,
  glyphStreamSize: r.uint32,
  compositeStreamSize: r.uint32,
  bboxStreamSize: r.uint32,
  instructionStreamSize: r.uint32,
  nContours: new Substream('nContourStreamSize'),
  nPoints: new Substream('nPointsStreamSize'),
  flags: new Substream('flagStreamSize'),
  glyphs: new Substream('glyphStreamSize'),
  composites: new Substream('compositeStreamSize'),
  bboxes: new Substream('bboxStreamSize'),
  instructions: new Substream('instructionStreamSize')
});

const WORD_CODE = 253;
const ONE_MORE_BYTE_CODE2 = 254;
const ONE_MORE_BYTE_CODE1 = 255;
const LOWEST_U_CODE = 253;

function read255UInt16(stream) {
  let code = stream.readUInt8();

  if (code === WORD_CODE) {
    return stream.readUInt16BE();
  }

  if (code === ONE_MORE_BYTE_CODE1) {
    return stream.readUInt8() + LOWEST_U_CODE;
  }

  if (code === ONE_MORE_BYTE_CODE2) {
    return stream.readUInt8() + LOWEST_U_CODE * 2;
  }

  return code;
}

function withSign(flag, baseval) {
  return flag & 1 ? baseval : -baseval;
}

function decodeTriplet(flags, glyphs, nPoints) {
  let y;
  let x = y = 0;
  let res = [];

  for (let i = 0; i < nPoints; i++) {
    let dx = 0, dy = 0;
    let flag = flags.readUInt8();
    let onCurve = !(flag >> 7);
    flag &= 0x7f;

    if (flag < 10) {
      dx = 0;
      dy = withSign(flag, ((flag & 14) << 7) + glyphs.readUInt8());

    } else if (flag < 20) {
      dx = withSign(flag, (((flag - 10) & 14) << 7) + glyphs.readUInt8());
      dy = 0;

    } else if (flag < 84) {
      var b0 = flag - 20;
      var b1 = glyphs.readUInt8();
      dx = withSign(flag, 1 + (b0 & 0x30) + (b1 >> 4));
      dy = withSign(flag >> 1, 1 + ((b0 & 0x0c) << 2) + (b1 & 0x0f));

    } else if (flag < 120) {
      var b0 = flag - 84;
      dx = withSign(flag, 1 + ((b0 / 12) << 8) + glyphs.readUInt8());
      dy = withSign(flag >> 1, 1 + (((b0 % 12) >> 2) << 8) + glyphs.readUInt8());

    } else if (flag < 124) {
      var b1 = glyphs.readUInt8();
      let b2 = glyphs.readUInt8();
      dx = withSign(flag, (b1 << 4) + (b2 >> 4));
      dy = withSign(flag >> 1, ((b2 & 0x0f) << 8) + glyphs.readUInt8());

    } else {
      dx = withSign(flag, glyphs.readUInt16BE());
      dy = withSign(flag >> 1, glyphs.readUInt16BE());
    }

    x += dx;
    y += dy;
    res.push(new Point(onCurve, false, x, y));
  }

  return res;
}
