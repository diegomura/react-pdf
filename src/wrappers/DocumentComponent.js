'use strict';

import capitalizeObject from '../utils/capitalizeObject';

const DocumentComponent = function(element, context) {
  this._element = element;
  this._context = context;
};

const DocumentComponentMixin = {
  mountComponent() {
    const {doc} = this._context;
    const node = this._element;
    const {children, ...props} = node.props;

    Object.assign(
      doc.info,
      capitalizeObject(props),
      {
        Producer: 'react-log',
        Creator: 'react-log'
      }
    );
  }
};

Object.assign(
  DocumentComponent.prototype,
  DocumentComponentMixin
);

export default DocumentComponent;
