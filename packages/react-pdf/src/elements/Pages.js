import Base from './Base';
import { pdfObject } from '../utils/pdf';

class Pages extends Base {
  render() {
    const childObjects = this.children.map(child => child.ref());

    return super.render(
      pdfObject(this.id, {
        Type: '/Pages',
        Kids: `[${childObjects.join(' ')}]`,
        Count: this.children.length,
      }) + '\n',
    );
  }
}

export default Pages;
