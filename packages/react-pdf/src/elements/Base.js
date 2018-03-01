import Yoga from 'yoga-layout';
import toPairsIn from 'lodash.topairsin';
import isFunction from 'lodash.isfunction';
import upperFirst from 'lodash.upperfirst';
import pick from 'lodash.pick';
import warning from 'fbjs/lib/warning';
import StyleSheet from '../stylesheet';
import Debug from '../mixins/debug';
import Borders from '../mixins/borders';
import { inheritedProperties } from '../utils/styles';
import { splitElement } from '../utils/wrapping';

class Base {
  parent = null;
  children = [];

  static defaultProps = {
    style: {},
  };

  constructor(root, props) {
    this.root = root;

    this.props = {
      ...this.constructor.defaultProps,
      ...Base.defaultProps,
      ...props,
    };

    warning(!this.props.styles, '"styles" prop passed instead of "style" prop');

    this.layout = Yoga.Node.createDefault();
    this.canBeSplitted = false;
  }

  appendChild(child) {
    child.parent = this;
    this.children.push(child);
    this.layout.insertChild(child.layout, this.layout.getChildCount());
  }

  removeChild(child) {
    const index = this.children.indexOf(child);

    child.parent = null;
    this.children.splice(index, 1);
    this.layout.removeChild(child.layout);
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
        this.layout.setMargin(Yoga.EDGE_TOP, value);
        break;
      case 'marginRight':
        this.layout.setMargin(Yoga.EDGE_RIGHT, value);
        break;
      case 'marginBottom':
        this.layout.setMargin(Yoga.EDGE_BOTTOM, value);
        break;
      case 'marginLeft':
        this.layout.setMargin(Yoga.EDGE_LEFT, value);
        break;
      case 'paddingTop':
        this.layout.setPadding(Yoga.EDGE_TOP, value);
        break;
      case 'paddingRight':
        this.layout.setPadding(Yoga.EDGE_RIGHT, value);
        break;
      case 'paddingBottom':
        this.layout.setPadding(Yoga.EDGE_BOTTOM, value);
        break;
      case 'paddingLeft':
        this.layout.setPadding(Yoga.EDGE_LEFT, value);
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
        this.setPosition(Yoga.EDGE_TOP, value);
        break;
      case 'right':
        this.setPosition(Yoga.EDGE_RIGHT, value);
        break;
      case 'bottom':
        this.setPosition(Yoga.EDGE_BOTTOM, value);
        break;
      case 'left':
        this.setPosition(Yoga.EDGE_LEFT, value);
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

  async recalculateLayout() {
    const childs = await Promise.all(
      this.children.map(child => child.recalculateLayout()),
    );
    return childs;
  }

  getPage() {
    return this.parent.getPage();
  }

  getAbsoluteLayout() {
    const myLayout = this.layout.getComputedLayout();

    const parentLayout = this.parent.getAbsoluteLayout
      ? this.parent.getAbsoluteLayout()
      : { left: 0, top: 0 };

    return {
      left: myLayout.left + parentLayout.left,
      top: myLayout.top + parentLayout.top,
      height: myLayout.height,
      width: myLayout.width,
    };
  }

  getPadding() {
    return {
      top: this.layout.getComputedPadding(Yoga.EDGE_TOP),
      right: this.layout.getComputedPadding(Yoga.EDGE_RIGHT),
      bottom: this.layout.getComputedPadding(Yoga.EDGE_BOTTOM),
      left: this.layout.getComputedPadding(Yoga.EDGE_LEFT),
    };
  }

  getMargin() {
    return {
      top: this.layout.getComputedMargin(Yoga.EDGE_TOP),
      right: this.layout.getComputedMargin(Yoga.EDGE_RIGHT),
      bottom: this.layout.getComputedMargin(Yoga.EDGE_BOTTOM),
      left: this.layout.getComputedMargin(Yoga.EDGE_LEFT),
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
    const { left, top, width, height } = this.getAbsoluteLayout();
    const { backgroundColor } = this.getComputedStyles();

    if (backgroundColor) {
      this.root
        .fillColor(backgroundColor)
        .rect(left, top, width, height)
        .fill();
    }
  }

  clone() {
    const clone = new this.constructor(this.root, this.props);

    clone.style = this.style;
    clone.parent = this.parent;
    clone.layout = this.layout;
    clone.children = this.children;

    return clone;
  }

  async fillRemainingSpace(page, element, availableHeight) {
    if (element.canBeSplitted) {
      const getHeight = value => {
        element.setFontSize();
        const elementMargin = element.getMargin();
        const elementPadding = element.getPadding();

        return this.root.heightOfString(value, {
          width:
            this.getWidth() -
            elementMargin.right -
            elementMargin.left -
            elementPadding.right -
            elementPadding.left,
        });
      };

      const newElement = splitElement(element, availableHeight, getHeight);
      await newElement.render();
    } else {
      const renderedChilds = [];

      for (let i = 0; i < element.children.length; i++) {
        const child = element.children[i];
        const childHeight = child.getHeight();

        if (availableHeight >= childHeight) {
          await child.render(page);
          renderedChilds.push(child);

          availableHeight -= childHeight;
        } else {
          break;
        }
      }

      // Remove rendered childs
      renderedChilds.forEach(child => {
        if (!child.props.fixed) {
          element.removeChild(child);
        }
      });
    }
  }

  async renderWrapChildren(page) {
    let i;
    let isFirstElement = true;
    let availableHeight = this.parent.getHeight();

    const renderedChilds = [];

    for (i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      const childHeight = child.getHeight();

      if (child.props.break && !isFirstElement) {
        page.addNewSubpage();
        break;
      } else if (availableHeight >= childHeight) {
        await child.render(page);
        renderedChilds.push(child);

        availableHeight -= childHeight;
      } else {
        // console.log(child.children);
        await this.fillRemainingSpace(page, child, availableHeight);

        page.addNewSubpage();
        break;
      }

      if (!child.props.fixed) {
        isFirstElement = false;
      }
    }

    // Render remaining fixed children
    for (let j = i; j < this.children.length; j++) {
      const child = this.children[j];
      if (child.props.fixed) {
        await child.render(page);
      }
    }

    // Remove rendered childs
    renderedChilds.forEach(child => {
      if (!child.props.fixed) {
        this.removeChild(child);
      }
    });
  }

  async renderPlainChildren(page) {
    for (let i = 0; i < this.children.length; i++) {
      await this.children[i].render(page);
    }
  }

  async renderChildren(page) {
    if (page.props.wrap) {
      await this.renderWrapChildren(page);
    } else {
      await this.renderPlainChildren(page);
    }
  }
}

Object.assign(Base.prototype, Debug);
Object.assign(Base.prototype, Borders);

export default Base;
