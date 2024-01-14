import { Document, Page, Link, Font, Text } from '..';
import renderToImage from './renderComponent';

// pdf.js does not render default fonts in node and I use Open Sans (:
Font.register({
  family: 'Open Sans',
  src: 'https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0e.ttf',
});

const mount = async children => {
  const image = await renderToImage(
    <Document>
      <Page size={[50, 25]}>{children}</Page>
    </Document>,
  );

  return image;
};

describe('Link', () => {
  test('should render text', async () => {
    const image = await mount(
      <Link
        href="https://github.com/wojtekmaj/react-pdf"
        style={{ fontFamily: 'Open Sans' }}
      >
        hello
      </Link>,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should render TEXT component', async () => {
    const image = await mount(
      <Link
        href="https://github.com/wojtekmaj/react-pdf"
        style={{ fontFamily: 'Open Sans', textDecoration: 'none' }}
      >
        he
        <Text style={{ textDecoration: 'underline' }}>llo</Text>
      </Link>,
    );

    expect(image).toMatchImageSnapshot();
  });
});
