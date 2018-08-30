'use strict';

import ReactFiberReconciler from 'react-reconciler';
import emptyObject from 'fbjs/lib/emptyObject';
import { createElement } from './elements';

const objectsEqual = (a, b) => {
  const oldPropsKeys = Object.keys(a);
  const newPropsKeys = Object.keys(b);

  if (oldPropsKeys.length !== newPropsKeys.length) {
    return true;
  }

  for (let i = 0; i < oldPropsKeys.length; i++) {
    const propName = oldPropsKeys[i];

    if (propName !== 'children' && a[propName] !== b[propName]) {
      if (typeof a[propName] === 'object' && typeof b[propName] === 'object') {
        return objectsEqual(a[propName], b[propName]);
      }
      return true;
    }
  }

  return false;
};

const PDFRenderer = ReactFiberReconciler({
  supportsMutation: true,
  appendInitialChild(parentInstance, child) {
    parentInstance.appendChild(child);
  },

  createInstance(type, props, internalInstanceHandle) {
    return createElement(type, props, internalInstanceHandle);
  },

  createTextInstance(text, rootContainerInstance) {
    return createElement('TEXT_INSTANCE', text, rootContainerInstance);
  },

  finalizeInitialChildren(element, type, props) {
    return false;
  },

  getPublicInstance(instance) {
    return instance;
  },

  prepareForCommit() {
    // Noop
  },

  prepareUpdate(element, type, oldProps, newProps) {
    return objectsEqual(oldProps, newProps);
  },

  resetAfterCommit() {
    // Noop
  },

  resetTextContent(element) {
    // Noop
  },

  getRootHostContext() {
    return emptyObject;
  },

  getChildHostContext() {
    return emptyObject;
  },

  shouldSetTextContent(type, props) {
    return false;
  },

  now: Date.now,

  useSyncScheduling: true,

  appendChild(parentInstance, child) {
    parentInstance.appendChild(child);
  },

  appendChildToContainer(parentInstance, child) {
    parentInstance.appendChild(child);
  },

  removeChild(parentInstance, child) {
    parentInstance.removeChild(child);
  },

  removeChildFromContainer(parentInstance, child) {
    parentInstance.removeChild(child);
  },

  commitTextUpdate(textInstance, oldText, newText) {
    textInstance.update(newText);
  },

  commitUpdate(instance, updatePayload, type, oldProps, newProps) {
    instance.update(newProps);
  },
});

export default PDFRenderer;
