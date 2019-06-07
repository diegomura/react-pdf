'use strict';

import ReactFiberReconciler from 'react-reconciler';
// import { createInstance } from './elements';

import propsEqual from './utils/propsEqual';

const emptyObject = {};

const createRenderer = onChange => {
  return ReactFiberReconciler({
    supportsMutation: true,
    appendInitialChild(parentInstance, child) {
      parentInstance.children.push(child);
    },

    createInstance(
      type,
      { style, children, ...props },
      internalInstanceHandle,
    ) {
      return {
        type,
        box: {},
        style: style || {},
        props: props || {},
        children: [],
      };
    },

    createTextInstance(text, rootContainerInstance) {
      return { type: 'TEXT_INSTANCE', value: text };
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
      return !propsEqual(oldProps, newProps);
    },

    resetAfterCommit(a, b, c) {
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
      parentInstance.children.push(child);
    },

    appendChildToContainer(parentInstance, child) {
      parentInstance.children.push(child);
    },

    insertBefore(parentInstance, child, beforeChild) {
      // parentInstance.appendChildBefore(child, beforeChild);
    },

    removeChild(parentInstance, child) {
      // parentInstance.removeChild(child);
    },

    removeChildFromContainer(parentInstance, child) {
      // parentInstance.removeChild(child);
    },

    commitTextUpdate(textInstance, oldText, newText) {
      textInstance.value = newText;
      onChange();
    },

    commitUpdate(instance, updatePayload, type, oldProps, newProps) {
      instance.props = newProps;
      onChange();
    },
  });
};

export default createRenderer;
