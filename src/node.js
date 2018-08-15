import fs from 'fs';
import path from 'path';
import {
  pdf,
  View,
  Text,
  Link,
  Page,
  Font,
  Image,
  Document,
  StyleSheet,
  PDFRenderer,
  createElement,
} from './index';

export * from './index';

const renderToStream = async function(element) {
  const container = createElement('ROOT');
  const node = PDFRenderer.createContainer(container);

  PDFRenderer.updateContainer(element, node, null);

  return pdf(container).toBuffer();
};

const renderToFile = async function(element, filePath, callback) {
  const output = await renderToStream(element);
  const stream = fs.createWriteStream(filePath);
  output.pipe(stream);

  await new Promise((resolve, reject) => {
    stream.on('finish', () => {
      if (callback) {
        callback(output, filePath);
      }
      resolve(output);

      console.log(`📝  PDF successfully exported on ${path.resolve(filePath)}`);
    });
    stream.on('error', reject);
  });
};

const render = function(element, filePath, callback) {
  return renderToFile(element, filePath, callback);
};

export default {
  pdf,
  View,
  Text,
  Link,
  Page,
  Font,
  Image,
  Document,
  StyleSheet,
  PDFRenderer,
  createElement,
  renderToStream,
  renderToFile,
  render,
};
