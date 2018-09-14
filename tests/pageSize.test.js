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
});
