'use strict';

import React from 'react';
import ReactFiberReconciler from 'react-reconciler';
import emptyObject from 'fbjs/lib/emptyObject';
import { createElement } from './elements';

const Renderer = ReactFiberReconciler({
  appendInitialChild(parentInstance, child) {
    if (parentInstance.appendChild) {
      parentInstance.appendChild(child);
    } else {
      parentInstance.document = child;
    }
  },

  createInstance(type, props, internalInstanceHandle) {
    return createElement(type, props, internalInstanceHandle);
  },

  createTextInstance(text, rootContainerInstance, internalInstanceHandle) {
    return text;
  },

  finalizeInitialChildren(domElement, type, props) {
    return false;
  },

  getPublicInstance(instance) {
    return instance;
  },

  prepareForCommit() {
    // Noop
  },

  prepareUpdate(domElement, type, oldProps, newProps) {
    return true;
  },

  resetAfterCommit() {
    // Noop
  },

  resetTextContent(domElement) {
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

  now: () => {},

  useSyncScheduling: true,

  mutation: {
    appendChild(parentInstance, child) {
      if (parentInstance.appendChild) {
        parentInstance.appendChild(child);
      } else {
        parentInstance.document = child;
      }
    },

    appendChildToContainer(parentInstance, child) {
      if (parentInstance.appendChild) {
        parentInstance.appendChild(child);
      } else {
        parentInstance.document = child;
      }
    },

    insertBefore(parentInstance, child, beforeChild) {
      // noob
    },

    insertInContainerBefore(parentInstance, child, beforeChild) {
      // noob
    },

    removeChild(parentInstance, child) {
      parentInstance.removeChild(child);
    },

    removeChildFromContainer(parentInstance, child) {
      if (parentInstance.removeChild) {
        parentInstance.removeChild(child);
      }
    },

    commitTextUpdate(textInstance, oldText, newText) {
      textInstance = newText;
    },

    commitMount(instance, type, newProps) {
      // Noop
    },

    commitUpdate(instance, updatePayload, type, oldProps, newProps) {
      // noop
    },
  },
});

// Transform function childs (not valid React children), into React elements of type FUNC
const traverseFunctionChilds = (element, key = 0) => {
  if (!element || typeof element === 'string' || typeof element === 'number') {
    return element;
  }

  if (typeof element === 'function') {
    return React.createElement('FUNC', { instance: element, key });
  }

  let children = element.props.children;
  if (!Array.isArray(children)) {
    children = [children];
  }

  const newChildren = children.map(traverseFunctionChilds);

  return React.cloneElement(element, { ...element.props, key }, newChildren);
};

const PDFRenderer = {
  ...Renderer,
  updateContainer: (element, root) => {
    const a = traverseFunctionChilds(element);
    Renderer.updateContainer(a, root, null);
  },
};

export default PDFRenderer;
