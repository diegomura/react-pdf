import FontStore from '../src';

describe('fontStore default fonts', () => {
  test('should return builtin Courier', () => {
    const fontStore = new FontStore();

    expect(
      fontStore.getFont({
        fontFamily: 'Courier',
        fontWeight: 400,
        fontStyle: 'normal',
      }).data,
    ).toBe('Courier');
    expect(
      fontStore.getFont({
        fontFamily: 'Courier',
        fontWeight: 400,
        fontStyle: 'oblique',
      }).data,
    ).toBe('Courier-Oblique');
    expect(
      fontStore.getFont({
        fontFamily: 'Courier',
        fontWeight: 700,
        fontStyle: 'normal',
      }).data,
    ).toBe('Courier-Bold');
    expect(
      fontStore.getFont({
        fontFamily: 'Courier',
        fontWeight: 700,
        fontStyle: 'oblique',
      }).data,
    ).toBe('Courier-BoldOblique');
  });
  test('should return builtin Helvetica', () => {
    const fontStore = new FontStore();

    expect(
      fontStore.getFont({
        fontFamily: 'Helvetica',
        fontWeight: 400,
        fontStyle: 'normal',
      }).data,
    ).toBe('Helvetica');
    expect(
      fontStore.getFont({
        fontFamily: 'Helvetica',
        fontWeight: 400,
        fontStyle: 'oblique',
      }).data,
    ).toBe('Helvetica-Oblique');
    expect(
      fontStore.getFont({
        fontFamily: 'Helvetica',
        fontWeight: 700,
        fontStyle: 'normal',
      }).data,
    ).toBe('Helvetica-Bold');
    expect(
      fontStore.getFont({
        fontFamily: 'Helvetica',
        fontWeight: 700,
        fontStyle: 'oblique',
      }).data,
    ).toBe('Helvetica-BoldOblique');
  });
  test('should return builtin Times-Roman', () => {
    const fontStore = new FontStore();

    expect(
      fontStore.getFont({
        fontFamily: 'Times-Roman',
        fontWeight: 400,
        fontStyle: 'normal',
      }).data,
    ).toBe('Times-Roman');
    expect(
      fontStore.getFont({
        fontFamily: 'Times-Roman',
        fontWeight: 400,
        fontStyle: 'italic',
      }).data,
    ).toBe('Times-Italic');
    expect(
      fontStore.getFont({
        fontFamily: 'Times-Roman',
        fontWeight: 700,
        fontStyle: 'normal',
      }).data,
    ).toBe('Times-Bold');
    expect(
      fontStore.getFont({
        fontFamily: 'Times-Roman',
        fontWeight: 700,
        fontStyle: 'italic',
      }).data,
    ).toBe('Times-BoldItalic');
  });

  test('should return builtin fonts after reset', () => {
    const fontStore = new FontStore();

    fontStore.reset();

    expect(
      fontStore.getFont({
        fontFamily: 'Courier',
        fontWeight: 400,
        fontStyle: 'normal',
      }).data,
    ).toBe('Courier');
    expect(
      fontStore.getFont({
        fontFamily: 'Helvetica',
        fontWeight: 400,
        fontStyle: 'normal',
      }).data,
    ).toBe('Helvetica');
    expect(
      fontStore.getFont({
        fontFamily: 'Times-Roman',
        fontWeight: 400,
        fontStyle: 'normal',
      }).data,
    ).toBe('Times-Roman');
  });

  test('should return builtin fonts after clear', () => {
    const fontStore = new FontStore();

    fontStore.clear();

    expect(
      fontStore.getFont({
        fontFamily: 'Courier',
        fontWeight: 400,
        fontStyle: 'normal',
      }).data,
    ).toBe('Courier');
    expect(
      fontStore.getFont({
        fontFamily: 'Helvetica',
        fontWeight: 400,
        fontStyle: 'normal',
      }).data,
    ).toBe('Helvetica');
    expect(
      fontStore.getFont({
        fontFamily: 'Times-Roman',
        fontWeight: 400,
        fontStyle: 'normal',
      }).data,
    ).toBe('Times-Roman');
  });
});
