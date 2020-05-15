'use strict';

import ReactFiberReconciler from 'react-reconciler';
import {
  unstable_scheduleCallback as schedulePassiveEffects,
  unstable_cancelCallback as cancelPassiveEffects,
  unstable_now as now,
} from 'scheduler';

import { ROOT, TEXT_INSTANCE } from './constants';
import propsEqual from './utils/propsEqual';

const emptyObject = {};

const mapInstanceIds = (node, result = {}) => {
  result[node.id] = node;
  if (node.children !== undefined) {
    node.children.forEach(child => mapInstanceIds(child, result));
  }
  return result;
};

const createRenderer = (layout = {}, pass = 0) => {
  let instanceCount = 0;

  const layoutIds = mapInstanceIds(layout || {});

  return ReactFiberReconciler({
    supportsMutation: true,

    isPrimaryRenderer: false,

    warnsIfNotActing: false,

    schedulePassiveEffects,

    cancelPassiveEffects,

    now,

    appendInitialChild(parentInstance, child) {
      parentInstance.children.push(child);
    },

    createInstance(type, { style, children, ...props }) {
      const id = instanceCount;

      instanceCount += 1;

      return {
        type,
        id,
        box: {},
        style: style || {},
        props: props || {},
        children: [],
      };
    },

    clearContainer(container) {
      // Noop
    },

    beforeRemoveInstance() {
      // noop
    },

    createTextInstance(text, rootContainerInstance) {
      return { type: TEXT_INSTANCE, value: text };
    },

    finalizeInitialChildren(element, type, props) {
      return false;
    },

    getPublicInstance(instance) {
      const existing = layoutIds[instance.id];
      return {
        ...instance,
        pass,
        prev: existing !== undefined ? existing : undefined,
      };
    },

    prepareForCommit() {
      return null;
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

    unhideInstance(instance) {
      // Noop
    },

    appendChild(parentInstance, child) {
      parentInstance.children.push(child);
    },

    appendChildToContainer(parentInstance, child) {
      if (parentInstance.type === ROOT) {
        parentInstance.document = child;
      } else {
        parentInstance.children.push(child);
      }
    },

    insertBefore(parentInstance, child, beforeChild) {
      const index = parentInstance.children.indexOf(beforeChild);
      if (index !== -1 && child)
        parentInstance.children.splice(index, 0, child);
    },

    removeChild(parentInstance, child) {
      const index = parentInstance.children.indexOf(child);
      if (index !== -1) parentInstance.children.splice(index, 1);
    },

    removeChildFromContainer(parentInstance, child) {
      if (parentInstance.type === ROOT) {
        parentInstance.document = null;
      } else {
        const index = parentInstance.children.indexOf(child);
        if (index !== -1) parentInstance.children.splice(index, 1);
      }
    },

    commitTextUpdate(textInstance, oldText, newText) {
      textInstance.value = newText;
    },

    commitUpdate(instance, updatePayload, type, oldProps, newProps) {
      const { style, ...props } = newProps;
      instance.props = props;
      instance.style = style;
    },
  });
};

export default createRenderer;
