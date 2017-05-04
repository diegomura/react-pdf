import Catalog from './Catalog';
import Font from './Font';
import { pdfDictionary } from './utils';

class Document {
  constructor(props) {
    this.nodes = [];
    this.header = '%PDF-1.7\n';
    this.offset = this.header.length;

    this.font = new Font(null, this);
    this.catalog = new Catalog(props, this);
    this.catalog.parent = this;
  }

  appendChild(child) {
    this.catalog.appendChild(child);
  }

  removeChild(child) {
    this.catalog.removeChild(child);
  }

  addNode(node) {
    this.nodes.push(node);
  }

  addOffset(offset) {
    const currentOffset = this.offset;
    this.offset += offset;

    return currentOffset;
  }

  renderReferenceEntry(node) {
    return `${('0000000000' + node.offset).slice(-10)} 00000 n`;
  }

  renderReferenceTable() {
    const references = this.nodes
      .sort((a, b) => a.id > b.id)
      .map(this.renderReferenceEntry)
      .join('\n') + '\n';

    return [
      'xref',
      `0 ${this.nodes.length + 1}`,
      '0000000000 65535 f',
      references,
    ].join('\n');
  }

  renderTrailer() {
    return [
      'trailer',
      pdfDictionary({
        Size: this.nodes.length,
        Root: `${this.catalog.id} 0 R`,
      }),
      'startxref',
      this.offset,
      '%%EOF',
    ].join('\n');
  }

  render() {
    return [
      this.header,
      this.font.render(),
      this.catalog.render(),
      this.renderReferenceTable(),
      this.renderTrailer(),
    ].join('');
  }
}

export default Document;
