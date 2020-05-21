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
  Svg,
  G,
  Path,
  Rect,
  Line,
  Circle,
  Ellipse,
  Polygon,
  Polyline,
  Defs,
  Tspan,
  ClipPath,
  Stop,
  LinearGradient,
  RadialGradient,
  version,
  Document,
  StyleSheet,
  PDFContext,
} from './index';

export const renderToStream = async function(element) {
  const instance = pdf({ initialValue: element });
  const buffer = await instance.toBuffer();
  return buffer;
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
  Svg,
  G,
  Path,
  Rect,
  Line,
  Circle,
  Ellipse,
  Polygon,
  Polyline,
  Defs,
  Tspan,
  ClipPath,
  Stop,
  LinearGradient,
  RadialGradient,
  version,
  Document,
  StyleSheet,
  PDFContext,
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
  Svg,
  G,
  Path,
  Rect,
  Line,
  Circle,
  Ellipse,
  Polygon,
  Polyline,
  Defs,
  Tspan,
  ClipPath,
  Stop,
  LinearGradient,
  RadialGradient,
  version,
  Document,
  StyleSheet,
  PDFViewer,
  BlobProvider,
  PDFDownloadLink,
  renderToStream,
  renderToFile,
  render,
  PDFContext,
};
