'use strict';

import { PDFRenderer, createElement } from './renderer';
import StyleSheet from './stylesheet';
import Font from './font';
import BlobStream from 'blob-stream';

const View = 'VIEW';
const Text = 'TEXT';
const Link = 'LINK';
const Page = 'PAGE';
const Image = 'IMAGE';
const Document = 'DOCUMENT';

const pdf = input => {
  async function parse(input) {
    const document = input.document;

    await document.render();

    if (document.props.onRender) {
      document.props.onRender();
    }

    return input;
  }

  async function toBlob() {
    await parse(input);

    const stream = input.pipe(BlobStream());

    return new Promise((resolve, reject) => {
      stream.on('finish', () => {
        resolve(stream.toBlob('application/pdf'));
      });

      stream.on('error', reject);
    });
  }

  async function toBuffer() {
    return await parse(input);
  }

  async function toString() {
    let result = '';
    const render = await parse(input);

    return new Promise(resolve => {
      render.on('data', function(buffer) {
        result += buffer;
      });

      render.on('end', function() {
        resolve(result);
      });
    });
  }

  return {
    toBuffer,
    toBlob,
    toString,
  };
};

export {
  PDFRenderer,
  View,
  Text,
  Link,
  Page,
  Font,
  Image,
  Document,
  StyleSheet,
  createElement,
  pdf,
};
