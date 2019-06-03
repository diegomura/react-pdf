import PDFDocument from '@react-pdf/pdfkit';

import addMetadata from './addMetadata';

const render = root => {
  const instance = new PDFDocument({ autoFirstPage: false });

  // Temp content
  instance.addPage({ size: [400, 600], margin: 0 });

  addMetadata(instance)(root);

  instance.end();
  // Font.reset();

  return instance;
};

export default render;
