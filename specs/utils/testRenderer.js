import { PDFRenderer, createElement, pdf } from '../src';

export default async document => {
  const container = createElement('ROOT');
  const node = PDFRenderer.createContainer(container);

  PDFRenderer.updateContainer(document, node, null);

  const string = await pdf(container).toString();
  return string;
};
