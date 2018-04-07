import Yoga from 'yoga-layout';
import Base from './Base';
import TextEngine from './TextEngine';

class Text extends Base {
  static defaultProps = {
    wrap: true,
  };

  constructor(root, props) {
    super(root, props);

    this.engine = new TextEngine(this);
    this.layout.setMeasureFunc(this.measureText.bind(this));
  }

  appendChild(child) {
    if (typeof child === 'string') {
      this.children.push(child);
    } else {
      child.parent = this;
      this.children.push(child);
    }
  }

  removeChild(child) {
    this.children = null;
  }

  measureText(width, widthMode, height, heightMode) {
    if (widthMode === Yoga.MEASURE_MODE_EXACTLY) {
      this.engine.layout(width, 99999);

      return {
        height: this.style.flexGrow ? NaN : this.engine.height,
      };
    }

    return {};
  }

  get src() {
    return null;
  }

  reset() {
    super.reset();

    this.layout.setMeasureFunc(this.measureText.bind(this));
  }

  splice(height) {
    const result = this.clone();

    result.marginTop = 0;
    result.paddingTop = 0;
    result.width = this.width;
    result.marginBottom = this.marginBottom;
    result.height = this.height - height - this.paddingTop;
    result.engine = this.engine.splice(
      height - this.marginTop - this.paddingTop,
    );
    result.engine.element = result;

    this.marginBottom = 0;
    this.paddingBottom = 0;
    this.height = height;

    return result;
  }

  async render(page) {
    this.drawBackgroundColor();
    this.drawBorders();

    if (this.props.debug) {
      this.debug();
    }

    this.engine.render();
  }
}

export default Text;
