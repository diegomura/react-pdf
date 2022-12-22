import * as primitives from '@react-pdf/primitives';

import renderToFile from './renderToFile';
import renderToStream from './renderToStream';
import { renderToString } from './renderToString';
import { pdf, version, Font, StyleSheet } from '../index';

const throwEnvironmentError = name => {
  throw new Error(
    `${name} is a web specific API. You're either using this component on Node, or your bundler is not loading react-pdf from the appropriate web build.`,
  );
};

export const usePDF = () => {
  throwEnvironmentError('usePDF');
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

export * from '../index';

export * from './renderToFile';

export * from './renderToStream';

export * from './renderToString';

export * from '@react-pdf/primitives';

export default {
  pdf,
  Font,
  version,
  StyleSheet,
  usePDF,
  PDFViewer,
  BlobProvider,
  PDFDownloadLink,
  renderToStream,
  renderToString,
  renderToFile,
  render,
  ...primitives,
};
