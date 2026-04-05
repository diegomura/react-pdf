import React from 'react';
import { Document, Page, Link, Text, View } from '@react-pdf/renderer';

const LinkExample = () => (
  <Document>
    <Page style={{ alignItems: 'flex-start' }}>
      <Link src="https://google.com">Some text link</Link>

      <Link src="https://google.com">
        Some <Text style={{ backgroundColor: 'red' }}>stylized</Text> text link
      </Link>

      <Link src="https://google.com">
        <Text>
          Some <Text style={{ backgroundColor: 'red' }}>stylized</Text> text
          link
        </Text>
      </Link>

      <Link src="https://google.com">
        <View style={{ width: 40, height: 40, backgroundColor: 'red' }} />
      </Link>

      <Link src="https://google.com" hitSlop={20} style={{ margin: 40 }}>
        <View style={{ width: 40, height: 40, backgroundColor: 'blue' }} />
      </Link>

      <Link
        src="https://google.com"
        hitSlop={{ top: 10, bottom: 10 }}
        style={{ marginVertical: 40 }}
      >
        Some text link with hitSlop
      </Link>
    </Page>
  </Document>
);

export default {
  id: 'link',
  name: 'Link',
  description: '',
  Document: LinkExample,
};
