import Node from '../src/elements/Node';

describe('Node', () => {
  test('Should get correct position', () => {
    const node = new Node();

    node.position = 'absolute';

    node.calculateLayout();

    expect(node.position).toBe('absolute');
  });

  test('Should get correct coordinates', () => {
    const node = new Node();

    node.top = 20;
    node.left = 40;

    node.calculateLayout();

    expect(node.top).toBe(20);
    expect(node.left).toBe(40);
  });

  test('Should get correct dimensions', () => {
    const node = new Node();

    node.width = 20;
    node.height = 40;

    node.calculateLayout();

    expect(node.width).toBe(20);
    expect(node.height).toBe(40);
  });

  test('Should get correct min/max dimensions', () => {
    const node = new Node();

    node.minWidth = 20;
    node.minHeight = 40;
    node.maxWidth = 50;
    node.maxHeight = 70;

    node.calculateLayout();

    expect(node.minWidth).toBe(20);
    expect(node.minHeight).toBe(40);
    expect(node.maxWidth).toBe(50);
    expect(node.maxHeight).toBe(70);
  });

  test('Should get correct padding', () => {
    const node = new Node();

    node.paddingTop = 10;
    node.paddingRight = 20;
    node.paddingBottom = 30;
    node.paddingLeft = 40;

    node.calculateLayout();

    expect(node.paddingTop).toBe(10);
    expect(node.paddingRight).toBe(20);
    expect(node.paddingBottom).toBe(30);
    expect(node.paddingLeft).toBe(40);
  });

  test('Should append child correctly', () => {
    const base = new Node();
    const child = new Node();

    base.appendChild(child);

    expect(base.children).toHaveLength(1);
    expect(base.children[0]).toBe(child);
    expect(base.layout.getChildCount()).toBe(1);
    expect(child.parent).toBe(base);
    expect(child.layout.getParent()).toBeTruthy();
  });

  test('Should remove child correctly', () => {
    const base = new Node();
    const child1 = new Node();
    const child2 = new Node();

    base.appendChild(child1);
    base.appendChild(child2);
    base.removeChild(child1);

    expect(base.children).toHaveLength(1);
    expect(base.children[0]).toBe(child2);
    expect(base.layout.getChildCount()).toBe(1);
    expect(child1.parent).toBe(null);
    expect(child1.layout.getParent()).toBe(null);
    expect(child2.parent).toBe(base);
    expect(child2.layout.getParent()).toBeTruthy();
  });

  test('Should get correct margin', () => {
    const node = new Node();

    node.marginTop = 10;
    node.marginRight = 20;
    node.marginBottom = 30;
    node.marginLeft = 40;

    node.calculateLayout();

    expect(node.marginTop).toBe(10);
    expect(node.marginRight).toBe(20);
    expect(node.marginBottom).toBe(30);
    expect(node.marginLeft).toBe(40);
  });

  test('Should get correct border', () => {
    const node = new Node();

    node.borderTopWidth = 10;
    node.borderRightWidth = 20;
    node.borderBottomWidth = 30;
    node.borderLeftWidth = 40;

    node.calculateLayout();

    expect(node.borderTopWidth).toBe(10);
    expect(node.borderRightWidth).toBe(20);
    expect(node.borderBottomWidth).toBe(30);
    expect(node.borderLeftWidth).toBe(40);
  });

  test('Should copy position correctly', () => {
    const node = new Node();
    const clone = new Node();

    node.position = 'absolute';

    clone.copyStyle(node);
    clone.calculateLayout();

    expect(clone.position).toBe('absolute');
  });

  test('Should copy coordinates correctly', () => {
    const node = new Node();
    const clone = new Node();

    node.top = 20;
    node.left = 40;

    clone.copyStyle(node);
    clone.calculateLayout();

    expect(clone.top).toBe(20);
    expect(clone.left).toBe(40);
  });

  test('Should copy dimensions correctly', () => {
    const node = new Node();
    const clone = new Node();

    node.width = 20;
    node.height = 40;

    clone.copyStyle(node);
    clone.calculateLayout();

    expect(clone.width).toBe(20);
    expect(clone.height).toBe(40);
  });

  test('Should copy min/max dimensions correctly', () => {
    const node = new Node();
    const clone = new Node();

    node.minWidth = 20;
    node.minHeight = 40;
    node.maxWidth = 50;
    node.maxHeight = 70;

    clone.copyStyle(node);
    clone.calculateLayout();

    expect(clone.minWidth).toBe(20);
    expect(clone.minHeight).toBe(40);
    expect(clone.maxWidth).toBe(50);
    expect(clone.maxHeight).toBe(70);
  });

  test('Should copy padding correctly', () => {
    const node = new Node();
    const clone = new Node();

    node.paddingTop = 10;
    node.paddingRight = 20;
    node.paddingBottom = 30;
    node.paddingLeft = 40;

    clone.copyStyle(node);
    clone.calculateLayout();

    expect(clone.paddingTop).toBe(10);
    expect(clone.paddingRight).toBe(20);
    expect(clone.paddingBottom).toBe(30);
    expect(clone.paddingLeft).toBe(40);
  });

  test('Should copy margin correctly', () => {
    const node = new Node();
    const clone = new Node();

    node.marginTop = 10;
    node.marginRight = 20;
    node.marginBottom = 30;
    node.marginLeft = 40;

    clone.copyStyle(node);
    clone.calculateLayout();

    expect(clone.marginTop).toBe(10);
    expect(clone.marginRight).toBe(20);
    expect(clone.marginBottom).toBe(30);
    expect(clone.marginLeft).toBe(40);
  });

  test('Should copy borders correctly', () => {
    const node = new Node();
    const clone = new Node();

    node.borderTopWidth = 10;
    node.borderRightWidth = 20;
    node.borderBottomWidth = 30;
    node.borderLeftWidth = 40;

    clone.copyStyle(node);
    clone.calculateLayout();

    expect(clone.borderTopWidth).toBe(10);
    expect(clone.borderRightWidth).toBe(20);
    expect(clone.borderBottomWidth).toBe(30);
    expect(clone.borderLeftWidth).toBe(40);
  });

  test('Should get absolute layout correctly', () => {
    const parent = new Node();
    const child1 = new Node();
    const child2 = new Node();

    parent.width = 100;
    parent.height = 100;
    parent.padding = 20;
    child1.padding = 20;
    child1.height = '100%';
    child2.height = '100%';

    parent.appendChild(child1);
    child1.appendChild(child2);
    parent.calculateLayout();

    const child1Layout = child1.getAbsoluteLayout();
    const child2Layout = child2.getAbsoluteLayout();

    expect(child1Layout.top).toBe(20);
    expect(child1Layout.left).toBe(20);
    expect(child1Layout.width).toBe(60);
    expect(child1Layout.height).toBe(60);
    expect(child2Layout.top).toBe(40);
    expect(child2Layout.left).toBe(40);
    expect(child2Layout.width).toBe(20);
    expect(child2Layout.height).toBe(20);
  });

  test('Should get absolute layout correctly for cloned nodes', () => {
    const parent = new Node();
    const child = new Node();
    const cloneParent = new Node();
    const cloneChild = new Node();

    parent.width = 100;
    parent.height = 100;
    parent.padding = 20;
    child.height = '100%';

    parent.appendChild(child);
    parent.calculateLayout();

    cloneParent.copyStyle(parent);
    cloneChild.copyStyle(child);
    cloneParent.appendChild(cloneChild);
    cloneParent.calculateLayout();

    const cloneChildLayout = cloneChild.getAbsoluteLayout();

    expect(cloneChildLayout.top).toBe(20);
    expect(cloneChildLayout.left).toBe(20);
    expect(cloneChildLayout.width).toBe(60);
    expect(cloneChildLayout.height).toBe(60);
  });
});
