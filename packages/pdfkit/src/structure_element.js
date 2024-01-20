/*
PDFStructureElement - represents an element in the PDF logical structure tree
By Ben Schmidt
*/

import PDFStructureContent from './structure_content';

class PDFStructureElement {
  constructor(document, type, options = {}, children = null) {
    this.document = document;

    this._attached = false;
    this._ended = false;
    this._flushed = false;
    this.dictionary = document.ref({
      // Type: "StructElem",
      S: type
    });

    const data = this.dictionary.data;

    if (Array.isArray(options) || this._isValidChild(options)) {
      children = options;
      options = {};
    }

    if (typeof options.title !== 'undefined') {
      data.T = new String(options.title);
    }
    if (typeof options.lang !== 'undefined') {
      data.Lang = new String(options.lang);
    }
    if (typeof options.alt !== 'undefined') {
      data.Alt = new String(options.alt);
    }
    if (typeof options.expanded !== 'undefined') {
      data.E = new String(options.expanded);
    }
    if (typeof options.actual !== 'undefined') {
      data.ActualText = new String(options.actual);
    }

    this._children = [];

    if (children) {
      if (!Array.isArray(children)) {
        children = [children];
      }
      children.forEach(child => this.add(child));
      this.end();
    }
  }

  add(child) {
    if (this._ended) {
      throw new Error(`Cannot add child to already-ended structure element`);
    }

    if (!this._isValidChild(child)) {
      throw new Error(`Invalid structure element child`);
    }

    if (child instanceof PDFStructureElement) {
      child.setParent(this.dictionary);
      if (this._attached) {
        child.setAttached();
      }
    }

    if (child instanceof PDFStructureContent) {
      this._addContentToParentTree(child);
    }

    if (typeof child === 'function' && this._attached) {
      // _contentForClosure() adds the content to the parent tree
      child = this._contentForClosure(child);
    }

    this._children.push(child);

    return this;
  }

  _addContentToParentTree(content) {
    content.refs.forEach(({ pageRef, mcid }) => {
      const pageStructParents = this.document
        .getStructParentTree()
        .get(pageRef.data.StructParents);
      pageStructParents[mcid] = this.dictionary;
    });
  }

  setParent(parentRef) {
    if (this.dictionary.data.P) {
      throw new Error(`Structure element added to more than one parent`);
    }

    this.dictionary.data.P = parentRef;

    this._flush();
  }

  setAttached() {
    if (this._attached) {
      return;
    }

    this._children.forEach((child, index) => {
      if (child instanceof PDFStructureElement) {
        child.setAttached();
      }
      if (typeof child === 'function') {
        this._children[index] = this._contentForClosure(child);
      }
    });

    this._attached = true;

    this._flush();
  }

  end() {
    if (this._ended) {
      return;
    }

    this._children
      .filter(child => child instanceof PDFStructureElement)
      .forEach(child => child.end());

    this._ended = true;

    this._flush();
  }

  _isValidChild(child) {
    return (
      child instanceof PDFStructureElement ||
      child instanceof PDFStructureContent ||
      typeof child === 'function'
    );
  }

  _contentForClosure(closure) {
    const content = this.document.markStructureContent(this.dictionary.data.S);
    closure();
    this.document.endMarkedContent();

    this._addContentToParentTree(content);

    return content;
  }

  _isFlushable() {
    if (!this.dictionary.data.P || !this._ended) {
      return false;
    }

    return this._children.every(child => {
      if (typeof child === 'function') {
        return false;
      }
      if (child instanceof PDFStructureElement) {
        return child._isFlushable();
      }
      return true;
    });
  }

  _flush() {
    if (this._flushed || !this._isFlushable()) {
      return;
    }

    this.dictionary.data.K = [];

    this._children.forEach(child => this._flushChild(child));

    this.dictionary.end();

    // free memory used by children; the dictionary itself may still be
    // referenced by a parent structure element or root, but we can
    // at least trim the tree here
    this._children = [];
    this.dictionary.data.K = null;

    this._flushed = true;
  }

  _flushChild(child) {
    if (child instanceof PDFStructureElement) {
      this.dictionary.data.K.push(child.dictionary);
    }

    if (child instanceof PDFStructureContent) {
      child.refs.forEach(({ pageRef, mcid }) => {
        if (!this.dictionary.data.Pg) {
          this.dictionary.data.Pg = pageRef;
        }

        if (this.dictionary.data.Pg === pageRef) {
          this.dictionary.data.K.push(mcid);
        } else {
          this.dictionary.data.K.push({
            Type: 'MCR',
            Pg: pageRef,
            MCID: mcid
          });
        }
      });
    }
  }
}

export default PDFStructureElement;
