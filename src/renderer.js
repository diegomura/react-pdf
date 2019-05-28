'use strict';

import ReactFiberReconciler from 'react-reconciler';
// import { createInstance } from './elements';

import propsEqual from './utils/propsEqual';

const emptyObject = {};

// If the Link has a strign child or render prop, substitute the instance by a Text,
// that will ultimately render the inline Link via the textkit PDF renderer.
// const shouldReplaceLink = (type, props) =>
//   type === 'LINK' &&
//   (typeof props.children === 'string' ||
//     typeof props.children === 'number' ||
//     Array.isArray(props.children) ||
//     props.render);

const PDFRenderer = ReactFiberReconciler({
  supportsMutation: true,
  appendInitialChild(parentInstance, child) {
    parentInstance.children.push(child);
    // parentInstance.appendChild(child);
  },

  createInstance(type, { style, children, ...props }, internalInstanceHandle) {
    // const instanceType = shouldReplaceLink(type, props) ? 'TEXT' : type;
    // return createInstance(
    //   { type: instanceType, props },
    //   internalInstanceHandle,
    // );
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
    // return createInstance(
    //   { type: , props: text },
    //   rootContainerInstance,
    // );
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
    parentInstance.children.push(child);
    // parentInstance.appendChild(child);
  },

  appendChildToContainer(parentInstance, child) {
    parentInstance.children.push(child);
    // parentInstance.appendChild(child);
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
    // textInstance.update(newText);
  },

  commitUpdate(instance, updatePayload, type, oldProps, newProps) {
    // instance.update(newProps);
  },
});

export default PDFRenderer;
