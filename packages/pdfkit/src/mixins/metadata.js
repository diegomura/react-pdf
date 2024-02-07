import PDFMetadata from '../metadata';

export default {
  initMetadata() {
    this.metadata = new PDFMetadata();
  },

  appendXML(xml, newline = true) {
    this.metadata.append(xml, newline);
  },

  _addInfo() {
    this.appendXML(`
        <rdf:Description rdf:about="" xmlns:xmp="http://ns.adobe.com/xap/1.0/">
            <xmp:CreateDate>${this.info.CreationDate.toISOString().split('.')[0] + 'Z'}</xmp:CreateDate>
            <xmp:CreatorTool>${this.info.Creator}</xmp:CreatorTool>
        </rdf:Description>
        `);

    if (this.info.Title || this.info.Author || this.info.Subject) {
      this.appendXML(`
            <rdf:Description rdf:about="" xmlns:dc="http://purl.org/dc/elements/1.1/">
            `);

      if (this.info.Title) {
        this.appendXML(`
                <dc:title>
                    <rdf:Alt>
                        <rdf:li xml:lang="x-default">${this.info.Title}</rdf:li>
                    </rdf:Alt>
                </dc:title>
                `);
      }

      if (this.info.Author) {
        this.appendXML(`
                <dc:creator>
                    <rdf:Seq>
                        <rdf:li>${this.info.Author}</rdf:li>
                    </rdf:Seq>
                </dc:creator>
                `);
      }

      if (this.info.Subject) {
        this.appendXML(`
                <dc:description>
                    <rdf:Alt>
                        <rdf:li xml:lang="x-default">${this.info.Subject}</rdf:li>
                    </rdf:Alt>
                </dc:description>
                `);
      }

      this.appendXML(`
            </rdf:Description>
            `);
    }

    this.appendXML(
      `
        <rdf:Description rdf:about="" xmlns:pdf="http://ns.adobe.com/pdf/1.3/">
            <pdf:Producer>${this.info.Creator}</pdf:Producer>`,
      false
    );

    if (this.info.Keywords) {
      this.appendXML(
        `
            <pdf:Keywords>${this.info.Keywords}</pdf:Keywords>`,
        false
      );
    }

    this.appendXML(`
        </rdf:Description>
        `);
  },

  endMetadata() {
    this._addInfo();

    this.metadata.end();

    /*
        Metadata was introduced in PDF 1.4, so adding it to 1.3
        will likely only take up more space.
        */
    if (this.version != 1.3) {
      this.metadataRef = this.ref({
        length: this.metadata.getLength(),
        Type: 'Metadata',
        Subtype: 'XML'
      });
      this.metadataRef.compress = false;
      this.metadataRef.write(Buffer.from(this.metadata.getXML(), 'utf-8'));
      this.metadataRef.end();
      this._root.data.Metadata = this.metadataRef;
    }
  }
};
