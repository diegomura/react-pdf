/* eslint-disable import/no-extraneous-dependencies */
const Environment = require('jest-environment-jsdom').default;
const { TextEncoder, TextDecoder } = require('util');

class CustomEnvironment extends Environment {
  async setup() {
    await super.setup();

    if (typeof this.global.TextEncoder === 'undefined') {
      this.global.TextEncoder = TextEncoder;
      this.global.TextDecoder = TextDecoder;
    }

    if (typeof this.global.TextDecoder === 'undefined') {
      this.global.TextDecoder = TextDecoder;
    }

    if (typeof this.global.URL.createObjectURL === 'undefined') {
      this.global.URL.createObjectURL = blob => `[Blob - ${blob.size}]`;
    }

    if (typeof this.global.URL.revokeObjectURL === 'undefined') {
      this.global.URL.revokeObjectURL = () => undefined;
    }
  }
}

module.exports = CustomEnvironment;
