'use strict';
import fs from 'fs';
import path from 'path';

import ReactFiberReconciler from 'react-dom/lib/ReactFiberReconciler';
import ReactGenericBatching from 'react-dom/lib/ReactGenericBatching';
import emptyObject from 'fbjs/lib/emptyObject';

import { createElement } from './elements';
import pdf from './pdf/index.js';

const PDFRenderer = ReactFiberReconciler({
  getRootHostContext() {
    return emptyObject;
  },

  getChildHostContext() {
    return emptyObject;
  },

  prepareForCommit() {
    // noop
  },

  resetAfterCommit() {
    // noop
  },

  createInstance(
    type,
    props,
    rootContainerInstance,
    hostContext,
    internalInstanceHandle
  ) {
    return createElement(type, props);
    // return {
    //   type,
    //   props,
    //   children: [],
    //   rootContainerInstance,
    //   tag: 'INSTANCE',
    // };
  },

  appendInitialChild(parentInstance, child) {
    child.inject(parentInstance);
    // const index = parentInstance.children.indexOf(child);
    // if (index !== -1) {
    //   parentInstance.children.splice(index, 1);
    // }
    // parentInstance.children.push(child);
  },

  finalizeInitialChildren(testElement, type, props, rootContainerInstance) {
    return false;
  },

  prepareUpdate(testElement, type, oldProps, newProps, hostContext) {
    return true;
  },

  commitUpdate(
    instance,
    type,
    oldProps,
    newProps,
    rootContainerInstance,
    internalInstanceHandle
  ) {
    // noop
  },

  commitMount(
    instance,
    type,
    newProps,
    rootContainerInstance,
    internalInstanceHandle
  ) {
    // noop
  },

  shouldSetTextContent(props) {
    return false;
  },

  resetTextContent(testElement) {
    // noop
  },

  createTextInstance(
    text,
    rootContainerInstance,
    hostContext,
    internalInstanceHandle
  ) {
    // return text;
    return createElement('TEXT', { content: 'TEXT' });
    // return {
    //   text,
    //   tag: 'TEXT',
    // };
  },

  commitTextUpdate(textInstance, oldText, newText) {
    textInstance.text = newText;
  },

  appendChild(parentInstance, child) {
    child.inject(parentInstance);

    // const index = parentInstance.children.indexOf(child);
    // if (index !== -1) {
    //   parentInstance.children.splice(index, 1);
    // }
    // parentInstance.children.push(child);
  },

  insertBefore(parentInstance, child, beforeChild) {
    const index = parentInstance.children.indexOf(child);
    if (index !== -1) {
      parentInstance.children.splice(index, 1);
    }
    const beforeIndex = parentInstance.children.indexOf(beforeChild);
    parentInstance.children.splice(beforeIndex, 0, child);
  },

  removeChild(parentInstance, child) {
    child.eject(parentInstance);
    // const index = parentInstance.children.indexOf(child);
    // parentInstance.children.splice(index, 1);
  },

  scheduleAnimationCallback(fn) {
    setTimeout(fn);
  },

  scheduleDeferredCallback(fn) {
    setTimeout(fn, 0, { timeRemaining: Infinity });
  },

  useSyncScheduling: true,

  getPublicInstance(inst) {
    return inst;
  },
});

const ReactPDFFiberRenderer = {
  render(element, filePath) {
    const container = createElement('DOCUMENT');

    const node = PDFRenderer.createContainer(container);
    PDFRenderer.updateContainer(element, node, null);

    const output = pdf().toBuffer(container);

    fs.open(filePath, 'w', (e, fd) => {
      if (e) {
        throw new Error(`PDF-react 'Error opening file: ${e}'`);
      }

      fs.write(fd, output, 0, output.length, null, function(err) {
        if (err) throw new Error(`PDF-react 'Error writing file: ${err}'`);
        fs.close(fd, function() {
          console.log(
            `📝  PDF successfuly exported on ${path.resolve(filePath)}`
          );
        });
      });
    });
  },

  unstable_batchedUpdates: ReactGenericBatching.batchedUpdates,
};

/* Component constants */
const View = 'VIEW';
const Text = 'TEXT';
const Page = 'PAGE';

export {
  ReactPDFFiberRenderer as default,
  PDFRenderer,
  View,
  Text,
  Page,
  createElement,
};
