import Base from './Base';
import { pdfObject } from './utils';

class Font extends Base {
  constructor(props, root) {
    super(props, root);

    this.name = 'F1';
  }

  render() {
    const font = pdfObject(this.id, {
      Type: '/Font',
      Subtype: '/Type1',
      Name: `/${this.name}`,
      BaseFont: '/Helvetica',
    }) + '\n';

    this.offset = this.root.addOffset(font.length);

    return font;
  }
}

export default Font;
