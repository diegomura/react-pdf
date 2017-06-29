import Base from './Base';
import Yoga from 'yoga-layout';
import isNan from 'lodash.isnan';
import upperFirst from 'lodash.upperfirst';

class Text extends Base {
  width = null;
  height = null;

  constructor(root, props) {
    super(root, props);

    this.layout.setMeasureFunc(this.measureText.bind(this));
  }

  appendChild(child) {
    if (typeof child === 'string') {
      this.children.push(this.transformText(child));
    } else {
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

  getWidth() {
    return this.root.widthOfString(this.getRawValue());
  }

  getHeight(width) {
    return this.root.heightOfString(this.getRawValue(), { width });
  }

  transformText(text) {
    switch (this.style.textTransform) {
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
    // Set fontSize to calculate correct height and width
    this.root.fontSize(this.style.fontSize || 18);

    // If we have a known width, we just calculate the height of the text.
    if (widthMode === Yoga.MEASURE_MODE_EXACTLY) {
      this.width = width;
      this.height = this.getHeight(this.width);

      return { height: this.style.flexGrow ? NaN : this.height };
    }

    // If we have a known height, we just keep the (previously calculated)
    // width as it is, by returning NaN
    if (heightMode === Yoga.MEASURE_MODE_EXACTLY) {
      this.height = height;
      return { width: NaN };
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
      this.width = Math.min(width, this.getWidth());
      this.height = this.getHeight(this.width);

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

  renderText(text, isFirstNode) {
    const { align = 'left', textDecoration } = this.style;

    this.root.text(text, {
      align,
      link: '',
      continued: true,
      underline: textDecoration === 'underline',
    });
  }

  async render() {
    const padding = this.getComputedPadding();
    const { left, top, width, height } = this.getAbsoluteLayout();
    const { fontSize = 18, color = 'black' } = this.style;

    this.drawBackgroundColor();

    // Set coordinates, dimentions and continued text
    // Increase a bit the width and height of the text or excecution freezes.
    this.root.text('', left + padding.left, top + padding.top, {
      continued: true,
      width: width - padding.left - padding.right + 0.1,
      height: height - padding.top - padding.bottom + 0.1,
    });

    this.children.forEach((child, index) => {
      this.root.fillColor(color).fontSize(fontSize);

      if (typeof child === 'string') {
        this.renderText(child);
      } else {
        child.render({ inline: true });
      }
    });

    // Text should not longer be continuos
    this.root.text('', { continued: false });
  }
}

export default Text;
