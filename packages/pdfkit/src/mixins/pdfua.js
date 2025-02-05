export default {
  initPDFUA() {
    this.subset = 1;
  },

  endSubset() {
    this._addPdfuaMetadata();
  },

  _addPdfuaMetadata() {
    this.appendXML(this._getPdfuaid());
  },

  _getPdfuaid() {
    return `
        <rdf:Description xmlns:pdfuaid="http://www.aiim.org/pdfua/ns/id/" rdf:about="">
            <pdfuaid:part>${this.subset}</pdfuaid:part>
        </rdf:Description>
        `;
  }
};
