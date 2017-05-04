import Base from './Base';
import { pdfObject, pdfDictionary } from './utils';

class Resources extends Base {
  render() {
    const resources = pdfObject(this.id, {
      ProcSet: '[/PDF/Text]',
      Font: pdfDictionary(
        {
          [this.root.font.name]: `${this.root.font.id} 0 R`,
        },
        true,
      ),
    }) + '\n';

    this.offset = this.root.addOffset(resources.length);

    return resources;
  }
}

export default Resources;
