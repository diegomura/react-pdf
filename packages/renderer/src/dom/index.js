import * as primitives from '@react-pdf/primitives';

import usePDF from './usePDF';
import PDFViewer from './PDFViewer';
import BlobProvider from './BlobProvider';
import PDFDownloadLink from './PDFDownloadLink';
import PDFFromDomSvg from './PDFFromDomSvg';
import PDFFromDom from './PDFFromDom';

import { pdf, version, Font, StyleSheet } from '../index';

const throwEnvironmentError = name => {
  throw new Error(
    `${name} is a Node specific API. You're either using this method in a browser, or your bundler is not loading react-pdf from the appropriate web build.`,
  );
};

export const renderToStream = () => {
  throwEnvironmentError('renderToStream');
};

export const renderToBuffer = () => {
  throwEnvironmentError('renderToBuffer');
};

export const renderToString = () => {
  throwEnvironmentError('renderToString');
};

export const renderToFile = () => {
  throwEnvironmentError('renderToFile');
};

export const render = () => {
  throwEnvironmentError('render');
};

export * from '../index';

export * from './usePDF';

export * from './PDFViewer';

export * from './BlobProvider';

export * from './PDFDownloadLink';

export * from '@react-pdf/primitives';

export * from './PDFFromDomSvg';

export * from './PDFFromDom';

export const test = 'test';

// TODO: remove this default export in next major release because it breaks tree-shacking

export default {
  pdf,
  usePDF,
  Font,
  version,
  StyleSheet,
  PDFViewer,
  BlobProvider,
  PDFDownloadLink,
  PDFFromDomSvg,
  PDFFromDom,
  renderToStream,
  renderToString,
  renderToFile,
  render,
  ...primitives,
};
