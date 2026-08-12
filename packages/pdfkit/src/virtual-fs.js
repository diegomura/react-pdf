import { fromBase64, toBase64 } from './binary';

class VirtualFileSystem {
  constructor() {
    this.files = {};
  }

  readFileSync(fileName, options = {}) {
    const encoding = typeof options === 'string' ? options : options.encoding;
    const data = this.files[fileName];
    if (data == null) {
      throw new Error(`File '${fileName}' not found in virtual file system`);
    }

    if (encoding) {
      // return a string
      if (typeof data === 'string') return data;
      return encoding === 'base64'
        ? toBase64(data)
        : new TextDecoder(encoding).decode(data);
    }

    return typeof data === 'string' ? fromBase64(data) : new Uint8Array(data);
  }

  writeFileSync(fileName, content) {
    this.files[fileName] = content;
  }

  bindFileData(data = {}, options = {}) {
    if (options.reset) {
      this.files = data;
    } else {
      Object.assign(this.files, data);
    }
  }
}

export default new VirtualFileSystem();
