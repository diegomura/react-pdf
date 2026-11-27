import { describe, expect, test } from 'vitest';

import { Document, Page, Text, View } from '@react-pdf/renderer';
import renderToImage from './renderComponent';

const PageLayout = ({ children, pageNumber }) => (
  <>
    <View
      style={{
        height: 40,
        backgroundColor: pageNumber === 1 ? '#facc15' : '#fde68a',
      }}
    />
    <View style={{ flexDirection: 'row', flexGrow: 1 }}>
      <View style={{ width: 120, backgroundColor: '#bae6fd' }} />
      <View style={{ flexGrow: 1, flexShrink: 1 }}>{children}</View>
    </View>
    <View
      style={{
        height: 30,
        backgroundColor: '#e5e7eb',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        render={({ pageNumber: n, totalPages }) => `${n} / ${totalPages}`}
      />
    </View>
  </>
);

const blocks = Array.from({ length: 10 }, (_, index) => (
  <View
    key={index}
    style={{
      height: 180,
      margin: 10,
      backgroundColor: index % 2 ? '#bbf7d0' : '#fecaca',
    }}
  />
));

const LayoutDocument = () => (
  <Document>
    <Page size="A4" layout={PageLayout}>
      {blocks}
    </Page>
  </Document>
);

describe('page layout', () => {
  test('should match snapshot', async () => {
    const image = await renderToImage(<LayoutDocument />);

    expect(image).toMatchImageSnapshot();
  });
});
