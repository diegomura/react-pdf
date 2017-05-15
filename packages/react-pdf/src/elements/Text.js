import PDFEntry from './PDFEntry';
import { pdfObject, pdfStream } from './utils';

class Text extends PDFEntry {
  constructor(props, root) {
    super(props, root);

    this.layout.setWidth(18);
    this.layout.setHeight(18);
  }

  appendChild(child) {
    this.children = child;
  }

  removeChild(child) {
    this.children = null;
  }

  render() {
    const layout = this.layout.getComputedLayout();

    const text = `BT\n/F1 18 Tf\n1 0 0 -1 ${layout.left} ${layout.top + layout.height} Tm\n(${this.children})Tj\nET`;
    const stream = pdfObject(
      this.id,
      pdfStream({ Length: text.length }, text),
    ) + '\n';

    this.offset = this.root.addOffset(stream.length);

    return stream;
  }
}

export default Text;
