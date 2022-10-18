import React from 'react';
import { Page, Document, Text, DocProvider } from '@react-pdf/renderer';
import PDFDocument from '@react-pdf/pdfkit';
import { renderNode } from '@react-pdf/render';

export default () => (
  <Document
    title="Table"
    author="Jane Doe"
    subject="Rendering with react-pdf and modifying document during render"
    keywords={['react', 'pdf', 'table']}
  >
    <Page size="A4">
      <Text>This is the first page</Text>
    </Page>
    <DocProvider fn={doc => {
      doc.addPage({ size: "A4" });
      doc.text('This is the middle page, added using pdfkit!');
    }} />
    <Page size="A4">
      <Text>This is the last page</Text>
    </Page>
  </Document>
);
