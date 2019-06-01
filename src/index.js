// import BlobStream from 'blob-stream';
import * as R from 'ramda';
import PDFRenderer from './renderer';
import StyleSheet from './stylesheet';
import Font from './font';
import { version } from '../package.json';
import resolveStyles from './layout/resolveStyles';
import resolvePageSizes from './layout/resolvePageSizes';
import resolveDimensions from './layout/resolveDimensions';
import resolveInheritance from './layout/resolveInheritance';
import resolvePageMargins from './layout/resolvePageMargins';
import resolvePagePaddings from './layout/resolvePagePaddings';
import resolveAbsoluteCoordinates from './layout/resolveAbsoluteCoordinates';
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
    const res = R.compose(
      resolveAbsoluteCoordinates,
      // pageWrapping
      resolveDimensions,
      // fetchAssets,
      resolvePagePaddings,
      resolveInheritance,
      resolveStyles,
      resolvePageMargins,
      resolvePageSizes,
    )(container);
    console.timeEnd('layout');

    console.log(res);

    return res;
  };

  function updateContainer(doc) {
    PDFRenderer.updateContainer(doc, mountNode, null);
  }

  async function toBlob() {
    return render();

    // const stream = container.instance.pipe(BlobStream());

    // return new Promise((resolve, reject) => {
    //   stream.on('finish', () => {
    //     try {
    //       const blob = stream.toBlob('application/pdf');

    //       callOnRender({ blob });

    //       resolve(blob);
    //     } catch (error) {
    //       reject(error);
    //     }
    //   });

    //   stream.on('error', reject);
    // });
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
