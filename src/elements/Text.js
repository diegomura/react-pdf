import Yoga from 'yoga-layout';
import PDFRenderer from '@react-pdf/textkit/renderers/pdf';

import Base from './Base';
import Font from '../font';
import { getURL } from '../utils/url';
import layout from '../layout';
import { getAttributedString } from '../utils/attributedString';

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

    this.blocks = null;
    this.computed = false;
    this.attributedString = null;
    this.layoutOptions = {
      hyphenationPenalty: props.hyphenationPenalty,
      hyphenationCallback: Font.getHyphenationCallback(),
      shrinkWhitespaceFactor: { before: -0.5, after: -0.5 },
    };

    this.layout.setMeasureFunc(this.measureText.bind(this));
  }

  get name() {
    return 'Text';
  }

  get src() {
    return getURL(this.props.src || this.props.href);
  }

  get lines() {
    if (!this.blocks) return [];

    return this.blocks
      .reduce((acc, block) => [...acc, ...block], [])
      .splice(this.start, this.end);
  }

  get linesHeight() {
    if (!this.blocks) return -1;
    return this.lines.reduce((acc, line) => acc + line.box.height, 0);
  }

  get linesWidth() {
    if (!this.blocks) return -1;
    return Math.max(...this.lines.map(line => line.box.width));
  }

  appendChild(child) {
    if (child) {
      child.parent = this;
      this.children.push(child);
      this.computed = false;
      this.attributedString = null;
      this.markDirty();
    }
  }

  removeChild(child) {
    const index = this.children.indexOf(child);

    if (index !== -1) {
      child.parent = null;
      this.children.splice(index, 1);
      this.computed = false;
      this.attributedString = null;
      this.markDirty();
    }
  }

  lineIndexAtHeight(height) {
    let counter = 0;

    for (let i = 0; i < this.lines.length; i++) {
      const line = this.lines[i];
      if (counter + line.box.height > height) return i;
      counter += line.box.height;
    }

    return this.lines.length;
  }

  heightAtLineIndex(index) {
    let counter = 0;

    for (let i = 0; i < index; i++) {
      const line = this.lines[i];
      counter += line.box.height;
    }

    return counter;
  }

  layoutText(width, height) {
    this.attributedString = getAttributedString(this);

    // If height null or NaN, we take some liberty on layout height
    const containerHeight = height || this.page.size.height;

    // Text layout is expensive. That's why we ensure to only do it once
    // (except dynamic nodes. Those change content and needs to relayout every time)
    if (!this.blocks || this.props.render) {
      const container = { x: 0, y: 0, width, height: containerHeight };
      const attributedString = this.attributedString;

      // Do the actual text layout
      this.blocks = layout(attributedString, container, this.layoutOptions);
    }

    // Get the total amount of rendered lines
    const linesCount = this.blocks.reduce(
      (acc, block) => acc + block.length,
      0,
    );

    this.end = this.props.maxLines || linesCount + 1;
    this.computed = true;
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

  resolveStyles() {
    const styles = super.resolveStyles();

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
    if (this.blocks && !this.props.render) {
      text.blocks = [...this.blocks];
    }

    return text;
  }

  renderText() {
    const { top, left } = this.getAbsoluteLayout();
    const initialX = this.lines[0] ? this.lines[0].box.y : 0;

    // We translate lines based on Yoga container
    this.root.instance.save();
    this.root.instance.translate(
      left + this.padding.left,
      top + this.padding.top - initialX,
    );

    // Perform actual text rendering on document
    PDFRenderer.render(this.root.instance, [this.lines]);

    this.root.instance.restore();
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

    this.renderText();

    if (this.props.debug) {
      this.debug();
    }

    this.root.instance.restore();
  }
}

export default Text;
