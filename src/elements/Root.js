import PDFDocument from '@react-pdf/pdfkit';

class Root {
  constructor() {
    // this.isDirty = false;
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

  // markDirty() {
  //   this.isDirty = true;
  // }

  updateStubs() {
    this.document.updateStubs();
  }

  async layout() {
    await this.document.layout();
  }

  async render() {
    this.instance = new PDFDocument({ autoFirstPage: false });
    await this.document.render();
    // this.isDirty = false;
  }
}

export default Root;
