/* global Blob */
'use strict';

import { PDFRenderer, createElement } from './renderer';
import StyleSheet from './Stylesheet';

const View = 'VIEW';
const Text = 'TEXT';
const Page = 'PAGE';
const Document = 'DOCUMENT';

const pdf = input => {
  function parse(input) {
    return input.render();
  }

  function toBlob() {
    return new Blob([parse(input)], {
      type: 'application/pdf',
    });
  }

  function toBuffer() {
    return new Buffer(parse(input));
  }

  function toString() {
    return parse(input);
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
