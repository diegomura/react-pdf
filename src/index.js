import BlobStream from 'blob-stream';
import PDFDocument from '@react-pdf/pdfkit';

import createRenderer from './renderer';
import layoutDocument from './layout';
import renderPDF from './pdf/render';
import StyleSheet from './stylesheet';
import Font from './font';
import { version } from '../package.json';
import {
  VIEW,
  TEXT,
  LINK,
  PAGE,
  NOTE,
  IMAGE,
  DOCUMENT,
  CANVAS,
  SVG,
  GROUP,
  PATH,
  RECT,
  LINE,
  CIRCLE,
  ELLIPSE,
  POLYGON,
  POLYLINE,
} from './constants';

const View = VIEW;
const Text = TEXT;
const Link = LINK;
const Page = PAGE;
const Note = NOTE;
const Image = IMAGE;
const Document = DOCUMENT;
const Canvas = CANVAS;
const Svg = SVG;
const G = GROUP;
const Path = PATH;
const Rect = RECT;
const Line = LINE;
const Circle = CIRCLE;
const Ellipse = ELLIPSE;
const Polygon = POLYGON;
const Polyline = POLYLINE;

const pdf = input => {
  let _isDirty = true;

  const container = { type: 'ROOT', document: null };
  const PDFRenderer = createRenderer(markAsDirty);
  const mountNode = PDFRenderer.createContainer(container);

  if (input) updateContainer(input);

  function isDirty() {
    return _isDirty;
  }

  function markAsDirty() {
    _isDirty = true;
  }

  function callOnRender(params = {}) {
    // if (container.document.props.onRender) {
    // const layoutData = container.document.getLayoutData();
    // container.document.props.onRender({ ...params, layoutData });
    // }
  }

  const render = async () => {
    const ctx = new PDFDocument({ autoFirstPage: false });

    // let layout;

    // for (let i = 0; i < 10; i++) {
    console.time('layout');
    const layout = await layoutDocument(container.document);
    console.timeEnd('layout');
    // }

    const instance = renderPDF(ctx, layout);

    _isDirty = false;

    // console.log(layout);

    return instance;
  };

  const renderWithContext = async ctx => {
    const layout = await layoutDocument(container);
    const instance = renderPDF(ctx, layout);
    _isDirty = false;

    return instance;
  };

  const layout = async () => {
    return layoutDocument(container);
  };

  function updateContainer(doc) {
    PDFRenderer.updateContainer(doc, mountNode, null);
  }

  async function toBlob() {
    const instance = await render();
    const stream = instance.pipe(BlobStream());

    return new Promise((resolve, reject) => {
      stream.on('finish', () => {
        try {
          const blob = stream.toBlob('application/pdf');
          callOnRender({ blob });
          resolve(blob);
        } catch (error) {
          reject(error);
        }
      });

      stream.on('error', reject);
    });
  }

  // async function toBuffer() {
  //   await container.render();

  //   callOnRender();

  //   return container.instance;
  // }

  // function toString() {
  //   let result = '';
  //   container.render();

  //   return new Promise((resolve, reject) => {
  //     try {
  //       container.instance.on('data', function(buffer) {
  //         result += buffer;
  //       });

  //       container.instance.on('end', function() {
  //         callOnRender({ string: result });
  //         resolve(result);
  //       });
  //     } catch (error) {
  //       reject(error);
  //     }
  //   });
  // }

  return {
    layout,
    isDirty,
    container,
    updateContainer,
    renderWithContext,
    // toBuffer,
    toBlob,
    toString,
  };
};

export {
  version,
  View,
  Text,
  Link,
  Page,
  Font,
  Note,
  Image,
  Document,
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
  StyleSheet,
  pdf,
};
