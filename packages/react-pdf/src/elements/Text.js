import Yoga from 'yoga-layout';
import KPLineBreaker from 'linebreaker';
import {
  Path,
  LayoutEngine,
  AttributedString,
  Container,
  TextRenderer,
} from 'textkit';
import upperFirst from 'lodash.upperfirst';
import warning from 'fbjs/lib/warning';
import Base from './Base';
import Font from '../font';

const layoutEngine = new LayoutEngine({ lineBreaker: new KPLineBreaker() });

class Text extends Base {
  constructor(root, props) {
    super(root, props);

    this.canBeSplitted = true;
    this.layout.setMeasureFunc(this.measureText.bind(this));
  }

  appendChild(child) {
    if (typeof child === 'string') {
      this.children.push(this.transformText(child));
    } else {
      child.parent = this;
      this.children.push(child);
    }
  }

  removeChild(child) {
    this.children = null;
  }

  transformText(text) {
    switch (this.getComputedStyles().textTransform) {
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

  // Yoga measurement function. Decides which width and height should the text have
  // based on the available parent dimentions and their modes (exactly or at most)
  measureText(width, widthMode, height, heightMode) {
    // If we have a known width, we just calculate the height of the text.
    if (widthMode === Yoga.MEASURE_MODE_EXACTLY) {
      // Layout text with no height (very high number).
      // Would be probably better to use page height in the future
      this.container = this.container || this.layoutText(width, 99999);

      return {
        height: this.style.flexGrow ? NaN : this.container.blocks[0].height,
      };
    }

    // If we have a known height and flexGrow, we just keep the (previously calculated)
    // width as it is, by returning NaN. Otherwise, we calculate the text width.
    // if (heightMode === Yoga.MEASURE_MODE_EXACTLY) {
    //   this.height = height;
    //   this.width = this.style.flexGrow ? NaN : this.calculateWidth();
    //
    //   return { width: this.width };
    // }

    // If we know nothing, we skip this measurement step until the parent
    // is calculated. Once this happens, we get the minimum of the
    // text width as if were in one line, and the parent's width.
    // Then we calculate the height with it.
    // if (
    //   widthMode === Yoga.MEASURE_MODE_AT_MOST &&
    //   heightMode === Yoga.MEASURE_MODE_AT_MOST &&
    //   this.isParentRendered() &&
    //   !this.width &&
    //   !this.height
    // ) {
    //   this.width = Math.min(width, this.calculateWidth());
    //   this.height = this.calculateHeight(this.width);
    //
    //   return { width: this.width, height: this.height };
    // }

    return {};
  }

  getSrc() {
    return null;
  }

  getAttributedString() {
    const fragments = [];
    const {
      color = 'black',
      fontFamily = 'Helvetica',
      fontSize = 18,
      textAlign = 'left',
      align,
      textDecoration,
      textDecorationColor,
      textDecorationStyle,
    } = this.getComputedStyles();

    warning(
      !align,
      '"align" style prop will be deprecated on future versions. Please use "textAlign" instead in Text node',
    );

    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];

      if (typeof child === 'string') {
        const string = this.transformText(child);
        const obj = Font.getFont(fontFamily);
        const font = obj ? obj.data : font;
        const link = this.getSrc();

        fragments.push({
          string,
          attributes: {
            font,
            color,
            fontSize,
            link,
            align: textAlign,
            underline: textDecoration === 'underline',
            underlineColor: textDecorationColor || color,
            underlineStyle: textDecorationStyle,
          },
        });
      } else {
        fragments.push(...child.getAttributedString());
      }
    }

    return fragments;
  }

  layoutText(width, height) {
    // const padding = this.padding;

    // Build textkit container
    const path = new Path().rect(0, 0, width, height);
    const container = new Container(path);
    const fragments = this.getAttributedString();
    const attributedString = AttributedString.fromFragments(fragments);

    // Do the actual text layout
    layoutEngine.layout(attributedString, [container]);

    return container;
  }

  async render(page) {
    const { top, left } = this.getAbsoluteLayout();

    this.drawBackgroundColor();
    this.drawBorders();

    if (this.props.debug) {
      this.debug();
    }

    // We translate lines based on Yoga container
    this.container.blocks[0].lines.forEach(line => {
      line.rect.x += left;
      line.rect.width += left;
      line.rect.y += top;
      line.rect.height += top;
    });

    // Render text in doc
    const renderer = new TextRenderer(this.root, { outlineLines: false });
    renderer.render(this.container);
  }
}

export default Text;
