import Base from './Base';
import { pdfObject } from './utils';

class Pages extends Base {
  constructor(props, root) {
    super(props, root);

    this.type = 'Pages';
  }

  render() {
    const childObjects = this.children.map(child => `${child.id} 0 R`);

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
