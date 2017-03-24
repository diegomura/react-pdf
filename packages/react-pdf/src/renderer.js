'use strict';

import fs from 'fs';
import path from 'path';
import Pdf from 'pdfkit';
import ReactFiberReconciler from 'react-dom/lib/ReactFiberReconciler';
import ReactGenericBatching from 'react-dom/lib/ReactGenericBatching';
import emptyObject from 'fbjs/lib/emptyObject';

const PDFRenderer = ReactFiberReconciler({
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

  createInstance(
    type,
    props,
    rootContainerInstance,
    hostContext,
    internalInstanceHandle,
  ) {
    return {
      type,
      props,
      children: [],
      rootContainerInstance,
      tag: 'INSTANCE',
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

  commitUpdate(
    instance,
    type,
    oldProps,
    newProps,
    rootContainerInstance,
    internalInstanceHandle,
  ) {
    // noop
  },

  commitMount(
    instance,
    type,
    newProps,
    rootContainerInstance,
    internalInstanceHandle,
  ) {
    // noop
  },

  shouldSetTextContent(props) {
    return false;
  },

  resetTextContent(testElement) {
    // noop
  },

  createTextInstance(
    text,
    rootContainerInstance,
    hostContext,
    internalInstanceHandle,
  ) {
    return {
      text,
      tag: 'TEXT',
    };
  },

  commitTextUpdate(textInstance, oldText, newText) {
    textInstance.text = newText;
  },

  appendChild(parentInstance, child) {
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
    setTimeout(fn, 0, { timeRemaining: Infinity });
  },

  useSyncScheduling: true,

  getPublicInstance(inst) {
    return inst;
  },
});

function createPDFInstance(inst) {
  console.log(inst);

  const { doc, firstPageSkipped } = inst.rootContainerInstance;
  const { children, ...props } = inst.props;

  switch (inst.type) {
    case 'page':
      if (firstPageSkipped) {
        doc.addPage(props);
      }
      inst.rootContainerInstance.firstPageSkipped = true;
      break;
    case 'text':
      if (props.x && props.y) {
        doc.text(children, props.x, props.y, props);
      } else {
        doc.text(children, props);
      }
      break;
    case 'image':
      if (props.x && props.y) {
        doc.image(props.src, props.x, props.y, props);
      } else {
        doc.image(props.src, props);
      }
      break;
    case 'rect':
      if (props.cornerRadius) {
        doc
          .roundedRect(
            props.x,
            props.y,
            props.width,
            props.height,
            props.cornerRadius,
          )
          .stroke();
      } else {
        doc.rect(props.x, props.y, props.width, props.height).stroke();
      }
      break;
    case 'circle':
      doc.circle(props.x, props.y, props.radius).stroke();
      break;
    default:
      break;
  }

  if (inst.children && inst.children.length) {
    inst.children.map(toPDF);
  }
}

function toPDF(inst) {
  switch (inst.tag) {
    case 'TEXT':
      return inst.text;
    case 'INSTANCE':
      return createPDFInstance(inst);
    default:
      throw new Error('Unexpected node type in toPDF: ' + inst.tag);
  }
}

const ReactPDFFiberRenderer = {
  render(element, filePath) {
    const doc = new Pdf();

    doc.pipe(fs.createWriteStream(filePath));

    const container = {
      children: [],
      tag: 'CONTAINER',
      doc,
      firstPageSkipped: false,
    };

    const root = PDFRenderer.createContainer(container);
    PDFRenderer.updateContainer(element, root, null, null);

    toPDF(container.children[0]);

    console.log(`📝  PDF successfuly exported on ${path.resolve(filePath)}`);

    return doc.end();
  },

  unstable_batchedUpdates: ReactGenericBatching.batchedUpdates,
};

module.exports = ReactPDFFiberRenderer;
