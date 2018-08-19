class TextInstance {
  constructor(root, value) {
    this.root = root;
    this.value = value;
    this.parent = null;
  }

  get name() {
    return 'TextInstance';
  }

  update(value) {
    this.value = value;
    this.parent.engine.computed = false;
    this.root.markDirty();
  }

  reset() {
    // noop
  }
}

export default TextInstance;
