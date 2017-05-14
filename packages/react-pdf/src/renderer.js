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
    internalInstanceHandle,
  ) {
    return createElement(type, props, rootContainerInstance);
  },

  appendInitialChild(parentInstance, child) {
    parentInstance.appendChild(child);
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
    internalInstanceHandle,
  ) {
    // noop
  },

  commitMount(
    instance,
    type,
    newProps,
    rootContainerInstance,
    internalInstanceHandle,
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
    internalInstanceHandle,
  ) {
    return text;
  },

  commitTextUpdate(textInstance, oldText, newText) {
    textInstance.chidren = newText;
  },

  appendChild(parentInstance, child) {
    parentInstance.appendChild(child);
  },

  insertBefore(parentInstance, child, beforeChild) {
    // noob
  },

  removeChild(parentInstance, child) {
    parentInstance.removeChild(child);
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
    const container = createElement('ROOT');

    const node = PDFRenderer.createContainer(container);
    PDFRenderer.updateContainer(element, node, null);

    const output = pdf(container).toBuffer();

    fs.open(filePath, 'w', (e, fd) => {
      if (e) {
        throw new Error(`PDF-react 'Error opening file: ${e}'`);
      }

      fs.write(fd, output, 0, output.length, null, function(err) {
        if (err) throw new Error(`PDF-react 'Error writing file: ${err}'`);
        fs.close(fd, function() {
          console.log(
            `📝  PDF successfuly exported on ${path.resolve(filePath)}`,
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
const Document = 'DOCUMENT';

export {
  ReactPDFFiberRenderer as default,
  PDFRenderer,
  View,
  Text,
  Page,
  Document,
  createElement,
};
