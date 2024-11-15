/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import Reconciler from 'react-reconciler-26/cjs/react-reconciler.production.min.js';

import propsEqual from './propsEqual';

const emptyObject = {};

const createRenderer = ({
  appendChild,
  appendChildToContainer,
  commitTextUpdate,
  commitUpdate,
  createInstance,
  createTextInstance,
  insertBefore,
  removeChild,
  removeChildFromContainer,
  resetAfterCommit,
}) => {
  return Reconciler({
    appendChild,
    appendChildToContainer,
    appendInitialChild: appendChild,
    createInstance,
    createTextInstance,
    insertBefore,
    commitUpdate,
    commitTextUpdate,
    removeChild,
    removeChildFromContainer,
    resetAfterCommit,
    shouldSetTextContent: () => false,
    finalizeInitialChildren: () => false,
    getPublicInstance: (instance) => instance,
    getRootHostContext: () => emptyObject,
    getChildHostContext: () => emptyObject,
    prepareForCommit() {},
    clearContainer() {},
    resetTextContent() {},
    prepareUpdate: (element, type, oldProps, newProps) =>
      !propsEqual(oldProps, newProps),
  });
};

export default createRenderer;
