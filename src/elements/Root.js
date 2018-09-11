import PDFDocument from '@react-pdf/pdfkit';
import { LayoutEngine } from '../layout';
import Font from '../font';

class Root {
  constructor() {
    this.isDirty = false;
    this.document = null;
    this.instance = null;
    this._layoutEngine = null;
  }

  get name() {
    return 'Root';
  }

  get layoutEngine() {
    if (!this._layoutEngine) {
      const hyphenationCallback = Font.getHyphenationCallback();
      this._layoutEngine = new LayoutEngine({ hyphenationCallback });
    }

    return this._layoutEngine;
  }

  appendChild(child) {
    this.document = child;
  }

  markDirty() {
    this.isDirty = true;
  }

  async render() {
    this.instance = new PDFDocument({ autoFirstPage: false });
    await this.document.render();
    this.isDirty = false;
  }
}

export default Root;
