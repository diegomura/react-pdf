import Yoga from 'yoga-layout';
import KPLineBreaker from 'linebreaker';
import {
  Path,
  LayoutEngine,
  AttributedString,
  Container,
  TextRenderer,
} from 'textkit';
import isNan from 'lodash.isnan';
import upperFirst from 'lodash.upperfirst';
import warning from 'fbjs/lib/warning';
import Base from './Base';
import Font from '../font';

const layoutEngine = new LayoutEngine({ lineBreaker: new KPLineBreaker() });

class Text extends Base {
  width = null;
  height = null;

  constructor(root, props) {
    super(root, props);

    this.layout.setMeasureFunc(this.measureText.bind(this));
    this.canBeSplitted = true;
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

  getRawValue() {
    return this.children.reduce((acc, child) => {
      if (typeof child === 'string') {
        return acc + child;
      } else {
        return acc + child.getRawValue();
      }
    }, '');
  }

  calculateWidth() {
    return this.root.widthOfString(this.getRawValue());
  }

  calculateHeight(width) {
    return this.root.heightOfString(this.getRawValue(), { width });
  }

  setFontSize() {
    this.root.fontSize(this.getComputedStyles().fontSize || 18);
  }

  setFontFamily() {
    this.root.font(this.getComputedStyles().fontFamily || 'Helvetica');
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
    // Set fontSize and fontFamily to calculate correct height and width
    this.setFontSize();
    this.setFontFamily();

    // If we have a known width, we just calculate the height of the text.
    if (widthMode === Yoga.MEASURE_MODE_EXACTLY) {
      this.width = width;
      this.height = this.calculateHeight(this.width);

      return { height: this.style.flexGrow ? NaN : this.height };
    }

    // If we have a known height and flexGrow, we just keep the (previously calculated)
    // width as it is, by returning NaN. Otherwise, we calculate the text width.
    if (heightMode === Yoga.MEASURE_MODE_EXACTLY) {
      this.height = height;
      this.width = this.style.flexGrow ? NaN : this.calculateWidth();

      return { width: this.width };
    }

    // If we know nothing, we skip this measurement step until the parent
    // is calculated. Once this happens, we get the minimum of the
    // text width as if were in one line, and the parent's width.
    // Then we calculate the height with it.
    if (
      widthMode === Yoga.MEASURE_MODE_AT_MOST &&
      heightMode === Yoga.MEASURE_MODE_AT_MOST &&
      this.isParentRendered() &&
      !this.width &&
      !this.height
    ) {
      this.width = Math.min(width, this.calculateWidth());
      this.height = this.calculateHeight(this.width);

      return { width: this.width, height: this.height };
    }

    return {};
  }

  isParentRendered() {
    const parentLayout = this.parent.getAbsoluteLayout();
    return !isNan(parentLayout.width) && !isNan(parentLayout.height);
  }

  getSrc() {
    return null;
  }

  async recalculateLayout() {
    this.layout.markDirty();
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

  layoutText() {
    const padding = this.getPadding();
    const { left, top, width, height } = this.getAbsoluteLayout();

    // Build textkit container
    const path = new Path().rect(
      left + padding.left,
      top + padding.top,
      width - padding.left - padding.right,
      height - padding.top - padding.bottom,
    );
    const container = new Container(path);
    const fragments = this.getAttributedString();
    const attributedString = AttributedString.fromFragments(fragments);

    // Do the actual text layout
    layoutEngine.layout(attributedString, [container]);

    return container;
  }

  renderText() {
    const container = this.layoutText();
    const renderer = new TextRenderer(this.root, { outlineLines: false });

    renderer.render(container);
  }

  async render(page) {
    this.drawBackgroundColor();
    this.drawBorders();

    if (this.props.debug) {
      this.debug();
    }

    this.renderText();
  }
}

export default Text;
