'use strict';

import ReactFiberReconciler from 'react-dom/lib/ReactFiberReconciler';
import ReactGenericBatching from 'react-dom/lib/ReactGenericBatching';
import emptyObject from 'fbjs/lib/emptyObject';

var TestRenderer = ReactFiberReconciler({
  getRootHostContext() {
    return emptyObject;
  },

  getChildHostContext() {
    return emptyObject;
  },

  prepareForCommit() {
    // noop
  },

  resetAfterCommit() {
    // noop
  },

  createInstance(type, props, rootContainerInstance, hostContext, internalInstanceHandle) {
    return {
      type,
      props,
      children: [],
      rootContainerInstance,
      tag: 'INSTANCE'
    };
  },

  appendInitialChild(parentInstance, child) {
    const index = parentInstance.children.indexOf(child);
    if (index !== -1) {
      parentInstance.children.splice(index, 1);
    }
    parentInstance.children.push(child);
  },

  finalizeInitialChildren(testElement, type, props, rootContainerInstance) {
    return false;
  },

  prepareUpdate(testElement, type, oldProps, newProps, hostContext) {
    return true;
  },

  commitUpdate(instance, type, oldProps, newProps, rootContainerInstance, internalInstanceHandle) {
    instance.type = type;
    instance.props = newProps;
  },

  commitMount(instance, type, newProps, rootContainerInstance, internalInstanceHandle) {
    // noop
  },

  shouldSetTextContent(props) {
    return false;
  },

  resetTextContent(testElement) : void {
    // noop
  },

  createTextInstance(text, rootContainerInstance, hostContext, internalInstanceHandle) {
    return {
      text,
      tag: 'TEXT'
    };
  },

  commitTextUpdate(textInstance, oldText, newText) {
    textInstance.text = newText;
  },

  appendChild(parentInstance, child) : void {
    const index = parentInstance.children.indexOf(child);
    if (index !== -1) {
      parentInstance.children.splice(index, 1);
    }
    parentInstance.children.push(child);
  },

  insertBefore(parentInstance, child, beforeChild) {
    const index = parentInstance.children.indexOf(child);
    if (index !== -1) {
      parentInstance.children.splice(index, 1);
    }
    const beforeIndex = parentInstance.children.indexOf(beforeChild);
    parentInstance.children.splice(beforeIndex, 0, child);
  },

  removeChild(parentInstance, child) {
    const index = parentInstance.children.indexOf(child);
    parentInstance.children.splice(index, 1);
  },

  scheduleAnimationCallback(fn) {
    setTimeout(fn);
  },

  scheduleDeferredCallback(fn) {
    setTimeout(fn, 0, {timeRemaining: Infinity});
  },

  useSyncScheduling: true,

  getPublicInstance(inst) {
    switch (inst.tag) {
      case 'INSTANCE':
        const createNodeMock = inst.rootContainerInstance.createNodeMock;
        return createNodeMock({
          type: inst.type,
          props: inst.props,
        });
      default:
        return inst;
    }
  },
});

var defaultTestOptions = {
  createNodeMock: function() {
    return null;
  },
};

function toJSON(inst) {
  switch (inst.tag) {
    case 'TEXT':
      return inst.text;
    case 'INSTANCE':
      // We don't include the `children` prop in JSON.
      // Instead, we will include the actual rendered children.
      const {children, ...props} = inst.props;
      let renderedChildren = null;
      if (inst.children && inst.children.length) {
        renderedChildren = inst.children.map(toJSON);
      }
      const json : ReactTestRendererJSON = {
        type: inst.type,
        props: props,
        children: renderedChildren,
      };
      Object.defineProperty(json, '$$typeof', {value: Symbol.for('react.test.json')});
      return json;
    default:
      throw new Error(`Unexpected node type in toJSON: ${inst.tag}`);
  }
}

var ReactTestFiberRenderer = {
  create(element, options) {
    var createNodeMock = defaultTestOptions.createNodeMock;
    if (options && typeof options.createNodeMock === 'function') {
      createNodeMock = options.createNodeMock;
    }
    var container = {
      children: [],
      createNodeMock,
      tag: 'CONTAINER',
    };
    var root = TestRenderer.createContainer(container);
    TestRenderer.updateContainer(element, root, null, null);

    return {
      toJSON() {
        if (root == null || container == null) {
          return null;
        }
        if (container.children.length === 0) {
          return null;
        }
        if (container.children.length === 1) {
          return toJSON(container.children[0]);
        }
        return container.children.map(toJSON);
      },
      update(newElement : ReactElement<any>) {
        if (root == null) {
          return;
        }
        TestRenderer.updateContainer(newElement, root, null, null);
      },
      unmount() {
        if (root == null) {
          return;
        }
        TestRenderer.updateContainer(null, root, null);
        container = null;
        root = null;
      },
      getInstance() {
        if (root == null) {
          return null;
        }
        return TestRenderer.getPublicRootInstance(root);
      },
    };
  },

  /* eslint-disable camelcase */
  unstable_batchedUpdates: ReactGenericBatching.batchedUpdates,
  /* eslint-enable camelcase */
};

module.exports = ReactTestFiberRenderer;
