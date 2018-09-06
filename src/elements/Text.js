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

    this.renderCallback = props.render;
    this.engine = new TextEngine(this);
    this.layout.setMeasureFunc(this.measureText.bind(this));
  }

  get name() {
    return 'Text';
  }

  appendChild(child) {
    if (child) {
      child.parent = this;
      this.children.push(child);
    }
  }

  removeChild(child) {
    const index = this.children.indexOf(child);

    if (index !== -1) {
      child.parent = null;
      this.children.splice(index, 1);
    }
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
        height: this.engine.height,
        // height: this.style.flexGrow ? NaN : this.engine.height,
      };
    }

    if (
      widthMode === Yoga.MEASURE_MODE_AT_MOST ||
      heightMode === Yoga.MEASURE_MODE_AT_MOST
    ) {
      this.engine.layout(width);

      return {
        height: this.engine.height,
        width: Math.min(width, this.engine.width),
      };
    }

    return {};
  }

  getComputedStyles() {
    const styles = super.getComputedStyles();

    // For Text, we also inherit relative positioning for inline childs also
    if (
      this.parent &&
      this.parent.name === 'Text' &&
      this.parent.style.position === 'relative'
    ) {
      styles.top = styles.top || this.parent.style.top;
      styles.bottom = styles.bottom || this.parent.style.bottom;
      styles.position = styles.position || 'relative';
    }

    return styles;
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

  clone() {
    const clone = super.clone();
    clone.engine = this.engine;
    return clone;
  }

  onNodeSplit(height, cloneNode) {
    const wrapHeight = this.wrapHeight(height);

    cloneNode.engine = this.engine.splice(wrapHeight);
  }

  async render() {
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
