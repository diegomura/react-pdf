import Base from './Base';
import { pdfObject, pdfStream } from '../utils/pdf';

class GraphicState extends Base {
  render() {
    const state = `1 0 0 -1 0 ${this.parent.layout.getComputedHeight()} cm`;

    return pdfObject(this.id, pdfStream(state)) + '\n';
  }
}

export default GraphicState;
