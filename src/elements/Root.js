import PDFDocument from '@react-pdf/pdfkit';

class Root {
  constructor() {
    this.isDirty = false;
    this.document = null;
    this.instance = null;
  }

  get name() {
    return 'Root';
  }

  appendChild(child) {
    this.document = child;
  }

  removeChild() {
    this.document.cleanup();
    this.document = null;
  }

  markDirty() {
    this.isDirty = true;
  }

  cleanup() {
    this.document.cleanup();
  }

  finish() {
    this.document.finish();
  }

  async render() {
    this.instance = new PDFDocument({ autoFirstPage: false });
    await this.document.render();
    this.cleanup();
    this.isDirty = false;
  }
}

export default Root;
