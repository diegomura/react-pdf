import BlobStream from 'blob-stream';
import PDFRenderer from './renderer';
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
} from './constants';

const View = VIEW;
const Text = TEXT;
const Link = LINK;
const Page = PAGE;
const Note = NOTE;
const Image = IMAGE;
const Document = DOCUMENT;
const Canvas = CANVAS;

const pdf = input => {
  const container = { type: 'ROOT', children: [] };
  const mountNode = PDFRenderer.createContainer(container);

  if (input) updateContainer(input);

  // function callOnRender(params = {}) {
  //   if (container.document.props.onRender) {
  //     const layoutData = container.document.getLayoutData();
  //     container.document.props.onRender({ ...params, layoutData });
  //   }
  // }

  // function isDirty() {
  //   return container.isDirty;
  // }

  const render = async () => {
    console.time('layout');
    const layout = await layoutDocument(container);
    console.timeEnd('layout');
    const instance = renderPDF(layout);

    console.log(layout);

    return instance;
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

          // callOnRender({ blob });

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
    // isDirty,
    container,
    updateContainer,
    // toBuffer,
    toBlob,
    toString,
  };
};

export {
  version,
  PDFRenderer,
  View,
  Text,
  Link,
  Page,
  Font,
  Note,
  Image,
  Document,
  Canvas,
  StyleSheet,
  // createInstance,
  pdf,
};
