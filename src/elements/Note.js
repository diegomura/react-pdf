import Base from './Base';

class Note extends Base {
  appendChild(child) {
    if (child.name !== 'TextInstance') {
      throw new Error('Note only accepts string children');
    }

    if (child) {
      child.parent = this;
      this.children.push(child);
    }
  }

  async render() {
    const { top, left } = this.getAbsoluteLayout();
    const value = this.children[0] ? this.children[0].value : '';

    this.root.instance.note(left, top, 0, 0, value);
  }
}

export default Note;
