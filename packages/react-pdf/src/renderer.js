'use strict';

import ReactFiberReconciler from 'react-dom/lib/ReactFiberReconciler';
import emptyObject from 'fbjs/lib/emptyObject';

import { createElement } from './elements';

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
    return createElement(type, props);
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
    return createElement('TEXT', { content: 'TEXT' });
  },

  commitTextUpdate(textInstance, oldText, newText) {
    textInstance.text = newText;
  },

  appendChild(parentInstance, child) {
    parentInstance.appendChild(child);
  },

  insertBefore(parentInstance, child, beforeChild) {
    // TODO implement insert before
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

export { PDFRenderer, createElement };
