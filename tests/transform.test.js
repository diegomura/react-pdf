import Document from '../src/elements/Document';
import Page from '../src/elements/Page';
import View from '../src/elements/View';
import root from './utils/dummyRoot';

let dummyRoot;

describe('Document', () => {
  beforeEach(() => {
    dummyRoot = root.reset();
  });

  test('Should apply rotation in possitive degrees', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, {});
    const view = new View(dummyRoot, { style: { transform: 'rotate(30deg)' } });

    doc.appendChild(page);
    page.appendChild(view);

    await doc.render();

    expect(dummyRoot.instance.rotate.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.rotate.mock.calls[0][0]).toBe('30');
  });

  test('Should apply rotation in negative degrees', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, {});
    const view = new View(dummyRoot, {
      style: { transform: 'rotate(-30deg)' },
    });

    doc.appendChild(page);
    page.appendChild(view);

    await doc.render();

    expect(dummyRoot.instance.rotate.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.rotate.mock.calls[0][0]).toBe('-30');
  });

  test('Should apply rotation in positive radians', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, {});
    const view = new View(dummyRoot, {
      style: { transform: 'rotate(0.523599rad)' },
    });

    doc.appendChild(page);
    page.appendChild(view);

    await doc.render();

    expect(dummyRoot.instance.rotate.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.rotate.mock.calls[0][0]).toBeCloseTo(30);
  });

  test('Should apply rotation in negative radians', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, {});
    const view = new View(dummyRoot, {
      style: { transform: 'rotate(-0.523599rad)' },
    });

    doc.appendChild(page);
    page.appendChild(view);

    await doc.render();

    expect(dummyRoot.instance.rotate.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.rotate.mock.calls[0][0]).toBeCloseTo(-30);
  });

  test('Should apply scaleX positive transform', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, {});
    const view = new View(dummyRoot, { style: { transform: 'scaleX(3)' } });

    doc.appendChild(page);
    page.appendChild(view);

    await doc.render();

    expect(dummyRoot.instance.scale.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.scale.mock.calls[0][0]).toBe('3');
    expect(dummyRoot.instance.scale.mock.calls[0][1]).toBe(1);
  });

  test('Should apply scaleX negative transform', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, {});
    const view = new View(dummyRoot, { style: { transform: 'scaleX(-3)' } });

    doc.appendChild(page);
    page.appendChild(view);

    await doc.render();

    expect(dummyRoot.instance.scale.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.scale.mock.calls[0][0]).toBe('-3');
    expect(dummyRoot.instance.scale.mock.calls[0][1]).toBe(1);
  });

  test('Should apply scaleY positive transform', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, {});
    const view = new View(dummyRoot, { style: { transform: 'scaleY(3)' } });

    doc.appendChild(page);
    page.appendChild(view);

    await doc.render();

    expect(dummyRoot.instance.scale.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.scale.mock.calls[0][0]).toBe(1);
    expect(dummyRoot.instance.scale.mock.calls[0][1]).toBe('3');
  });

  test('Should apply scaleY negative transform', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, {});
    const view = new View(dummyRoot, { style: { transform: 'scaleY(-3)' } });

    doc.appendChild(page);
    page.appendChild(view);

    await doc.render();

    expect(dummyRoot.instance.scale.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.scale.mock.calls[0][0]).toBe(1);
    expect(dummyRoot.instance.scale.mock.calls[0][1]).toBe('-3');
  });

  test('Should apply scale shortcut positive transform', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, {});
    const view = new View(dummyRoot, { style: { transform: 'scale(3, 5)' } });

    doc.appendChild(page);
    page.appendChild(view);

    await doc.render();

    expect(dummyRoot.instance.scale.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.scale.mock.calls[0][0]).toBe('3');
    expect(dummyRoot.instance.scale.mock.calls[0][1]).toBe('5');
  });

  test('Should apply scale shortcut negative transform', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, {});
    const view = new View(dummyRoot, { style: { transform: 'scale(-3, -5)' } });

    doc.appendChild(page);
    page.appendChild(view);

    await doc.render();

    expect(dummyRoot.instance.scale.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.scale.mock.calls[0][0]).toBe('-3');
    expect(dummyRoot.instance.scale.mock.calls[0][1]).toBe('-5');
  });

  test('Should apply translateX positive transform', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, {});
    const view = new View(dummyRoot, { style: { transform: 'translateX(3)' } });

    doc.appendChild(page);
    page.appendChild(view);

    await doc.render();

    expect(dummyRoot.instance.translate.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.translate.mock.calls[0][0]).toBe('3');
    expect(dummyRoot.instance.translate.mock.calls[0][1]).toBe(1);
  });

  test('Should apply translateX negative transform', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, {});
    const view = new View(dummyRoot, {
      style: { transform: 'translateX(-3)' },
    });

    doc.appendChild(page);
    page.appendChild(view);

    await doc.render();

    expect(dummyRoot.instance.translate.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.translate.mock.calls[0][0]).toBe('-3');
    expect(dummyRoot.instance.translate.mock.calls[0][1]).toBe(1);
  });

  test('Should apply translateY positive transform', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, {});
    const view = new View(dummyRoot, { style: { transform: 'translateY(3)' } });

    doc.appendChild(page);
    page.appendChild(view);

    await doc.render();

    expect(dummyRoot.instance.translate.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.translate.mock.calls[0][0]).toBe(1);
    expect(dummyRoot.instance.translate.mock.calls[0][1]).toBe('3');
  });

  test('Should apply translateY negative transform', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, {});
    const view = new View(dummyRoot, {
      style: { transform: 'translateY(-3)' },
    });

    doc.appendChild(page);
    page.appendChild(view);

    await doc.render();

    expect(dummyRoot.instance.translate.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.translate.mock.calls[0][0]).toBe(1);
    expect(dummyRoot.instance.translate.mock.calls[0][1]).toBe('-3');
  });

  test('Should apply translate shortcut positive transform', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, {});
    const view = new View(dummyRoot, {
      style: { transform: 'translate(3, 5)' },
    });

    doc.appendChild(page);
    page.appendChild(view);

    await doc.render();

    expect(dummyRoot.instance.translate.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.translate.mock.calls[0][0]).toBe('3');
    expect(dummyRoot.instance.translate.mock.calls[0][1]).toBe('5');
  });

  test('Should apply translate shortcut negative transform', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, {});
    const view = new View(dummyRoot, {
      style: { transform: 'translate(-3, -5)' },
    });

    doc.appendChild(page);
    page.appendChild(view);

    await doc.render();

    expect(dummyRoot.instance.translate.mock.calls).toHaveLength(1);
    expect(dummyRoot.instance.translate.mock.calls[0][0]).toBe('-3');
    expect(dummyRoot.instance.translate.mock.calls[0][1]).toBe('-5');
  });

  test('Should apply many transformations in order', async () => {
    const doc = new Document(dummyRoot, {});
    const page = new Page(dummyRoot, {});
    const view = new View(dummyRoot, {
      style: { transform: 'rotate(20deg) scaleX(4) translate(3, 5)' },
    });

    doc.appendChild(page);
    page.appendChild(view);

    await doc.render();

    const rotateOrder = dummyRoot.instance.rotate.mock.invocationCallOrder[0];
    const scaleOrder = dummyRoot.instance.scale.mock.invocationCallOrder[0];
    const translateOrder =
      dummyRoot.instance.translate.mock.invocationCallOrder[0];

    expect(scaleOrder).toBeGreaterThan(rotateOrder);
    expect(translateOrder).toBeGreaterThan(scaleOrder);
  });
});
