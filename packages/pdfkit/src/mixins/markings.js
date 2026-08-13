/*
Markings mixin - support marked content sequences in content streams
By Ben Schmidt
*/

import PDFStructureElement from '../structure_element';
import PDFStructureContent from '../structure_content';
import PDFNumberTree from '../number_tree';
import PDFObject from '../object';

export default {
  initMarkings(options) {
    this.structChildren = [];

    if (options.tagged) {
      this.getMarkInfoDictionary().data.Marked = true;
      this.getStructTreeRoot();
    }
  },

  markContent(tag, options = null) {
    if (tag === 'Artifact' || (options && options.mcid)) {
      let toClose = 0;
      this.page.markings.forEach((marking) => {
        if (toClose || marking.structContent || marking.tag === 'Artifact') {
          toClose++;
        }
      });
      while (toClose--) {
        this.endMarkedContent();
      }
    }

    if (!options) {
      this.page.markings.push({ tag });
      this.addContent(`/${tag} BMC`);
      return this;
    }

    this.page.markings.push({ tag, options });

    const dictionary = {};

    if (typeof options.mcid !== 'undefined') {
      dictionary.MCID = options.mcid;
    }
    if (tag === 'Artifact') {
      if (typeof options.type === 'string') {
        dictionary.Type = options.type;
      }
      if (Array.isArray(options.bbox)) {
        dictionary.BBox = [
          options.bbox[0],
          this.page.height - options.bbox[3],
          options.bbox[2],
          this.page.height - options.bbox[1],
        ];
      }
      if (
        Array.isArray(options.attached) &&
        options.attached.every((val) => typeof val === 'string')
      ) {
        dictionary.Attached = options.attached;
      }
    }
    if (tag === 'Span') {
      if (options.lang) {
        dictionary.Lang = new String(options.lang);
      }
      if (options.alt) {
        dictionary.Alt = new String(options.alt);
      }
      if (options.expanded) {
        dictionary.E = new String(options.expanded);
      }
      if (options.actual) {
        dictionary.ActualText = new String(options.actual);
      }
    }

    this.addContent(`/${tag} ${PDFObject.convert(dictionary)} BDC`);
    return this;
  },

  markStructureContent(tag, options = {}) {
    const pageStructParents = this.getStructParentTree().get(
      this.page.structParentTreeKey,
    );
    const mcid = pageStructParents.length;
    pageStructParents.push(null);

    this.markContent(tag, { ...options, mcid });

    const structContent = new PDFStructureContent(this.page.dictionary, mcid);
    this.page.markings.slice(-1)[0].structContent = structContent;
    return structContent;
  },

  endMarkedContent() {
    this.page.markings.pop();
    this.addContent('EMC');
    if (this._textOptions) {
      delete this._textOptions.link;
      delete this._textOptions.goTo;
      delete this._textOptions.destination;
      delete this._textOptions.underline;
      delete this._textOptions.strike;
    }
    return this;
  },

  struct(type, options = {}, children = null) {
    return new PDFStructureElement(this, type, options, children);
  },

  addStructure(structElem) {
    const structTreeRoot = this.getStructTreeRoot();
    structElem.setParent(structTreeRoot);
    structElem.setAttached();
    this.structChildren.push(structElem);
    if (!structTreeRoot.data.K) {
      structTreeRoot.data.K = [];
    }
    structTreeRoot.data.K.push(structElem.dictionary);
    return this;
  },

  initPageMarkings(pageMarkings) {
    pageMarkings.forEach((marking) => {
      if (marking.structContent) {
        const structContent = marking.structContent;
        const newStructContent = this.markStructureContent(
          marking.tag,
          marking.options,
        );
        structContent.push(newStructContent);
        this.page.markings.slice(-1)[0].structContent = structContent;
      } else {
        this.markContent(marking.tag, marking.options);
      }
    });
  },

  endPageMarkings(page) {
    const pageMarkings = page.markings;
    pageMarkings.forEach(() => page.write('EMC'));
    page.markings = [];
    return pageMarkings;
  },

  getMarkInfoDictionary() {
    if (!this._root.data.MarkInfo) {
      this._root.data.MarkInfo = this.ref({});
    }
    return this._root.data.MarkInfo;
  },

  hasMarkInfoDictionary() {
    return !!this._root.data.MarkInfo;
  },

  getStructTreeRoot() {
    if (!this._root.data.StructTreeRoot) {
      this._root.data.StructTreeRoot = this.ref({
        Type: 'StructTreeRoot',
        ParentTree: new PDFNumberTree(),
        ParentTreeNextKey: 0,
      });
    }
    return this._root.data.StructTreeRoot;
  },

  getStructParentTree() {
    return this.getStructTreeRoot().data.ParentTree;
  },

  createStructParentTreeNextKey() {
    // initialise the MarkInfo dictionary
    this.getMarkInfoDictionary();

    const structTreeRoot = this.getStructTreeRoot();
    const key = structTreeRoot.data.ParentTreeNextKey++;
    structTreeRoot.data.ParentTree.add(key, []);
    return key;
  },

  endMarkings() {
    const structTreeRoot = this._root.data.StructTreeRoot;
    if (structTreeRoot) {
      structTreeRoot.end();
      this.structChildren.forEach((structElem) => structElem.end());
    }
    if (this._root.data.MarkInfo) {
      this._root.data.MarkInfo.end();
    }
  },
};
