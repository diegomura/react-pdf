import getPageSize from '../src/utils/pageSizes';

describe('Page sizes', () => {
  test('Should return correct page size given page type, portrait', () => {
    const size = getPageSize('A4', 'portrait');

    expect(size.width).toBe(595.28);
    expect(size.height).toBe(841.89);
  });

  test('Should return correct page size given size array, portrait', () => {
    const size = getPageSize([595.28, 841.89], 'portrait');

    expect(size.width).toBe(595.28);
    expect(size.height).toBe(841.89);
  });

  test('Should return correct page size given size object, portrait', () => {
    const size = getPageSize({ width: 595.28, height: 841.89 }, 'portrait');

    expect(size.width).toBe(595.28);
    expect(size.height).toBe(841.89);
  });

  test('Should return correct page size using inches', () => {
    const BASE_DPI = 72;
    const size = getPageSize({ width: 2, height: 4, unit: 'in' }, 'portrait');

    expect(size.width).toBe(2 * BASE_DPI);
    expect(size.height).toBe(4 * BASE_DPI);
  });

  test('Should return correct page size given page type, landscape', () => {
    const size = getPageSize('A4', 'landscape');

    expect(size.height).toBe(595.28);
    expect(size.width).toBe(841.89);
  });

  test('Should return correct page size given size array, landscape', () => {
    const size = getPageSize([595.28, 841.89], 'landscape');

    expect(size.height).toBe(595.28);
    expect(size.width).toBe(841.89);
  });

  test('Should return correct page size given size object, landscape', () => {
    const size = getPageSize({ width: 595.28, height: 841.89 }, 'landscape');

    expect(size.height).toBe(595.28);
    expect(size.width).toBe(841.89);
  });

  test('Should return correct page size given different DPI', () => {
    const DPI = 400;
    const BASE_DPI = 72;
    const size = getPageSize('A4', 'portrait', DPI);

    expect(size.width).toBe((595.28 * DPI) / BASE_DPI);
    expect(size.height).toBe((841.89 * DPI) / BASE_DPI);
  });

  test('Should return correct page size using inches and different DPI', () => {
    const DPI = 400;
    const size = getPageSize(
      { width: 2, height: 4, unit: 'in' },
      'portrait',
      400,
    );

    expect(size.width).toBe(2 * DPI);
    expect(size.height).toBe(4 * DPI);
  });
});
