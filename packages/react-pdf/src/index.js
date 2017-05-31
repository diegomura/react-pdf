/* global Blob */
'use strict';

import { PDFRenderer, createElement } from './renderer';
import StyleSheet from './Stylesheet';

const View = 'VIEW';
const Text = 'TEXT';
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

  function toBlob() {
    parse(input).then(() => {
      const stream = input.pipe(Blob());

      return new Promise(resolve => {
        stream.on('finish', () => {
          resolve(stream.toBlob('application/pdf'));
        });
      });
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
  Page,
  Image,
  Document,
  StyleSheet,
  createElement,
  pdf,
};
