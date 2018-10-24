import { Fragment } from 'react';
import warning from 'fbjs/lib/warning';
import Base from './Base';
import TextInstance from './TextInstance';
import StyleSheet from '../stylesheet';
import getPageSize from '../utils/pageSizes';
import Ruler from '../mixins/ruler';
import { createInstance } from './index';

class Page extends Base {
  static defaultProps = {
    size: 'A4',
    orientation: 'portrait',
    style: {},
    wrap: false,
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
    if (this._size) {
      return this._size;
    }

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

  resetMargins() {
    if (
      !!this.style.marginTop ||
      !!this.style.marginBottom ||
      !!this.style.marginLeft ||
      !!this.style.marginRight
    ) {
      warning(
        false,
        'Margin values are not allowed on Page element. Use padding instead.',
      );

      this.style.marginTop = 0;
      this.style.marginBottom = 0;
      this.style.marginLeft = 0;
      this.style.marginRight = 0;
    }
  }

  applyProps() {
    this.top = 0;
    this.left = 0;
    this.style = StyleSheet.resolve(this.props.style);

    this.resetMargins();

    this.layout.setWidth(this.size.width);

    // Add some padding if ruler present, so we can see the whole page inside it
    const rulerWidth = this.getRulerWidth();
    const { paddingTop = 0, paddingLeft = 0 } = this.style;

    if (this.hasHorizontalRuler()) {
      this.style.paddingTop = paddingTop + rulerWidth;
    }

    if (this.hasVerticalRuler()) {
      this.style.paddingLeft = paddingLeft + rulerWidth;
    }

    super.applyProps();
  }

  addDynamicChild(parent, elements) {
    if (!elements) return;
    const children = Array.isArray(elements) ? elements : [elements];

    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const { type, props } = child;

      if (typeof child === 'string') {
        const instance = new TextInstance(this.root, child);
        parent.appendChild(instance);
      } else if (type !== Fragment) {
        const instance = createInstance(child, this.root);
        parent.appendChild(instance);
        instance.applyProps();
        this.addDynamicChild(instance, props.children);
      } else {
        this.addDynamicChild(parent, props.children);
      }
    }
  }

  renderDynamicNodes(props, cb) {
    const listToExplore = this.children.slice(0);

    while (listToExplore.length > 0) {
      const node = listToExplore.shift();
      const condition = cb ? cb(node) : true;

      if (condition && node.props.render) {
        node.removeAllChilds();
        const elements = node.props.render(props);
        this.addDynamicChild(node, elements);
        if (!node.fixed) node.props.render = null;
        continue;
      }

      if (node.children) {
        listToExplore.push(...node.children);
      }
    }
  }

  nodeWillWrap(props) {
    this.renderDynamicNodes(props);
    this.calculateLayout();
  }

  onNodeSplit(height, clone) {
    clone.marginTop = 0;
    this.marginBottom = 0;
    this.calculateLayout();
  }

  update(newProps) {}

  clone() {
    const clone = super.clone();
    clone._size = this.size;
    return clone;
  }

  async render() {
    const { instance } = this.root;

    this.height = this.size.height;
    this.calculateLayout();

    instance.addPage({
      size: [this.size.width, this.size.height],
      margin: 0,
    });

    if (this.style.backgroundColor) {
      instance
        .fillColor(this.style.backgroundColor)
        .rect(0, 0, this.size.width, this.size.height)
        .fill();
    }

    await this.renderChildren();

    if (this.props.debug) this.debug();

    this.renderRuler();
  }
}

Object.assign(Page.prototype, Ruler);

export default Page;
