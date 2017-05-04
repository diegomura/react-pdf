import Yoga from 'yoga-layout';
import toPairsIn from 'lodash/fp/toPairsIn';
import isFunction from 'lodash/fp/isFunction';
import upperFirst from 'lodash/fp/upperFirst';

let id = 1;

class Base {
  parent = null;
  children = [];

  constructor(props, root) {
    this.id = id++;
    this.root = root;
    this.props = props;
    this.offset = null;
    this.layout = Yoga.Node.create();

    // Register node with Document to create the reference table
    root.addNode(this);

    if (props) {
      this.applyProps(props);
    }
  }

  appendChild(child) {
    child.parent = this;
    this.children.push(child);
    this.layout.insertChild(child.layout, 0);
  }

  removeChild(child) {
    const index = this.children.indexOf(child);

    child.parent = null;
    this.children.slice(index, 1);
    this.layout.removeChild(child.layout, 0);
  }

  applyProps(props) {
    if (props.style) {
      this.applyStyles(props.style);
    }
  }

  applyStyles(styles) {
    const isLayoutFunction = prop =>
      isFunction(this.layout[`set${upperFirst(prop)}`]);

    toPairsIn(styles).map(([prop, value]) => {
      if (isLayoutFunction(prop)) {
        this.layout[`set${upperFirst(prop)}`](Yoga[value]);
      }
    });
  }

  renderChildren() {
    return this.children.map(child => child.render()).join('');
  }

  render(value) {
    // Get current offset and increment it
    this.offset = this.root.addOffset(value.length);

    return [value, this.renderChildren()].join('');
  }
}

export default Base;
