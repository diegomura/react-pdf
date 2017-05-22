import Base from './Base';
import { toRGB } from '../utils/colors';
import { pdfObject, pdfStream } from '../utils/pdf';

class Text extends Base {
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

  async render() {
    const { fontSize = 18, color = 'black' } = this.style;
    const { left, top, height } = this.getAbsoluteLayout();

    const text = [
      '/DeviceRGB cs',
      `${toRGB(color)} scn`,
      'BT',
      `/F1 ${fontSize} Tf`,
      `1 0 0 -1 ${left} ${top + height} Tm`,
      `(${this.children})Tj`,
      'ET',
    ].join('\n');

    const stream = pdfObject(this.id, pdfStream(text)) + '\n';

    this.offset = this.root.addOffset(stream.length);

    return stream;
  }
}

export default Text;
