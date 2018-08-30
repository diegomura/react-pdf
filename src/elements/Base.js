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

const PERCENT = /^(\d+)?%$/g;

class Base extends Node {
  static defaultProps = {
    style: {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
    },
    minPresenceAhead: 0,
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

  get page() {
    return this.parent.page;
  }

  get wrap() {
    return this.props.wrap;
  }

  get fixed() {
    return this.props.fixed;
  }

  get absolute() {
    return this.props.style.position === 'absolute';
  }

  appendChild(child) {
    if (child) {
      child.parent = this;
      this.children.push(child);
      this.layout.insertChild(child.layout, this.layout.getChildCount());
      this.root.markDirty();
    }
  }

  removeChild(child) {
    const index = this.children.indexOf(child);

    if (index !== -1) {
      child.parent = null;
      this.children.splice(index, 1);
      this.layout.removeChild(child.layout);
      this.root.markDirty();
    }
  }

  applyProps() {
    const { size, orientation } = this.page;

    this.style = StyleSheet.resolve(this.props.style, {
      width: size.width,
      height: size.height,
      orientation: orientation,
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

  setDimension(attr, value) {
    const fixedMethod = `set${upperFirst(attr)}`;
    const percentMethod = `${fixedMethod}Percent`;
    const isPercent = PERCENT.exec(value);

    if (isPercent) {
      this.layout[percentMethod](parseInt(isPercent[1], 10));
    } else {
      this.layout[fixedMethod](value);
    }
  }

  setPosition(edge, value) {
    const isPercent = PERCENT.exec(value);

    if (isPercent) {
      this.layout.setPositionPercent(edge, parseInt(isPercent[1], 10));
    } else {
      this.layout.setPosition(edge, value);
    }
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
      case 'height':
        this.setDimension(attribute, value);
        break;
      case 'minHeight':
      case 'maxHeight':
      case 'minWidth':
      case 'maxWidth':
        this.setDimension(attribute, value);
        break;
      default:
        if (isFunction(this.layout[setter])) {
          this.layout[setter](value);
        }
    }
  }

  recalculateLayout() {
    this.children.forEach(child => child.recalculateLayout());
  }

  getAbsoluteLayout() {
    const parent = this.parent;
    const parentMargin = (parent && parent.margin) || { left: 0, top: 0 };
    const parentLayout =
      parent && parent.getAbsoluteLayout
        ? this.parent.getAbsoluteLayout()
        : { left: 0, top: 0 };

    return {
      left: this.left + parentMargin.left + parentLayout.left,
      top: this.top + parentMargin.top + parentLayout.top,
      height: this.height,
      width: this.width,
    };
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
    const styles = this.getComputedStyles();

    // We can't set individual radius for each corner on PDF, so we get the higher
    const borderRadius =
      Math.max(
        styles.borderTopLeftRadius,
        styles.borderTopRightRadius,
        styles.borderBottomRightRadius,
        styles.borderBottomLeftRadius,
      ) || 0;

    if (styles.backgroundColor) {
      this.root.instance
        .fillColor(styles.backgroundColor)
        .roundedRect(
          left + margin.left,
          top + margin.top,
          width - margin.left - margin.right,
          height - margin.top - margin.bottom,
          borderRadius,
        )
        .fill();
    }
  }

  clone() {
    const clone = new this.constructor(this.root, this.props);

    clone.top = this.top;
    clone.left = this.left;
    clone.width = this.width;
    clone.style = this.style;
    clone.parent = this.parent;
    clone.height = this.height;
    clone.margin = this.margin;
    clone.padding = this.padding;

    this.children.forEach(child => clone.appendChild(child.clone()));

    return clone;
  }

  update(newProps) {
    this.props = merge(
      {},
      this.constructor.defaultProps,
      Base.defaultProps,
      newProps,
    );
    this.root.markDirty();
  }

  async renderChildren(page) {
    const absoluteChilds = this.children.filter(child => child.absolute);
    const nonAbsoluteChilds = this.children.filter(child => !child.absolute);

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
