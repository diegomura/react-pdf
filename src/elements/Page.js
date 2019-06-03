import { Fragment } from 'react';

import Base from './Base';
import Ruler from '../mixins/ruler';
import { createInstance } from './index';
import TextInstance from './TextInstance';

class Page extends Base {
  async addDynamicChild(parent, elements) {
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
