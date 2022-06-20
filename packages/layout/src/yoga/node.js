import Yoga from '@react-pdf/yoga';

import * as CONSTANTS from './constants';

class Node {
  constructor(config) {
    this.float = null;
    this.parent = null;
    this.children = [];
    this.yogaNode = Yoga.Node.createWithConfig(config);
  }

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

  calculateLayout = () => {
    this.yogaNode.calculateLayout();
  };

  copyStyle = (...args) => {
    this.yogaNode.copyStyle(...args);
  };

  free = (...args) => {
    this.yogaNode.free(...args);
  };

  freeRecursive = (...args) => {
    this.yogaNode.freeRecursive(...args);
  };

  getAlignContent = (...args) => {
    return this.yogaNode.getAlignContent(...args);
  };

  getAlignItems = (...args) => {
    return this.yogaNode.getAlignItems(...args);
  };

  getAlignSelf = (...args) => {
    return this.yogaNode.getAlignSelf(...args);
  };

  getAspectRatio = (...args) => {
    return this.yogaNode.getAspectRatio(...args);
  };

  getBorder = (...args) => {
    return this.yogaNode.getBorder(...args);
  };

  getChild = (...args) => {
    return this.yogaNode.getChild(...args);
  };

  getChildCount = (...args) => {
    return this.yogaNode.getChildCount(...args);
  };

  getComputedBorder = (...args) => {
    return this.yogaNode.getComputedBorder(...args);
  };

  getComputedBottom = (...args) => {
    return this.yogaNode.getComputedBottom(...args);
  };

  getComputedHeight = (...args) => {
    return this.yogaNode.getComputedHeight(...args);
  };

  getComputedLayout = (...args) => {
    return this.yogaNode.getComputedLayout(...args);
  };

  getComputedLeft = (...args) => {
    return this.yogaNode.getComputedLeft(...args);
  };

  getComputedMargin = (...args) => {
    return this.yogaNode.getComputedMargin(...args);
  };

  getComputedPadding = (...args) => {
    return this.yogaNode.getComputedPadding(...args);
  };

  getComputedRight = (...args) => {
    return this.yogaNode.getComputedRight(...args);
  };

  getComputedTop = (...args) => {
    return this.yogaNode.getComputedTop(...args);
  };

  getComputedWidth = (...args) => {
    return this.yogaNode.getComputedWidth(...args);
  };

  getDisplay = (...args) => {
    return this.yogaNode.getDisplay(...args);
  };

  getFlexBasis = (...args) => {
    return this.yogaNode.getFlexBasis(...args);
  };

  getFlexDirection = (...args) => {
    return this.yogaNode.getFlexDirection(...args);
  };

  getFlexGrow = (...args) => {
    return this.yogaNode.getFlexGrow(...args);
  };

  getFlexShrink = (...args) => {
    return this.yogaNode.getFlexShrink(...args);
  };

  getFlexWrap = (...args) => {
    return this.yogaNode.getFlexWrap(...args);
  };

  getHeight = (...args) => {
    return this.yogaNode.getHeight(...args);
  };

  getJustifyContent = (...args) => {
    return this.yogaNode.getJustifyContent(...args);
  };

  getMargin = (...args) => {
    return this.yogaNode.getMargin(...args);
  };

  getMaxHeight = (...args) => {
    return this.yogaNode.getMaxHeight(...args);
  };

  getMaxWidth = (...args) => {
    return this.yogaNode.getMaxWidth(...args);
  };

  getMinHeight = (...args) => {
    return this.yogaNode.getMinHeight(...args);
  };

  getMinWidth = (...args) => {
    return this.yogaNode.getMinWidth(...args);
  };

  getOverflow = (...args) => {
    return this.yogaNode.getOverflow(...args);
  };

  getPadding = (...args) => {
    return this.yogaNode.getPadding(...args);
  };

  getPosition = (...args) => {
    return this.yogaNode.getPosition(...args);
  };

  getPositionType = (...args) => {
    return this.yogaNode.getPositionType(...args);
  };

  getWidth = (...args) => {
    return this.yogaNode.getWidth(...args);
  };

  insertChild = (child, index) => {
    this.children[index] = child;
    child.setParent(this);
    this.yogaNode.insertChild(child.yogaNode, index);
  };

  isDirty = (...args) => {
    return this.yogaNode.isDirty(...args);
  };

  markDirty = (...args) => {
    return this.yogaNode.markDirty(...args);
  };

  removeChild = child => {
    this.children = this.children.filter(c => c !== child);
    this.yogaNode.removeChild(child.yogaNode);
  };

  reset = (...args) => {
    this.yogaNode.reset(...args);
  };

  setAlignContent = (...args) => {
    this.yogaNode.setAlignContent(...args);
  };

  setAlignItems = (...args) => {
    this.yogaNode.setAlignItems(...args);
  };

  setAlignSelf = (...args) => {
    this.yogaNode.setAlignSelf(...args);
  };

  setAspectRatio = (...args) => {
    this.yogaNode.setAspectRatio(...args);
  };

  setBorder = (...args) => {
    this.yogaNode.setBorder(...args);
  };

  setDisplay = (...args) => {
    this.yogaNode.setDisplay(...args);
  };

  setFlex = (...args) => {
    this.yogaNode.setFlex(...args);
  };

  setFlexBasis = (...args) => {
    this.yogaNode.setFlexBasis(...args);
  };

  setFlexBasisPercent = (...args) => {
    this.yogaNode.setFlexBasisPercent(...args);
  };

  setFlexDirection = (...args) => {
    this.yogaNode.setFlexDirection(...args);
  };

  setFlexGrow = (...args) => {
    this.yogaNode.setFlexGrow(...args);
  };

  setFlexShrink = (...args) => {
    this.yogaNode.setFlexShrink(...args);
  };

  setFlexWrap = (...args) => {
    this.yogaNode.setFlexWrap(...args);
  };

  setHeight = (...args) => {
    this.yogaNode.setHeight(...args);
  };

  setHeightAuto = (...args) => {
    this.yogaNode.setHeightAuto(...args);
  };

  setHeightPercent = (...args) => {
    this.yogaNode.setHeightPercent(...args);
  };

  setJustifyContent = (...args) => {
    this.yogaNode.setJustifyContent(...args);
  };

  setMargin = (...args) => {
    this.yogaNode.setMargin(...args);
  };

  setMarginAuto = (...args) => {
    this.yogaNode.setMarginAuto(...args);
  };

  setMarginPercent = (...args) => {
    this.yogaNode.setMarginPercent(...args);
  };

  setMaxHeight = (...args) => {
    this.yogaNode.setMaxHeight(...args);
  };

  setMaxHeightPercent = (...args) => {
    this.yogaNode.setMaxHeightPercent(...args);
  };

  setMaxWidth = (...args) => {
    this.yogaNode.setMaxWidth(...args);
  };

  setMaxWidthPercent = (...args) => {
    this.yogaNode.setMaxWidthPercent(...args);
  };

  setMeasureFunc = (...args) => {
    this.yogaNode.setMeasureFunc(...args);
  };

  setMinHeight = (...args) => {
    this.yogaNode.setMinHeight(...args);
  };

  setMinHeightPercent = (...args) => {
    this.yogaNode.setMinHeightPercent(...args);
  };

  setMinWidth = (...args) => {
    this.yogaNode.setMinWidth(...args);
  };

  setMinWidthPercent = (...args) => {
    this.yogaNode.setMinWidthPercent(...args);
  };

  setOverflow = (...args) => {
    this.yogaNode.setOverflow(...args);
  };

  setPadding = (...args) => {
    this.yogaNode.setPadding(...args);
  };

  setPaddingPercent = (...args) => {
    this.yogaNode.setPaddingPercent(...args);
  };

  setPosition = (...args) => {
    this.yogaNode.setPosition(...args);
  };

  setPositionPercent = (...args) => {
    this.yogaNode.setPositionPercent(...args);
  };

  setPositionType = (...args) => {
    this.yogaNode.setPositionType(...args);
  };

  setWidth = (...args) => {
    this.yogaNode.setWidth(...args);
  };

  setWidthAuto = (...args) => {
    this.yogaNode.setWidthAuto(...args);
  };

  setWidthPercent = (...args) => {
    this.yogaNode.setWidthPercent(...args);
  };

  unsetMeasureFun = (...args) => {
    this.yogaNode.unsetMeasureFun(...args);
  };
}

export default Node;
