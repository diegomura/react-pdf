import stream from 'stream';
import PDFObject from './object';
import PDFReference from './reference';
import PDFNameTree from './name_tree';
import PDFPage from './page';
import Color from './mixins/color';
import Vector from './mixins/vector';
import Fonts from './mixins/fonts';
import Text from './mixins/text';
import Images from './mixins/images';
import Annotations from './mixins/annotations';

class PDFDocument extends stream.Readable {
  constructor(options = {}) {
    super();

    this.options = options;
    this.version = 1.3;
    this.compress = true;
    this._pageBuffer = [];
    this._pageBufferStart = 0;

    // The PDF object store
    this._offsets = [];
    this._waiting = 0;
    this._ended = false;
    this._offset = 0;

    const Names = this.ref({
      Dests: new PDFNameTree(),
    });

    this._root = this.ref({
      Type: 'Catalog',
      Pages: this.ref({
        Type: 'Pages',
        Count: 0,
        Kids: [],
      }),
      Names,
    });

    // The current page
    this.page = null;

    // Initialize mixins
    this.initColor();
    this.initVector();
    this.initFonts();
    this.initText();
    this.initImages();

    // Initialize the metadata
    this.info = {
      Producer: 'PDFKit',
      Creator: 'PDFKit',
      CreationDate: new Date(),
    };

    if (this.options.info) {
      for (let key in this.options.info) {
        const val = this.options.info[key];
        this.info[key] = val;
      }
    }

    // Write the header PDF version
    this._write(`%PDF-${this.version}`);

    // 4 binary chars, as recommended by the spec
    this._write('%\xFF\xFF\xFF\xFF');

    // Add the first page
    if (this.options.autoFirstPage !== false) {
      this.addPage();
    }
  }

  addPage(options) {
    // end the current page if needed
    if (options == null) {
      ({ options } = this);
    }

    if (!this.options.bufferPages) {
      this.flushPages();
    }

    // create a page object
    this.page = new PDFPage(this, options);
    this._pageBuffer.push(this.page);

    // add the page to the object store
    const pages = this._root.data.Pages.data;
    pages.Kids.push(this.page.dictionary);
    pages.Count++;

    // flip PDF coordinate system so that the origin is in
    // the top left rather than the bottom left
    this._ctm = [1, 0, 0, 1, 0, 0];
    this.transform(1, 0, 0, -1, 0, this.page.height);

    return this;
  }

  flushPages() {
    // this local variable exists so we're future-proof against
    // reentrant calls to flushPages.
    const pages = this._pageBuffer;
    this._pageBuffer = [];
    this._pageBufferStart += pages.length;
    for (let page of Array.from(pages)) {
      page.end();
    }
  }

  addNamedDestination(name, ...args) {
    if (args.length === 0) {
      args = ['XYZ', null, null, null];
    }
    if (args[0] === 'XYZ' && args[2] !== null) {
      args[2] = this.page.height - args[2];
    }
    args.unshift(this.page.dictionary);
    this._root.data.Names.data.Dests.add(name, args);
  }

  ref(data) {
    const ref = new PDFReference(this, this._offsets.length + 1, data);
    this._offsets.push(null); // placeholder for this object's offset once it is finalized
    this._waiting++;
    return ref;
  }

  _read() {
    // do nothing, but this method is required by node
  }

  _write(data) {
    if (!Buffer.isBuffer(data)) {
      data = new Buffer(data + '\n', 'binary');
    }

    this.push(data);
    return (this._offset += data.length);
  }

  addContent(data) {
    this.page.write(data);
    return this;
  }

  _refEnd(ref) {
    this._offsets[ref.id - 1] = ref.offset;
    if (--this._waiting === 0 && this._ended) {
      this._finalize();
      return (this._ended = false);
    }
  }

  end() {
    this.flushPages();
    this._info = this.ref();
    for (let key in this.info) {
      let val = this.info[key];
      if (typeof val === 'string') {
        val = new String(val);
      }

      this._info.data[key] = val;
    }

    this._info.end();

    for (let name in this._fontFamilies) {
      const font = this._fontFamilies[name];
      font.finalize();
    }

    this._root.end();
    this._root.data.Pages.end();
    this._root.data.Names.end();

    if (this._waiting === 0) {
      return this._finalize();
    } else {
      return (this._ended = true);
    }
  }

  _finalize(fn) {
    // generate xref
    const xRefOffset = this._offset;
    this._write('xref');
    this._write(`0 ${this._offsets.length + 1}`);
    this._write('0000000000 65535 f ');

    for (let offset of Array.from(this._offsets)) {
      offset = `0000000000${offset}`.slice(-10);
      this._write(offset + ' 00000 n ');
    }

    // trailer
    this._write('trailer');
    this._write(
      PDFObject.convert({
        Size: this._offsets.length + 1,
        Root: this._root,
        Info: this._info,
      }),
    );

    this._write('startxref');
    this._write(`${xRefOffset}`);
    this._write('%%EOF');

    // end the stream
    return this.push(null);
  }

  toString() {
    return '[object PDFDocument]';
  }
}

const mixin = methods => {
  return (() => {
    const result = [];
    for (let name in methods) {
      const method = methods[name];
      result.push((PDFDocument.prototype[name] = method));
    }
    return result;
  })();
};

// Load mixins
mixin(Color);
mixin(Vector);
mixin(Fonts);
mixin(Text);
mixin(Images);
mixin(Annotations);

export default PDFDocument;
