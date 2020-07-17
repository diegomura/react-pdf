import fs from 'fs';
import * as primitives from '@react-pdf/primitives';
import { pdf, version, Font, StyleSheet } from './index';

export const renderToStream = async function(element) {
  const instance = pdf({ initialValue: element });
  const buffer = await instance.toBuffer();
  return buffer;
};

export const renderToString = function(element) {
  const instance = pdf({ initialValue: element });
  return instance.toString();
};

export const renderToFile = async function(element, filePath, callback) {
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
    `${name} is a web specific API. You're either using this component on Node, or your bundler is not loading react-pdf from the appropriate web build.`,
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

export * from './index';

export * from '@react-pdf/primitives';

export default {
  pdf,
  Font,
  version,
  StyleSheet,
  PDFViewer,
  BlobProvider,
  PDFDownloadLink,
  renderToStream,
  renderToString,
  renderToFile,
  render,
  ...primitives,
};
