'use strict';

import ReactFiberReconciler from 'react-reconciler';
import {
  unstable_scheduleCallback as schedulePassiveEffects,
  unstable_cancelCallback as cancelPassiveEffects,
} from 'scheduler';

import { createInstance } from './elements';
import propsEqual from './utils/propsEqual';

const emptyObject = {};

// If the Link has a strign child or render prop, substitute the instance by a Text,
// that will ultimately render the inline Link via the textkit PDF renderer.
const shouldReplaceLink = (type, props) =>
  type === 'LINK' &&
  (typeof props.children === 'string' ||
    typeof props.children === 'number' ||
    Array.isArray(props.children) ||
    props.render);

const PDFRenderer = ReactFiberReconciler({
  schedulePassiveEffects,
  cancelPassiveEffects,
  supportsMutation: true,
  appendInitialChild(parentInstance, child) {
    parentInstance.appendChild(child);
  },

  createInstance(type, props, internalInstanceHandle) {
    const instanceType = shouldReplaceLink(type, props) ? 'TEXT' : type;
    return createInstance(
      { type: instanceType, props },
      internalInstanceHandle,
    );
  },

  createTextInstance(text, rootContainerInstance) {
    return createInstance(
      { type: 'TEXT_INSTANCE', props: text },
      rootContainerInstance,
    );
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
    parentInstance.appendChild(child);
  },

  appendChildToContainer(parentInstance, child) {
    parentInstance.appendChild(child);
  },

  insertBefore(parentInstance, child, beforeChild) {
    parentInstance.appendChildBefore(child, beforeChild);
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
