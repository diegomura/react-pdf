import upperFirst from '../utils/upperFirst';
import matchPercent from '../utils/matchPercent';

class Node {
  constructor(Yoga) {
    Object.defineProperty(this, 'Yoga', { enumerable: false, value: Yoga });
    this.parent = null;
    this.children = [];
    this.computed = false;
    this.layout = Yoga ? Yoga.Node.createDefault() : null;
  }

  appendChild(child) {
    if (child) {
      child.parent = this;
      this.children.push(child);
      this.layout.insertChild(child.layout, this.layout.getChildCount());
    }
  }

  appendChildBefore(child, beforeChild) {
    const index = this.children.indexOf(beforeChild);

    if (index !== -1 && child) {
      child.parent = this;
      this.children.splice(index, 0, child);
      this.layout.insertChild(child.layout, index);
    }
  }

  removeChild(child) {
    const index = this.children.indexOf(child);

    if (index !== -1) {
      child.parent = null;
      this.children.splice(index, 1);
      this.layout.removeChild(child.layout);
    }

    child.cleanup();
  }

  removeAllChilds() {
    const children = [...this.children];
    for (let i = 0; i < children.length; i++) {
      children[i].remove();
    }
  }

  remove() {
    this.parent.removeChild(this);
  }

  setDimension(attr, value) {
    const fixedMethod = `set${upperFirst(attr)}`;
    const percentMethod = `${fixedMethod}Percent`;
    const percent = matchPercent(value);

    if (percent) {
      this.layout[percentMethod](percent.value);
    } else {
      this.layout[fixedMethod](value);
    }
  }

  setPosition(edge, value) {
    const percent = matchPercent(value);

    if (percent) {
      this.layout.setPositionPercent(edge, percent.value);
    } else {
      this.layout.setPosition(edge, value);
    }
  }

  setPadding(edge, value) {
    const percent = matchPercent(value);

    if (percent) {
      this.layout.setPaddingPercent(edge, percent.value);
    } else {
      this.layout.setPadding(edge, value);
    }
  }

  setMargin(edge, value) {
    const percent = matchPercent(value);

    if (percent) {
      this.layout.setMarginPercent(edge, percent.value);
    } else {
      this.layout.setMargin(edge, value);
    }
  }

  setBorder(edge, value) {
    if (matchPercent(value)) {
      throw new Error('Node: You cannot set percentage border widths');
    }
    this.layout.setBorder(edge, value);
  }

  getAbsoluteLayout() {
    const parent = this.parent;
    const parentLayout =
      parent && parent.getAbsoluteLayout
        ? parent.getAbsoluteLayout()
        : { left: 0, top: 0 };

    return {
      left: this.left + parentLayout.left,
      top: this.top + parentLayout.top,
      height: this.height,
      width: this.width,
    };
  }

  copyStyle(node) {
    this.layout.copyStyle(node.layout);
  }

  calculateLayout() {
    this.layout.calculateLayout();
    this.computed = true;
  }

  isEmpty() {
    return this.children.length === 0;
  }

  markDirty() {
    return this.layout.markDirty();
  }

  onAppendDynamically() {}

  cleanup() {
    this.children.forEach(c => c.cleanup());
    this.layout.unsetMeasureFunc();
    this.Yoga.Node.destroy(this.layout);
  }

  get position() {
    return this.layout.getPositionType() === this.Yoga.POSITION_TYPE_ABSOLUTE
      ? 'absolute'
      : 'relative';
  }

  get top() {
    return this.layout.getComputedTop() || 0;
  }

  get left() {
    return this.layout.getComputedLeft() || 0;
  }

  get right() {
    return this.layout.getComputedRight() || 0;
  }

  get bottom() {
    return this.layout.getComputedBottom() || 0;
  }

  get width() {
    return this.layout.getComputedWidth();
  }

  get minWidth() {
    return this.layout.getMinWidth().value;
  }

  get maxWidth() {
    return this.layout.getMaxWidth().value;
  }

  get height() {
    return this.layout.getComputedHeight();
  }

  get minHeight() {
    return this.layout.getMinHeight().value;
  }

  get maxHeight() {
    return this.layout.getMaxHeight().value;
  }

  get paddingTop() {
    return this.layout.getComputedPadding(this.Yoga.EDGE_TOP) || 0;
  }

  get paddingRight() {
    return this.layout.getComputedPadding(this.Yoga.EDGE_RIGHT) || 0;
  }

  get paddingBottom() {
    return this.layout.getComputedPadding(this.Yoga.EDGE_BOTTOM) || 0;
  }

  get paddingLeft() {
    return this.layout.getComputedPadding(this.Yoga.EDGE_LEFT) || 0;
  }

  get marginTop() {
    return this.layout.getComputedMargin(this.Yoga.EDGE_TOP) || 0;
  }

  get marginRight() {
    return this.layout.getComputedMargin(this.Yoga.EDGE_RIGHT) || 0;
  }

  get marginBottom() {
    return this.layout.getComputedMargin(this.Yoga.EDGE_BOTTOM) || 0;
  }

  get marginLeft() {
    return this.layout.getComputedMargin(this.Yoga.EDGE_LEFT) || 0;
  }

  get borderTopWidth() {
    return this.layout.getComputedBorder(this.Yoga.EDGE_TOP) || 0;
  }

  get borderRightWidth() {
    return this.layout.getComputedBorder(this.Yoga.EDGE_RIGHT) || 0;
  }

  get borderBottomWidth() {
    return this.layout.getComputedBorder(this.Yoga.EDGE_BOTTOM) || 0;
  }

  get borderLeftWidth() {
    return this.layout.getComputedBorder(this.Yoga.EDGE_LEFT) || 0;
  }

  get padding() {
    return {
      top: this.paddingTop,
      right: this.paddingRight,
      bottom: this.paddingBottom,
      left: this.paddingLeft,
    };
  }

  get margin() {
    return {
      top: this.marginTop,
      right: this.marginRight,
      bottom: this.marginBottom,
      left: this.marginLeft,
    };
  }

  set position(value) {
    this.layout.setPositionType(
      value === 'absolute'
        ? this.Yoga.POSITION_TYPE_ABSOLUTE
        : this.Yoga.POSITION_TYPE_RELATIVE,
    );
  }

  set top(value) {
    this.setPosition(this.Yoga.EDGE_TOP, value);
  }

  set left(value) {
    this.setPosition(this.Yoga.EDGE_LEFT, value);
  }

  set right(value) {
    this.setPosition(this.Yoga.EDGE_RIGHT, value);
  }

  set bottom(value) {
    this.setPosition(this.Yoga.EDGE_BOTTOM, value);
  }

  set width(value) {
    this.setDimension('width', value);
  }

  set minWidth(value) {
    this.setDimension('minWidth', value);
  }

  set maxWidth(value) {
    this.setDimension('maxWidth', value);
  }

  set height(value) {
    this.setDimension('height', value);
  }

  set minHeight(value) {
    this.setDimension('minHeight', value);
  }

  set maxHeight(value) {
    this.setDimension('maxHeight', value);
  }

  set paddingTop(value) {
    this.setPadding(this.Yoga.EDGE_TOP, value);
  }

  set paddingRight(value) {
    this.setPadding(this.Yoga.EDGE_RIGHT, value);
  }

  set paddingBottom(value) {
    this.setPadding(this.Yoga.EDGE_BOTTOM, value);
  }

  set paddingLeft(value) {
    this.setPadding(this.Yoga.EDGE_LEFT, value);
  }

  set marginTop(value) {
    this.setMargin(this.Yoga.EDGE_TOP, value);
  }

  set marginRight(value) {
    this.setMargin(this.Yoga.EDGE_RIGHT, value);
  }

  set marginBottom(value) {
    this.setMargin(this.Yoga.EDGE_BOTTOM, value);
  }

  set marginLeft(value) {
    this.setMargin(this.Yoga.EDGE_LEFT, value);
  }

  set padding(value) {
    this.paddingTop = value;
    this.paddingRight = value;
    this.paddingBottom = value;
    this.paddingLeft = value;
  }

  set margin(value) {
    this.marginTop = value;
    this.marginRight = value;
    this.marginBottom = value;
    this.marginLeft = value;
  }

  set borderTopWidth(value) {
    this.setBorder(this.Yoga.EDGE_TOP, value);
  }

  set borderRightWidth(value) {
    this.setBorder(this.Yoga.EDGE_RIGHT, value);
  }

  set borderBottomWidth(value) {
    this.setBorder(this.Yoga.EDGE_BOTTOM, value);
  }

  set borderLeftWidth(value) {
    this.setBorder(this.Yoga.EDGE_LEFT, value);
  }
}

export default Node;
