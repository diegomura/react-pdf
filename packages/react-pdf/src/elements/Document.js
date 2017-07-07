class Document {
  children = [];

  constructor(root, props) {
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

  async renderChildren() {
    for (let i = 0; i < this.children.length; i++) {
      await this.children[i].render();
    }
  }

  async render() {
    await this.renderChildren();

    this.root.end();
  }
}

export default Document;
