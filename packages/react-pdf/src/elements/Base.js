let id = 1;

class Base {
  parent = null;
  children = [];

  constructor(props, root) {
    this.id = id++;
    this.root = root;
    this.props = props;
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
}

export default Base;
