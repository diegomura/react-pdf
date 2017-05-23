/* global Blob */
'use strict';

import { PDFRenderer, createElement } from './renderer';
import StyleSheet from './Stylesheet';

const View = 'VIEW';
const Text = 'TEXT';
const Page = 'PAGE';
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
    // const render = await parse(input);
    //
    // return render;
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
  Document,
  StyleSheet,
  createElement,
  pdf,
};
