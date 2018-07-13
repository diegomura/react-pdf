import Yoga from 'yoga-layout';

const ALMOST_ZERO = 0.000001;

class Node {
  constructor(root, props) {
    this._top = null;
    this._left = null;
    this._width = null;
    this._heigth = null;
    this._padding = {};
    this._margin = {};

    this.layout = Yoga.Node.createDefault();
  }

  get top() {
    if (!this._top) {
      this._top = this.layout.getComputedLayout().top - this.marginTop;
    }

    return this._top;
  }

  get left() {
    if (!this._left) {
      this._left = this.layout.getComputedLayout().left - this.marginLeft;
    }

    return this._left;
  }

  get width() {
    if (!this._width) {
      this._width =
        this.layout.getComputedLayout().width +
        this.marginLeft +
        this.marginRight;
    }

    return this._width;
  }

  get height() {
    if (!this._heigth) {
      this._heigth =
        this.layout.getComputedLayout().height +
        this.marginTop +
        this.marginBottom;
    }

    return this._heigth;
  }

  get paddingTop() {
    if (!this._padding.top) {
      this._padding.top = this.layout.getComputedPadding(Yoga.EDGE_TOP);
    }

    return this._padding.top;
  }

  get paddingRight() {
    if (!this._padding.right) {
      this._padding.right = this.layout.getComputedPadding(Yoga.EDGE_RIGHT);
    }

    return this._padding.right;
  }

  get paddingBottom() {
    if (!this._padding.bottom) {
      this._padding.bottom = this.layout.getComputedPadding(Yoga.EDGE_BOTTOM);
    }

    return this._padding.bottom;
  }

  get paddingLeft() {
    if (!this._padding.left) {
      this._padding.left = this.layout.getComputedPadding(Yoga.EDGE_LEFT);
    }

    return this._padding.left;
  }

  get marginTop() {
    if (!this._margin.top) {
      this._margin.top = this.layout.getComputedMargin(Yoga.EDGE_TOP);
    }

    return this._margin.top;
  }

  get marginRight() {
    if (!this._margin.right) {
      this._margin.right = this.layout.getComputedMargin(Yoga.EDGE_RIGHT);
    }

    return this._margin.right;
  }

  get marginBottom() {
    if (!this._margin.bottom) {
      this._margin.bottom = this.layout.getComputedMargin(Yoga.EDGE_BOTTOM);
    }

    return this._margin.bottom;
  }

  get marginLeft() {
    if (!this._margin.left) {
      this._margin.left = this.layout.getComputedMargin(Yoga.EDGE_LEFT);
    }

    return this._margin.left;
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

  set top(value) {
    if (value === 0) {
      value = ALMOST_ZERO;
    }

    this._top = value;
  }

  set left(value) {
    if (value === 0) {
      value = ALMOST_ZERO;
    }

    this._left = value;
  }

  set width(value) {
    if (value === 0) {
      value = ALMOST_ZERO;
    }

    this._width = value;
  }

  set height(value) {
    if (value === 0) {
      value = ALMOST_ZERO;
    }

    this._heigth = value;
  }

  set paddingTop(value) {
    if (value === 0) {
      value = ALMOST_ZERO;
    }

    this._padding.top = value;
  }

  set paddingRight(value) {
    if (value === 0) {
      value = ALMOST_ZERO;
    }

    this._padding.right = value;
  }

  set paddingBottom(value) {
    if (value === 0) {
      value = ALMOST_ZERO;
    }

    this._padding.bottom = value;
  }

  set paddingLeft(value) {
    if (value === 0) {
      value = ALMOST_ZERO;
    }

    this._padding.left = value;
  }

  set marginTop(value) {
    if (value === 0) {
      value = ALMOST_ZERO;
    }

    this._margin.top = value;
  }

  set marginRight(value) {
    if (value === 0) {
      value = ALMOST_ZERO;
    }

    this._margin.right = value;
  }

  set marginBottom(value) {
    if (value === 0) {
      value = ALMOST_ZERO;
    }

    this._margin.bottom = value;
  }

  set marginLeft(value) {
    if (value === 0) {
      value = ALMOST_ZERO;
    }

    this._margin.left = value;
  }

  set padding(value) {
    this._padding = value;
  }

  set margin(value) {
    this._margin = value;
  }

  reset() {
    this.top = null;
    this.left = null;
    this.width = null;
    this.height = null;
    this.padding = {};
    this.margin = {};
  }
}

export default Node;
