'use strict';

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 *
 * @format
 */

var Yoga = require('./entry-common');
var nbind = require('../build/Release/nbind.js');

var ran = false;
var ret = null;

var isBrowser = typeof window !== 'undefined';

var DEFAULT_TOTAL_MEMORY = 1073741824;

function roundBy2(value) {
  return value;
}

function getBrowserTotalMemory() {
  // Chrome
  // https://developer.mozilla.org/en-US/docs/Web/API/Performance/memory
  if (typeof window.performance !== 'undefined' &&
    typeof window.performance.memory !== 'undefined' &&
    typeof window.performance.memory.jsHeapSizeLimit === 'number') {
    return window.performance.memory.jsHeapSizeLimit
  }

  return null;
}

function getTotalMemory() {
  const configuredTotalMemory = process.env.TEST_MEMORY;
  if (configuredTotalMemory) return roundBy2(configuredTotalMemory)

  if (isBrowser) {
    const totalMemory = getBrowserTotalMemory()
    if (totalMemory) return roundBy2(totalMemory)
  }

  return DEFAULT_TOTAL_MEMORY
}

var totalMemory = Math.min(DEFAULT_TOTAL_MEMORY, getTotalMemory());

nbind({ TOTAL_MEMORY: totalMemory }, function (err, result) {
  if (ran) {
    return;
  }

  ran = true;

  if (err) {
    throw err;
  }

  ret = result;
});

if (!ran) {
  throw new Error("Failed to load the yoga module - it needed to be loaded synchronously, but didn't");
}

// $FlowFixMe ret will not be null here
module.exports = Yoga(ret.bind, ret.lib);
