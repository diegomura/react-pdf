import Yoga from 'yoga-layout';
import toPairsIn from 'lodash.topairsin';
import isFunction from 'lodash.isfunction';
import upperFirst from 'lodash.upperfirst';
import Node from './Node';
import pick from 'lodash.pick';
import merge from 'lodash.merge';
import warning from 'fbjs/lib/warning';
import StyleSheet from '../stylesheet';
import Debug from '../mixins/debug';
import Borders from '../mixins/borders';
import { inheritedProperties } from '../utils/styles';

class Base extends Node {
  static defaultProps = {
    style: {},
    orphan: true,
  };

  constructor(root, props) {
    super();

    this.root = root;
    this.parent = null;
    this.children = [];

    this.props = merge(
      {},
      this.constructor.defaultProps,
      Base.defaultProps,
      props,
    );

    warning(!this.props.styles, '"styles" prop passed instead of "style" prop');

    this.layout = Yoga.Node.createDefault();
    this.canBeSplitted = false;
  }

  appendChild(child) {
    if (child) {
      child.parent = this;
      this.children.push(child);
      this.layout.insertChild(child.layout, this.layout.getChildCount());
    }
  }

  removeChild(child) {
    const index = this.children.indexOf(child);

    if (index !== -1) {
      child.parent = null;
      this.children.splice(index, 1);
      this.layout.removeChild(child.layout);
    }
  }

  moveTo(parent) {
    this.reset();
    this.parent.removeChild(this);
    parent.appendChild(this);
  }

  applyProps() {
    const page = this.getPage();
    const pageSize = page.getSize();

    this.style =
      this.style ||
      StyleSheet.resolve(this.props.style, {
        width: pageSize[0],
        height: pageSize[1],
        orientation: page.getOrientation(),
      });

    toPairsIn(this.style).map(([attribute, value]) => {
      this.applyStyle(attribute, value);
    });

    this.children.forEach(child => {
      if (child.applyProps) {
        child.applyProps();
      }
    });
  }

  applyStyle(attribute, value) {
    const setter = `set${upperFirst(attribute)}`;

    switch (attribute) {
      case 'marginTop':
        this.layout.setMargin(Yoga.EDGE_TOP, this.marginTop || value);
        break;
      case 'marginRight':
        this.layout.setMargin(Yoga.EDGE_RIGHT, this.marginRight || value);
        break;
      case 'marginBottom':
        this.layout.setMargin(Yoga.EDGE_BOTTOM, this.marginBottom || value);
        break;
      case 'marginLeft':
        this.layout.setMargin(Yoga.EDGE_LEFT, this.marginLeft || value);
        break;
      case 'paddingTop':
        this.layout.setPadding(Yoga.EDGE_TOP, this.paddingTop || value);
        break;
      case 'paddingRight':
        this.layout.setPadding(Yoga.EDGE_RIGHT, this.paddingRight || value);
        break;
      case 'paddingBottom':
        this.layout.setPadding(Yoga.EDGE_BOTTOM, this.paddingBottom || value);
        break;
      case 'paddingLeft':
        this.layout.setPadding(Yoga.EDGE_LEFT, this.paddingLeft || value);
        break;
      case 'borderTopWidth':
        this.layout.setBorder(Yoga.EDGE_TOP, value);
        break;
      case 'borderRightWidth':
        this.layout.setBorder(Yoga.EDGE_RIGHT, value);
        break;
      case 'borderBottomWidth':
        this.layout.setBorder(Yoga.EDGE_BOTTOM, value);
        break;
      case 'borderLeftWidth':
        this.layout.setBorder(Yoga.EDGE_LEFT, value);
        break;
      case 'position':
        this.layout.setPositionType(
          value === 'absolute'
            ? Yoga.POSITION_TYPE_ABSOLUTE
            : Yoga.POSITION_TYPE_RELATIVE,
        );
        break;
      case 'top':
        this.setPosition(Yoga.EDGE_TOP, this.top || value);
        break;
      case 'right':
        this.setPosition(Yoga.EDGE_RIGHT, this.right || value);
        break;
      case 'bottom':
        this.setPosition(Yoga.EDGE_BOTTOM, this.bottom || value);
        break;
      case 'left':
        this.setPosition(Yoga.EDGE_LEFT, this.left || value);
        break;
      case 'width':
        this.layout.setWidth(
          this.width - this.marginLeft - this.marginRight || value,
        );
        break;
      case 'height':
        this.layout.setHeight(
          this.height - this.marginTop - this.marginBottom || value,
        );
        break;
      default:
        if (isFunction(this.layout[setter])) {
          this.layout[setter](value);
        }
    }
  }

  setPosition(edge, value) {
    const isPercent = /^(\d+)?%$/g.exec(value);

    if (isPercent) {
      this.layout.setPositionPercent(edge, parseInt(isPercent[1], 10));
    } else {
      this.layout.setPosition(edge, value);
    }
  }

  isAbsolute() {
    return this.props.style.position === 'absolute';
  }

  getPage() {
    return this.parent.getPage();
  }

  getAbsoluteLayout() {
    const parentMargin = this.parent.margin || { left: 0, top: 0 };
    const parentLayout = this.parent.getAbsoluteLayout
      ? this.parent.getAbsoluteLayout()
      : { left: 0, top: 0 };

    return {
      left: this.left + parentMargin.left + parentLayout.left,
      top: this.top + parentMargin.top + parentLayout.top,
      height: this.height,
      width: this.width,
    };
  }

  getWidth() {
    return (
      this.layout.getComputedWidth() +
      this.layout.getComputedMargin(Yoga.EDGE_LEFT) +
      this.layout.getComputedMargin(Yoga.EDGE_RIGTH) -
      this.layout.getComputedPadding(Yoga.EDGE_LEFT) -
      this.layout.getComputedPadding(Yoga.EDGE_RIGTH)
    );
  }

  getHeight() {
    return (
      this.layout.getComputedHeight() +
      this.layout.getComputedMargin(Yoga.EDGE_TOP) +
      this.layout.getComputedMargin(Yoga.EDGE_BOTTOM) -
      this.layout.getComputedPadding(Yoga.EDGE_TOP) -
      this.layout.getComputedPadding(Yoga.EDGE_BOTTOM)
    );
  }

  getComputedStyles() {
    let element = this.parent;
    let inheritedStyles = {};

    while (element && element.parent) {
      inheritedStyles = {
        ...element.parent.style,
        ...element.style,
        ...inheritedStyles,
      };
      element = element.parent;
    }

    return {
      ...pick(inheritedStyles, inheritedProperties),
      ...this.style,
    };
  }

  drawBackgroundColor() {
    const margin = this.margin;
    const { left, top, width, height } = this.getAbsoluteLayout();
    const { backgroundColor } = this.getComputedStyles();

    if (backgroundColor) {
      this.root
        .fillColor(backgroundColor)
        .rect(
          left + margin.left,
          top + margin.top,
          width - margin.left - margin.right,
          height - margin.top - margin.bottom,
        )
        .fill();
    }
  }

  clone() {
    const clone = new this.constructor(this.root, this.props);

    clone.width = this.width;
    clone.style = this.style;
    clone.parent = this.parent;
    clone.height = this.height;
    clone.margin = this.margin;
    clone.padding = this.padding;

    return clone;
  }

  async renderChildren(page) {
    const absoluteChilds = this.children.filter(child => child.isAbsolute());
    const nonAbsoluteChilds = this.children.filter(
      child => !child.isAbsolute(),
    );

    for (let i = 0; i < nonAbsoluteChilds.length; i++) {
      await nonAbsoluteChilds[i].render(page);
    }

    for (let i = 0; i < absoluteChilds.length; i++) {
      await absoluteChilds[i].render(page);
    }
  }
}

Object.assign(Base.prototype, Debug);
Object.assign(Base.prototype, Borders);

export default Base;
