'use strict';

import Wrappers from './';
import ReactMultiChild from 'react/lib/ReactMultiChild';

const ListComponent = function(element, context, renderedChildren) {
  this._element = element;
  this._context = context;
  this._renderedChildren = renderedChildren;
};

const ListComponentMixin = {
  mountComponent() {
    const node = this._element;
    const {children, x, y, ...props} = node.props;

    this._context.doc.list(this._renderedChildren, x, y, props);

    return node;
  }
};

Object.assign(
  ListComponent.prototype,
  ListComponentMixin,
  ReactMultiChild.Mixin
);

export default ListComponent;
