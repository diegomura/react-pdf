'use strict';

import { PDFRenderer, createElement } from './renderer';
import StyleSheet from './Stylesheet';
import pdf from './pdf/index.js';

/* Component constants */
const View = 'VIEW';
const Text = 'TEXT';
const Page = 'PAGE';
const Document = 'DOCUMENT';

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
