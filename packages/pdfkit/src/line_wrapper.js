import { EventEmitter } from 'events';
import LineBreaker from 'linebreak';
import { PDFNumber } from './utils';

const SOFT_HYPHEN = '\u00AD';
const HYPHEN = '-';

class LineWrapper extends EventEmitter {
  constructor(document, options) {
    super();
    this.document = document;
    this.horizontalScaling = options.horizontalScaling || 100;
    this.indent = ((options.indent || 0) * this.horizontalScaling) / 100;
    this.indentAllLines = options.indentAllLines || false;
    this.characterSpacing =
      ((options.characterSpacing || 0) * this.horizontalScaling) / 100;
    this.wordSpacing =
      ((options.wordSpacing === 0) * this.horizontalScaling) / 100;
    this.columns = options.columns || 1;
    this.columnGap =
      ((options.columnGap != null ? options.columnGap : 18) *
        this.horizontalScaling) /
      100; // 1/4 inch
    this.lineWidth =
      ((options.width * this.horizontalScaling) / 100 -
        this.columnGap * (this.columns - 1)) /
      this.columns;
    this.spaceLeft = this.lineWidth;
    this.startX = this.document.x;
    this.startY = this.document.y;
    this.column = 1;
    this.ellipsis = options.ellipsis;
    this.continuedX = 0;
    this.features = options.features;

    // calculate the maximum Y position the text can appear at
    if (options.height != null) {
      this.height = options.height;
      this.maxY = PDFNumber(this.startY + options.height);
    } else {
      this.maxY = PDFNumber(this.document.page.maxY());
    }

    // handle paragraph indents
    this.on('firstLine', (options) => {
      // if this is the first line of the text segment, and
      // we're continuing where we left off, indent that much
      // otherwise use the user specified indent option
      const indent = this.continuedX || this.indent;
      this.document.x += indent;
      this.lineWidth -= indent;

      // if indentAllLines is set to true
      // we're not resetting the indentation for this paragraph after the first line
      if (options.indentAllLines) {
        return;
      }

      // otherwise we start the next line without indent
      this.once('line', () => {
        this.document.x -= indent;
        this.lineWidth += indent;
        if (options.continued && !this.continuedX) {
          this.continuedX = this.indent;
        }
        if (!options.continued) {
          this.continuedX = 0;
        }
      });
    });

    // handle left aligning last lines of paragraphs
    this.on('lastLine', (options) => {
      const { align } = options;
      if (align === 'justify') {
        options.align = 'left';
      }
      this.lastLine = true;

      this.once('line', () => {
        this.document.y += options.paragraphGap || 0;
        options.align = align;
        return (this.lastLine = false);
      });
    });
  }

  wordWidth(word) {
    return PDFNumber(
      this.document.widthOfString(word, this) +
        this.characterSpacing +
        this.wordSpacing,
    );
  }

  canFit(word, w) {
    if (word[word.length - 1] != SOFT_HYPHEN) {
      return w <= this.spaceLeft;
    }
    return w + this.wordWidth(HYPHEN) <= this.spaceLeft;
  }

  eachWord(text, fn) {
    // setup a unicode line breaker
    let bk;
    const breaker = new LineBreaker(text);
    let last = null;
    const wordWidths = Object.create(null);

    while ((bk = breaker.nextBreak())) {
      var shouldContinue;
      let word = text.slice(
        (last != null ? last.position : undefined) || 0,
        bk.position,
      );
      let w =
        wordWidths[word] != null
          ? wordWidths[word]
          : (wordWidths[word] = this.wordWidth(word));

      // if the word is longer than the whole line, chop it up
      // TODO: break by grapheme clusters, not JS string characters
      if (w > this.lineWidth + this.continuedX) {
        // make some fake break objects
        let lbk = last;
        const fbk = {};

        while (word.length) {
          // fit as much of the word as possible into the space we have
          var l, mightGrow;
          if (w > this.spaceLeft) {
            // start our check at the end of our available space - this method is faster than a loop of each character and it resolves
            // an issue with long loops when processing massive words, such as a huge number of spaces
            l = Math.ceil(this.spaceLeft / (w / word.length));
            w = this.wordWidth(word.slice(0, l));
            mightGrow = w <= this.spaceLeft && l < word.length;
          } else {
            l = word.length;
          }
          let mustShrink = w > this.spaceLeft && l > 0;
          // shrink or grow word as necessary after our near-guess above
          while (mustShrink || mightGrow) {
            if (mustShrink) {
              w = this.wordWidth(word.slice(0, --l));
              mustShrink = w > this.spaceLeft && l > 0;
            } else {
              w = this.wordWidth(word.slice(0, ++l));
              mustShrink = w > this.spaceLeft && l > 0;
              mightGrow = w <= this.spaceLeft && l < word.length;
            }
          }

          // check for the edge case where a single character cannot fit into a line.
          if (l === 0 && this.spaceLeft === this.lineWidth) {
            l = 1;
          }

          // send a required break unless this is the last piece and a linebreak is not specified
          fbk.required = bk.required || l < word.length;
          shouldContinue = fn(word.slice(0, l), w, fbk, lbk);
          lbk = { required: false };

          // get the remaining piece of the word
          word = word.slice(l);
          w = this.wordWidth(word);

          if (shouldContinue === false) {
            break;
          }
        }
      } else {
        // otherwise just emit the break as it was given to us
        shouldContinue = fn(word, w, bk, last);
      }

      if (shouldContinue === false) {
        break;
      }
      last = bk;
    }
  }

  wrap(text, options) {
    // override options from previous continued fragments
    this.horizontalScaling = options.horizontalScaling || 100;
    if (options.indent != null) {
      this.indent = (options.indent * this.horizontalScaling) / 100;
    }
    if (options.characterSpacing != null) {
      this.characterSpacing =
        (options.characterSpacing * this.horizontalScaling) / 100;
    }
    if (options.wordSpacing != null) {
      this.wordSpacing = (options.wordSpacing * this.horizontalScaling) / 100;
    }
    if (options.ellipsis != null) {
      this.ellipsis = options.ellipsis;
    }

    // make sure we're actually on the page
    // and that the first line of is never by
    // itself at the bottom of a page (orphans)
    const nextY = this.document.y + this.document.currentLineHeight(true);
    if (this.document.y > this.maxY || nextY > this.maxY) {
      this.nextSection();
    }

    let buffer = '';
    let textWidth = 0;
    let wc = 0;
    let lc = 0;

    let { y } = this.document; // used to reset Y pos if options.continued (below)
    const emitLine = () => {
      options.textWidth = textWidth + this.wordSpacing * (wc - 1);
      options.wordCount = wc;
      options.lineWidth = this.lineWidth;
      ({ y } = this.document);
      this.emit('line', buffer, options, this);
      return lc++;
    };

    this.emit('sectionStart', options, this);

    this.eachWord(text, (word, w, bk, last) => {
      if (last == null || last.required) {
        this.emit('firstLine', options, this);
        this.spaceLeft = this.lineWidth;
      }

      if (this.canFit(word, w)) {
        buffer += word;
        textWidth += w;
        wc++;
      }

      if (bk.required || !this.canFit(word, w)) {
        // if the user specified a max height and an ellipsis, and is about to pass the
        // max height and max columns after the next line, append the ellipsis
        const lh = this.document.currentLineHeight(true);
        if (
          this.height != null &&
          this.ellipsis &&
          PDFNumber(this.document.y + lh * 2) > this.maxY &&
          this.column >= this.columns
        ) {
          if (this.ellipsis === true) {
            this.ellipsis = '…';
          } // map default ellipsis character
          buffer = buffer.replace(/\s+$/, '');
          textWidth = this.wordWidth(buffer + this.ellipsis);

          // remove characters from the buffer until the ellipsis fits
          // to avoid infinite loop need to stop while-loop if buffer is empty string
          while (buffer && textWidth > this.lineWidth) {
            buffer = buffer.slice(0, -1).replace(/\s+$/, '');
            textWidth = this.wordWidth(buffer + this.ellipsis);
          }
          // need to add ellipsis only if there is enough space for it
          if (textWidth <= this.lineWidth) {
            buffer = buffer + this.ellipsis;
          }

          textWidth = this.wordWidth(buffer);
        }

        if (bk.required) {
          if (w > this.spaceLeft) {
            emitLine();
            buffer = word;
            textWidth = w;
            wc = 1;
          }

          this.emit('lastLine', options, this);
        }

        // Previous entry is a soft hyphen - add visible hyphen.
        if (buffer[buffer.length - 1] == SOFT_HYPHEN) {
          buffer = buffer.slice(0, -1) + HYPHEN;
          this.spaceLeft -= this.wordWidth(HYPHEN);
        }

        emitLine();

        // if we've reached the edge of the page,
        // continue on a new page or column
        if (PDFNumber(this.document.y + lh) > this.maxY) {
          this.emit('sectionEnd', options, this);
          const shouldContinue = this.nextSection();

          // stop if we reached the maximum height
          if (!shouldContinue) {
            wc = 0;
            buffer = '';
            return false;
          }
          this.emit('sectionStart', options, this);
        }

        // reset the space left and buffer
        if (bk.required) {
          this.spaceLeft = this.lineWidth;
          buffer = '';
          textWidth = 0;
          return (wc = 0);
        } else {
          // reset the space left and buffer
          this.spaceLeft = this.lineWidth - w;
          buffer = word;
          textWidth = w;
          return (wc = 1);
        }
      } else {
        return (this.spaceLeft -= w);
      }
    });

    if (wc > 0) {
      this.emit('lastLine', options, this);
      emitLine();
    }

    this.emit('sectionEnd', options, this);

    // if the wrap is set to be continued, save the X position
    // to start the first line of the next segment at, and reset
    // the y position
    if (options.continued === true) {
      if (lc > 1) {
        this.continuedX = 0;
      }
      this.continuedX += options.textWidth || 0;
      this.document.y = y;
    } else {
      this.document.x = this.startX;
    }
  }

  nextSection(options) {
    if (++this.column > this.columns) {
      // if a max height was specified by the user, we're done.
      // otherwise, the default is to make a new page at the bottom.
      if (this.height != null) {
        return false;
      }

      this.document.continueOnNewPage();
      this.column = 1;
      this.startY = this.document.page.margins.top;
      this.maxY = this.document.page.maxY();
      if (this.indentAllLines) {
        const indent = this.continuedX || this.indent;
        this.document.x += indent;
        this.lineWidth -= indent;
      } else {
        this.document.x = this.startX;
      }
      if (this.document._fillColor) {
        this.document.fillColor(...this.document._fillColor);
      }
      this.emit('pageBreak', options, this);
    } else {
      this.document.x += this.lineWidth + this.columnGap;
      this.document.y = this.startY;
      this.emit('columnBreak', options, this);
    }

    return true;
  }
}

export default LineWrapper;
