import PDFObject from '../object';

export default {
  initText() {
    // Current coordinates
    this.x = 0;
    this.y = 0;
    return (this._lineGap = 0);
  },

  text(text, x, y, options) {
    options = this._initOptions(x, y, options);

    // if the wordSpacing option is specified, remove multiple consecutive spaces
    if (options.wordSpacing) {
      text = text.replace(/\s{2,}/g, ' ');
    }

    // render paragraphs as single lines
    const lines = text.split('\n');

    for (var i = 0; i < lines.length; i++) {
      this._line(lines[i], options);
    }

    return this;
  },

  _initOptions(x = {}, y, options = {}) {
    if (typeof x === 'object') {
      options = x;
      x = null;
    }

    // Update the current position
    if (x) this.x = x;
    if (y) this.y = y;

    options.columns = options.columns || 0;
    options.columnGap = options.columnGap || 18; // 1/4 inch

    return options;
  },

  _line(text, options = {}, wrapper) {
    this._fragment(text, this.x, this.y, options);
  },

  _fragment(text, x, y, options) {
    text = ('' + text).replace(/\n/g, '');

    if (text.length === 0) return;

    // add current font to page if necessary
    if (this.page.fonts[this._font.id] == null) {
      this.page.fonts[this._font.id] = this._font.ref();
    }

    // Glyph encoding and positioning
    const [encoded, positions] = this._font.encode(text, options.features);

    // Pass down spacings to _glyphs method
    options.wordSpacing = options.wordSpacing || 0;
    options.characterSpacing = options.characterSpacing || 0;

    // Adjust y to match coordinate flipping
    y = this.page.height - y - (this._font.ascender / 1000) * this._fontSize;

    this._glyphs(encoded, positions, x, y, options);
  },

  _addGlyphs(glyphs, positions, x, y, options) {
    // add current font to page if necessary
    if (options == null) {
      options = {};
    }
    if (this.page.fonts[this._font.id] == null) {
      this.page.fonts[this._font.id] = this._font.ref();
    }

    // Adjust y to match coordinate flipping
    y = this.page.height - y;

    const scale = 1000 / this._fontSize;
    const unitsPerEm = this._font.font.unitsPerEm || 1000;
    const advanceWidthScale = 1000 / unitsPerEm;

    // Glyph encoding and positioning
    const encodedGlyphs = this._font.encodeGlyphs(glyphs);
    const encodedPositions = positions.map((pos, i) => ({
      xAdvance: pos.xAdvance * scale,
      yAdvance: pos.yAdvance * scale,
      xOffset: pos.xOffset,
      yOffset: pos.yOffset,
      advanceWidth: glyphs[i].advanceWidth * advanceWidthScale,
    }));

    return this._glyphs(encodedGlyphs, encodedPositions, x, y, options);
  },

  _glyphs(encoded, positions, x, y, options) {
    // flip coordinate system
    let i;
    this.save();
    this.transform(1, 0, 0, -1, 0, this.page.height);

    // begin the text object
    this.addContent('BT');

    // text position
    this.addContent(`1 0 0 1 ${PDFObject.number(x)} ${PDFObject.number(y)} Tm`);

    // font and font size
    this.addContent(`/${this._font.id} ${PDFObject.number(this._fontSize)} Tf`);

    // rendering mode
    const mode = options.fill && options.stroke ? 2 : options.stroke ? 1 : 0;
    if (mode) {
      this.addContent(`${mode} Tr`);
    }

    // Character spacing
    if (options.characterSpacing) {
      this.addContent(`${PDFObject.number(options.characterSpacing)} Tc`);
    }

    const scale = this._fontSize / 1000;
    const commands = [];
    let last = 0;
    let hadOffset = false;

    // Adds a segment of text to the TJ command buffer
    const addSegment = cur => {
      if (last < cur) {
        const hex = encoded.slice(last, cur).join('');
        const advance =
          positions[cur - 1].xAdvance - positions[cur - 1].advanceWidth;
        commands.push(`<${hex}> ${PDFObject.number(-advance)}`);
      }

      return (last = cur);
    };

    // Flushes the current TJ commands to the output stream
    const flush = i => {
      addSegment(i);

      if (commands.length > 0) {
        this.addContent(`[${commands.join(' ')}] TJ`);
        return (commands.length = 0);
      }
    };

    for (i = 0; i < positions.length; i++) {
      // If we have an x or y offset, we have to break out of the current TJ command
      // so we can move the text position.
      const pos = positions[i];
      if (pos.xOffset || pos.yOffset) {
        // Flush the current buffer
        flush(i);

        // Move the text position and flush just the current character
        this.addContent(
          `1 0 0 1 ${PDFObject.number(
            x + pos.xOffset * scale,
          )} ${PDFObject.number(y + pos.yOffset * scale)} Tm`,
        );
        flush(i + 1);

        hadOffset = true;
      } else {
        // If the last character had an offset, reset the text position
        if (hadOffset) {
          this.addContent(
            `1 0 0 1 ${PDFObject.number(x)} ${PDFObject.number(y)} Tm`,
          );
          hadOffset = false;
        }

        // Group segments that don't have any advance adjustments
        if (pos.xAdvance - pos.advanceWidth !== 0) {
          addSegment(i + 1);
        }
      }

      x += pos.xAdvance * scale;
    }

    // Flush any remaining commands
    flush(i);

    // end the text object
    this.addContent('ET');

    // restore flipped coordinate system
    return this.restore();
  },
};
