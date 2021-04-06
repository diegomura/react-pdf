import getSize from '../../src/page/getSize';

describe('page getSize', () => {
  test('Should default to A4', () => {
    const page = { props: {} };
    const size = getSize(page);

    expect(size).toHaveProperty('width', 595.28);
    expect(size).toHaveProperty('height', 841.89);
  });

  test('Should default to portrait A4', () => {
    const page = { props: { orientation: 'portrait' } };
    const size = getSize(page);

    expect(size).toHaveProperty('width', 595.28);
    expect(size).toHaveProperty('height', 841.89);
  });

  test('Should accept size string', () => {
    const page = { props: { size: 'A2' } };
    const size = getSize(page);

    expect(size).toHaveProperty('width', 1190.55);
    expect(size).toHaveProperty('height', 1683.78);
  });

  test('Should accept size string in landscape mode', () => {
    const page = { props: { size: 'A2', orientation: 'landscape' } };
    const size = getSize(page);

    expect(size).toHaveProperty('width', 1683.78);
    expect(size).toHaveProperty('height', 1190.55);
  });

  test('Should accept size array', () => {
    const page = { props: { size: [100, 200] } };
    const size = getSize(page);

    expect(size).toHaveProperty('width', 100);
    expect(size).toHaveProperty('height', 200);
  });

  test('Should accept size array in landscape mode', () => {
    const page = { props: { size: [100, 200], orientation: 'landscape' } };
    const size = getSize(page);

    expect(size).toHaveProperty('width', 200);
    expect(size).toHaveProperty('height', 100);
  });

  test('Should accept size object', () => {
    const page = { props: { size: { width: 100, height: 200 } } };
    const size = getSize(page);

    expect(size).toHaveProperty('width', 100);
    expect(size).toHaveProperty('height', 200);
  });

  test('Should accept size object in landscape mode', () => {
    const page = {
      props: { size: { width: 100, height: 200 }, orientation: 'landscape' },
    };
    const size = getSize(page);

    expect(size).toHaveProperty('width', 200);
    expect(size).toHaveProperty('height', 100);
  });

  test('Should accept size number', () => {
    const page = { props: { size: 100 } };
    const size = getSize(page);

    expect(size).toHaveProperty('width', 100);
    expect(size).toHaveProperty('height', undefined);
  });

  test('Should accept size number in landscape mode', () => {
    const page = { props: { size: 100, orientation: 'landscape' } };
    const size = getSize(page);

    expect(size).toHaveProperty('width', undefined);
    expect(size).toHaveProperty('height', 100);
  });
});
