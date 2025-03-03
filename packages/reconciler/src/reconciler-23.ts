import Reconciler from 'react-reconciler-23/cjs/react-reconciler.production.min.js';

import propsEqual from './propsEqual';
import { ReconcilerFactory } from './types';

const emptyObject = {};

const createRenderer: ReconcilerFactory = ({
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
