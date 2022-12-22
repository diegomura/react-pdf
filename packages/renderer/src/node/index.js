import * as primitives from '@react-pdf/primitives';

import { renderToFile, renderToStream, renderToString } from './renderTo';
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

export * from './renderTo';

export * from '@react-pdf/primitives';

// TODO: remove this default export in next major release because it breaks tree-shacking
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
