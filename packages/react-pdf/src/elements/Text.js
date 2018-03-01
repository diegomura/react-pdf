import Yoga from 'yoga-layout';
import isNan from 'lodash.isnan';
import upperFirst from 'lodash.upperfirst';
import warning from 'fbjs/lib/warning';
import Base from './Base';

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

  async recalculateLayout() {
    this.layout.markDirty();
  }

  // wrapElement() {
  //   const parentWidth = this.parent.getWidth();
  //
  //   this.children = chunkStringIntoPages(
  //     this.getRawValue(),
  //     this.parent.getHeight(),
  //     line => this.root.heightOfString(line, { width: parentWidth }),
  //   );
  //
  //   return this.children.length;
  // }

  async renderText(text, isFirstNode) {
    const {
      textAlign = 'left',
      align,
      textDecoration,
    } = this.getComputedStyles();

    warning(
      !align,
      '"align" style prop will be deprecated on future versions. Please use "textAlign" instead in Text node',
    );

    this.root.text(text, {
      align: align || textAlign,
      link: '',
      continued: true,
      underline: textDecoration === 'underline',
    });
  }

  async render(page) {
    const padding = this.getPadding();
    const { left, top, width, height } = this.getAbsoluteLayout();
    const { color = 'black' } = this.getComputedStyles();

    this.drawBackgroundColor();
    this.drawBorders();

    if (this.props.debug) {
      this.debug();
    }

    // Set coordinates, dimentions and continued text
    this.root.text('', left + padding.left, top + padding.top, {
      continued: true,
      width: width - padding.left - padding.right,
      height: height - padding.top - padding.bottom,
    });

    // Render childs: text and inline elements
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];

      this.setFontSize();
      this.setFontFamily();
      this.root.fillColor(color);

      if (typeof child === 'string') {
        await this.renderText(child);
      } else {
        await child.render({ inline: true });
      }
    }

    // Text should not longer be continuos
    this.root.text('', { continued: false });
  }
}

export default Text;
