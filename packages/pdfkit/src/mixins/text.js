import PDFObject from '../object';

const { number } = PDFObject;

export default {
  initText() {
    this._line = this._line.bind(this);
    // Current coordinates
    this.x = 0;
    this.y = 0;
    return (this._lineGap = 0);
  },

  lineGap(_lineGap) {
    this._lineGap = _lineGap;
    return this;
  },

  _text(text, x, y, options, lineCallback) {
    options = this._initOptions(x, y, options);

    // Convert text to a string
    text = text == null ? '' : `${text}`;

    // if the wordSpacing option is specified, remove multiple consecutive spaces
    if (options.wordSpacing) {
      text = text.replace(/\s{2,}/g, ' ');
    }

    const addStructure = () => {
      if (options.structParent) {
        options.structParent.add(
          this.struct(options.structType || 'P', [
            this.markStructureContent(options.structType || 'P')
          ])
        );
      }
    };

    for (let line of text.split('\n')) {
      addStructure();
      lineCallback(line, options);
    }

    return this;
  },

  text(text, x, y, options) {
    return this._text(text, x, y, options, this._line);
  },

  widthOfString(string, options = {}) {
    return (
      this._font.widthOfString(string, this._fontSize, options.features) +
      (options.characterSpacing || 0) * (string.length - 1)
    );
  },

  _initOptions(x = {}, y, options = {}) {
    if (typeof x === 'object') {
      options = x;
      x = null;
    }

    // clone options object
    const result = Object.assign({}, options);

    // extend options with previous values for continued text
    if (this._textOptions) {
      for (let key in this._textOptions) {
        const val = this._textOptions[key];
        if (key !== 'continued') {
          if (result[key] === undefined) {
            result[key] = val;
          }
        }
      }
    }

    // Update the current position
    if (x != null) {
      this.x = x;
    }
    if (y != null) {
      this.y = y;
    }

    // wrap to margins if no x or y position passed
    if (result.lineBreak !== false) {
      if (result.width == null) {
        result.width = this.page.width - this.x - this.page.margins.right;
      }
      result.width = Math.max(result.width, 0);
    }

    if (!result.columns) {
      result.columns = 0;
    }
    if (result.columnGap == null) {
      result.columnGap = 18;
    } // 1/4 inch

    return result;
  },

  _line(text, options = {}) {
    this._fragment(text, this.x, this.y, options);

    return (this.x += this.widthOfString(text));
  },

  _fragment(text, x, y, options) {
    text = `${text}`.replace(/\n/g, '');

    if (text.length === 0) return;

    const [encoded, positions] = this._font.encode(text, options.features);

    this._glyphs(encoded, positions, x, y, options);
  },

  _glyphs(encoded, positions, x, y, options) {
    const commands = [];
    const scale = this._fontSize / 1000;

    let i;
    let last = 0;
    let hadOffset = false;

    this.save();

    // flip coordinate system
    this.transform(1, 0, 0, -1, 0, this.page.height);
    y = this.page.height - y;

    // add current font to page if necessary
    if (this.page.fonts[this._font.id] == null) {
      this.page.fonts[this._font.id] = this._font.ref();
    }

    // begin the text object
    this.addContent('BT');

    // text position
    this.addContent(`1 0 0 1 ${number(x)} ${number(y)} Tm`);

    // font and font size
    this.addContent(`/${this._font.id} ${number(this._fontSize)} Tf`);

    // rendering mode
    const mode = options.fill && options.stroke ? 2 : options.stroke ? 1 : 0;
    if (mode) {
      this.addContent(`${mode} Tr`);
    }

    // Adds a segment of text to the TJ command buffer
    const addSegment = cur => {
      if (last < cur) {
        const hex = encoded.slice(last, cur).join('');
        const advance =
          positions[cur - 1].xAdvance - positions[cur - 1].advanceWidth;
        commands.push(`<${hex}> ${number(-advance)}`);
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
          `1 0 0 1 ${number(x + pos.xOffset * scale)} ${number(
            y + pos.yOffset * scale
          )} Tm`
        );
        flush(i + 1);

        hadOffset = true;
      } else {
        // If the last character had an offset, reset the text position
        if (hadOffset) {
          this.addContent(`1 0 0 1 ${number(x)} ${number(y)} Tm`);
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
  }
};
