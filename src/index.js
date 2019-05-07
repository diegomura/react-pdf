import * as R from 'ramda';
import BlobStream from 'blob-stream';

import Font from './font';
import PDFRenderer from './renderer';
import StyleSheet from './stylesheet';
import { createInstance } from './elements';
import { version } from '../package.json';

const View = 'VIEW';
const Text = 'TEXT';
const Link = 'LINK';
const Page = 'PAGE';
const Note = 'NOTE';
const Image = 'IMAGE';
const Document = 'DOCUMENT';
const Canvas = 'CANVAS';

const createInstances = (node, root) => {
  const instance = createInstance(node, root);

  if (node.children) {
    for (let i = 0; i < node.children.length; i++) {
      instance.appendChild(createInstances(node.children[i], root));
    }
  }

  return instance;
};

const createRootInstance = doc => {
  const instance = createInstance(doc);

  for (let i = 0; i < doc.children.length; i++) {
    instance.appendChild(createInstances(doc.children[i], instance));
  }

  return instance;
};

const pdf = input => {
  const container = { type: 'ROOT', isDirty: true, children: [] };
  const mountNode = PDFRenderer.createContainer(container);

  if (input) updateContainer(input);

  const callOnRender = (instance, params = {}) => {
    if (instance.document.props.onRender) {
      const layoutData = instance.document.getLayoutData();
      instance.document.props.onRender({ ...params, layoutData });
    }
  };

  const isDirty = () => {
    return container.isDirty;
  };

  const updateContainer = doc => {
    PDFRenderer.updateContainer(doc, mountNode, null);
  };

  const render = async () => {
    const doc = R.clone(container);
    const root = createRootInstance(doc);
    await root.render();
    container.isDirty = false;
    return root;
  };

  const toBlob = async () => {
    const root = await render();

    const stream = root.instance.pipe(BlobStream());

    return new Promise((resolve, reject) => {
      stream.on('finish', () => {
        try {
          const blob = stream.toBlob('application/pdf');

          callOnRender(root, { blob });

          resolve(blob);
        } catch (error) {
          reject(error);
        }
      });

      stream.on('error', reject);
    });
  };

  // function toBuffer() {
  //   callOnRender();

  //   container.render();

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
    isDirty,
    // render,
    container,
    updateContainer,
    // toBuffer,
    toBlob,
    // toString,
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
  createInstance,
  pdf,
};
