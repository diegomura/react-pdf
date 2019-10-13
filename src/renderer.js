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
      onChange();
    },

    createInstance(type, { style, children, ...props }) {
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
      onChange();
    },

    appendChildToContainer(parentInstance, child) {
      if (parentInstance.type === 'ROOT') {
        parentInstance.document = child;
      } else {
        parentInstance.children.push(child);
      }
      onChange();
    },

    insertBefore(parentInstance, child, beforeChild) {
      const index = parentInstance.children.indexOf(beforeChild);
      if (index !== -1 && child)
        parentInstance.children.splice(index, 0, child);
      onChange();
    },

    removeChild(parentInstance, child) {
      const index = parentInstance.children.indexOf(child);
      if (index !== -1) parentInstance.children.splice(index, 1);
      onChange();
    },

    removeChildFromContainer(parentInstance, child) {
      const index = parentInstance.children.indexOf(child);
      if (index !== -1) parentInstance.children.splice(index, 1);
      onChange();
    },

    commitTextUpdate(textInstance, oldText, newText) {
      textInstance.value = newText;
      onChange();
    },

    commitUpdate(instance, updatePayload, type, oldProps, newProps) {
      const { style, ...props } = newProps;
      instance.props = props;
      instance.style = style;
      onChange();
    },
  });
};

export default createRenderer;
