'use strict';

const PDFPageComponent = function(element, context) {
  this._element = element;
  this._context = context;
};

const PDFPageComponentMixin = {
  mountComponent() {
    // Because the document already starts with a page
    // we don't call addPage the first time
    if (this._context.firstPageSkipped)
      this._context.doc.addPage();

    this._context.firstPageSkipped = true;
  }
};

Object.assign(
  PDFPageComponent.prototype,
  PDFPageComponentMixin
);

export default PDFPageComponent;
