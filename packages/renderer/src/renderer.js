/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */

import Reconciler from '@react-pdf/reconciler';

const createInstance = (type, { style, children, ...props }) => ({
  type,
  box: {},
  style: style || {},
  props: props || {},
  children: [],
});

const createTextInstance = (text) => ({ type: 'TEXT_INSTANCE', value: text });

const appendChild = (parentInstance, child) => {
  const isParentText =
    parentInstance.type === 'TEXT' ||
    parentInstance.type === 'LINK' ||
    parentInstance.type === 'TSPAN';
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

const appendChildToContainer = (parentInstance, child) => {
  if (parentInstance.type === 'ROOT') {
    parentInstance.document = child;
  } else {
    appendChild(parentInstance, child);
  }
};

const insertBefore = (parentInstance, child, beforeChild) => {
  const index = parentInstance.children?.indexOf(beforeChild);

  if (index === undefined) return;

  if (index !== -1 && child) parentInstance.children.splice(index, 0, child);
};

const removeChild = (parentInstance, child) => {
  const index = parentInstance.children?.indexOf(child);

  if (index === undefined) return;

  if (index !== -1) parentInstance.children.splice(index, 1);
};

const removeChildFromContainer = (parentInstance, child) => {
  const index = parentInstance.children?.indexOf(child);

  if (index === undefined) return;

  if (index !== -1) parentInstance.children.splice(index, 1);
};

const commitTextUpdate = (textInstance, oldText, newText) => {
  textInstance.value = newText;
};

const commitUpdate = (instance, updatePayload, type, oldProps, newProps) => {
  const { style, ...props } = newProps;
  instance.props = props;
  instance.style = style;
};

const createRenderer = ({ onChange = () => {} }) =>
  Reconciler({
    appendChild,
    appendChildToContainer,
    commitTextUpdate,
    commitUpdate,
    createInstance,
    createTextInstance,
    insertBefore,
    removeChild,
    removeChildFromContainer,
    resetAfterCommit: onChange,
  });

export default createRenderer;
