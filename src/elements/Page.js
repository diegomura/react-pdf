import { Fragment } from 'react';
import Yoga from 'yoga-layout';

import Base from './Base';
import Ruler from '../mixins/ruler';
import warning from '../utils/warning';
import { createInstance } from './index';
import TextInstance from './TextInstance';
import getPageSize from '../utils/pageSizes';
import matchPercent from '../utils/matchPercent';
import { setDestination } from '../utils/url';

class Page extends Base {
  static defaultProps = {
    size: 'A4',
    wrap: true,
    orientation: 'portrait',
  };

  constructor(root, props) {
    super(root, props);

    this._size = null;
  }

  get name() {
    return 'Page';
  }

  get document() {
    return this.parent;
  }

  get page() {
    return this;
  }

  get orientation() {
    return this.props.orientation;
  }

  get size() {
    if (this._size) return this._size;

    this._size = getPageSize(this.props.size, this.orientation);

    // Adjust size for ruler
    if (this.hasHorizontalRuler()) {
      this._size.width += this.getRulerWidth();
    }

    if (this.hasVerticalRuler()) {
      this._size.height += this.getRulerWidth();
    }

    return this._size;
  }

  get isAutoHeight() {
    return typeof this.size.height === 'undefined';
  }

  resetMargins() {
    if (
      !!this.marginTop ||
      !!this.marginBottom ||
      !!this.marginLeft ||
      !!this.marginRight
    ) {
      warning(
        false,
        'Margin values are not allowed on Page element. Use padding instead.',
      );

      this.marginTop = 0;
      this.marginBottom = 0;
      this.marginLeft = 0;
      this.marginRight = 0;
    }
  }

  applyProps() {
    super.applyProps();

    this.top = 0;
    this.left = 0;
    this.width = this.size.width;

    this.resetMargins();

    // Add some padding if ruler present, so we can see the whole page inside it
    const rulerWidth = this.getRulerWidth();

    if (this.hasHorizontalRuler()) {
      this.paddingTop = this.paddingTop + rulerWidth;
    }

    if (this.hasVerticalRuler()) {
      this.paddingLeft = this.paddingLeft + rulerWidth;
    }
  }

  setPadding(edge, value) {
    const dimension =
      edge === Yoga.EDGE_TOP || edge === Yoga.EDGE_BOTTOM
        ? this.size.height
        : this.size.width;

    const match = matchPercent(value);

    if (match) {
      this.layout.setPadding(edge, dimension * match.percent);
    } else {
      this.layout.setPadding(edge, value);
    }
  }

  async addDynamicChild(parent, elements) {
    if (!elements) return;
    const children = Array.isArray(elements) ? elements : [elements];

    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (!child) continue;

      const { type, props } = child;

      if (typeof child === 'string') {
        const instance = new TextInstance(this.root, child);
        parent.appendChild(instance);
      } else if (type !== Fragment) {
        const instance = createInstance(child, this.root);
        await instance.onAppendDynamically();
        parent.appendChild(instance);
        instance.applyProps();
        await this.addDynamicChild(instance, props.children);
      } else {
        await this.addDynamicChild(parent, props.children);
      }
    }
  }

  async renderDynamicNodes(props, cb) {
    const listToExplore = this.children.slice(0);

    while (listToExplore.length > 0) {
      const node = listToExplore.shift();
      const condition = cb ? cb(node) : true;

      if (condition && node.props.render) {
        node.removeAllChilds();
        const elements = node.props.render(props);
        await this.addDynamicChild(node, elements);
        if (!node.fixed) node.props.render = null;
        continue;
      }

      if (node.children) {
        listToExplore.push(...node.children);
      }
    }
  }

  async nodeWillWrap(props) {
    await this.renderDynamicNodes(props);
    this.calculateLayout();
  }

  onNodeSplit(height, clone) {
    clone.marginTop = 0;
    this.marginBottom = 0;
    this.calculateLayout();
  }

  clone() {
    const clone = super.clone();
    clone._size = this.size;
    return clone;
  }

  update(newProps) {
    super.update(newProps);
    this._size = null;
  }

  async render() {
    const { instance } = this.root;

    if (!this.isAutoHeight) {
      this.height = this.size.height;
    }

    this.calculateLayout();

    const height = this.isAutoHeight ? this.height : this.size.height;

    instance.addPage({
      size: [this.size.width, height],
      margin: 0,
    });
    setDestination(this);

    if (this.style.backgroundColor) {
      instance
        .fillColor(this.style.backgroundColor)
        .rect(0, 0, this.size.width, height)
        .fill();
    }

    await this.renderChildren();

    if (this.props.debug) {
      this.debug();
    }

    this.renderRuler();
  }
}

Object.assign(Page.prototype, Ruler);

export default Page;
