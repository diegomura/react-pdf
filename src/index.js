import React from 'react';
import BlobStream from 'blob-stream';

import PDFRenderer from './renderer';
import StyleSheet from './stylesheet';
import { createInstance } from './elements';
import Font from './font';
import { version } from '../package.json';

const View = 'VIEW';
const Text = 'TEXT';
const Link = 'LINK';
const Page = 'PAGE';
const Note = 'NOTE';
const Image = 'IMAGE';
const Document = 'DOCUMENT';

const handler = {
  get: function(target, prop) {
    if (!target.stubs[prop]) {
      target.stubs[prop] = { value: null };
    }

    return target.stubs[prop].value;
  },
  set: function(target, prop, value) {
    target.stubs[prop].value = value;
    return true;
  },
};

const proxy = new Proxy({ stubs: {} }, handler);

const renderNode = child => {
  if (!child || typeof child === 'string') {
    return child;
  }

  if (typeof child.type === 'function') {
    return renderNode(child.type(child.props));
  }

  if (child.props.render) {
    return renderNode(
      React.cloneElement(child, {
        render: null,
        stubs: proxy,
        children: child.props.render(proxy),
      }),
    );
  }

  const { children } = child.props;

  return React.cloneElement(child, {
    children: Array.isArray(children)
      ? children.map(renderNode)
      : renderNode(children),
  });
};

const renderDynamic = node => {
  const { children } = node.props;

  return React.cloneElement(node, {
    children: Array.isArray(children)
      ? children.map(renderNode)
      : renderNode(children),
  });
};

const pdf = input => {
  const root = createInstance({ type: 'ROOT' });
  const container = PDFRenderer.createContainer(root);

  const updateRendererContainer = doc =>
    new Promise(resolve => {
      PDFRenderer.updateContainer(renderDynamic(doc), container, null, () =>
        resolve(),
      );
    });

  function callOnRender(params = {}) {
    if (root.document.props.onRender) {
      const layoutData = root.document.getLayoutData();
      root.document.props.onRender({ ...params, layoutData });
    }
  }

  // function isDirty() {
  //   return root.isDirty;
  // }

  async function updateContainer(doc) {
    await updateRendererContainer(doc);
    await root.layout();

    root.updateStubs();

    await updateRendererContainer(doc);
    await root.layout();
  }

  async function toBlob() {
    await root.render();

    const stream = root.instance.pipe(BlobStream());

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

  function toBuffer() {
    callOnRender();

    root.render();

    return root.instance;
  }

  function toString() {
    let result = '';
    root.render();

    return new Promise((resolve, reject) => {
      try {
        root.instance.on('data', function(buffer) {
          result += buffer;
        });

        root.instance.on('end', function() {
          callOnRender({ string: result });
          resolve(result);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  if (input) updateContainer(input);

  return {
    // isDirty,
    updateContainer,
    toBuffer,
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
  StyleSheet,
  createInstance,
  pdf,
};
