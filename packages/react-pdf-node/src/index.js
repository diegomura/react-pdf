import fs from 'fs';
import path from 'path';
import { PDFRenderer, createElement, pdf } from '@react-pdf/core';

export default {
  async render(element, filePath, callback) {
    const container = createElement('ROOT');
    const node = PDFRenderer.createContainer(container);

    PDFRenderer.updateContainer(element, node, null);

    const output = await pdf(container).toBuffer();
    output.pipe(fs.createWriteStream(filePath));

    if (callback) {
      callback(output, filePath);
    }

    console.log(`📝  PDF successfuly exported on ${path.resolve(filePath)}`);
  },
};
