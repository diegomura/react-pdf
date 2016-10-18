'use strict';

const instantiateReactComponent = require('react/lib/instantiateReactComponent');
const ReactInstanceHandles = require('react/lib/ReactInstanceHandles');
const ReactUpdates = require('react/lib/ReactUpdates');
const DefaultInjection = require('./injection');
const ReactElement = require('react/lib/ReactElement');
const invariant = require('fbjs/lib/invariant');
const pdf = require('pdfkit');
const fs = require('fs');

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
    let doc = new pdf;

    const transaction = ReactUpdates.ReactReconcileTransaction.getPooled();

    doc.pipe(fs.createWriteStream(filePath));

    transaction.perform(() => {
      // The `component` here is an instance of your `ReactCustomRendererComponent` class.
      component.mountComponent(
        transaction,
        rootId,
        {_idCounter: 0},
        {
          doc: doc,
          firstPageSkipped: false
        }
      );

      doc.end();

      if (callback) {
        callback(component.getPublicInstance());
      }
    });
    ReactUpdates.ReactReconcileTransaction.release(transaction);
  });

  return component;
};

module.exports = render;
