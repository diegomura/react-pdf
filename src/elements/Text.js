import Yoga from 'yoga-layout';
import createPDFRenderer from '@textkit/pdf-renderer';
import Base from './Base';
import Font from '../font';
import { getURL } from '../utils/url';
import { LayoutEngine, Rect, Path, Container } from '../layout';
import { getAttributedString } from '../utils/attributedString';

const PDFRenderer = createPDFRenderer({ Rect });

class Text extends Base {
  static defaultProps = {
    wrap: true,
    widows: 2,
    orphans: 2,
  };

  constructor(root, props) {
    super(root, props);

    this.start = 0;
    this.end = 0;
    this.computed = false;
    this._container = null;
    this._attributedString = null;
    this._layoutEngine = null;
    this.renderCallback = props.render;
    this.layout.setMeasureFunc(this.measureText.bind(this));
  }

  get name() {
    return 'Text';
  }

  get src() {
    return getURL(this.props.src || this.props.href);
  }

  get attributedString() {
    if (!this._attributedString) {
      this._attributedString = getAttributedString(this);
    }
    return this._attributedString;
  }

  set attributedString(value) {
    this._attributedString = value;
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

  get lines() {
    if (!this.container) return [];

    return this.container.blocks.reduce(
      (acc, block) => [...acc, ...block.lines],
      [],
    );
  }

  get linesHeight() {
    if (!this._container) return -1;
    return this.lines.reduce((acc, line) => acc + line.height, 0);
  }

  get linesWidth() {
    if (!this._container) return -1;
    return Math.max(...this.lines.map(line => line.advanceWidth));
  }

  get layoutEngine() {
    if (!this._layoutEngine) {
      const { hyphenationPenalty } = this.props;
      const hyphenationCallback = Font.getHyphenationCallback();
      this._layoutEngine = new LayoutEngine({
        hyphenationCallback,
        hyphenationPenalty,
      });
    }

    return this._layoutEngine;
  }

  set layoutEngine(instance) {
    this._layoutEngine = instance;
  }

  appendChild(child) {
    if (child) {
      child.parent = this;
      this.children.push(child);
      this.computed = false;
      this._attributedString = null;
      this.markDirty();
    }
  }

  removeChild(child) {
    const index = this.children.indexOf(child);

    if (index !== -1) {
      child.parent = null;
      this.children.splice(index, 1);
      this.computed = false;
      this._attributedString = null;
      this.markDirty();
    }
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

    for (let i = 0; i < index; i++) {
      const line = this.lines[i];
      counter += line.height;
    }

    return counter;
  }

  layoutText(width, height) {
    // IF height null or NaN, we take some liberty on layout height
    const containerHeight = height || this.page.size.height;

    // Text layout is expensive. That's why we ensure to only do it once
    // (except dynamic nodes. Those change content and needs to relayout every time)
    if (!this._container || this.props.render) {
      const path = new Path().rect(0, 0, width, containerHeight);
      const container = new Container(path);
      const attributedString = this.attributedString;

      // Do the actual text layout
      this.layoutEngine.layout(attributedString, [container]);
      this._container = container;
    }

    // Get the total amount of rendered lines
    const linesCount = this._container.blocks.reduce(
      (acc, block) => acc + block.lines.length,
      0,
    );

    this.computed = true;
    this.end = linesCount + 1;
  }

  measureText(width, widthMode, height, heightMode) {
    if (widthMode === Yoga.MEASURE_MODE_EXACTLY) {
      this.layoutText(width);

      return { height: this.style.flexGrow ? NaN : this.linesHeight };
    }

    if (
      widthMode === Yoga.MEASURE_MODE_AT_MOST ||
      heightMode === Yoga.MEASURE_MODE_AT_MOST
    ) {
      this.layoutText(width, height);

      return {
        height: this.linesHeight,
        width: Math.min(width, this.linesWidth),
      };
    }

    return {};
  }

  getComputedStyles() {
    const styles = super.getComputedStyles();

    // Inherit relative positioning for inline childs
    if (
      this.parent &&
      this.parent.name === 'Text' &&
      this.parent.style.position === 'relative'
    ) {
      styles.top = styles.top || this.parent.style.top;
      styles.bottom = styles.bottom || this.parent.style.bottom;
      styles.position = styles.position || 'relative';
    }

    // Apply default link styles
    if (this.src) {
      styles.color = styles.color || 'blue';
      styles.textDecoration = styles.textDecoration || 'underline';
    }

    return styles;
  }

  wrapHeight(height) {
    const { orphans, widows } = this.props;
    const linesQuantity = this.lines.length;
    const sliceHeight = height - this.paddingTop;
    const slicedLine = this.lineIndexAtHeight(sliceHeight);

    if (linesQuantity < orphans) {
      return height;
    } else if (slicedLine < orphans || linesQuantity < orphans + widows) {
      return 0;
    } else if (linesQuantity === orphans + widows) {
      return this.heightAtLineIndex(orphans);
    } else if (linesQuantity - slicedLine < widows) {
      return height - this.heightAtLineIndex(widows - 1);
    }

    return height;
  }

  onNodeSplit(height, clone) {
    const wrapHeight = this.wrapHeight(height);
    const slicedLineIndex = this.lineIndexAtHeight(wrapHeight);

    clone.marginTop = 0;
    clone.paddingTop = 0;
    clone.start = slicedLineIndex;
    clone.attributedString = this.attributedString;

    this.height = wrapHeight;
    this.marginBottom = 0;
    this.paddingBottom = 0;
    this.end = slicedLineIndex;
  }

  clone() {
    const text = super.clone();

    text.layoutEngine = this.layoutEngine;

    // Save calculated layout for non-dynamic clone elements
    if (!this.props.render && !this.props.fixed) {
      text._container = this._container;
    }

    return text;
  }

  async render() {
    this.root.instance.save();
    this.applyTransformations();
    this.drawBackgroundColor();
    this.drawBorders();

    // Calculate text layout if needed
    // This can happen if measureText was not called by Yoga
    if (!this.computed) {
      this.layoutText(
        this.width - this.padding.left - this.padding.right,
        this.height - this.padding.top - this.padding.bottom,
      );
    }

    const padding = this.padding;
    const { top, left } = this.getAbsoluteLayout();

    // We translate lines based on Yoga container
    const initialX = this.lines[0] ? this.lines[0].rect.y : 0;

    this.lines.forEach(line => {
      line.rect.x = left + padding.left;
      line.rect.y += top + padding.top - initialX;
    });

    const renderer = new PDFRenderer(this.root.instance, {
      outlineLines: false,
    });

    renderer.render(this.container);

    if (this.props.debug) {
      this.debug();
    }

    this.root.instance.restore();
  }
}

export default Text;
