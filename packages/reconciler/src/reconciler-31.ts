import Reconciler from 'react-reconciler-31';
import {
  ConcurrentRoot,
  DefaultEventPriority,
} from 'react-reconciler-31/constants';

import propsEqual from './propsEqual';
import { ReconcilerFactory } from './types';

const emptyObject = {};

const logRecoverableError = console.error;

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
  const _commitUpdate = (instance, type, oldProps, newProps) => {
    if (propsEqual(oldProps, newProps)) return;
    commitUpdate(instance, null, type, oldProps, newProps);
  };

  let uncaughtError: unknown = null;

  // Rethrown from updateContainer so callers get the error instead of a
  // later failure on the empty document, matching React 18 behavior
  const onUncaughtError = (error: unknown) => {
    uncaughtError = error;
  };

  const reconciler = Reconciler({
    appendChild,
    appendChildToContainer,
    appendInitialChild: appendChild,
    createInstance,
    createTextInstance,
    insertBefore,
    commitUpdate: _commitUpdate,
    commitTextUpdate,
    removeChild,
    removeChildFromContainer,
    resetAfterCommit,
    noTimeout: -1,
    shouldSetTextContent: () => false,
    finalizeInitialChildren: () => false,
    getPublicInstance: (instance) => instance,
    getRootHostContext: () => emptyObject,
    getChildHostContext: () => emptyObject,
    prepareForCommit() {},
    clearContainer() {},
    resetTextContent() {},
    getCurrentUpdatePriority: () => DefaultEventPriority,
    maySuspendCommit: () => false,
    requestPostPaintCallback: () => {},
    resolveUpdatePriority: () => DefaultEventPriority,
    setCurrentUpdatePriority: () => {},
    shouldAttemptEagerTransition: () => false,
    detachDeletedInstance: () => {},
  });

  const createContainer = (container) => {
    return reconciler.createContainer(
      container,
      ConcurrentRoot, // tag
      null, // hydration callbacks
      false, // isStrictMode
      null, // concurrentUpdatesByDefaultOverride
      '', // identifierPrefix
      onUncaughtError, // onUncaughtError
      logRecoverableError, // onCaughtError
      logRecoverableError, // onRecoverableError
      null, // transitionCallbacks
    );
  };

  const updateContainer = (doc, mountNode, parentComponent, callback) => {
    reconciler.updateContainerSync(doc, mountNode, parentComponent, callback);
    reconciler.flushSyncWork();

    if (uncaughtError) {
      const error = uncaughtError;
      uncaughtError = null;
      throw error;
    }
  };

  return {
    createContainer,
    updateContainer,
  };
};

export default createRenderer;
