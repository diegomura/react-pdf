const toHex = function(...codePoints) {
  const codes = Array.from(codePoints).map(code =>
    `0000${code.toString(16)}`.slice(-4)
  );

  return codes.join('');
};

const createEmbeddedFont = PDFFont =>
  class EmbeddedFont extends PDFFont {
    constructor(document, font, id) {
      super();

      this.document = document;
      this.font = font;
      this.id = id;
      this.subset = this.font.createSubset();
      this.unicode = [[0]];
      this.widths = [this.font.getGlyph(0).advanceWidth];

      this.name = this.font.postscriptName;
      this.scale = 1000 / this.font.unitsPerEm;
      this.ascender = this.font.ascent * this.scale;
      this.descender = this.font.descent * this.scale;
      this.xHeight = this.font.xHeight * this.scale;
      this.capHeight = this.font.capHeight * this.scale;
      this.lineGap = this.font.lineGap * this.scale;
      this.bbox = this.font.bbox;

      this.layoutCache = Object.create(null);
    }

    layoutRun(text, features) {
      const run = this.font.layout(text, features);

      // Normalize position values
      for (let i = 0; i < run.positions.length; i++) {
        const position = run.positions[i];
        for (let key in position) {
          position[key] *= this.scale;
        }

        position.advanceWidth = run.glyphs[i].advanceWidth * this.scale;
      }

      return run;
    }

    layoutCached(text) {
      let cached;
      if ((cached = this.layoutCache[text])) {
        return cached;
      }

      const run = this.layoutRun(text);
      this.layoutCache[text] = run;
      return run;
    }

    layout(text, features, onlyWidth) {
      // Skip the cache if any user defined features are applied
      if (onlyWidth == null) {
        onlyWidth = false;
      }
      if (features) {
        return this.layoutRun(text, features);
      }

      const glyphs = onlyWidth ? null : [];
      const positions = onlyWidth ? null : [];
      let advanceWidth = 0;

      // Split the string by words to increase cache efficiency.
      // For this purpose, spaces and tabs are a good enough delimeter.
      let last = 0;
      let index = 0;
      while (index <= text.length) {
        let needle;
        if (
          (index === text.length && last < index) ||
          ((needle = text.charAt(index)), [' ', '\t'].includes(needle))
        ) {
          const run = this.layoutCached(text.slice(last, ++index));
          if (!onlyWidth) {
            glyphs.push(...Array.from(run.glyphs || []));
            positions.push(...Array.from(run.positions || []));
          }

          advanceWidth += run.advanceWidth;
          last = index;
        } else {
          index++;
        }
      }

      return { glyphs, positions, advanceWidth };
    }

    encode(text, features) {
      const { glyphs, positions } = this.layout(text, features);

      const res = [];
      for (let i = 0; i < glyphs.length; i++) {
        const glyph = glyphs[i];
        const gid = this.subset.includeGlyph(glyph.id);
        res.push(`0000${gid.toString(16)}`.slice(-4));

        if (this.widths[gid] == null) {
          this.widths[gid] = glyph.advanceWidth * this.scale;
        }
        if (this.unicode[gid] == null) {
          this.unicode[gid] = glyph.codePoints;
        }
      }

      return [res, positions];
    }

    encodeGlyphs(glyphs) {
      const res = [];
      for (let i = 0; i < glyphs.length; i++) {
        const glyph = glyphs[i];
        const gid = this.subset.includeGlyph(glyph.id);
        res.push(`0000${gid.toString(16)}`.slice(-4));

        if (this.widths[gid] == null) {
          this.widths[gid] = glyph.advanceWidth * this.scale;
        }
        if (this.unicode[gid] == null) {
          this.unicode[gid] = glyph.codePoints;
        }
      }

      return res;
    }

    widthOfString(string, size, features) {
      const width = this.layout(string, features, true).advanceWidth;
      const scale = size / 1000;
      return width * scale;
    }

    embed() {
      const isCFF = this.subset.cff != null;
      const fontFile = this.document.ref();

      if (isCFF) {
        fontFile.data.Subtype = 'CIDFontType0C';
      }

      fontFile.end(this.subset.encode());

      const familyClass =
        ((this.font['OS/2'] != null
          ? this.font['OS/2'].sFamilyClass
          : undefined) || 0) >> 8;
      let flags = 0;
      if (this.font.post.isFixedPitch) {
        flags |= 1 << 0;
      }
      if (1 <= familyClass && familyClass <= 7) {
        flags |= 1 << 1;
      }
      flags |= 1 << 2; // assume the font uses non-latin characters
      if (familyClass === 10) {
        flags |= 1 << 3;
      }
      if (this.font.head.macStyle.italic) {
        flags |= 1 << 6;
      }

      // generate a random tag (6 uppercase letters. 65 is the char code for 'A')
      const tag = [0, 1, 2, 3, 4, 5]
        .map(() => String.fromCharCode(Math.random() * 26 + 65))
        .join('');
      const name = tag + '+' + this.font.postscriptName;

      const { bbox } = this.font;
      const descriptor = this.document.ref({
        Type: 'FontDescriptor',
        FontName: name,
        Flags: flags,
        FontBBox: [
          bbox.minX * this.scale,
          bbox.minY * this.scale,
          bbox.maxX * this.scale,
          bbox.maxY * this.scale
        ],
        ItalicAngle: this.font.italicAngle,
        Ascent: this.ascender,
        Descent: this.descender,
        CapHeight: (this.font.capHeight || this.font.ascent) * this.scale,
        XHeight: (this.font.xHeight || 0) * this.scale,
        StemV: 0
      }); // not sure how to calculate this

      if (isCFF) {
        descriptor.data.FontFile3 = fontFile;
      } else {
        descriptor.data.FontFile2 = fontFile;
      }

      descriptor.end();

      const descendantFontData = {
        Type: 'Font',
        Subtype: 'CIDFontType0',
        BaseFont: name,
        CIDSystemInfo: {
          Registry: new String('Adobe'),
          Ordering: new String('Identity'),
          Supplement: 0
        },
        FontDescriptor: descriptor,
        W: [0, this.widths]
      };

      if (!isCFF) {
        descendantFontData.Subtype = 'CIDFontType2';
        descendantFontData.CIDToGIDMap = 'Identity';
      }

      const descendantFont = this.document.ref(descendantFontData);

      descendantFont.end();

      this.dictionary.data = {
        Type: 'Font',
        Subtype: 'Type0',
        BaseFont: name,
        Encoding: 'Identity-H',
        DescendantFonts: [descendantFont],
        ToUnicode: this.toUnicodeCmap()
      };

      return this.dictionary.end();
    }

    // Maps the glyph ids encoded in the PDF back to unicode strings
    // Because of ligature substitutions and the like, there may be one or more
    // unicode characters represented by each glyph.
    toUnicodeCmap() {
      const cmap = this.document.ref();

      const entries = [];
      for (let codePoints of this.unicode) {
        const encoded = [];
        for (let value of codePoints) {
          if (value > 0xffff) {
            value -= 0x10000;
            encoded.push(toHex(((value >>> 10) & 0x3ff) | 0xd800));
            value = 0xdc00 | (value & 0x3ff);
          }

          encoded.push(toHex(value));
        }
        entries.push(`<${encoded.join(' ')}>`);
      }

      cmap.end(`\
  /CIDInit /ProcSet findresource begin
  12 dict begin
  begincmap
  /CIDSystemInfo <<
    /Registry (Adobe)
    /Ordering (UCS)
    /Supplement 0
  >> def
  /CMapName /Adobe-Identity-UCS def
  /CMapType 2 def
  1 begincodespacerange
  <0000><ffff>
  endcodespacerange
  1 beginbfrange
  <0000> <${toHex(entries.length - 1)}> [${entries.join(' ')}]
  endbfrange
  endcmap
  CMapName currentdict /CMap defineresource pop
  end
  end\
  `);

      return cmap;
    }
  };

export default createEmbeddedFont;
