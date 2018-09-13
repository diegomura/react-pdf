class TextInstance {
  constructor(root, value) {
    this.root = root;
    this.value = value;
    this.parent = null;
    this.props = {};
  }

  get name() {
    return 'TextInstance';
  }

  remove() {
    this.parent.removeChild(this);
  }

  clone() {
    return new this.constructor(this.root, this.value);
  }

  update(value) {
    this.value = value;
    this.parent.computed = false;
    this.root.markDirty();
  }
}

export default TextInstance;
