import cloneDeep from 'clone';
import Subset from './Subset';
import Directory from '../tables/directory';
import Tables from '../tables';
import TTFGlyphEncoder from '../glyph/TTFGlyphEncoder';

export default class TTFSubset extends Subset {
  constructor(font) {
    super(font);
    this.glyphEncoder = new TTFGlyphEncoder;
  }
  
  _addGlyph(gid) {
    let glyph = this.font.getGlyph(gid);
    let glyf = glyph._decode();

    // get the offset to the glyph from the loca table
    let curOffset = this.font.loca.offsets[gid];
    let nextOffset = this.font.loca.offsets[gid + 1];

    let stream = this.font._getTableStream('glyf');
    stream.pos += curOffset;

    let buffer = stream.readBuffer(nextOffset - curOffset);

    // if it is a compound glyph, include its components
    if (glyf && glyf.numberOfContours < 0) {
      buffer = new Buffer(buffer);
      for (let component of glyf.components) {
        gid = this.includeGlyph(component.glyphID);
        buffer.writeUInt16BE(gid, component.pos);
      }
    } else if (glyf && this.font._variationProcessor) {
      // If this is a TrueType variation glyph, re-encode the path
      buffer = this.glyphEncoder.encodeSimple(glyph.path, glyf.instructions);
    }

    this.glyf.push(buffer);
    this.loca.offsets.push(this.offset);
    
    this.hmtx.metrics.push({
      advance: glyph.advanceWidth,
      bearing: glyph._getMetrics().leftBearing
    });

    this.offset += buffer.length;
    return this.glyf.length - 1;
  }

  encode(stream) {
    // tables required by PDF spec:
    //   head, hhea, loca, maxp, cvt , prep, glyf, hmtx, fpgm
    //
    // additional tables required for standalone fonts:
    //   name, cmap, OS/2, post

    this.glyf = [];
    this.offset = 0;
    this.loca = {
      offsets: [],
      version: this.font.loca.version
    };

    this.hmtx = {
      metrics: [],
      bearings: []
    };

    // include all the glyphs
    // not using a for loop because we need to support adding more
    // glyphs to the array as we go, and CoffeeScript caches the length.
    let i = 0;
    while (i < this.glyphs.length) {
      this._addGlyph(this.glyphs[i++]);
    }

    let maxp = cloneDeep(this.font.maxp);
    maxp.numGlyphs = this.glyf.length;

    this.loca.offsets.push(this.offset);

    let head = cloneDeep(this.font.head);
    head.indexToLocFormat = this.loca.version;

    let hhea = cloneDeep(this.font.hhea);
    hhea.numberOfMetrics = this.hmtx.metrics.length;

    // map = []
    // for index in [0...256]
    //     if index < @numGlyphs
    //         map[index] = index
    //     else
    //         map[index] = 0
    //
    // cmapTable =
    //     version: 0
    //     length: 262
    //     language: 0
    //     codeMap: map
    //
    // cmap =
    //     version: 0
    //     numSubtables: 1
    //     tables: [
    //         platformID: 1
    //         encodingID: 0
    //         table: cmapTable
    //     ]

    // TODO: subset prep, cvt, fpgm?
    Directory.encode(stream, {
      tables: {
        head,
        hhea,
        loca: this.loca,
        maxp,
        'cvt ': this.font['cvt '],
        prep: this.font.prep,
        glyf: this.glyf,
        hmtx: this.hmtx,
        fpgm: this.font.fpgm

        // name: clone @font.name
        // 'OS/2': clone @font['OS/2']
        // post: clone @font.post
        // cmap: cmap
      }
    });
  }
}
