import LineWrapper from '../line_wrapper';
import PDFObject from '../object';
import { cosine, sine } from '../utils';

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

  moveDown(lines) {
    if (lines == null) {
      lines = 1;
    }
    this.y += this.currentLineHeight(true) * lines + this._lineGap;
    return this;
  },

  moveUp(lines) {
    if (lines == null) {
      lines = 1;
    }
    this.y -= this.currentLineHeight(true) * lines + this._lineGap;
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
    const horizontalScaling = options.horizontalScaling || 100;
    return (
      ((this._font.widthOfString(string, this._fontSize, options.features) +
        (options.characterSpacing || 0) * (string.length - 1)) *
        horizontalScaling) /
      100
    );
  },

  /**
   * Compute the bounding box of a string
   * based on what will actually be rendered by `doc.text()`
   *
   * @param string - The string
   * @param x - X position of text (defaults to this.x)
   * @param y - Y position of text (defaults to this.y)
   * @param options - Any text options (The same you would apply to `doc.text()`)
   * @returns {{x: number, y: number, width: number, height: number}}
   */
  boundsOfString(string, x, y, options) {
    options = this._initOptions(x, y, options);
    ({ x, y } = this);
    const lineGap = options.lineGap ?? this._lineGap ?? 0;
    const lineHeight = this.currentLineHeight(true) + lineGap;
    let contentWidth = 0;
    // Convert text to a string
    string = String(string ?? '');

    // if the wordSpacing option is specified, remove multiple consecutive spaces
    if (options.wordSpacing) {
      string = string.replace(/\s{2,}/g, ' ');
    }

    // word wrapping
    if (options.width) {
      let wrapper = new LineWrapper(this, options);
      wrapper.on('line', (text, options) => {
        this.y += lineHeight;
        text = text.replace(/\n/g, '');

        if (text.length) {
          // handle options
          let wordSpacing = options.wordSpacing ?? 0;
          const characterSpacing = options.characterSpacing ?? 0;

          // justify alignments
          if (options.width && options.align === 'justify') {
            // calculate the word spacing value
            const words = text.trim().split(/\s+/);
            const textWidth = this.widthOfString(
              text.replace(/\s+/g, ''),
              options
            );
            const spaceWidth = this.widthOfString(' ') + characterSpacing;
            wordSpacing = Math.max(
              0,
              (options.lineWidth - textWidth) / Math.max(1, words.length - 1) -
                spaceWidth
            );
          }

          // calculate the actual rendered width of the string after word and character spacing
          contentWidth = Math.max(
            contentWidth,
            options.textWidth +
              wordSpacing * (options.wordCount - 1) +
              characterSpacing * (text.length - 1)
          );
        }
      });
      wrapper.wrap(string, options);
    } else {
      // render paragraphs as single lines
      for (let line of string.split('\n')) {
        const lineWidth = this.widthOfString(line, options);
        this.y += lineHeight;
        contentWidth = Math.max(contentWidth, lineWidth);
      }
    }

    let contentHeight = this.y - y;
    // Clamp height to max height
    if (options.height) contentHeight = Math.min(contentHeight, options.height);

    this.x = x;
    this.y = y;

    /**
     * Rotates around top left corner
     * [x1,y1]  >  [x2,y2]
     *    ⌃           ⌄
     * [x4,y4]  <  [x3,y3]
     */
    if (options.rotation === 0) {
      // No rotation so we can use the existing values
      return { x, y, width: contentWidth, height: contentHeight };
      // Use fast computation without explicit trig
    } else if (options.rotation === 90) {
      return {
        x: x,
        y: y - contentWidth,
        width: contentHeight,
        height: contentWidth
      };
    } else if (options.rotation === 180) {
      return {
        x: x - contentWidth,
        y: y - contentHeight,
        width: contentWidth,
        height: contentHeight
      };
    } else if (options.rotation === 270) {
      return {
        x: x - contentHeight,
        y: y,
        width: contentHeight,
        height: contentWidth
      };
    }

    // Non-trivial values so time for trig
    const cos = cosine(options.rotation);
    const sin = sine(options.rotation);

    const x1 = x;
    const y1 = y;
    const x2 = x + contentWidth * cos;
    const y2 = y - contentWidth * sin;
    const x3 = x + contentWidth * cos + contentHeight * sin;
    const y3 = y - contentWidth * sin + contentHeight * cos;
    const x4 = x + contentHeight * sin;
    const y4 = y + contentHeight * cos;

    const xMin = Math.min(x1, x2, x3, x4);
    const xMax = Math.max(x1, x2, x3, x4);
    const yMin = Math.min(y1, y2, y3, y4);
    const yMax = Math.max(y1, y2, y3, y4);

    return { x: xMin, y: yMin, width: xMax - xMin, height: yMax - yMin };
  },

  heightOfString(text, options) {
    const { x, y } = this;

    options = this._initOptions(options);
    options.height = Infinity; // don't break pages

    const lineGap = options.lineGap || this._lineGap || 0;
    this._text(text, this.x, this.y, options, () => {
      return (this.y += this.currentLineHeight(true) + lineGap);
    });

    const height = this.y - y;
    this.x = x;
    this.y = y;

    return height;
  },

  list(list, x, y, options, wrapper) {
    options = this._initOptions(x, y, options);

    const listType = options.listType || 'bullet';
    const unit = Math.round((this._font.ascender / 1000) * this._fontSize);
    const midLine = unit / 2;
    const r = options.bulletRadius || unit / 3;
    const indent =
      options.textIndent || (listType === 'bullet' ? r * 5 : unit * 2);
    const itemIndent =
      options.bulletIndent || (listType === 'bullet' ? r * 8 : unit * 2);

    let level = 1;
    const items = [];
    const levels = [];
    const numbers = [];

    var flatten = function (list) {
      let n = 1;
      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        if (Array.isArray(item)) {
          level++;
          flatten(item);
          level--;
        } else {
          items.push(item);
          levels.push(level);
          if (listType !== 'bullet') {
            numbers.push(n++);
          }
        }
      }
    };

    flatten(list);

    const label = function (n) {
      switch (listType) {
        case 'numbered':
          return `${n}.`;
        case 'lettered':
          var letter = String.fromCharCode(((n - 1) % 26) + 65);
          var times = Math.floor((n - 1) / 26 + 1);
          var text = Array(times + 1).join(letter);
          return `${text}.`;
      }
    };

    const drawListItem = function (listItem, i) {
      wrapper = new LineWrapper(this, options);
      wrapper.on('line', this._line);

      level = 1;
      wrapper.once('firstLine', () => {
        let item, itemType, labelType, bodyType;
        if (options.structParent) {
          if (options.structTypes) {
            [itemType, labelType, bodyType] = options.structTypes;
          } else {
            [itemType, labelType, bodyType] = ['LI', 'Lbl', 'LBody'];
          }
        }

        if (itemType) {
          item = this.struct(itemType);
          options.structParent.add(item);
        } else if (options.structParent) {
          item = options.structParent;
        }

        let l;
        if ((l = levels[i++]) !== level) {
          const diff = itemIndent * (l - level);
          this.x += diff;
          wrapper.lineWidth -= diff;
          level = l;
        }

        if (item && (labelType || bodyType)) {
          item.add(
            this.struct(labelType || bodyType, [
              this.markStructureContent(labelType || bodyType)
            ])
          );
        }
        switch (listType) {
          case 'bullet':
            this.circle(this.x - indent + r, this.y + midLine, r);
            this.fill();
            break;
          case 'numbered':
          case 'lettered':
            var text = label(numbers[i - 1]);
            this._fragment(text, this.x - indent, this.y, options);
            break;
        }

        if (item && labelType && bodyType) {
          item.add(
            this.struct(bodyType, [this.markStructureContent(bodyType)])
          );
        }
        if (item && item !== options.structParent) {
          item.end();
        }
      });

      wrapper.on('sectionStart', () => {
        const pos = indent + itemIndent * (level - 1);
        this.x += pos;
        return (wrapper.lineWidth -= pos);
      });

      wrapper.on('sectionEnd', () => {
        const pos = indent + itemIndent * (level - 1);
        this.x -= pos;
        return (wrapper.lineWidth += pos);
      });

      wrapper.wrap(listItem, options);
    };

    for (let i = 0; i < items.length; i++) {
      drawListItem.call(this, items[i], i);
    }

    return this;
  },

  _initOptions(x = {}, y, options = {}) {
    if (typeof x === 'object') {
      options = x;
      x = null;
    }

    // shallow clone options object
    /**
     * @type {Object}
     */
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

    const dy = (this._font.ascender / 1000) * this._fontSize;

    this._glyphs(encoded, positions, x, y + dy, options);
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
    const addSegment = (cur) => {
      if (last < cur) {
        const hex = encoded.slice(last, cur).join('');
        const advance =
          positions[cur - 1].xAdvance - positions[cur - 1].advanceWidth;
        commands.push(`<${hex}> ${number(-advance)}`);
      }

      return (last = cur);
    };

    // Flushes the current TJ commands to the output stream
    const flush = (i) => {
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
