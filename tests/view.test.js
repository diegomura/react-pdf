import View from '../src/elements/View';
import root from './utils/dummyRoot';
import * as urlUtils from '../src/utils/url'

let dummyRoot;

describe('View', () => {
  beforeEach(() => {
    dummyRoot = root.reset();
  });

  test('Should wrap by default', () => {
    const view = new View(dummyRoot, {});

    expect(view.wrap).toBeTruthy();
  });

  test('Should render background when render', async () => {
    const drawBackgroundColor = jest.fn();
    const view = new View(dummyRoot, { style: { backgroundColor: 'tomato' } });

    view.drawBackgroundColor = drawBackgroundColor;

    await view.render();

    expect(drawBackgroundColor.mock.calls).toHaveLength(1);
  });

  test('Should render borders when render', async () => {
    const drawBorders = jest.fn();
    const view = new View(dummyRoot, {});

    view.drawBorders = drawBorders;

    await view.render();

    expect(drawBorders.mock.calls).toHaveLength(1);
  });

  test('Should render debug guides if flag true', async () => {
    const debug = jest.fn();
    const view = new View(dummyRoot, { debug: true });

    view.debug = debug;

    await view.render();

    expect(debug.mock.calls).toHaveLength(1);
  });

  test('Should not render debug guides if flag false', async () => {
    const debug = jest.fn();
    const view = new View(dummyRoot, {});

    view.debug = debug;

    await view.render();

    expect(debug.mock.calls).toHaveLength(0);
  });

  test('call the setDestination on render', async () => {
    const view = new View(dummyRoot, {});
    const setDestinationSpy = jest.spyOn(urlUtils, 'setDestination');

    await view.render();

    expect(setDestinationSpy).toHaveBeenCalledWith(view);
  });
});
