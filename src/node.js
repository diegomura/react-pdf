import fs from 'fs';
import stream from 'stream';
import {
  pdf,
  View,
  Text,
  Link,
  Page,
  Font,
  Note,
  Image,
  version,
  Document,
  StyleSheet,
  PDFRenderer,
  createInstance,
} from './index';
import importYoga from './utils/import-yoga';

const renderToStreamWithAsyncYoga = async (element, passthroughStream) => {
  const Yoga = await importYoga();
  const pdfStream = pdf(element, { Yoga }).toBuffer();
  pdfStream.pipe(passthroughStream);
};

export const renderToStream = function (element) {
  const passthroughStream = new stream.PassThrough();
  renderToStreamWithAsyncYoga(element, passthroughStream).catch(err => {
    console.error('Error in renderToStream:', err);
    throw err;
  });
  return passthroughStream;
};

export const renderToFile = function (element, filePath, callback) {
  const output = renderToStream(element);
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
