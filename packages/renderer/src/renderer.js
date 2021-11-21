/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */

import ReactFiberReconciler from 'react-reconciler';
import {
  unstable_scheduleCallback as schedulePassiveEffects,
  unstable_cancelCallback as cancelPassiveEffects,
} from 'scheduler';

import propsEqual from './utils/propsEqual';

const emptyObject = {};

const createRenderer = ({ onChange = () => {} }) => {
  return ReactFiberReconciler({
    schedulePassiveEffects,

    cancelPassiveEffects,

    supportsMutation: true,

    isPrimaryRenderer: false,

    warnsIfNotActing: false,

    appendInitialChild(parentInstance, child) {
      if (child.type === 'TEXT_INSTANCE' && parentInstance.type !== 'TEXT') {
        let message =
          'Error: Cannot create text instance without Text component';

        if (process.env.NODE_ENV !== 'production') {
          message += `

common reason for this error:

1) using text without Text component, to fix wrap text with Text component

---
<${parentInstance.type}>
  ${child.value}
</${parentInstance.type}>
˅˅˅
<${parentInstance.type}>
  <Text>${child.value}</Text>
</${parentInstance.type}>
---

2) jsx conditions with non boolean types, to fix convert value to boolean

---
<View>
  {variable && <Text>{variable}</Text>}
</View>
˅˅˅
<View>
  {!!variable && <Text>{variable}</Text>}
</View>
---
`;
        }

        throw new Error(message);
      }

      parentInstance.children.push(child);
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

    appendChild(parentInstance, child) {
      parentInstance.children.push(child);
    },

    appendChildToContainer(parentInstance, child) {
      if (parentInstance.type === 'ROOT') {
        parentInstance.document = child;
      } else {
        parentInstance.children.push(child);
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
