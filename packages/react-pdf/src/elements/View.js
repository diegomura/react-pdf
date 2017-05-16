import PDFEntry from './PDFEntry';
import { pdfObject, pdfStream } from '../utils/pdf';

class View extends PDFEntry {
  render() {
    const { left, top, width, height } = this.getAbsoluteLayout();

    const rect = [
      '/DeviceRGB cs',
      `${left} ${top} ${width} ${height} re`,
      'S',
    ].join('\n');

    return super.render(
      pdfObject(this.id, pdfStream({ Length: rect.length }, rect)) + '\n',
    );
  }
}

export default View;
