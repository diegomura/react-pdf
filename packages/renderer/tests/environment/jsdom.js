import { TestEnvironment } from 'jest-environment-jsdom';
import { TextEncoder, TextDecoder } from 'util';

class CustomEnvironment extends TestEnvironment {
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

export default CustomEnvironment;
