class PDFFont {
  constructor() {}

  encode() {
    throw new Error('Must be implemented by subclasses');
  }

  widthOfString() {
    throw new Error('Must be implemented by subclasses');
  }

  ref() {
    return this.dictionary != null
      ? this.dictionary
      : (this.dictionary = this.document.ref());
  }

  finalize() {
    if (this.embedded || this.dictionary == null) {
      return;
    }

    this.embed();
    this.embedded = true;
  }

  embed() {
    throw new Error('Must be implemented by subclasses');
  }

  lineHeight(size, includeGap = false) {
    const gap = includeGap ? this.lineGap : 0;
    return ((this.ascender + gap - this.descender) / 1000) * size;
  }
}

export default PDFFont;
