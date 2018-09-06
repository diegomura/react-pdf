import warning from 'fbjs/lib/warning';
import createPDFRenderer from '@textkit/pdf-renderer';
import upperFirst from 'lodash.upperfirst';
import { embedEmojis } from '../utils/emoji';
import { ignoreChars } from '../utils/ignorableChars';
import Font from '../font';
import {
  Rect,
  Path,
  LayoutEngine,
  AttributedString,
  Container,
} from '../layout';

// Global layout engine
// It's created dynamically because it may accept a custom hyphenation callback
let LAYOUT_ENGINE;
const INFINITY = 99999;

// TODO: Import and pass Textkit as a whole
const PDFRenderer = createPDFRenderer({ Rect });

class TextEngine {
  constructor(element) {
    this.element = element;
    this._container = null;
    this.start = 0;
    this.end = 0;
    this.computed = false;
    this.preprocessors = [ignoreChars, embedEmojis];
  }

  get container() {
    const lines = this._container.blocks.reduce(
      (acc, block) => [...acc, ...block.lines],
      [],
    );

    return {
      ...this._container,
      blocks: [{ lines: lines.splice(this.start, this.end) }],
    };
  }

  get layoutEngine() {
    if (!LAYOUT_ENGINE) {
      LAYOUT_ENGINE = new LayoutEngine({
        hyphenationCallback: Font.getHyphenationCallback(),
      });
    }

    return LAYOUT_ENGINE;
  }

  get lines() {
    if (!this.container) {
      return [];
    }

    return this.container.blocks.reduce(
      (acc, block) => [...acc, ...block.lines],
      [],
    );
  }

  get height() {
    if (!this._container) {
      return -1;
    }

    return this.lines.reduce((acc, line) => acc + line.height, 0);
  }

  get width() {
    if (!this._container) {
      return -1;
    }

    return Math.max(...this.lines.map(line => line.advanceWidth));
  }

  get attributedString() {
    let fragments = [];
    const {
      color = 'black',
      fontFamily = 'Helvetica',
      fontSize = 18,
      textAlign = 'left',
      position,
      top,
      bottom,
      align,
      lineHeight,
      textDecoration,
      textDecorationColor,
      textDecorationStyle,
      textTransform,
    } = this.element.getComputedStyles();

    warning(
      !align,
      '"align" style prop will be deprecated on future versions. Please use "textAlign" instead in Text node',
    );

    this.element.children.forEach(child => {
      if (child.value) {
        const obj = Font.getFont(fontFamily);
        const font = obj ? obj.data : fontFamily;
        const string = this.transformText(child.value, textTransform);

        fragments.push({
          string,
          attributes: {
            font,
            color,
            fontSize,
            align: textAlign,
            link: this.element.src,
            underlineStyle: textDecorationStyle,
            underline: textDecoration === 'underline',
            underlineColor: textDecorationColor || color,
            lineHeight: lineHeight ? lineHeight * fontSize : null,
            yOffset: position === 'relative' ? -top || bottom || 0 : null,
          },
        });
      } else {
        if (child.engine) {
          fragments.push(...child.engine.attributedString);
        }
      }
    });

    for (const preprocessor of this.preprocessors) {
      fragments = preprocessor(fragments);
    }

    return fragments;
  }

  lineIndexAtHeight(height) {
    let counter = 0;
    for (let i = 0; i < this.lines.length; i++) {
      const line = this.lines[i];

      if (counter + line.height > height) {
        return i;
      }

      counter += line.height;
    }

    return this.lines.length;
  }

  heightAtLineIndex(index) {
    let counter = 0;

    for (let i = 0; i <= index; i++) {
      const line = this.lines[i];
      counter += line.height;
    }

    return counter;
  }

  splice(height) {
    const result = this.clone();
    const index = this.lineIndexAtHeight(height);

    result.start = index;
    result.end = this.end;
    this.end = index;

    return result;
  }

  clone() {
    const result = new TextEngine(this.element);
    result.computed = this.computed;
    result._container = this._container;
    return result;
  }

  transformText(text, transformation) {
    switch (transformation) {
      case 'uppercase':
        return text.toUpperCase();
      case 'lowercase':
        return text.toLowerCase();
      case 'capitalize':
        return upperFirst(text);
      default:
        return text;
    }
  }

  layout(width, dirty) {
    const path = new Path().rect(0, 0, width, INFINITY);
    const container = new Container(path);
    const string = AttributedString.fromFragments(this.attributedString).trim();

    // Do the actual text layout
    this.layoutEngine.layout(string, [container]);

    // Get the total amount of rendered lines
    const linesCount = container.blocks.reduce(
      (acc, block) => acc + block.lines.length,
      0,
    );

    this.computed = true;
    this._container = container;
    this.end = linesCount + 1;
  }

  render() {
    const padding = this.element.padding;
    const { top, left } = this.element.getAbsoluteLayout();

    // We translate lines based on Yoga container
    const initialX = this.lines[0] ? this.lines[0].rect.y : 0;

    this.lines.forEach(line => {
      line.rect.x += left + padding.left;
      line.rect.y += top + padding.top - initialX;
    });

    const renderer = new PDFRenderer(this.element.root.instance, {
      outlineLines: false,
    });
    renderer.render(this.container);
  }
}

export default TextEngine;
