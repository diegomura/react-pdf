import { Fragment } from 'react';
import warning from 'fbjs/lib/warning';
import Base from './Base';
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

      if (type !== Fragment) {
        const instance = createInstance(child, this.root);
        parent.appendChild(instance);
        instance.applyProps();
        this.addDynamicChild(instance, props.children);
      } else {
        this.addDynamicChild(parent, props.children);
      }
    }
  }

  renderDynamicNodes(pageNumber) {
    const listToExplore = this.children.slice(0);

    while (listToExplore.length > 0) {
      const node = listToExplore.shift();

      if (node.props.render) {
        const elements = node.props.render({ pageNumber });
        this.addDynamicChild(node, elements);

        continue;
      }

      if (node.children) {
        listToExplore.push(...node.children);
      }
    }
  }

  clearDynamicNodes() {
    const listToExplore = this.children.slice(0);

    while (listToExplore.length > 0) {
      const node = listToExplore.shift();

      if (node.props.render) {
        node.removeAllChilds();
      }

      if (node.children) {
        listToExplore.push(...node.children);
      }
    }
  }

  nodeWillWrap({ pageNumber }) {
    this.clearDynamicNodes();
    this.renderDynamicNodes(pageNumber);
    this.calculateLayout();
  }

  onNodeSplit(height, clone) {
    clone.marginTop = 0;
    this.height = height;
    this.marginBottom = 0;
  }

  update(newProps) {
    // this.props = { ...Page.defaultProps, ...newProps };
  }

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
      layout: this.props.orientation,
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
