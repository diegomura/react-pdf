'use strict';

const PageComponent = function(element, context) {
  this._element = element;
  this._context = context;
};

const PageComponentMixin = {
  mountComponent() {
    const node = this._element;
    const {children, ...props} = node.props;

    // Because the document already starts with a page
    // we don't call addPage the first time
    if (this._context.firstPageSkipped)
      this._context.doc.addPage(props);

    this._context.firstPageSkipped = true;
  }
};

Object.assign(
  PageComponent.prototype,
  PageComponentMixin
);

export default PageComponent;
