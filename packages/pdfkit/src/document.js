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
import OutlineMixin from './mixins/outline';
import AcroFormMixin from './mixins/acroform';
import Attachments from './mixins/attachments';

class PDFDocument extends stream.Readable {
  constructor(options = {}) {
    super();
    this.options = options;

    // PDF version
    switch (options.pdfVersion) {
      case '1.4':
        this.version = 1.4;
        break;
      case '1.5':
        this.version = 1.5;
        break;
      case '1.6':
        this.version = 1.6;
        break;
      case '1.7':
      case '1.7ext3':
        this.version = 1.7;
        break;
      default:
        this.version = 1.3;
        break;
    }

    // Whether streams should be compressed
    this.compress =
      this.options.compress != null ? this.options.compress : true;

    this._pageBuffer = [];
    this._pageBufferStart = 0;

    // The PDF object store
    this._offsets = [];
    this._waiting = 0;
    this._ended = false;
    this._offset = 0;

    const Pages = this.ref({
      Type: 'Pages',
      Count: 0,
      Kids: []
    });

    const Names = this.ref({
      Dests: new PDFNameTree()
    });

    this._root = this.ref({
      Type: 'Catalog',
      Pages,
      Names
    });

    if (this.options.lang) {
      this._root.data.Lang = new String(this.options.lang);
    }

    // The current page
    this.page = null;

    // Initialize mixins
    this.initColor();
    this.initVector();
    this.initFonts();
    this.initText();
    this.initImages();
    this.initOutline();

    // Initialize the metadata
    this.info = {
      Producer: 'PDFKit',
      Creator: 'PDFKit',
      CreationDate: new Date()
    };

    if (this.options.info) {
      for (let key in this.options.info) {
        const val = this.options.info[key];
        this.info[key] = val;
      }
    }

    if (this.options.displayTitle) {
      this._root.data.ViewerPreferences = this.ref({
        DisplayDocTitle: true
      });
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

  addNamedEmbeddedFile(name, ref) {
    if (!this._root.data.Names.data.EmbeddedFiles) {
      // disabling /Limits for this tree fixes attachments not showing in Adobe Reader
      this._root.data.Names.data.EmbeddedFiles = new PDFNameTree({
        limits: false
      });
    }

    // add filespec to EmbeddedFiles
    this._root.data.Names.data.EmbeddedFiles.add(name, ref);
  }

  addNamedJavaScript(name, js) {
    if (!this._root.data.Names.data.JavaScript) {
      this._root.data.Names.data.JavaScript = new PDFNameTree();
    }
    let data = {
      JS: new String(js),
      S: 'JavaScript'
    };
    this._root.data.Names.data.JavaScript.add(name, data);
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
      data = Buffer.from(data + '\n', 'binary');
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

      let entry = this.ref(val);
      entry.end();

      this._info.data[key] = entry;
    }

    this._info.end();

    for (let name in this._fontFamilies) {
      const font = this._fontFamilies[name];
      font.finalize();
    }

    this.endOutline();

    this._root.end();
    this._root.data.Pages.end();
    this._root.data.Names.end();
    this.endAcroForm();

    if (this._root.data.ViewerPreferences) {
      this._root.data.ViewerPreferences.end();
    }

    if (this._waiting === 0) {
      return this._finalize();
    }

    this._ended = true;
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
        Info: this._info
      })
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
mixin(OutlineMixin);
mixin(AcroFormMixin);
mixin(Attachments);

export default PDFDocument;
