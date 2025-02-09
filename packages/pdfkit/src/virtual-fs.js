class VirtualFileSystem {
  constructor() {
    this.fileData = {};
  }

  readFileSync(fileName, options = {}) {
    const encoding = typeof options === 'string' ? options : options.encoding;
    const virtualFileName = normalizeFilename(fileName);

    const data = this.fileData[virtualFileName];
    if (data == null) {
      throw new Error(
        `File '${virtualFileName}' not found in virtual file system`
      );
    }

    if (encoding) {
      // return a string
      return typeof data === 'string' ? data : data.toString(encoding);
    }

    return Buffer.from(data, typeof data === 'string' ? 'base64' : undefined);
  }

  writeFileSync(fileName, content) {
    this.fileData[normalizeFilename(fileName)] = content;
  }

  bindFileData(data = {}, options = {}) {
    if (options.reset) {
      this.fileData = data;
    } else {
      Object.assign(this.fileData, data);
    }
  }
}

function normalizeFilename(fileName) {
  if (fileName.indexOf(__dirname) === 0) {
    fileName = fileName.substring(__dirname.length);
  }

  if (fileName.indexOf('/') === 0) {
    fileName = fileName.substring(1);
  }

  return fileName;
}

export default new VirtualFileSystem();
