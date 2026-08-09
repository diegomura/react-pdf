const FIELD_FLAGS = {
  readOnly: 1,
  required: 2,
  noExport: 4,
  multiline: 0x1000,
  password: 0x2000,
  toggleToOffButton: 0x4000,
  radioButton: 0x8000,
  pushButton: 0x10000,
  combo: 0x20000,
  edit: 0x40000,
  sort: 0x80000,
  multiSelect: 0x200000,
  noSpell: 0x400000,
};
const FIELD_JUSTIFY = {
  left: 0,
  center: 1,
  right: 2,
};
const VALUE_MAP = { value: 'V', defaultValue: 'DV' };
const FORMAT_SPECIAL = {
  zip: '0',
  zipPlus4: '1',
  zip4: '1',
  phone: '2',
  ssn: '3',
};
const FORMAT_DEFAULT = {
  number: {
    nDec: 0,
    sepComma: false,
    negStyle: 'MinusBlack',
    currency: '',
    currencyPrepend: true,
  },
  percent: {
    nDec: 0,
    sepComma: false,
  },
};

function mapTypeAndFlags(type, userOptions, pdfObject) {
  let flags = userOptions.Ff ?? 0;

  if (type === 'text') {
    pdfObject.FT = 'Tx';
  } else if (type === 'pushButton') {
    pdfObject.FT = 'Btn';
    flags |= FIELD_FLAGS.pushButton;
  } else if (type === 'radioButton') {
    pdfObject.FT = 'Btn';
    flags |= FIELD_FLAGS.radioButton;
  } else if (type === 'checkbox') {
    pdfObject.FT = 'Btn';
  } else if (type === 'combo') {
    pdfObject.FT = 'Ch';
    flags |= FIELD_FLAGS.combo;
  } else if (type === 'list') {
    pdfObject.FT = 'Ch';
  } else if (type) {
    throw new Error(`Invalid form annotation type '${type}'`);
  }

  Object.keys(userOptions).forEach((key) => {
    if (FIELD_FLAGS[key] && userOptions[key]) {
      flags |= FIELD_FLAGS[key];
    }
  });

  if (flags !== 0) {
    pdfObject.Ff = flags;
  }
}

function mapJustify(userOptions, pdfObject) {
  const result = FIELD_JUSTIFY[userOptions.align];
  if (typeof result === 'number' && result !== 0) {
    pdfObject.Q = result;
  }
}

function mapStrings(options, pdfObject) {
  if (Array.isArray(options.select) && options.select.length) {
    pdfObject.Opt = options.select.map((s) => {
      if (typeof s === 'string') {
        return new String(s);
      }
      return s;
    });
  }

  Object.keys(VALUE_MAP).forEach((key) => {
    if (key in options) {
      const value = options[key] ?? '';
      pdfObject[VALUE_MAP[key]] =
        typeof value === 'string' ? new String(value) : value;
    }
  });

  if (options.MK?.CA) {
    pdfObject.MK = { CA: new String(options.MK.CA) };
  }

  if (options.label) {
    pdfObject.MK = options.MK ?? {};
    pdfObject.MK.CA = new String(options.label);
  }
}

function mapFormat(options, pdfObject) {
  const f = options.format;
  if (f?.type) {
    let fnKeystroke;
    let fnFormat;
    let params = '';
    if (FORMAT_SPECIAL[f.type] !== undefined) {
      fnKeystroke = `AFSpecial_Keystroke`;
      fnFormat = `AFSpecial_Format`;
      params = FORMAT_SPECIAL[f.type];
    } else {
      let format = f.type.charAt(0).toUpperCase() + f.type.slice(1);
      fnKeystroke = `AF${format}_Keystroke`;
      fnFormat = `AF${format}_Format`;

      if (f.type === 'date') {
        fnKeystroke += 'Ex';
        params = String(f.param);
      } else if (f.type === 'time') {
        params = String(f.param);
      } else if (f.type === 'number') {
        let p = Object.assign({}, FORMAT_DEFAULT.number, f);
        params = String(
          [
            String(p.nDec),
            p.sepComma ? '0' : '1',
            '"' + p.negStyle + '"',
            'null',
            '"' + p.currency + '"',
            String(p.currencyPrepend),
          ].join(','),
        );
      } else if (f.type === 'percent') {
        let p = Object.assign({}, FORMAT_DEFAULT.percent, f);
        params = String([String(p.nDec), p.sepComma ? '0' : '1'].join(','));
      }
    }
    pdfObject.AA = options.AA ?? {};
    pdfObject.AA.K = {
      S: 'JavaScript',
      JS: new String(`${fnKeystroke}(${params});`),
    };
    pdfObject.AA.F = {
      S: 'JavaScript',
      JS: new String(`${fnFormat}(${params});`),
    };
  }
}

export default {
  /**
   * Must call if adding AcroForms to a document. Must also call font() before
   * this method to set the default font.
   */
  initForm() {
    if (!this._font) {
      throw new Error('Must set a font before calling initForm method');
    }
    this._acroform = {
      fonts: {},
      defaultFont: this._font.name,
    };
    this._acroform.fonts[this._font.id] = this._font.ref();

    let data = {
      Fields: [],
      NeedAppearances: true,
      DA: new String(`/${this._font.id} 0 Tf 0 g`),
      DR: {
        Font: {},
      },
    };
    data.DR.Font[this._font.id] = this._font.ref();
    const AcroForm = this.ref(data);
    this._root.data.AcroForm = AcroForm;
    return this;
  },

  /**
   * Called automatically by document.js
   */
  endAcroForm() {
    if (this._root.data.AcroForm) {
      if (
        !Object.keys(this._acroform.fonts).length &&
        !this._acroform.defaultFont
      ) {
        throw new Error('No fonts specified for PDF form');
      }
      let fontDict = this._root.data.AcroForm.data.DR.Font;
      Object.keys(this._acroform.fonts).forEach((name) => {
        fontDict[name] = this._acroform.fonts[name];
      });
      this._root.data.AcroForm.data.Fields.forEach((fieldRef) => {
        this._endChild(fieldRef);
      });
      this._root.data.AcroForm.end();
    }
    return this;
  },

  _endChild(ref) {
    if (Array.isArray(ref.data.Kids)) {
      ref.data.Kids.forEach((childRef) => {
        this._endChild(childRef);
      });
      ref.end();
    }
    return this;
  },

  /**
   * Creates and adds a form field to the document. Form fields are intermediate
   * nodes in a PDF form that are used to specify form name heirarchy and form
   * value defaults.
   * @param {string} name - field name (T attribute in field dictionary)
   * @param {object} options  - other attributes to include in field dictionary
   */
  formField(name, options = {}) {
    let fieldDict = this._fieldDict(name, null, options);
    let fieldRef = this.ref(fieldDict);
    this._addToParent(fieldRef);
    return fieldRef;
  },

  /**
   * Creates and adds a Form Annotation to the document. Form annotations are
   * called Widget annotations internally within a PDF file.
   * @param {string} name - form field name (T attribute of widget annotation
   * dictionary)
   * @param {number} x
   * @param {number} y
   * @param {number} w
   * @param {number} h
   * @param {object} options
   */
  formAnnotation(name, type, x, y, w, h, options = {}) {
    let fieldDict = this._fieldDict(name, type, options);
    fieldDict.Subtype = 'Widget';
    if (fieldDict.F === undefined) {
      fieldDict.F = 4; // print the annotation
    }

    // Add Field annot to page, and get it's ref
    this.annotate(x, y, w, h, fieldDict);
    let annotRef = this.page.annotations[this.page.annotations.length - 1];

    return this._addToParent(annotRef);
  },

  formText(name, x, y, w, h, options = {}) {
    return this.formAnnotation(name, 'text', x, y, w, h, options);
  },

  formPushButton(name, x, y, w, h, options = {}) {
    return this.formAnnotation(name, 'pushButton', x, y, w, h, options);
  },

  formCombo(name, x, y, w, h, options = {}) {
    return this.formAnnotation(name, 'combo', x, y, w, h, options);
  },

  formList(name, x, y, w, h, options = {}) {
    return this.formAnnotation(name, 'list', x, y, w, h, options);
  },

  formRadioButton(name, x, y, w, h, options = {}) {
    return this.formAnnotation(name, 'radioButton', x, y, w, h, options);
  },

  formCheckbox(name, x, y, w, h, options = {}) {
    return this.formAnnotation(name, 'checkbox', x, y, w, h, options);
  },

  _addToParent(fieldRef) {
    let parent = fieldRef.data.Parent;
    if (parent) {
      if (!parent.data.Kids) {
        parent.data.Kids = [];
      }
      parent.data.Kids.push(fieldRef);
    } else {
      this._root.data.AcroForm.data.Fields.push(fieldRef);
    }
    return this;
  },

  _fieldDict(name, type, options = {}) {
    if (!this._acroform) {
      throw new Error(
        'Call document.initForm() method before adding form elements to document',
      );
    }
    const pdfObject = {};

    mapTypeAndFlags(type, options, pdfObject);
    mapJustify(options, pdfObject);
    this._mapFont(options, pdfObject);
    mapStrings(options, pdfObject);
    this._mapColors(options, pdfObject);
    mapFormat(options, pdfObject);

    pdfObject.T = new String(name);

    if (options.parent) {
      pdfObject.Parent = options.parent;
    }
    return pdfObject;
  },

  _mapColors(options, pdfObject) {
    let color = this._normalizeColor(options.backgroundColor);
    if (color) {
      pdfObject.MK = pdfObject.MK ? pdfObject.MK : {};
      pdfObject.MK.BG = color;
    }

    color = this._normalizeColor(options.borderColor);
    if (color) {
      if (!pdfObject.MK) {
        pdfObject.MK = {};
      }
      pdfObject.MK.BC = color;
    }
  },

  _mapFont(options, pdfObject) {
    const { _acroform, _font } = this;
    // add current font to document-level AcroForm dict if necessary
    if (_acroform.fonts[_font.id] == null) {
      _acroform.fonts[_font.id] = _font.ref();
    }

    // add current font to field's resource dict (RD) if not the default acroform font
    if (_acroform.defaultFont !== _font.name) {
      pdfObject.DR = { Font: {} };

      // Get the fontSize option. If not set use auto sizing
      const fontSize = options.fontSize || 0;

      pdfObject.DR.Font[_font.id] = _font.ref();
      pdfObject.DA = new String(`/${_font.id} ${fontSize} Tf 0 g`);
    }
  },
};
