import View from '../src/elements/View';
import root from './utils/dummyRoot';

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

  test('Should set destination if dest prop is available', async () => {
    const dest = 'myDest';
    const view = new View(dummyRoot, { dest });

    await view.render();

    expect(dummyRoot.instance.addNamedDestination).toHaveBeenCalledWith(dest);
  });
});
