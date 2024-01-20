import PDFOutline from '../outline';

export default {
  initOutline() {
    return (this.outline = new PDFOutline(this, null, null, null));
  },

  endOutline() {
    this.outline.endOutline();
    if (this.outline.children.length > 0) {
      this._root.data.Outlines = this.outline.dictionary;
      return (this._root.data.PageMode = 'UseOutlines');
    }
  }
};
