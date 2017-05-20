import { PDFRenderer, createElement, pdf } from '../src';

export default document => {
  const container = createElement('ROOT');
  const node = PDFRenderer.createContainer(container);

  PDFRenderer.updateContainer(document, node, null);

  return pdf(container).toString();
};
