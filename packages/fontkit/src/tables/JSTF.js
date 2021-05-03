import r from 'restructure';
import { ScriptList, FeatureList, LookupList, Coverage, ClassDef, Device } from './opentype';
import { GPOSLookup } from './GPOS';

let JstfGSUBModList = new r.Array(r.uint16, r.uint16);

let JstfPriority = new r.Struct({
  shrinkageEnableGSUB:    new r.Pointer(r.uint16, JstfGSUBModList),
  shrinkageDisableGSUB:   new r.Pointer(r.uint16, JstfGSUBModList),
  shrinkageEnableGPOS:    new r.Pointer(r.uint16, JstfGSUBModList),
  shrinkageDisableGPOS:   new r.Pointer(r.uint16, JstfGSUBModList),
  shrinkageJstfMax:       new r.Pointer(r.uint16, new LookupList(GPOSLookup)),
  extensionEnableGSUB:    new r.Pointer(r.uint16, JstfGSUBModList),
  extensionDisableGSUB:   new r.Pointer(r.uint16, JstfGSUBModList),
  extensionEnableGPOS:    new r.Pointer(r.uint16, JstfGSUBModList),
  extensionDisableGPOS:   new r.Pointer(r.uint16, JstfGSUBModList),
  extensionJstfMax:       new r.Pointer(r.uint16, new LookupList(GPOSLookup))
});

let JstfLangSys = new r.Array(new r.Pointer(r.uint16, JstfPriority), r.uint16);

let JstfLangSysRecord = new r.Struct({
  tag:         new r.String(4),
  jstfLangSys: new r.Pointer(r.uint16, JstfLangSys)
});

let JstfScript = new r.Struct({
  extenderGlyphs: new r.Pointer(r.uint16, new r.Array(r.uint16, r.uint16)), // array of glyphs to extend line length
  defaultLangSys: new r.Pointer(r.uint16, JstfLangSys),
  langSysCount:   r.uint16,
  langSysRecords: new r.Array(JstfLangSysRecord, 'langSysCount')
});

let JstfScriptRecord = new r.Struct({
  tag:    new r.String(4),
  script: new r.Pointer(r.uint16, JstfScript, {type: 'parent'})
});

export default new r.Struct({
  version:     r.uint32,  // should be 0x00010000
  scriptCount: r.uint16,
  scriptList:  new r.Array(JstfScriptRecord, 'scriptCount')
});
