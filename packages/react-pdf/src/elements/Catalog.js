import PDFEntry from './PDFEntry';
import { pdfObject } from '../utils/pdf';

class Catalog extends PDFEntry {
  render() {
    return super.render(
      pdfObject(this.id, {
        Type: '/Catalog',
        Pages: `${this.children[0].id} 0 R`,
      }) + '\n',
    );
  }
}

export default Catalog;
