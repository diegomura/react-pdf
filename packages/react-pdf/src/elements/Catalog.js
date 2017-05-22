import Base from './Base';
import Pages from './Pages';
import { pdfObject } from '../utils/pdf';

class Catalog extends Base {
  constructor(props, root) {
    super(props, root);

    this.pages = new Pages(null, root);
    this.pages.parent = this;

    this.children = [this.pages];
  }

  appendChild(child) {
    this.pages.appendChild(child);
  }

  async render() {
    return super.render(
      pdfObject(this.id, {
        Type: '/Catalog',
        Pages: this.pages.ref(),
      }) + '\n',
    );
  }
}

export default Catalog;
