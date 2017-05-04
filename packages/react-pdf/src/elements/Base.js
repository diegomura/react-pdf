import Yoga from 'yoga-layout';
import toPairsIn from 'lodash/fp/toPairsIn';
import isFunction from 'lodash/fp/isFunction';
import upperFirst from 'lodash/fp/upperFirst';

class Base {
  parent = null;
  children = [];

  constructor(props) {
    this.layout = Yoga.Node.create();

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

  // Apply styles for yoga
  applyStyles(styles) {
    const isLayoutFunction = prop =>
      isFunction(this.layout[`set${upperFirst(prop)}`]);

    toPairsIn(styles).map(([prop, value]) => {
      if (isLayoutFunction(prop)) {
        this.layout[`set${upperFirst(prop)}`](value);
      }
    });
  }

  applyProps(props) {
    if (props.style) {
      this.applyStyles(props.style);
    }
  }
}

export default Base;
