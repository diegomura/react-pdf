import fs from 'fs';
import path from 'path';
import { PDFRenderer, createElement, pdf } from '@react-pdf/core';

export default {
  async render(element, filePath, callback) {
    const container = createElement('ROOT');
    const node = PDFRenderer.createContainer(container);

    PDFRenderer.updateContainer(element, node, null);

    const output = await pdf(container).toBuffer();
    const stream = fs.createWriteStream(filePath);
    output.pipe(stream);

    await new Promise((resolve, reject) => {
      stream.on('finish', () => {
        if (callback) {
          callback(output, filePath);
        }
        resolve(output);

        console.log(
          `📝  PDF successfuly exported on ${path.resolve(filePath)}`,
        );
      });
      stream.on('error', reject);
    });
  },
};
