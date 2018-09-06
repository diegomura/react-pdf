class TextInstance {
  constructor(root, value) {
    this.root = root;
    this.value = value;
    this.parent = null;
  }

  get name() {
    return 'TextInstance';
  }

  reset() {
    // noop
  }

  clone() {
    const clone = new this.constructor(this.root, this.value);
    clone.parent = this.parent;
    return clone;
  }

  update(value) {
    this.value = value;
    this.parent.engine.computed = false;
    this.root.markDirty();
  }
}

export default TextInstance;
