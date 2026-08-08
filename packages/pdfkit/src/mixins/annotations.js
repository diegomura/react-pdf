import PDFAnnotationReference from '../structure_annotation';

export default {
  annotate(x, y, w, h, options) {
    options.Type = 'Annot';
    options.Rect = this._convertRect(x, y, w, h);
    options.Border = [0, 0, 0];

    if (options.Subtype === 'Link' && typeof options.F === 'undefined') {
      options.F = 1 << 2; // Print Annotation Flag
    }

    if (options.Subtype !== 'Link') {
      if (options.C == null) {
        options.C = this._normalizeColor(options.color || [0, 0, 0]);
      }
    } // convert colors
    delete options.color;

    if (typeof options.Dest === 'string') {
      options.Dest = new String(options.Dest);
    }

    const structParent = options.structParent;
    delete options.structParent;

    // Capitalize keys
    for (let key in options) {
      const val = options[key];
      options[key[0].toUpperCase() + key.slice(1)] = val;
    }

    const ref = this.ref(options);
    this.page.annotations.push(ref);

    if (structParent && typeof structParent.add === 'function') {
      const annotRef = new PDFAnnotationReference(ref);
      structParent.add(annotRef);
    }

    ref.end();
    return this;
  },

  note(x, y, w, h, contents, options = {}) {
    options.Subtype = 'Text';
    options.Contents = new String(contents);
    if (options.Name == null) {
      options.Name = 'Comment';
    }
    if (options.color == null) {
      options.color = [243, 223, 92];
    }
    return this.annotate(x, y, w, h, options);
  },

  goTo(x, y, w, h, name, options = {}) {
    options.Subtype = 'Link';
    options.A = this.ref({
      S: 'GoTo',
      D: new String(name),
    });
    options.A.end();
    return this.annotate(x, y, w, h, options);
  },

  link(x, y, w, h, url, options = {}) {
    options.Subtype = 'Link';

    if (typeof url === 'number') {
      // Link to a page in the document (the page must already exist)
      const pages = this._root.data.Pages.data;
      if (url >= 0 && url < pages.Kids.length) {
        options.A = this.ref({
          S: 'GoTo',
          D: [pages.Kids[url], 'XYZ', null, null, null],
        });
        options.A.end();
      } else {
        throw new Error(`The document has no page ${url}`);
      }
    } else {
      // Link to an external url
      options.A = this.ref({
        S: 'URI',
        URI: new String(url),
      });
      options.A.end();
    }

    if (options.structParent && !options.Contents) {
      options.Contents = new String('');
    }

    return this.annotate(x, y, w, h, options);
  },

  _markup(x, y, w, h, options = {}) {
    const [x1, y1, x2, y2] = this._convertRect(x, y, w, h);
    options.QuadPoints = [x1, y2, x2, y2, x1, y1, x2, y1];
    options.Contents = new String();
    return this.annotate(x, y, w, h, options);
  },

  highlight(x, y, w, h, options = {}) {
    options.Subtype = 'Highlight';
    if (options.color == null) {
      options.color = [241, 238, 148];
    }
    return this._markup(x, y, w, h, options);
  },

  underline(x, y, w, h, options = {}) {
    options.Subtype = 'Underline';
    return this._markup(x, y, w, h, options);
  },

  strike(x, y, w, h, options = {}) {
    options.Subtype = 'StrikeOut';
    return this._markup(x, y, w, h, options);
  },

  lineAnnotation(x1, y1, x2, y2, options = {}) {
    options.Subtype = 'Line';
    options.Contents = new String();
    options.L = [x1, this.page.height - y1, x2, this.page.height - y2];
    return this.annotate(x1, y1, x2, y2, options);
  },

  rectAnnotation(x, y, w, h, options = {}) {
    options.Subtype = 'Square';
    options.Contents = new String();
    return this.annotate(x, y, w, h, options);
  },

  ellipseAnnotation(x, y, w, h, options = {}) {
    options.Subtype = 'Circle';
    options.Contents = new String();
    return this.annotate(x, y, w, h, options);
  },

  textAnnotation(x, y, w, h, text, options = {}) {
    options.Subtype = 'FreeText';
    options.Contents = new String(text);
    options.DA = new String();
    return this.annotate(x, y, w, h, options);
  },

  fileAnnotation(x, y, w, h, file = {}, options = {}) {
    // create hidden file
    const filespec = this.file(file.src, Object.assign({ hidden: true }, file));

    options.Subtype = 'FileAttachment';
    options.FS = filespec;

    // add description from filespec unless description (Contents) has already been set
    if (options.Contents) {
      options.Contents = new String(options.Contents);
    } else if (filespec.data.Desc) {
      options.Contents = filespec.data.Desc;
    }

    return this.annotate(x, y, w, h, options);
  },

  _convertRect(x1, y1, w, h) {
    // flip y1 and y2
    let y2 = y1;
    y1 += h;

    // make x2
    let x2 = x1 + w;

    // apply current transformation matrix to points
    const [m0, m1, m2, m3, m4, m5] = this._ctm;
    x1 = m0 * x1 + m2 * y1 + m4;
    y1 = m1 * x1 + m3 * y1 + m5;
    x2 = m0 * x2 + m2 * y2 + m4;
    y2 = m1 * x2 + m3 * y2 + m5;

    return [x1, y1, x2, y2];
  },
};
