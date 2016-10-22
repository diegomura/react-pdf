'use strict';

import fs from 'fs';
import pdf from 'pdfkit';
import instantiateReactComponent from 'react/lib/instantiateReactComponent';
import ReactInstanceHandles from 'react/lib/ReactInstanceHandles';
import ReactUpdates from 'react/lib/ReactUpdates';
import ReactElement from 'react/lib/ReactElement';
import DefaultInjection from './injection';
import invariant from 'fbjs/lib/invariant';

//Inject the unique aspects of your renderer into React core
DefaultInjection.inject();

const render = (
  nextElement, // ReactElement description.
  filePath, // PDF file path
  callback // optional callback for when mount is complete
) => {

  invariant(
    ReactElement.isValidElement(nextElement),
    'render(): You must pass a valid ReactElement.'
  );

  invariant(
    nextElement.type == 'document',
    'Root element shoud be of type "document"'
  );

  // If there is a target element or the opportunity to reuse a previous render
  // call, you would look up the previous element and reconcile from there.

  //Since any application can have multiple roots, we
  const rootId = ReactInstanceHandles.createReactRootID(0);
  // Next we instantiate a new ReactComponent from the ReactElement passed in.
  const component = instantiateReactComponent(nextElement);

  ReactUpdates.batchedUpdates(() => {
    let doc = new pdf();

    const transaction = ReactUpdates.ReactReconcileTransaction.getPooled();

    doc.pipe(fs.createWriteStream(filePath));

    transaction.perform(() => {
      // Starts mounting recursive process
      component.mountComponent(transaction, rootId, null, {doc});

      doc.end();

      if (callback) {
        callback(component.getPublicInstance());
      }
    });
    ReactUpdates.ReactReconcileTransaction.release(transaction);
  });

  return component;
};

export default render;
