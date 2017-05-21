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
    const result = input.render();

    if (input.props.onRender) {
      input.props.onRender();
    }

    return result;
  }

  async function toBlob() {
    const render = await parse(input);

    return new Blob([render], {
      type: 'application/pdf',
    });
  }

  async function toBuffer() {
    const render = await parse(input);
    return new Buffer(render);
  }

  async function toString() {
    const render = await parse(input);

    return render;
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
