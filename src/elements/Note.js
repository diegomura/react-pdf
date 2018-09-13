import Base from './Base';

class Note extends Base {
  static defaultProps = {};

  get name() {
    return 'Note';
  }

  appendChild(child) {
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
  }

  applyProps() {
    super.applyProps();
    this.height = 0;
    this.width = 0;
  }

  async render() {
    const { top, left } = this.getAbsoluteLayout();

    this.root.instance.note(left, top, 0, 0, this.children[0].value);
  }
}

export default Note;
