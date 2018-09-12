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
  createInstance,
} from './index';

export * from './index';

const renderToStream = function(element) {
  return pdf(element).toBuffer();
};

const renderToFile = function(element, filePath, callback) {
  const output = renderToStream(element);
  const stream = fs.createWriteStream(filePath);

  output.pipe(stream);

  return new Promise((resolve, reject) => {
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
  createInstance,
  renderToStream,
  renderToFile,
  render,
};
