import PDFOutline from '../outline';

export default {
  initOutline() {
    this.outline = new PDFOutline(this, null, null, null);
  },

  endOutline() {
    this.outline.endOutline();
    if (this.outline.children.length > 0) {
      this._root.data.Outlines = this.outline.dictionary;
      return (this._root.data.PageMode =
        this._root.data.PageMode || 'UseOutlines');
    }
  },
};
