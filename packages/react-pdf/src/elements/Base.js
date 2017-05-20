let id = 1;

class Base {
  static defaultProps = {
    style: {},
  };

  parent = null;
  children = [];

  constructor(props, root) {
    this.id = id++;
    this.root = root;

    this.props = {
      ...this.constructor.defaultProps,
      ...props,
    };

    this.style = this.props.style;
  }

  appendChild(child) {
    child.parent = this;
    this.children.push(child);
  }

  removeChild(child) {
    const index = this.children.indexOf(child);

    child.parent = null;
    this.children.slice(index, 1);
  }

  ref() {
    return `${this.id} 0 R`;
  }
}

export default Base;
