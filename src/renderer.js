'use strict';

import ReactFiberReconciler from 'react-reconciler';
import {
  unstable_scheduleCallback as schedulePassiveEffects,
  unstable_cancelCallback as cancelPassiveEffects,
  unstable_now as now,
} from 'scheduler';

import { ROOT, TEXT_INSTANCE, SUSPENDED } from './constants';
import propsEqual from './utils/propsEqual';

const emptyObject = {};

const createRenderer = () => {
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
      return {
        type,
        ref: {},
        box: {},
        style: style || {},
        props: props || {},
        children: [],
      };
    },

    clearContainer(parentInstance) {
      parentInstance.children = [];
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
      return instance.ref;
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

    hideInstance(instance) {
      // Noop
    },

    unhideInstance(instance) {
      // Noop
    },

    appendChild(parentInstance, child) {
      parentInstance.children.push(child);
    },

    appendChildToContainer(parentInstance, child) {
      if (parentInstance.type === ROOT) {
        if (child.type === SUSPENDED) {
          parentInstance.suspended = true;
        } else {
          parentInstance.document = child;
        }
      } else {
        parentInstance.children.push(child);
      }
    },

    insertBefore(parentInstance, child, beforeChild) {
      const index = parentInstance.children.indexOf(beforeChild);
      if (index !== -1 && child)
        parentInstance.children.splice(index, 0, child);
    },

    insertInContainerBefore(parentInstance, child, beforeChild) {
      if (parentInstance.type === ROOT) {
        if (child.type === SUSPENDED) {
          parentInstance.suspended = true;
        } else {
          parentInstance.document = child;
        }
      } else {
        const index = parentInstance.children.indexOf(beforeChild);
        if (index !== -1 && child)
          parentInstance.children.splice(index, 0, child);
      }
    },

    removeChild(parentInstance, child) {
      const index = parentInstance.children.indexOf(child);
      if (index !== -1) parentInstance.children.splice(index, 1);
    },

    removeChildFromContainer(parentInstance, child) {
      if (parentInstance.type === ROOT) {
        if (child.type === SUSPENDED) {
          parentInstance.suspended = false;
        } else {
          parentInstance.document = null;
        }
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
