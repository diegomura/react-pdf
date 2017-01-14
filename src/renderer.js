'use strict';

import fs from 'fs';
import pdf from 'pdfkit';
import ReactFiberReconciler from 'react-dom/lib/ReactFiberReconciler';
import ReactGenericBatching from 'react-dom/lib/ReactGenericBatching';
import emptyObject from 'fbjs/lib/emptyObject';

var PDFRenderer = ReactFiberReconciler({
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
    // noop
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
    return inst;
  },
});

function toPDF(inst) {
  switch (inst.tag) {
    case 'TEXT':
      return inst.text;
    case 'INSTANCE':
      const doc = inst.rootContainerInstance.doc;
      const {children, ...props} = inst.props;
      console.log(inst.type);

      if (inst.children && inst.children.length) {
        inst.children.map(toPDF);
      }
      return;
    default:
      throw new Error('Unexpected node type in toPDF: ' + inst.tag);
  }
}

var ReactPDFFiberRenderer = {
  render(element, filePath) {
    var doc = new pdf();

    doc.pipe(fs.createWriteStream(filePath));

    var container = {
      children: [],
      tag: 'CONTAINER',
      doc
    };

    var root = PDFRenderer.createContainer(container);
    PDFRenderer.updateContainer(element, root, null, null);

    if (root == null || container == null) {
      return null;
    }

    if (container.children.length === 0) {
      return null;
    }

    return toPDF(container.children[0]);
  },

  unstable_batchedUpdates: ReactGenericBatching.batchedUpdates,
};

module.exports = ReactPDFFiberRenderer;
