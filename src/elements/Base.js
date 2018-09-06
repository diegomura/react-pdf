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
  constructor(root, props) {
    super();

    this.root = root;
    this.props = merge(
      {},
      this.constructor.defaultProps,
      Base.defaultProps,
      props,
    );

    warning(!this.props.styles, '"styles" prop passed instead of "style" prop');
  }

  get page() {
    return this.parent.page;
  }

  get wrap() {
    return this.props.wrap;
  }

  get break() {
    return this.props.break;
  }

  get fixed() {
    return this.props.fixed;
  }

  get absolute() {
    return this.props.style.position === 'absolute';
  }

  set break(value) {
    this.props.break = value;
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

  applyStyle(attribute, value) {
    const setter = `set${upperFirst(attribute)}`;

    switch (attribute) {
      case 'marginTop':
      case 'marginRight':
      case 'marginBottom':
      case 'marginLeft':
      case 'paddingTop':
      case 'paddingRight':
      case 'paddingBottom':
      case 'paddingLeft':
      case 'borderTopWidth':
      case 'borderRightWidth':
      case 'borderBottomWidth':
      case 'borderLeftWidth':
      case 'position':
      case 'top':
      case 'right':
      case 'bottom':
      case 'left':
      case 'width':
      case 'height':
      case 'minHeight':
      case 'maxHeight':
      case 'minWidth':
      case 'maxWidth':
        this[attribute] = value;
        break;
      default:
        if (isFunction(this.layout[setter])) {
          this.layout[setter](value);
        }
    }
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
        .roundedRect(left, top, width, height, borderRadius)
        .fill();
    }
  }

  clone() {
    const clone = new this.constructor(this.root, this.props);

    clone.copyStyle(this);
    clone.style = this.style;
    clone.width = this.width;
    clone.height = this.height;
    clone.calculateLayout();

    return clone;
  }

  onNodeSplit(height, clone) {
    clone.marginTop = 0;
    this.marginBottom = 0;

    if (this.name !== 'Page') {
      clone.paddingTop = 0;
      this.paddingBottom = 0;
    }
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

  async renderChildren() {
    const absoluteChilds = this.children.filter(child => child.absolute);
    const nonAbsoluteChilds = this.children.filter(child => !child.absolute);

    for (let i = 0; i < nonAbsoluteChilds.length; i++) {
      await nonAbsoluteChilds[i].render();
    }

    for (let i = 0; i < absoluteChilds.length; i++) {
      await absoluteChilds[i].render();
    }
  }
}

Base.defaultProps = {
  style: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  minPresenceAhead: 0,
};

Object.assign(Base.prototype, Debug);
Object.assign(Base.prototype, Borders);

export default Base;
