import Yoga from 'yoga-layout';
import Base from './Base';
import TextEngine from './TextEngine';

const WIDOW_THREASHOLD = 20;

class Text extends Base {
  static defaultProps = {
    wrap: true,
    widows: 2,
    orphans: 2,
  };

  constructor(root, props) {
    super(root, props);

    this.engine = new TextEngine(this);
    this.layout.setMeasureFunc(this.measureText.bind(this));
    this.renderCallback = props.render;
  }

  get name() {
    return 'Text';
  }

  get src() {
    return null;
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
    // If the text has functions inside, we don't measure dimentions right away,
    // but we keep this until all functions are resolved after the layout stage.
    if (this.renderCallback) {
      return {};
    }

    if (widthMode === Yoga.MEASURE_MODE_EXACTLY) {
      this.engine.layout(width);

      return {
        height: this.style.flexGrow ? NaN : this.engine.height,
      };
    }

    if (
      widthMode === Yoga.MEASURE_MODE_AT_MOST ||
      heightMode === Yoga.MEASURE_MODE_AT_MOST
    ) {
      this.engine.layout(width);

      return {
        width: Math.min(width, this.engine.width),
      };
    }

    return {};
  }

  getComputedStyles() {
    const styles = super.getComputedStyles();

    // For Text, we also inherit relative positioning because this is how
    // we define text yOffset, which should be applied for inline childs also
    if (
      this.parent.name === 'Text' &&
      this.parent.style.position === 'relative'
    ) {
      styles.top = styles.top || this.parent.style.top;
      styles.bottom = styles.bottom || this.parent.style.bottom;
      styles.position = styles.position || 'relative';
    }

    return styles;
  }

  recalculateLayout() {
    this.layout.markDirty();
  }

  isEmpty() {
    return this.engine.lines.length === 0;
  }

  hasOrphans(linesQuantity, slicedLines) {
    return slicedLines === 1 && linesQuantity !== 1;
  }

  hasWidows(linesQuantity, slicedLines) {
    return (
      linesQuantity !== 1 &&
      linesQuantity - slicedLines === 1 &&
      linesQuantity < WIDOW_THREASHOLD
    );
  }

  wrapHeight(height) {
    const { orphans, widows } = this.props;
    const linesQuantity = this.engine.lines.length;
    const sliceHeight = height - this.marginTop - this.paddingTop;
    const slicedLines = this.engine.lineIndexAtHeight(sliceHeight);

    let wrapHeight = height;

    if (linesQuantity < orphans) {
      wrapHeight = height;
    } else if (slicedLines < orphans || linesQuantity < orphans + widows) {
      wrapHeight = 0;
    } else if (linesQuantity === orphans + widows) {
      wrapHeight = this.engine.heightAtLineIndex(orphans - 1);
    } else if (linesQuantity - slicedLines < widows) {
      wrapHeight = height - this.engine.heightAtLineIndex(widows - 1);
    }

    return Math.min(wrapHeight, this.height);
  }

  splice(height) {
    const wrapHeight = this.wrapHeight(height);
    const engine = this.engine.splice(wrapHeight);
    const result = this.clone();

    result.marginTop = 0;
    result.paddingTop = 0;
    result.width = this.width;
    result.marginBottom = this.marginBottom;
    result.engine = engine;
    result.engine.element = result;
    result.height = engine.height + this.paddingBottom + this.marginBottom;

    this.marginBottom = 0;
    this.paddingBottom = 0;
    this.height = height;

    return result;
  }

  async render(page) {
    this.drawBackgroundColor();
    this.drawBorders();

    // Calculate text layout if needed
    // This can happen if measureText was not called by Yoga
    if (!this.engine.computed) {
      this.engine.layout(
        this.width -
          this.margin.left -
          this.margin.right -
          this.padding.left -
          this.padding.right,
      );
    }

    if (this.props.debug) {
      this.debug();
    }

    this.engine.render();
  }
}

export default Text;
