import fs from 'fs';
import toArray from 'stream-to-array';
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

const toBuffer = (stream) => toArray(stream)
  .then((parts) => Buffer.concat(parts));

export const renderToStream = function(element) {
  return pdf(element).toBuffer();
};

export const renderToFile = function(element, filePath, callback) {
  if(arguments.length === 1 || typeof filePath === 'function'){
    return new Promise((resolve, reject)=>{
        const output = toBuffer(pdf(element).toBuffer())
          .then((data) => {
            if(typeof filePath === 'function'){
              filePath(data);
            }
            return data;
          })
          .catch(reject);
        resolve(output);
    })
  }
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
