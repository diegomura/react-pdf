import Page from '../src/elements/Page';
import root from './utils/dummyRoot';
import * as urlUtils from '../src/utils/url';

let dummyRoot;

describe('Page', () => {
  beforeEach(() => {
    dummyRoot = root.reset();
  });

  test('Should be A4 blank portrait page by default', () => {
    const page = new Page(dummyRoot, {});

    expect(page.props.size).toBe('A4');
    expect(page.size).toEqual({ height: 841.89, width: 595.28 });
    expect(page.orientation).toBe('portrait');
  });

  test('Should render given size', () => {
    const page = new Page(dummyRoot, { size: 'A0' });

    expect(page.props.size).toBe('A0');
    expect(page.size).toEqual({ height: 3370.39, width: 2383.94 });
  });

  test('Should render landscape page', () => {
    const page = new Page(dummyRoot, { orientation: 'landscape' });

    expect(page.orientation).toBe('landscape');
    expect(page.size).toEqual({ width: 841.89, height: 595.28 });
  });

  test('Should render custom size by array, portrait', () => {
    const page = new Page(dummyRoot, { size: [100, 200] });

    expect(page.size).toEqual({ width: 100, height: 200 });
  });

  test('Should render custom size by array, landscape', () => {
    const page = new Page(dummyRoot, {
      size: [100, 200],
      orientation: 'landscape',
    });

    expect(page.size).toEqual({ width: 200, height: 100 });
  });

  test('Should render custom size by object, portrait', () => {
    const page = new Page(dummyRoot, { size: { width: 100, height: 200 } });

    expect(page.size).toEqual({ width: 100, height: 200 });
  });

  test('Should render custom size by object, landscape', () => {
    const page = new Page(dummyRoot, {
      size: { width: 100, height: 200 },
      orientation: 'landscape',
    });

    expect(page.size).toEqual({ width: 200, height: 100 });
  });

  test('Should render actual page in document', async () => {
    const page = new Page(dummyRoot, { style: { backgroundColor: 'tomato' } });

    page.applyProps();
    await page.render();

    expect(dummyRoot.instance.addPage.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.addPage.mock.calls[0][0].margin).toBe(0);
    expect(dummyRoot.instance.addPage.mock.calls[0][0].size).toEqual([
      595.28,
      841.89,
    ]);
  });

  test('Should render given background color', async () => {
    const page = new Page(dummyRoot, { style: { backgroundColor: 'tomato' } });

    page.applyProps();
    await page.render();

    expect(dummyRoot.instance.fillColor.mock.calls[0][0]).toBe('tomato');
    expect(dummyRoot.instance.rect.mock.calls[0]).toEqual([
      0,
      0,
      595.28,
      841.89,
    ]);
    expect(dummyRoot.instance.fill.mock.calls).toHaveLength(1);
  });
  test('should call setDestination on render', async () => {
    const page = new Page(dummyRoot, {});
    const setDestinationSpy = jest.spyOn(urlUtils, 'setDestination');

    await page.render();

    expect(setDestinationSpy).toHaveBeenCalledWith(page);
  });
});
