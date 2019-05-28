import getOrientation from '../../src/page/getOrientation';

describe('page getOrientation', () => {
  test('Should return landscape if no orientation provided', () => {
    const page = { props: {} };

    expect(getOrientation(page)).toBe('landscape');
  });

  test('Should return landscape if landscape', () => {
    const page = { props: { orientation: 'landscape' } };

    expect(getOrientation(page)).toBe('landscape');
  });

  test('Should return portrait if portait', () => {
    const page = { props: { orientation: 'portrait' } };

    expect(getOrientation(page)).toBe('portrait');
  });

  test('Should return landscape if anything else', () => {
    const page = { props: { orientation: 'boo' } };

    expect(getOrientation(page)).toBe('landscape');
  });
});
