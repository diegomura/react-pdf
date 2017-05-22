import Base from './Base';
import { pdfObject, pdfStream } from '../utils/pdf';

class GraphicState extends Base {
  render() {
    const stream = `1 0 0 -1 0 ${this.parent.layout.getComputedHeight()} cm`;

    const graphicState = pdfObject(this.id, pdfStream(stream)) + '\n';

    this.offset = this.root.addOffset(graphicState.length);

    return graphicState;
  }
}

export default GraphicState;
