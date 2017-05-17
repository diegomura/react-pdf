import PDFEntry from './PDFEntry';
import { toRGB } from '../utils/colors';
import { pdfObject, pdfStream } from '../utils/pdf';

class View extends PDFEntry {
  render() {
    const { left, top, width, height } = this.getAbsoluteLayout();
    const { backgroundColor } = this.style;

    const rect = [
      '/DeviceRGB cs',
      backgroundColor ? `${toRGB(backgroundColor)} scn` : '',
      `${left} ${top} ${width} ${height} re`,
      backgroundColor ? 'f' : '',
    ].join('\n');

    return super.render(pdfObject(this.id, pdfStream(rect)) + '\n');
  }
}

export default View;
