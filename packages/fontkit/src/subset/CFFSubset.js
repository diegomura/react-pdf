import Subset from './Subset';
import CFFTop from '../cff/CFFTop';
import CFFPrivateDict from '../cff/CFFPrivateDict';
import standardStrings from '../cff/CFFStandardStrings';

export default class CFFSubset extends Subset {
  constructor(font) {
    super(font);

    this.cff = this.font['CFF '];
    if (!this.cff) {
      throw new Error('Not a CFF Font');
    }
  }

  subsetCharstrings() {
    this.charstrings = [];
    let gsubrs = {};

    for (let gid of this.glyphs) {
      this.charstrings.push(this.cff.getCharString(gid));

      let glyph = this.font.getGlyph(gid);
      let path = glyph.path; // this causes the glyph to be parsed

      for (let subr in glyph._usedGsubrs) {
        gsubrs[subr] = true;
      }
    }

    this.gsubrs = this.subsetSubrs(this.cff.globalSubrIndex, gsubrs);
  }

  subsetSubrs(subrs, used) {
    let res = [];
    for (let i = 0; i < subrs.length; i++) {
      let subr = subrs[i];
      if (used[i]) {
        this.cff.stream.pos = subr.offset;
        res.push(this.cff.stream.readBuffer(subr.length));
      } else {
        res.push(new Buffer([11])); // return
      }
    }

    return res;
  }

  subsetFontdict(topDict) {
    topDict.FDArray = [];
    topDict.FDSelect = {
      version: 0,
      fds: []
    };

    let used_fds = {};
    let used_subrs = [];
    for (let gid of this.glyphs) {
      let fd = this.cff.fdForGlyph(gid);
      if (fd == null) {
        continue;
      }

      if (!used_fds[fd]) {
        topDict.FDArray.push(Object.assign({}, this.cff.topDict.FDArray[fd]));
        used_subrs.push({});
      }

      used_fds[fd] = true;
      topDict.FDSelect.fds.push(topDict.FDArray.length - 1);

      let glyph = this.font.getGlyph(gid);
      let path = glyph.path; // this causes the glyph to be parsed
      for (let subr in glyph._usedSubrs) {
        used_subrs[used_subrs.length - 1][subr] = true;
      }
    }

    for (let i = 0; i < topDict.FDArray.length; i++) {
      let dict = topDict.FDArray[i];
      delete dict.FontName;
      if (dict.Private && dict.Private.Subrs) {
        dict.Private = Object.assign({}, dict.Private);
        dict.Private.Subrs = this.subsetSubrs(dict.Private.Subrs, used_subrs[i]);
      }
    }

    return;
  }

  createCIDFontdict(topDict) {
    let used_subrs = {};
    for (let gid of this.glyphs) {
      let glyph = this.font.getGlyph(gid);
      let path = glyph.path; // this causes the glyph to be parsed

      for (let subr in glyph._usedSubrs) {
        used_subrs[subr] = true;
      }
    }

    let privateDict = Object.assign({}, this.cff.topDict.Private);
    if (this.cff.topDict.Private && this.cff.topDict.Private.Subrs) {
      privateDict.Subrs = this.subsetSubrs(this.cff.topDict.Private.Subrs, used_subrs);
    }

    topDict.FDArray = [{ Private: privateDict }];
    return topDict.FDSelect = {
      version: 3,
      nRanges: 1,
      ranges: [{ first: 0, fd: 0 }],
      sentinel: this.charstrings.length
    };
  }

  addString(string) {
    if (!string) {
      return null;
    }

    if (!this.strings) {
      this.strings = [];
    }

    this.strings.push(string);
    return standardStrings.length + this.strings.length - 1;
  }

  encode(stream) {
    this.subsetCharstrings();

    let charset = {
      version: this.charstrings.length > 255 ? 2 : 1,
      ranges: [{ first: 1, nLeft: this.charstrings.length - 2 }]
    };

    let topDict = Object.assign({}, this.cff.topDict);
    topDict.Private = null;
    topDict.charset = charset;
    topDict.Encoding = null;
    topDict.CharStrings = this.charstrings;

    for (let key of ['version', 'Notice', 'Copyright', 'FullName', 'FamilyName', 'Weight', 'PostScript', 'BaseFontName', 'FontName']) {
      topDict[key] = this.addString(this.cff.string(topDict[key]));
    }

    topDict.ROS = [this.addString('Adobe'), this.addString('Identity'), 0];
    topDict.CIDCount = this.charstrings.length;

    if (this.cff.isCIDFont) {
      this.subsetFontdict(topDict);
    } else {
      this.createCIDFontdict(topDict);
    }

    let top = {
      version: 1,
      hdrSize: this.cff.hdrSize,
      offSize: 4,
      header: this.cff.header,
      nameIndex: [this.cff.postscriptName],
      topDictIndex: [topDict],
      stringIndex: this.strings,
      globalSubrIndex: this.gsubrs
    };

    CFFTop.encode(stream, top);
  }
}
