/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */

import ReactFiberReconciler from 'react-reconciler';
import {
  unstable_scheduleCallback as schedulePassiveEffects,
  unstable_cancelCallback as cancelPassiveEffects,
} from 'scheduler';

import propsEqual from './utils/propsEqual';

const emptyObject = {};

const appendChild = (parentInstance, child) => {
  const isParentText = parentInstance.type === 'TEXT';
  const isChildTextInstance = child.type === 'TEXT_INSTANCE';
  const isOrphanTextInstance = isChildTextInstance && !isParentText;

  // Ignore orphan text instances.
  // Caused by cases such as <>{name && <Text>{name}</Text>}</>
  if (isOrphanTextInstance) {
    console.warn(
      `Invalid '${child.value}' string child outside <Text> component`,
    );
    return;
  }

  parentInstance.children.push(child);
};

const createRenderer = ({ onChange = () => {} }) => {
  return ReactFiberReconciler({
    schedulePassiveEffects,

    cancelPassiveEffects,

    supportsMutation: true,

    isPrimaryRenderer: false,

    warnsIfNotActing: false,

    appendInitialChild: appendChild,

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

    clearContainer() {
      // Noop
    },

    prepareUpdate(element, type, oldProps, newProps) {
      return !propsEqual(oldProps, newProps);
    },

    resetAfterCommit: onChange,

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

    appendChild,

    appendChildToContainer(parentInstance, child) {
      if (parentInstance.type === 'ROOT') {
        parentInstance.document = child;
      } else {
        appendChild(parentInstance, child);
      }
    },

    insertBefore(parentInstance, child, beforeChild) {
      const index = parentInstance.children?.indexOf(beforeChild);

      if (index === undefined) return;

      if (index !== -1 && child)
        parentInstance.children.splice(index, 0, child);
    },

    removeChild(parentInstance, child) {
      const index = parentInstance.children?.indexOf(child);

      if (index === undefined) return;

      if (index !== -1) parentInstance.children.splice(index, 1);
    },

    removeChildFromContainer(parentInstance, child) {
      const index = parentInstance.children?.indexOf(child);

      if (index === undefined) return;

      if (index !== -1) parentInstance.children.splice(index, 1);
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
