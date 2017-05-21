import Base from './Base';
import { pdfObject, pdfDictionary } from '../utils/pdf';

class Resources extends Base {
  render() {
    const { font } = this.root;

    const resources =
      pdfObject(this.id, {
        ProcSet: '[/PDF/Text]',
        Font: pdfDictionary({ [font.name]: font.ref() }, true),
      }) + '\n';

    this.offset = this.root.addOffset(resources.length);

    return resources;
  }
}

export default Resources;
