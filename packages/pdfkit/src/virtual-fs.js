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
      return typeof data === 'string' ? data : data.toString(encoding);
    }

    return Buffer.from(data, typeof data === 'string' ? 'base64' : undefined);
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
