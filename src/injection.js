/**
 * A React renderer is responsible for injecting the implementations for one or
 * more internal concepts.
 */

'use strict';

const ReactInjection = require('react/lib/ReactInjection');
const ReactDefaultBatchingStrategy = require('react/lib/ReactDefaultBatchingStrategy');
const PDFRendererReconcileTransaction = require('./reconcileTransaction');
const PDFRendererComponent = require('./component');

function inject() {
  (ReactInjection.NativeComponent || ReactInjection.HostComponent).injectGenericComponentClass(
    PDFRendererComponent
  );

  ReactInjection.Updates.injectReconcileTransaction(
    PDFRendererReconcileTransaction
  );

  ReactInjection.Updates.injectBatchingStrategy(
    ReactDefaultBatchingStrategy
  );
}

module.exports = {inject};
