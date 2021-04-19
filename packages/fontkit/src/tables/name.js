import r from 'restructure';
import {getEncoding, LANGUAGES} from '../encodings';

let NameRecord = new r.Struct({
  platformID: r.uint16,
  encodingID: r.uint16,
  languageID: r.uint16,
  nameID:     r.uint16,
  length:     r.uint16,
  string:     new r.Pointer(r.uint16,
    new r.String('length', t => getEncoding(t.platformID, t.encodingID, t.languageID)),
    { type: 'parent', relativeTo: 'parent.stringOffset', allowNull: false }
  )
});

let LangTagRecord = new r.Struct({
  length:  r.uint16,
  tag:     new r.Pointer(r.uint16, new r.String('length', 'utf16be'), {type: 'parent', relativeTo: 'stringOffset'})
});

var NameTable = new r.VersionedStruct(r.uint16, {
  0: {
    count:          r.uint16,
    stringOffset:   r.uint16,
    records:        new r.Array(NameRecord, 'count')
  },
  1: {
    count:          r.uint16,
    stringOffset:   r.uint16,
    records:        new r.Array(NameRecord, 'count'),
    langTagCount:   r.uint16,
    langTags:       new r.Array(LangTagRecord, 'langTagCount')
  }
});

export default NameTable;

const NAMES = [
  'copyright',
  'fontFamily',
  'fontSubfamily',
  'uniqueSubfamily',
  'fullName',
  'version',
  'postscriptName', // Note: A font may have only one PostScript name and that name must be ASCII.
  'trademark',
  'manufacturer',
  'designer',
  'description',
  'vendorURL',
  'designerURL',
  'license',
  'licenseURL',
  null, // reserved
  'preferredFamily',
  'preferredSubfamily',
  'compatibleFull',
  'sampleText',
  'postscriptCIDFontName',
  'wwsFamilyName',
  'wwsSubfamilyName'
];

NameTable.process = function(stream) {
  var records = {};
  for (let record of this.records) {
    // find out what language this is for
    let language = LANGUAGES[record.platformID][record.languageID];

    if (language == null && this.langTags != null && record.languageID >= 0x8000) {
      language = this.langTags[record.languageID - 0x8000].tag;
    }

    if (language == null) {
      language = record.platformID + '-' + record.languageID;
    }

    // if the nameID is >= 256, it is a font feature record (AAT)
    let key = record.nameID >= 256 ? 'fontFeatures' : (NAMES[record.nameID] || record.nameID);
    if (records[key] == null) {
      records[key] = {};
    }

    let obj = records[key];
    if (record.nameID >= 256) {
      obj = obj[record.nameID] || (obj[record.nameID] = {});
    }

    if (typeof record.string === 'string' || typeof obj[language] !== 'string') {
      obj[language] = record.string;
    }
  }

  this.records = records;
};

NameTable.preEncode = function() {
  if (Array.isArray(this.records)) return;
  this.version = 0;

  let records = [];
  for (let key in this.records) {
    let val = this.records[key];
    if (key === 'fontFeatures') continue;

    records.push({
      platformID: 3,
      encodingID: 1,
      languageID: 0x409,
      nameID: NAMES.indexOf(key),
      length: Buffer.byteLength(val.en, 'utf16le'),
      string: val.en
    });

    if (key === 'postscriptName') {
      records.push({
        platformID: 1,
        encodingID: 0,
        languageID: 0,
        nameID: NAMES.indexOf(key),
        length: val.en.length,
        string: val.en
      });
    }
  }

  this.records = records;
  this.count = records.length;
  this.stringOffset = NameTable.size(this, null, false);
};
