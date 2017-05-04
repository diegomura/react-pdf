import Base from './Base';
import { pdfObject } from './utils';

class Catalog extends Base {
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
