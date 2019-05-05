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
    this.document = null;
  }

  markDirty() {
    this.isDirty = true;
  }

  async render() {
    this.instance = new PDFDocument({ autoFirstPage: false });
    await this.document.render();
    this.cleanup();
    this.isDirty = false;
  }

  cleanup() {
    this.document.cleanup();
  }
}

export default Root;
