import * as primitives from '@react-pdf/primitives';

import usePDF from './dom/usePDF'
import PDFViewer from './dom/PDFViewer'
import SVGViewer from './dom/SVGViewer'
import BlobProvider from './dom/BlobProvider'
import PDFDownloadLink from './dom/PDFDownloadLink'
import { pdf, version, Font, StyleSheet } from './index';

const throwEnvironmentError = name => {
  throw new Error(
    `${name} is a Node specific API. You're either using this method in a browser, or your bundler is not loading react-pdf from the appropriate web build.`,
  );
};

export const renderToStream = () => {
  throwEnvironmentError('renderToStream');
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

export * from './index';

export * from './dom/usePDF';

export * from './dom/PDFViewer';

export * from './dom/SVGViewer';

export * from './dom/BlobProvider';

export * from './dom/PDFDownloadLink';

export * from '@react-pdf/primitives';

export default {
  pdf,
  usePDF,
  Font,
  version,
  StyleSheet,
  PDFViewer,
  SVGViewer,
  BlobProvider,
  PDFDownloadLink,
  renderToStream,
  renderToString,
  renderToFile,
  render,
  ...primitives,
};
