import { describe, expect, test } from 'vitest';

import { Document, Page, View } from '@react-pdf/renderer';
import renderToImage from './renderComponent';

const mount = async (children, size = [200, 200]) => {
  const image = await renderToImage(
    <Document>
      <Page size={size} style={{ backgroundColor: '#e2e2e2' }}>
        {children}
      </Page>
    </Document>,
  );

  return image;
};

describe('borders', () => {
  // Simple cases: uniform borders
  test('should render uniform solid border', async () => {
    const image = await mount(
      <View
        style={{
          width: 100,
          height: 100,
          margin: 20,
          borderWidth: 2,
          borderColor: 'black',
          borderStyle: 'solid',
        }}
      />,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should render thick uniform solid border', async () => {
    const image = await mount(
      <View
        style={{
          width: 100,
          height: 100,
          margin: 20,
          borderWidth: 10,
          borderColor: 'red',
          borderStyle: 'solid',
        }}
      />,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should render uniform solid border with border radius', async () => {
    const image = await mount(
      <View
        style={{
          width: 100,
          height: 100,
          margin: 20,
          borderWidth: 2,
          borderColor: 'black',
          borderStyle: 'solid',
          borderRadius: 10,
        }}
      />,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should render uniform solid border with large border radius', async () => {
    const image = await mount(
      <View
        style={{
          width: 100,
          height: 100,
          margin: 20,
          borderWidth: 3,
          borderColor: 'black',
          borderStyle: 'solid',
          borderRadius: 50,
        }}
      />,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should render uniform dashed border', async () => {
    const image = await mount(
      <View
        style={{
          width: 100,
          height: 100,
          margin: 20,
          borderWidth: 2,
          borderColor: 'black',
          borderStyle: 'dashed',
        }}
      />,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should render uniform dotted border', async () => {
    const image = await mount(
      <View
        style={{
          width: 100,
          height: 100,
          margin: 20,
          borderWidth: 2,
          borderColor: 'black',
          borderStyle: 'dotted',
        }}
      />,
    );

    expect(image).toMatchImageSnapshot();
  });

  // Complex cases: different widths per side
  test('should render borders with different widths', async () => {
    const image = await mount(
      <View
        style={{
          width: 100,
          height: 100,
          margin: 20,
          borderTopWidth: 2,
          borderRightWidth: 5,
          borderBottomWidth: 8,
          borderLeftWidth: 12,
          borderColor: 'black',
          borderStyle: 'solid',
        }}
      />,
    );

    expect(image).toMatchImageSnapshot();
  });

  // Complex cases: different colors per side
  test('should render borders with different colors', async () => {
    const image = await mount(
      <View
        style={{
          width: 100,
          height: 100,
          margin: 20,
          borderWidth: 5,
          borderTopColor: 'red',
          borderRightColor: 'green',
          borderBottomColor: 'blue',
          borderLeftColor: 'orange',
          borderStyle: 'solid',
        }}
      />,
    );

    expect(image).toMatchImageSnapshot();
  });

  // Complex cases: different widths and colors
  test('should render borders with different widths and colors', async () => {
    const image = await mount(
      <View
        style={{
          width: 100,
          height: 100,
          margin: 20,
          borderTopWidth: 3,
          borderRightWidth: 6,
          borderBottomWidth: 9,
          borderLeftWidth: 12,
          borderTopColor: 'red',
          borderRightColor: 'green',
          borderBottomColor: 'blue',
          borderLeftColor: 'orange',
          borderStyle: 'solid',
        }}
      />,
    );

    expect(image).toMatchImageSnapshot();
  });

  // Complex cases: different widths, colors, and border radius
  test('should render borders with different widths and colors with border radius', async () => {
    const image = await mount(
      <View
        style={{
          width: 100,
          height: 100,
          margin: 20,
          borderTopWidth: 3,
          borderRightWidth: 6,
          borderBottomWidth: 9,
          borderLeftWidth: 12,
          borderTopColor: 'red',
          borderRightColor: 'green',
          borderBottomColor: 'blue',
          borderLeftColor: 'orange',
          borderStyle: 'solid',
          borderRadius: 15,
        }}
      />,
    );

    expect(image).toMatchImageSnapshot();
  });

  // Complex cases: per-corner border radius
  test('should render borders with per-corner border radius', async () => {
    const image = await mount(
      <View
        style={{
          width: 100,
          height: 100,
          margin: 20,
          borderWidth: 4,
          borderColor: 'black',
          borderStyle: 'solid',
          borderTopLeftRadius: 5,
          borderTopRightRadius: 15,
          borderBottomRightRadius: 25,
          borderBottomLeftRadius: 35,
        }}
      />,
    );

    expect(image).toMatchImageSnapshot();
  });

  // Complex cases: per-corner radius with different widths and colors
  test('should render borders with per-corner radius and different widths and colors', async () => {
    const image = await mount(
      <View
        style={{
          width: 100,
          height: 100,
          margin: 20,
          borderTopWidth: 3,
          borderRightWidth: 6,
          borderBottomWidth: 9,
          borderLeftWidth: 12,
          borderTopColor: 'red',
          borderRightColor: 'green',
          borderBottomColor: 'blue',
          borderLeftColor: 'orange',
          borderStyle: 'solid',
          borderTopLeftRadius: 5,
          borderTopRightRadius: 15,
          borderBottomRightRadius: 25,
          borderBottomLeftRadius: 35,
        }}
      />,
    );

    expect(image).toMatchImageSnapshot();
  });

  // Edge case: only some sides have borders
  test('should render only top and bottom borders', async () => {
    const image = await mount(
      <View
        style={{
          width: 100,
          height: 100,
          margin: 20,
          borderTopWidth: 4,
          borderBottomWidth: 4,
          borderTopColor: 'red',
          borderBottomColor: 'blue',
          borderStyle: 'solid',
        }}
      />,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should render only left and right borders', async () => {
    const image = await mount(
      <View
        style={{
          width: 100,
          height: 100,
          margin: 20,
          borderLeftWidth: 4,
          borderRightWidth: 4,
          borderLeftColor: 'orange',
          borderRightColor: 'green',
          borderStyle: 'solid',
        }}
      />,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should render single border side', async () => {
    const image = await mount(
      <View
        style={{
          width: 100,
          height: 100,
          margin: 20,
          borderBottomWidth: 4,
          borderBottomColor: 'blue',
          borderBottomStyle: 'solid',
        }}
      />,
    );

    expect(image).toMatchImageSnapshot();
  });

  // Edge case: border with background color
  test('should render border with background color', async () => {
    const image = await mount(
      <View
        style={{
          width: 100,
          height: 100,
          margin: 20,
          borderWidth: 4,
          borderColor: 'black',
          borderStyle: 'solid',
          backgroundColor: 'lightyellow',
          borderRadius: 10,
        }}
      />,
    );

    expect(image).toMatchImageSnapshot();
  });

  // Edge case: very thin borders
  test('should render very thin borders', async () => {
    const image = await mount(
      <View
        style={{
          width: 100,
          height: 100,
          margin: 20,
          borderWidth: 0.5,
          borderColor: 'black',
          borderStyle: 'solid',
        }}
      />,
    );

    expect(image).toMatchImageSnapshot();
  });

  // Edge case: mixed styles per side
  test('should render borders with different styles per side', async () => {
    const image = await mount(
      <View
        style={{
          width: 100,
          height: 100,
          margin: 20,
          borderTopWidth: 4,
          borderRightWidth: 4,
          borderBottomWidth: 4,
          borderLeftWidth: 4,
          borderTopColor: 'red',
          borderRightColor: 'green',
          borderBottomColor: 'blue',
          borderLeftColor: 'orange',
          borderTopStyle: 'solid',
          borderRightStyle: 'dashed',
          borderBottomStyle: 'dotted',
          borderLeftStyle: 'solid',
        }}
      />,
    );

    expect(image).toMatchImageSnapshot();
  });
});
