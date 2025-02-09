import { builtinEnvironments } from 'vitest/environments';

function patchGlobals() {
  if (typeof global.TextEncoder === 'undefined') {
    global.TextEncoder = TextEncoder;
    global.TextDecoder = TextDecoder;
  }

  if (typeof global.TextDecoder === 'undefined') {
    global.TextDecoder = TextDecoder;
  }

  if (typeof global.URL.createObjectURL === 'undefined') {
    global.URL.createObjectURL = (blob) => `[Blob - ${blob.size}]`;
  }

  if (typeof global.URL.revokeObjectURL === 'undefined') {
    global.URL.revokeObjectURL = () => undefined;
  }
}

export default {
  name: 'jsdom',
  transformMode: 'web',
  async setupVM({ jsdom = {} }) {
    const superSetup = builtinEnvironments.jsdom.setupVM;

    const result = await superSetup({ jsdom });

    patchGlobals();

    return result;
  },
  async setup(global, { jsdom = {} }) {
    const superSetup = builtinEnvironments.jsdom.setup;

    const result = await superSetup(global, { jsdom });

    patchGlobals();

    return result;
  },
};
