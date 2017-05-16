import PDFEntry from './PDFEntry';
import { pdfObject } from '../utils/pdf';

class Catalog extends PDFEntry {
  render() {
    return super.render(
      pdfObject(this.id, {
        Type: '/Catalog',
        Pages: this.children[0].ref(),
      }) + '\n',
    );
  }
}

export default Catalog;
