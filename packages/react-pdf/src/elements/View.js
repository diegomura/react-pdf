import Base from './Base';
import { toRGB } from '../utils/colors';
import { pdfObject, pdfStream } from '../utils/pdf';

class View extends Base {
  async render() {
    const { left, top, width, height } = this.getAbsoluteLayout();
    const { backgroundColor } = this.style;

    this.layout.setPadding(8, 50);

    const rect = [
      '/DeviceRGB cs',
      backgroundColor ? `${toRGB(backgroundColor)} scn` : '',
      backgroundColor ? `${left} ${top} ${width} ${height} re` : '',
      backgroundColor ? 'f' : '',
    ].join('\n');

    return super.render(pdfObject(this.id, pdfStream(rect)) + '\n');
  }
}

export default View;
