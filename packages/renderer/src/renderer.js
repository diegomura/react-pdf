import { createElement } from 'react';
import Reconciler from '@react-pdf/reconciler';
import * as P from '@react-pdf/primitives';

import createInstances from './createInstances';

// Render props and page layouts run later, during pagination, so the fiber
// reconciler never sees the elements they return. Wrapping them here keeps
// layout React-free: by the time layout calls them they return instances.
const wrapFunctionProps = (props) => {
  const next = { ...props };

  if (typeof props.render === 'function') {
    const { render } = props;
    next.render = (renderProps) => createInstances(render(renderProps));
  }

  if (typeof props.layout === 'function') {
    const { layout } = props;
    next.layout = (layoutProps, payload) =>
      createInstances(
        createElement(
          layout,
          layoutProps,
          payload.map((node) => createElement(P.Fragment, { node })),
        ),
      );
  }

  return next;
};

const createInstance = (type, { style, children, ...props }) => ({
  type,
  box: {},
  style: style || {},
  props: wrapFunctionProps(props || {}),
  children: [],
});

const createTextInstance = (text) => ({ type: 'TEXT_INSTANCE', value: text });

const appendChild = (parent, child) => {
  const isParentText =
    parent.type === 'TEXT' ||
    parent.type === 'LINK' ||
    parent.type === 'TSPAN' ||
    parent.type === 'NOTE';

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
  instance.props = wrapFunctionProps(props);
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
