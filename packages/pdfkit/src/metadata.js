class PDFMetadata {
  constructor() {
    this._metadata = `
        <?xpacket begin="\ufeff" id="W5M0MpCehiHzreSzNTczkc9d"?>
            <x:xmpmeta xmlns:x="adobe:ns:meta/">
                <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
        `;
  }

  _closeTags() {
    this._metadata = this._metadata.concat(`
                </rdf:RDF>
            </x:xmpmeta>
        <?xpacket end="w"?>
        `);
  }

  append(xml, newline = true) {
    this._metadata = this._metadata.concat(xml);
    if (newline) this._metadata = this._metadata.concat('\n');
  }

  getXML() {
    return this._metadata;
  }

  getLength() {
    return this._metadata.length;
  }

  end() {
    this._closeTags();
    this._metadata = this._metadata.trim();
  }
}

export default PDFMetadata;
