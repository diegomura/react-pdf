'use strict';

import ReactFiberReconciler from 'react-reconciler';
import * as R from 'ramda';
// import { createInstance } from './elements';

import propsEqual from './utils/propsEqual';

const emptyObject = {};

// If the Link has a string child or render prop, substitute the instance by a Text,
// that will ultimately render the inline Link via the textkit PDF renderer.
const shouldReplaceLink = (type, props) =>
  type === 'LINK' &&
  (typeof props.children === 'string' ||
    typeof props.children === 'number' ||
    Array.isArray(props.children) ||
    props.render);

const omitChildren = R.omit(['children']);

const PDFRenderer = ReactFiberReconciler({
  supportsMutation: true,

  appendInitialChild(parentInstance, child) {
    child.root.isDirty = true;
    parentInstance.children.push(child);
  },

  createInstance(type, props, internalInstanceHandle) {
    const instanceType = shouldReplaceLink(type, props) ? 'TEXT' : type;
    return {
      type: instanceType,
      children: [],
      props: omitChildren(props),
      root: internalInstanceHandle,
    };
  },

  createTextInstance(text, rootContainerInstance) {
    return { type: 'TEXT_INSTANCE', props: text, root: rootContainerInstance };
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
    child.root.isDirty = true;
    parentInstance.children.push(child);
  },

  appendChildToContainer(parentInstance, child) {
    child.root.isDirty = true;
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
    textInstance.root.isDirty = true;
    textInstance.props = newText;
    console.log(textInstance);
  },

  commitUpdate(instance, updatePayload, type, oldProps, newProps) {
    instance.root.isDirty = true;
    instance.props = newProps;
  },
});

export default PDFRenderer;
