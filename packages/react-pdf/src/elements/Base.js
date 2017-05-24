import Yoga from 'yoga-layout';
import toPairsIn from 'lodash.topairsin';
import isFunction from 'lodash.isfunction';
import upperFirst from 'lodash.upperfirst';
import yogaValue from '../utils/yogaValue';

let id = 1;

class Base {
  parent = null;
  children = [];

  constructor(props, root) {
    this.id = id++;
    this.root = root;
    this.offset = null;

    this.props = {
      ...this.constructor.defaultProps,
      ...props,
    };

    this.style = this.props.style;
    this.layout = Yoga.Node.create();

    // Register node with Document to create the reference table
    root.addNode(this);

    if (this.props) {
      this.applyProps(this.props);
    }
  }

  appendChild(child) {
    child.parent = this;
    this.children.push(child);
    this.layout.insertChild(child.layout, this.layout.getChildCount());
  }

  removeChild(child) {
    const index = this.children.indexOf(child);

    child.parent = null;
    this.children.slice(index, 1);
    this.layout.removeChild(child.layout, index);
  }

  applyProps(props) {
    const isLayoutFunction = prop => isFunction(this.layout[prop]);

    if (props.style) {
      toPairsIn(props.style).map(([attribute, value]) => {
        const setter = `set${upperFirst(attribute)}`;

        if (isLayoutFunction(setter)) {
          this.applyStyle(attribute, value);
        }
      });
    }
  }

  applyStyle(attribute, value) {
    const setter = `set${upperFirst(attribute)}`;

    switch (attribute) {
      case 'margin':
      case 'padding':
        this.layout[setter](Yoga.EDGE_ALL, value);
        break;
      default:
        this.layout[setter](yogaValue(attribute, value));
    }
  }

  hasChildren() {
    return Array.isArray(this.children) && this.children.length !== 0;
  }

  getChildrenRefs() {
    if (this.hasChildren()) {
      return this.children.map(child =>
        [child.ref(), ...child.getChildrenRefs()].join(' '),
      );
    }

    return [];
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

  ref() {
    return `${this.id} 0 R`;
  }

  async renderChildren() {
    const childRenders = await Promise.all(
      this.children.map(child => child.render()),
    );
    return childRenders.join('');
  }

  async render(value) {
    // Get current offset and increment it
    this.offset = this.root.addOffset(value.length);

    return [value, await this.renderChildren()].join('');
  }
}

Base.defaultProps = {
  style: {},
};

export default Base;
