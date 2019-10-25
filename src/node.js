import fs from 'fs';
import {
  pdf,
  View,
  Text,
  Link,
  Page,
  Font,
  Note,
  Image,
  Canvas,
  version,
  Document,
  StyleSheet,
  PDFRenderer,
  createInstance,
} from './index';

export const renderToStream = async function (element) {
  const instance = pdf(element);
  const buffer = await instance.toBuffer();
  instance.container.finish();
  return buffer;
};

export const renderToFile = async function (element, filePath, callback) {
  const output = await renderToStream(element);
  const stream = fs.createWriteStream(filePath);

  output.pipe(stream);

  return new Promise((resolve, reject) => {
    stream.on('finish', () => {
      if (callback) callback(output, filePath);
      resolve(output);
    });
    stream.on('error', reject);
  });
};

const throwEnvironmentError = name => {
  throw new Error(
    `${name} is a web specific API. Or you're either using this component on Node, or your bundler is not loading react-pdf from the appropiate web build.`,
  );
};

export const PDFViewer = () => {
  throwEnvironmentError('PDFViewer');
};

export const PDFDownloadLink = () => {
  throwEnvironmentError('PDFDownloadLink');
};

export const BlobProvider = () => {
  throwEnvironmentError('BlobProvider');
};

export const render = renderToFile;

export {
  pdf,
  View,
  Text,
  Link,
  Page,
  Font,
  Note,
  Image,
  Canvas,
  version,
  Document,
  StyleSheet,
  PDFRenderer,
  createInstance,
} from './index';

export default {
  pdf,
  View,
  Text,
  Link,
  Page,
  Font,
  Note,
  Image,
  Canvas,
  version,
  Document,
  StyleSheet,
  PDFRenderer,
  PDFViewer,
  BlobProvider,
  PDFDownloadLink,
  createInstance,
  renderToStream,
  renderToFile,
  render,
};
