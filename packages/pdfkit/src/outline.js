const DEFAULT_OPTIONS = {
  top: 0,
  left: 0,
  zoom: 0,
  fit: true, // Default to Fit for backward compatibility
  pageNumber: null,
  expanded: false,
};

class PDFOutline {
  constructor(document, parent, title, dest, options = DEFAULT_OPTIONS) {
    this.document = document;
    this.options = options;
    this.outlineData = {};

    if (dest !== null) {
      const destWidth = dest.data.MediaBox[2];
      const destHeight = dest.data.MediaBox[3];
      const top = destHeight - (options.top || 0);
      const left = destWidth - (options.left || 0);
      const zoom = options.zoom || 0;

      this.outlineData['Dest'] = options.fit
        ? [dest, 'Fit']
        : [dest, 'XYZ', left, top, zoom];
    }

    if (parent !== null) {
      this.outlineData['Parent'] = parent;
    }

    if (title !== null) {
      this.outlineData['Title'] = new String(title);
    }

    this.dictionary = this.document.ref(this.outlineData);
    this.children = [];
  }

  addItem(title, options = DEFAULT_OPTIONS) {
    const pages = this.document._root.data.Pages.data.Kids;
    const dest =
      options.pageNumber != null
        ? pages[options.pageNumber]
        : this.document.page.dictionary;

    const result = new PDFOutline(
      this.document,
      this.dictionary,
      title,
      dest,
      options,
    );
    this.children.push(result);

    return result;
  }

  endOutline() {
    if (this.children.length > 0) {
      if (this.options.expanded) {
        this.outlineData.Count = this.children.length;
      }

      const first = this.children[0],
        last = this.children[this.children.length - 1];
      this.outlineData.First = first.dictionary;
      this.outlineData.Last = last.dictionary;

      for (let i = 0, len = this.children.length; i < len; i++) {
        const child = this.children[i];
        if (i > 0) {
          child.outlineData.Prev = this.children[i - 1].dictionary;
        }
        if (i < this.children.length - 1) {
          child.outlineData.Next = this.children[i + 1].dictionary;
        }
        child.endOutline();
      }
    }

    return this.dictionary.end();
  }
}

export default PDFOutline;
