import React from 'react';
import { renderToStream, Document, Page, Text } from '@react-pdf/renderer';

export async function GET() {
  const MyDocument = (
    <Document>
      <Page>
        <Text>React-pdf</Text>
      </Page>
    </Document>
  );

  const stream = await renderToStream(MyDocument);

  console.log('====================================');
  console.log(stream);
  console.log('====================================');

  return Response.json({ test: 'test' });
}
