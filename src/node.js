import fs from 'fs';
import path from 'path';
import { createElement, pdf, PDFRenderer } from './index';

export * from './index';

export default {
  async renderToStream(element) {
    const container = createElement('ROOT');
    const node = PDFRenderer.createContainer(container);

    PDFRenderer.updateContainer(element, node, null);

    return await pdf(container).toBuffer();
  },
  async renderToFile(element, filePath, callback) {
    const output = await this.renderToStream(element);
    const stream = fs.createWriteStream(filePath);
    output.pipe(stream);

    await new Promise((resolve, reject) => {
      stream.on('finish', () => {
        if (callback) {
          callback(output, filePath);
        }
        resolve(output);

        console.log(
          `📝  PDF successfully exported on ${path.resolve(filePath)}`,
        );
      });
      stream.on('error', reject);
    });
  },
  async render(element, filePath, callback) {
    return await this.renderToFile(element, filePath, callback);
  },
};
