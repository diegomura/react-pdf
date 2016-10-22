/***
 * The ReconcileTransaction class provided here is the simplest scenario
 * possible. The source code here—including all callbacks beyond this point—is
 * the same as the ReactReconcileTransaction.js module in the React 15 source
 * code, but with the DOM event and selection handlers removed.
 */

'use strict';

import CallbackQueue from 'react/lib/CallbackQueue';
import PooledClass from 'react/lib/PooledClass';
import Transaction from 'react/lib/Transaction';

/**
 * Provides a `CallbackQueue` queue for collecting `onDOMReady` or analogous
 * callbacks during the performing of the transaction.
 */
const ON_RENDERER_READY_QUEUEING = {
  /**
   * Initializes the internal firmata `connected` queue.
   */
  initialize: function() {
    this.reactMountReady.reset();
  },

  /**
   * After Hardware is connected, invoke all registered `ready` callbacks.
   */
  close: function() {
    this.reactMountReady.notifyAll();
  },
};

/**
 * Executed within the scope of the `Transaction` instance. Consider these as
 * being member methods, but with an implied ordering while being isolated from
 * each other.
 */
const TRANSACTION_WRAPPERS = [ON_RENDERER_READY_QUEUEING];

function ReconcileTransaction() {
  this.reinitializeTransaction();
  this.reactMountReady = CallbackQueue.getPooled(null);
}

const Mixin = {
  /**
   * @see Transaction
   * @abstract
   * @final
   * @return {array<object>} List of operation wrap procedures.
   */
  getTransactionWrappers: function() {
    return TRANSACTION_WRAPPERS;
  },

  /**
   * @return {object} The queue to collect `ready` callbacks with.
   */
  getReactMountReady: function() {
    return this.reactMountReady;
  },

  /**
   * `PooledClass` looks for this, and will invoke this before allowing this
   * instance to be reused.
   */
  destructor: function() {
    CallbackQueue.release(this.reactMountReady);
    this.reactMountReady = null;
  },
};

Object.assign(
  ReconcileTransaction.prototype,
  Transaction.Mixin,
  ReconcileTransaction,
  Mixin
);

PooledClass.addPoolingTo(ReconcileTransaction);

export default ReconcileTransaction;
