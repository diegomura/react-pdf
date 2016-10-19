/**
 * A React renderer is responsible for injecting the implementations for one or
 * more internal concepts.
 */

'use strict';

import ReactInjection from 'react/lib/ReactInjection';
import ReactDefaultBatchingStrategy from 'react/lib/ReactDefaultBatchingStrategy';
import PDFRendererReconcileTransaction from './reconcileTransaction';
import PDFRendererComponent from './component';

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

export default {inject};
