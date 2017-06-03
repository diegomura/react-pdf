import Base from './Base';
import Yoga from 'yoga-layout';
import isNan from 'lodash.isnan';

class Text extends Base {
  width = null;
  height = null;

  constructor(root, props) {
    super(root, props);

    this.layout.setMeasureFunc(this.measureText.bind(this));
  }

  appendChild(child) {
    this.children = child;
  }

  removeChild(child) {
    this.children = null;
  }

  getWidth() {
    return this.root.widthOfString(`${this.props.children}`);
  }

  getHeight(width) {
    return this.root.heightOfString(`${this.props.children}`, { width });
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

  async render() {
    const { fontSize = 18, color = 'black', align } = this.style;
    const { left, top, width } = this.getAbsoluteLayout();

    this.drawBackgroundColor();

    this.root
      .fillColor(color)
      .fontSize(fontSize)
      .text(this.children, left, top, {
        width: width + 0.1, // Increase a bit the width of the text or excecution freezes.
        align,
      });
  }
}

export default Text;
