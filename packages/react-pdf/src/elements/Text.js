import Base from './Base';
import { pdfObject, pdfStream } from './utils';

class Text extends Base {
  constructor(props, root) {
    super(props, root);

    this.layout.setWidth(40);
    this.layout.setHeight(40);
  }

  appendChild(child) {
    this.children = child;
  }

  removeChild(child) {
    this.children = null;
  }

  render() {
    const layout = this.layout.getComputedLayout();
    const text = `BT\n/F1 18 Tf\n1 0 0 1 ${layout.left} ${841 - layout.top - layout.height} Tm\n(${this.children})Tj\nET`;
    const stream = pdfObject(
      this.id,
      pdfStream({ Length: text.length }, text),
    ) + '\n';

    this.offset = this.root.addOffset(stream.length);

    return stream;
  }
}

export default Text;
