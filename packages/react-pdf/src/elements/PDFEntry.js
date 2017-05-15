import Yoga from 'yoga-layout';
import toPairsIn from 'lodash/fp/toPairsIn';
import isFunction from 'lodash/fp/isFunction';
import upperFirst from 'lodash/fp/upperFirst';
import Base from './Base';

class PDFObject extends Base {
  constructor(props, root) {
    super(props, root);

    this.offset = null;
    this.layout = Yoga.Node.create();

    // Register node with Document to create the reference table
    root.addNode(this);

    if (props) {
      this.applyProps(props);
    }
  }

  appendChild(child) {
    super.appendChild(child);
    this.layout.insertChild(child.layout, this.layout.getChildCount());
  }

  removeChild(child) {
    super.removeChild(child);

    const index = this.children.indexOf(child);

    this.layout.removeChild(child.layout, index);
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

export default PDFObject;
