import Base from './Base';

class Note extends Base {
  static defaultProps = {};

  get name() {
    return 'Note';
  }

  appendChild(child) {
    if (child.name !== 'TextInstance') {
      throw new Error('Note only accepts string children');
    }

    if (child) {
      child.parent = this;
      this.children.push(child);
    }
  }

  removeChild(child) {
    const index = this.children.indexOf(child);

    if (index !== -1) {
      child.parent = null;
      this.children.splice(index, 1);
    }

    child.cleanup();
  }

  applyProps() {
    super.applyProps();
    this.height = 0;
    this.width = 0;
  }

  async render() {
    const { top, left } = this.getAbsoluteLayout();
    const value = this.children[0] ? this.children[0].value : '';

    this.root.instance.note(left, top, 0, 0, value);
  }
}

export default Note;
