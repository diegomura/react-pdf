/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */

import ReactFiberReconciler from 'react-reconciler';
import { DefaultEventPriority } from 'react-reconciler/constants';
import * as scheduler from 'scheduler';

import propsEqual from './utils/propsEqual';

const emptyObject = {};

const appendChild = (parent, child) => {
  const isParentText =
    parent.type === 'TEXT' || parent.type === 'LINK' || parent.type === 'TSPAN';
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

  parent.children.push(child);
};

const createRenderer = ({ onChange = () => {} }) => {
  return ReactFiberReconciler({
    schedulePassiveEffects: scheduler.unstable_scheduleCallback,
    cancelPassiveEffects: scheduler.unstable_cancelCallback,

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

    noTimeout: -1,

    useSyncScheduling: true,

    appendChild,

    appendChildToContainer(container, child) {
      if (container.type === 'ROOT') {
        container.document = child;
      } else {
        appendChild(container, child);
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

    commitUpdate(instance, type, oldProps, newProps) {
      if (propsEqual(oldProps, newProps)) return;
      const { style, ...props } = newProps;
      instance.props = props;
      instance.style = style;
    },

    getCurrentUpdatePriority() {
      return DefaultEventPriority;
    },

    setCurrentUpdatePriority() {},

    resolveUpdatePriority() {
      return DefaultEventPriority;
    },

    shouldAttemptEagerTransition() {
      return false;
    },

    requestPostPaintCallback() {},

    maySuspendCommit() {
      return false;
    },
  });
};

export default createRenderer;
