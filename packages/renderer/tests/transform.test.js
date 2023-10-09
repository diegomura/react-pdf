import { Document, Page, View } from '@react-pdf/renderer';
import renderToImage from './renderComponent';

const TestDocument = ({ transform, width = 20, height = 20 }) => {
  return (
    <Document>
      <Page size={[20, 20]}>
        <View style={{ width, height, backgroundColor: 'black', transform }} />
      </Page>
    </Document>
  );
};

describe('transform', () => {
  test('should scale with two args', async () => {
    const image = await renderToImage(
      <TestDocument transform="scale(0.5, 0.5)" />,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should scale with one arg', async () => {
    const image = await renderToImage(<TestDocument transform="scale(0.5)" />);

    expect(image).toMatchImageSnapshot();
  });

  test('should scale on X axis', async () => {
    const image = await renderToImage(<TestDocument transform="scaleX(0.5)" />);

    expect(image).toMatchImageSnapshot();
  });

  test('should scale on Y axis', async () => {
    const image = await renderToImage(<TestDocument transform="scaleY(0.5)" />);

    expect(image).toMatchImageSnapshot();
  });

  test('should translate to zero px', async () => {
    const image = await renderToImage(
      <TestDocument width={5} height={5} transform="translateX(0px)" />,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should translate on X axis', async () => {
    const image = await renderToImage(
      <TestDocument width={5} height={5} transform="translateX(15px)" />,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should translate on Y axis', async () => {
    const image = await renderToImage(
      <TestDocument width={5} height={5} transform="translateY(15px)" />,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should translate on both axis', async () => {
    const image = await renderToImage(
      <TestDocument width={5} height={5} transform="translate(15px, 15px)" />,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should rotate', async () => {
    const image = await renderToImage(
      <TestDocument width={15} height={15} transform="rotate(45deg)" />,
    );

    expect(image).toMatchImageSnapshot();
  });
});
