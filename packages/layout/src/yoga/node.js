import Yoga from '@react-pdf/yoga';

import * as CONSTANTS from './constants';

class Node {
  constructor(config) {
    this.float = null;
    this.parent = null;
    this.children = [];
    this.yogaNode = Yoga.Node.createWithConfig(config);

    for (let i = 0; i < CONSTANTS.YOGA_METHODS.length; i += 1) {
      const method = CONSTANTS.YOGA_METHODS[i];
      this[method] = (...args) => this.yogaNode[method](...args);
    }
  }

  getChildren = () => this.children;

  setParent = parent => {
    this.parent = parent;
  };

  getParent = () => {
    return this.parent;
  };

  getSiblings = () => {
    const parent = this.getParent();
    return parent.getChildren().filter(c => c !== this);
  };

  insertChild = (child, index) => {
    this.children[index] = child;
    child.setParent(this);
    this.yogaNode.insertChild(child.yogaNode, index);
  };

  removeChild = child => {
    this.children = this.children.filter(c => c !== child);
    this.yogaNode.removeChild(child.yogaNode);
  };

  setFloat = value => {
    this.float = value;

    const top = this.getPosition(Yoga.EDGE_TOP).value || 0;
    const left = this.getPosition(Yoga.EDGE_LEFT).value || 0;
    const right = this.getPosition(Yoga.EDGE_RIGHT).value || 0;

    this.yogaNode.setPositionType(Yoga.POSITION_TYPE_ABSOLUTE);
    this.yogaNode.setPosition(Yoga.EDGE_TOP, top);

    if (value === CONSTANTS.FLOAT_LEFT)
      this.yogaNode.setPosition(Yoga.EDGE_LEFT, left);

    if (value === CONSTANTS.FLOAT_RIGHT)
      this.yogaNode.setPosition(Yoga.EDGE_RIGHT, right);
  };

  isFloat = () => !!this.float;

  getFloat = () => this.float;

  getExcludeRect = () => {
    const marginTop = this.getMargin(Yoga.EDGE_TOP).value || 0;
    const marginBottom = this.getMargin(Yoga.EDGE_BOTTOM).value || 0;
    const marginLeft = this.getMargin(Yoga.EDGE_LEFT).value || 0;
    const marginRight = this.getMargin(Yoga.EDGE_RIGHT).value || 0;

    const width = this.getComputedWidth() + marginLeft + marginRight;
    const height = this.getComputedHeight() + marginTop + marginBottom;

    const left = this.getPosition(Yoga.EDGE_LEFT).value || 0;
    const right = this.getPosition(Yoga.EDGE_RIGHT).value || 0;

    const top = this.getPosition(Yoga.EDGE_TOP).value || 0;

    return { top, left, right, height, width };
  };
}

export default Node;
