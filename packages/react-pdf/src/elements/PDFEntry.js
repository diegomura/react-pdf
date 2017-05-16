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
      const setter = `set${upperFirst(prop)}`;

      if (isLayoutFunction(setter)) {
        this.layout[setter](Yoga[value]);
      }
    });
  }

  hasChildren() {
    return Array.isArray(this.children) && this.children.length !== 0;
  }

  getChildrenRefs() {
    if (this.hasChildren()) {
      return this.children.map(child =>
        [child.ref(), ...child.getChildrenRefs()].join(' '));
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
