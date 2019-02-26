import Document from '../src/elements/Document';
import Page from '../src/elements/Page';
import Canvas from '../src/elements/Canvas';
import { availableMethods } from '../src/utils/painter';
import root from './utils/dummyRoot';

let dummyRoot;
let consoleMock;

describe('View', () => {
  beforeAll(() => {
    consoleMock = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  beforeEach(() => {
    dummyRoot = root.reset();
    consoleMock.mockReset();
  });

  test('Should show warning if null width', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, { wrap: false });
    const canvas = new Canvas(dummyRoot, { style: { width: 0, height: 10 } });

    doc.appendChild(page);
    page.appendChild(canvas);

    await doc.render();

    expect(console.error).toHaveBeenCalled();
  });

  test('Should show warning if null height', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, { wrap: false });
    const canvas = new Canvas(dummyRoot, {});

    doc.appendChild(page);
    page.appendChild(canvas);

    await doc.render();

    expect(console.error).toHaveBeenCalled();
  });

  test('Should not show warning if has valid dimensions', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, { wrap: false });
    const canvas = new Canvas(dummyRoot, {
      style: { width: 400, height: 400 },
    });

    doc.appendChild(page);
    page.appendChild(canvas);

    await doc.render();

    expect(console.error).not.toHaveBeenCalled();
  });

  test('Should receive painter as prop', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, { wrap: false });
    const canvas = new Canvas(dummyRoot, {
      style: { width: 400, height: 400 },
      paint: painter => {
        expect(painter).toBeTruthy();
      },
    });

    doc.appendChild(page);
    page.appendChild(canvas);

    await doc.render();
  });

  test('Should receive dimensions as prop', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, { wrap: false });
    const canvas = new Canvas(dummyRoot, {
      style: { width: 400, height: 400, padding: '20 40' },
      paint: (painter, width, height) => {
        expect(width).toBe(320);
        expect(height).toBe(360);
      },
    });

    doc.appendChild(page);
    page.appendChild(canvas);

    await doc.render();
  });

  test('Should painter calls be chainable', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, { wrap: false });
    const canvas = new Canvas(dummyRoot, {
      style: { width: 400, height: 400, padding: '20 40' },
      paint: painter => {
        expect(painter.fill()).toBe(painter);
      },
    });

    doc.appendChild(page);
    page.appendChild(canvas);

    await doc.render();
  });

  availableMethods.forEach(method => {
    test(`Should call document pdf instance ${method} method`, async () => {
      const doc = new Document(dummyRoot, {});
      const page = new Page(dummyRoot, { wrap: false });
      const canvas = new Canvas(dummyRoot, {
        style: { width: 400, height: 400 },
        paint: painter => {
          painter[method]();
          expect(
            dummyRoot.instance[method].mock.calls.length,
          ).toBeGreaterThanOrEqual(1);
        },
      });

      doc.appendChild(page);
      page.appendChild(canvas);

      await doc.render();
    });
  });
});
