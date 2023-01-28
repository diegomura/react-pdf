const Yoga = require('..');

describe('Align content', () => {
  test('align content flex start', () => {
    const root = Yoga.Node.create();

    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setFlexWrap(Yoga.WRAP_WRAP);
    root.setWidth(130);
    root.setHeight(100);

    const child0 = Yoga.Node.create();
    child0.setWidth(50);
    child0.setHeight(10);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    child1.setHeight(10);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setWidth(50);
    child2.setHeight(10);
    root.insertChild(child2, 2);

    const child3 = Yoga.Node.create();
    child3.setWidth(50);
    child3.setHeight(10);
    root.insertChild(child3, 3);

    const child4 = Yoga.Node.create();
    child4.setWidth(50);
    child4.setHeight(10);
    root.insertChild(child4, 4);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(130);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(10);

    expect(child1.getComputedLayout().left).toBe(50);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(10);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(10);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(10);

    expect(child3.getComputedLayout().left).toBe(50);
    expect(child3.getComputedLayout().top).toBe(10);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(10);

    expect(child4.getComputedLayout().left).toBe(0);
    expect(child4.getComputedLayout().top).toBe(20);
    expect(child4.getComputedLayout().width).toBe(50);
    expect(child4.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(130);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(80);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(10);

    expect(child1.getComputedLayout().left).toBe(30);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(10);

    expect(child2.getComputedLayout().left).toBe(80);
    expect(child2.getComputedLayout().top).toBe(10);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(10);

    expect(child3.getComputedLayout().left).toBe(30);
    expect(child3.getComputedLayout().top).toBe(10);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(10);

    expect(child4.getComputedLayout().left).toBe(80);
    expect(child4.getComputedLayout().top).toBe(20);
    expect(child4.getComputedLayout().width).toBe(50);
    expect(child4.getComputedLayout().height).toBe(10);
  });

  test('align content flex start without height on children', () => {
    const root = Yoga.Node.create();
    root.setFlexWrap(Yoga.WRAP_WRAP);
    root.setWidth(100);
    root.setHeight(100);

    const child0 = Yoga.Node.create();
    child0.setWidth(50);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    child1.setHeight(10);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setWidth(50);
    root.insertChild(child2, 2);

    const child3 = Yoga.Node.create();
    child3.setWidth(50);
    child3.setHeight(10);
    root.insertChild(child3, 3);

    const child4 = Yoga.Node.create();
    child4.setWidth(50);
    root.insertChild(child4, 4);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(0);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(10);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(10);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(0);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(10);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(10);

    expect(child4.getComputedLayout().left).toBe(0);
    expect(child4.getComputedLayout().top).toBe(20);
    expect(child4.getComputedLayout().width).toBe(50);
    expect(child4.getComputedLayout().height).toBe(0);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(50);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(0);

    expect(child1.getComputedLayout().left).toBe(50);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(10);

    expect(child2.getComputedLayout().left).toBe(50);
    expect(child2.getComputedLayout().top).toBe(10);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(0);

    expect(child3.getComputedLayout().left).toBe(50);
    expect(child3.getComputedLayout().top).toBe(10);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(10);

    expect(child4.getComputedLayout().left).toBe(50);
    expect(child4.getComputedLayout().top).toBe(20);
    expect(child4.getComputedLayout().width).toBe(50);
    expect(child4.getComputedLayout().height).toBe(0);
  });

  test('align content flex start with flex', () => {
    const root = Yoga.Node.create();
    root.setFlexWrap(Yoga.WRAP_WRAP);
    root.setWidth(100);
    root.setHeight(120);

    const child0 = Yoga.Node.create();
    child0.setFlexGrow(1);
    child0.setFlexBasisPercent(0);
    child0.setWidth(50);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setFlexGrow(1);
    child1.setFlexBasisPercent(0);
    child1.setWidth(50);
    child1.setHeight(10);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setWidth(50);
    root.insertChild(child2, 2);

    const child3 = Yoga.Node.create();
    child3.setFlexGrow(1);
    child3.setFlexShrink(1);
    child3.setFlexBasisPercent(0);
    child3.setWidth(50);
    root.insertChild(child3, 3);

    const child4 = Yoga.Node.create();
    child4.setWidth(50);
    root.insertChild(child4, 4);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(120);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(40);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(40);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(40);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(80);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(0);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(80);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(40);

    expect(child4.getComputedLayout().left).toBe(0);
    expect(child4.getComputedLayout().top).toBe(120);
    expect(child4.getComputedLayout().width).toBe(50);
    expect(child4.getComputedLayout().height).toBe(0);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(120);

    expect(child0.getComputedLayout().left).toBe(50);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(40);

    expect(child1.getComputedLayout().left).toBe(50);
    expect(child1.getComputedLayout().top).toBe(40);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(40);

    expect(child2.getComputedLayout().left).toBe(50);
    expect(child2.getComputedLayout().top).toBe(80);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(0);

    expect(child3.getComputedLayout().left).toBe(50);
    expect(child3.getComputedLayout().top).toBe(80);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(40);

    expect(child4.getComputedLayout().left).toBe(50);
    expect(child4.getComputedLayout().top).toBe(120);
    expect(child4.getComputedLayout().width).toBe(50);
    expect(child4.getComputedLayout().height).toBe(0);
  });

  test('align content flex end', () => {
    const root = Yoga.Node.create();
    root.setAlignContent(Yoga.ALIGN_FLEX_END);
    root.setFlexWrap(Yoga.WRAP_WRAP);
    root.setWidth(100);
    root.setHeight(100);

    const child0 = Yoga.Node.create();
    child0.setWidth(50);
    child0.setHeight(10);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    child1.setHeight(10);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setWidth(50);
    child2.setHeight(10);
    root.insertChild(child2, 2);

    const child3 = Yoga.Node.create();
    child3.setWidth(50);
    child3.setHeight(10);
    root.insertChild(child3, 3);

    const child4 = Yoga.Node.create();
    child4.setWidth(50);
    child4.setHeight(10);
    root.insertChild(child4, 4);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(50);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(10);

    expect(child1.getComputedLayout().left).toBe(50);
    expect(child1.getComputedLayout().top).toBe(10);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(10);

    expect(child2.getComputedLayout().left).toBe(50);
    expect(child2.getComputedLayout().top).toBe(20);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(10);

    expect(child3.getComputedLayout().left).toBe(50);
    expect(child3.getComputedLayout().top).toBe(30);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(10);

    expect(child4.getComputedLayout().left).toBe(50);
    expect(child4.getComputedLayout().top).toBe(40);
    expect(child4.getComputedLayout().width).toBe(50);
    expect(child4.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(10);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(10);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(10);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(20);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(10);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(30);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(10);

    expect(child4.getComputedLayout().left).toBe(0);
    expect(child4.getComputedLayout().top).toBe(40);
    expect(child4.getComputedLayout().width).toBe(50);
    expect(child4.getComputedLayout().height).toBe(10);
  });

  test('align content stretch', () => {
    const root = Yoga.Node.create();
    root.setAlignContent(Yoga.ALIGN_STRETCH);
    root.setFlexWrap(Yoga.WRAP_WRAP);
    root.setWidth(150);
    root.setHeight(100);

    const child0 = Yoga.Node.create();
    child0.setWidth(50);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setWidth(50);
    root.insertChild(child2, 2);

    const child3 = Yoga.Node.create();
    child3.setWidth(50);
    root.insertChild(child3, 3);

    const child4 = Yoga.Node.create();
    child4.setWidth(50);
    root.insertChild(child4, 4);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(150);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(0);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(0);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(0);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(0);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(0);

    expect(child4.getComputedLayout().left).toBe(0);
    expect(child4.getComputedLayout().top).toBe(0);
    expect(child4.getComputedLayout().width).toBe(50);
    expect(child4.getComputedLayout().height).toBe(0);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(150);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(100);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(0);

    expect(child1.getComputedLayout().left).toBe(100);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(0);

    expect(child2.getComputedLayout().left).toBe(100);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(0);

    expect(child3.getComputedLayout().left).toBe(100);
    expect(child3.getComputedLayout().top).toBe(0);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(0);

    expect(child4.getComputedLayout().left).toBe(100);
    expect(child4.getComputedLayout().top).toBe(0);
    expect(child4.getComputedLayout().width).toBe(50);
    expect(child4.getComputedLayout().height).toBe(0);
  });

  test('align content spacebetween', () => {
    const root = Yoga.Node.create();

    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setAlignContent(Yoga.ALIGN_SPACE_BETWEEN);
    root.setFlexWrap(Yoga.WRAP_WRAP);
    root.setWidth(130);
    root.setHeight(100);

    const child0 = Yoga.Node.create();
    child0.setWidth(50);
    child0.setHeight(10);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    child1.setHeight(10);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setWidth(50);
    child2.setHeight(10);
    root.insertChild(child2, 2);

    const child3 = Yoga.Node.create();
    child3.setWidth(50);
    child3.setHeight(10);
    root.insertChild(child3, 3);

    const child4 = Yoga.Node.create();
    child4.setWidth(50);
    child4.setHeight(10);
    root.insertChild(child4, 4);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(130);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(10);

    expect(child1.getComputedLayout().left).toBe(50);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(10);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(45);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(10);

    expect(child3.getComputedLayout().left).toBe(50);
    expect(child3.getComputedLayout().top).toBe(45);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(10);

    expect(child4.getComputedLayout().left).toBe(0);
    expect(child4.getComputedLayout().top).toBe(90);
    expect(child4.getComputedLayout().width).toBe(50);
    expect(child4.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(130);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(80);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(10);

    expect(child1.getComputedLayout().left).toBe(30);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(10);

    expect(child2.getComputedLayout().left).toBe(80);
    expect(child2.getComputedLayout().top).toBe(45);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(10);

    expect(child3.getComputedLayout().left).toBe(30);
    expect(child3.getComputedLayout().top).toBe(45);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(10);

    expect(child4.getComputedLayout().left).toBe(80);
    expect(child4.getComputedLayout().top).toBe(90);
    expect(child4.getComputedLayout().width).toBe(50);
    expect(child4.getComputedLayout().height).toBe(10);
  });

  test('align content spacearound', () => {
    const root = Yoga.Node.create();

    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setAlignContent(Yoga.ALIGN_SPACE_AROUND);
    root.setFlexWrap(Yoga.WRAP_WRAP);
    root.setWidth(140);
    root.setHeight(120);

    const child0 = Yoga.Node.create();
    child0.setWidth(50);
    child0.setHeight(10);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    child1.setHeight(10);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setWidth(50);
    child2.setHeight(10);
    root.insertChild(child2, 2);

    const child3 = Yoga.Node.create();
    child3.setWidth(50);
    child3.setHeight(10);
    root.insertChild(child3, 3);

    const child4 = Yoga.Node.create();
    child4.setWidth(50);
    child4.setHeight(10);
    root.insertChild(child4, 4);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(140);
    expect(root.getComputedLayout().height).toBe(120);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(15);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(10);

    expect(child1.getComputedLayout().left).toBe(50);
    expect(child1.getComputedLayout().top).toBe(15);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(10);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(55);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(10);

    expect(child3.getComputedLayout().left).toBe(50);
    expect(child3.getComputedLayout().top).toBe(55);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(10);

    expect(child4.getComputedLayout().left).toBe(0);
    expect(child4.getComputedLayout().top).toBe(95);
    expect(child4.getComputedLayout().width).toBe(50);
    expect(child4.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(140);
    expect(root.getComputedLayout().height).toBe(120);

    expect(child0.getComputedLayout().left).toBe(90);
    expect(child0.getComputedLayout().top).toBe(15);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(10);

    expect(child1.getComputedLayout().left).toBe(40);
    expect(child1.getComputedLayout().top).toBe(15);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(10);

    expect(child2.getComputedLayout().left).toBe(90);
    expect(child2.getComputedLayout().top).toBe(55);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(10);

    expect(child3.getComputedLayout().left).toBe(40);
    expect(child3.getComputedLayout().top).toBe(55);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(10);

    expect(child4.getComputedLayout().left).toBe(90);
    expect(child4.getComputedLayout().top).toBe(95);
    expect(child4.getComputedLayout().width).toBe(50);
    expect(child4.getComputedLayout().height).toBe(10);
  });

  test('align content stretch row', () => {
    const root = Yoga.Node.create();

    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setAlignContent(Yoga.ALIGN_STRETCH);
    root.setFlexWrap(Yoga.WRAP_WRAP);
    root.setWidth(150);
    root.setHeight(100);

    const child0 = Yoga.Node.create();
    child0.setWidth(50);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setWidth(50);
    root.insertChild(child2, 2);

    const child3 = Yoga.Node.create();
    child3.setWidth(50);
    root.insertChild(child3, 3);

    const child4 = Yoga.Node.create();
    child4.setWidth(50);
    root.insertChild(child4, 4);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(150);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(50);

    expect(child1.getComputedLayout().left).toBe(50);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    expect(child2.getComputedLayout().left).toBe(100);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(50);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(50);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(50);

    expect(child4.getComputedLayout().left).toBe(50);
    expect(child4.getComputedLayout().top).toBe(50);
    expect(child4.getComputedLayout().width).toBe(50);
    expect(child4.getComputedLayout().height).toBe(50);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(150);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(100);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(50);

    expect(child1.getComputedLayout().left).toBe(50);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(50);

    expect(child3.getComputedLayout().left).toBe(100);
    expect(child3.getComputedLayout().top).toBe(50);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(50);

    expect(child4.getComputedLayout().left).toBe(50);
    expect(child4.getComputedLayout().top).toBe(50);
    expect(child4.getComputedLayout().width).toBe(50);
    expect(child4.getComputedLayout().height).toBe(50);
  });

  test('align content stretch row with children', () => {
    const root = Yoga.Node.create();

    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setAlignContent(Yoga.ALIGN_STRETCH);
    root.setFlexWrap(Yoga.WRAP_WRAP);
    root.setWidth(150);
    root.setHeight(100);

    const child0 = Yoga.Node.create();
    child0.setWidth(50);
    root.insertChild(child0, 0);

    const child00 = Yoga.Node.create();
    child00.setFlexGrow(1);
    child00.setFlexShrink(1);
    child00.setFlexBasisPercent(0);
    child0.insertChild(child00, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setWidth(50);
    root.insertChild(child2, 2);

    const child3 = Yoga.Node.create();
    child3.setWidth(50);
    root.insertChild(child3, 3);

    const child4 = Yoga.Node.create();
    child4.setWidth(50);
    root.insertChild(child4, 4);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(150);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(50);

    expect(child00.getComputedLayout().left).toBe(0);
    expect(child00.getComputedLayout().top).toBe(0);
    expect(child00.getComputedLayout().width).toBe(50);
    expect(child00.getComputedLayout().height).toBe(50);

    expect(child1.getComputedLayout().left).toBe(50);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    expect(child2.getComputedLayout().left).toBe(100);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(50);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(50);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(50);

    expect(child4.getComputedLayout().left).toBe(50);
    expect(child4.getComputedLayout().top).toBe(50);
    expect(child4.getComputedLayout().width).toBe(50);
    expect(child4.getComputedLayout().height).toBe(50);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(150);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(100);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(50);

    expect(child00.getComputedLayout().left).toBe(0);
    expect(child00.getComputedLayout().top).toBe(0);
    expect(child00.getComputedLayout().width).toBe(50);
    expect(child00.getComputedLayout().height).toBe(50);

    expect(child1.getComputedLayout().left).toBe(50);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(50);

    expect(child3.getComputedLayout().left).toBe(100);
    expect(child3.getComputedLayout().top).toBe(50);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(50);

    expect(child4.getComputedLayout().left).toBe(50);
    expect(child4.getComputedLayout().top).toBe(50);
    expect(child4.getComputedLayout().width).toBe(50);
    expect(child4.getComputedLayout().height).toBe(50);
  });

  test('align content stretch row with flex', () => {
    const root = Yoga.Node.create();

    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setAlignContent(Yoga.ALIGN_STRETCH);
    root.setFlexWrap(Yoga.WRAP_WRAP);
    root.setWidth(150);
    root.setHeight(100);

    const child0 = Yoga.Node.create();
    child0.setWidth(50);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setFlexGrow(1);
    child1.setFlexShrink(1);
    child1.setFlexBasisPercent(0);
    child1.setWidth(50);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setWidth(50);
    root.insertChild(child2, 2);

    const child3 = Yoga.Node.create();
    child3.setFlexGrow(1);
    child3.setFlexShrink(1);
    child3.setFlexBasisPercent(0);
    child3.setWidth(50);
    root.insertChild(child3, 3);

    const child4 = Yoga.Node.create();
    child4.setWidth(50);
    root.insertChild(child4, 4);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(150);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(50);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(0);
    expect(child1.getComputedLayout().height).toBe(100);

    expect(child2.getComputedLayout().left).toBe(50);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(100);

    expect(child3.getComputedLayout().left).toBe(100);
    expect(child3.getComputedLayout().top).toBe(0);
    expect(child3.getComputedLayout().width).toBe(0);
    expect(child3.getComputedLayout().height).toBe(100);

    expect(child4.getComputedLayout().left).toBe(100);
    expect(child4.getComputedLayout().top).toBe(0);
    expect(child4.getComputedLayout().width).toBe(50);
    expect(child4.getComputedLayout().height).toBe(100);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(150);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(100);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(100);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(0);
    expect(child1.getComputedLayout().height).toBe(100);

    expect(child2.getComputedLayout().left).toBe(50);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(100);

    expect(child3.getComputedLayout().left).toBe(50);
    expect(child3.getComputedLayout().top).toBe(0);
    expect(child3.getComputedLayout().width).toBe(0);
    expect(child3.getComputedLayout().height).toBe(100);

    expect(child4.getComputedLayout().left).toBe(0);
    expect(child4.getComputedLayout().top).toBe(0);
    expect(child4.getComputedLayout().width).toBe(50);
    expect(child4.getComputedLayout().height).toBe(100);
  });

  test('align content stretch row with flex no shrink', () => {
    const root = Yoga.Node.create();

    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setAlignContent(Yoga.ALIGN_STRETCH);
    root.setFlexWrap(Yoga.WRAP_WRAP);
    root.setWidth(150);
    root.setHeight(100);

    const child0 = Yoga.Node.create();
    child0.setWidth(50);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setFlexGrow(1);
    child1.setFlexShrink(1);
    child1.setFlexBasisPercent(0);
    child1.setWidth(50);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setWidth(50);
    root.insertChild(child2, 2);

    const child3 = Yoga.Node.create();
    child3.setFlexGrow(1);
    child3.setFlexBasisPercent(0);
    child3.setWidth(50);
    root.insertChild(child3, 3);

    const child4 = Yoga.Node.create();
    child4.setWidth(50);
    root.insertChild(child4, 4);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(150);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(50);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(0);
    expect(child1.getComputedLayout().height).toBe(100);

    expect(child2.getComputedLayout().left).toBe(50);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(100);

    expect(child3.getComputedLayout().left).toBe(100);
    expect(child3.getComputedLayout().top).toBe(0);
    expect(child3.getComputedLayout().width).toBe(0);
    expect(child3.getComputedLayout().height).toBe(100);

    expect(child4.getComputedLayout().left).toBe(100);
    expect(child4.getComputedLayout().top).toBe(0);
    expect(child4.getComputedLayout().width).toBe(50);
    expect(child4.getComputedLayout().height).toBe(100);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(150);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(100);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(100);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(0);
    expect(child1.getComputedLayout().height).toBe(100);

    expect(child2.getComputedLayout().left).toBe(50);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(100);

    expect(child3.getComputedLayout().left).toBe(50);
    expect(child3.getComputedLayout().top).toBe(0);
    expect(child3.getComputedLayout().width).toBe(0);
    expect(child3.getComputedLayout().height).toBe(100);

    expect(child4.getComputedLayout().left).toBe(0);
    expect(child4.getComputedLayout().top).toBe(0);
    expect(child4.getComputedLayout().width).toBe(50);
    expect(child4.getComputedLayout().height).toBe(100);
  });

  test('align content stretch row with margin', () => {
    const root = Yoga.Node.create();

    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setAlignContent(Yoga.ALIGN_STRETCH);
    root.setFlexWrap(Yoga.WRAP_WRAP);
    root.setWidth(150);
    root.setHeight(100);

    const child0 = Yoga.Node.create();
    child0.setWidth(50);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setMargin(Yoga.EDGE_LEFT, 10);
    child1.setMargin(Yoga.EDGE_TOP, 10);
    child1.setMargin(Yoga.EDGE_RIGHT, 10);
    child1.setMargin(Yoga.EDGE_BOTTOM, 10);
    child1.setWidth(50);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setWidth(50);
    root.insertChild(child2, 2);

    const child3 = Yoga.Node.create();
    child3.setMargin(Yoga.EDGE_LEFT, 10);
    child3.setMargin(Yoga.EDGE_TOP, 10);
    child3.setMargin(Yoga.EDGE_RIGHT, 10);
    child3.setMargin(Yoga.EDGE_BOTTOM, 10);
    child3.setWidth(50);
    root.insertChild(child3, 3);

    const child4 = Yoga.Node.create();
    child4.setWidth(50);
    root.insertChild(child4, 4);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(150);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(40);

    expect(child1.getComputedLayout().left).toBe(60);
    expect(child1.getComputedLayout().top).toBe(10);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(20);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(40);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(40);

    expect(child3.getComputedLayout().left).toBe(60);
    expect(child3.getComputedLayout().top).toBe(50);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(20);

    expect(child4.getComputedLayout().left).toBe(0);
    expect(child4.getComputedLayout().top).toBe(80);
    expect(child4.getComputedLayout().width).toBe(50);
    expect(child4.getComputedLayout().height).toBe(20);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(150);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(100);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(40);

    expect(child1.getComputedLayout().left).toBe(40);
    expect(child1.getComputedLayout().top).toBe(10);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(20);

    expect(child2.getComputedLayout().left).toBe(100);
    expect(child2.getComputedLayout().top).toBe(40);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(40);

    expect(child3.getComputedLayout().left).toBe(40);
    expect(child3.getComputedLayout().top).toBe(50);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(20);

    expect(child4.getComputedLayout().left).toBe(100);
    expect(child4.getComputedLayout().top).toBe(80);
    expect(child4.getComputedLayout().width).toBe(50);
    expect(child4.getComputedLayout().height).toBe(20);
  });

  test('align content stretch row with padding', () => {
    const root = Yoga.Node.create();

    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setAlignContent(Yoga.ALIGN_STRETCH);
    root.setFlexWrap(Yoga.WRAP_WRAP);
    root.setWidth(150);
    root.setHeight(100);

    const child0 = Yoga.Node.create();
    child0.setWidth(50);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setPadding(Yoga.EDGE_LEFT, 10);
    child1.setPadding(Yoga.EDGE_TOP, 10);
    child1.setPadding(Yoga.EDGE_RIGHT, 10);
    child1.setPadding(Yoga.EDGE_BOTTOM, 10);
    child1.setWidth(50);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setWidth(50);
    root.insertChild(child2, 2);

    const child3 = Yoga.Node.create();
    child3.setPadding(Yoga.EDGE_LEFT, 10);
    child3.setPadding(Yoga.EDGE_TOP, 10);
    child3.setPadding(Yoga.EDGE_RIGHT, 10);
    child3.setPadding(Yoga.EDGE_BOTTOM, 10);
    child3.setWidth(50);
    root.insertChild(child3, 3);

    const child4 = Yoga.Node.create();
    child4.setWidth(50);
    root.insertChild(child4, 4);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(150);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(50);

    expect(child1.getComputedLayout().left).toBe(50);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    expect(child2.getComputedLayout().left).toBe(100);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(50);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(50);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(50);

    expect(child4.getComputedLayout().left).toBe(50);
    expect(child4.getComputedLayout().top).toBe(50);
    expect(child4.getComputedLayout().width).toBe(50);
    expect(child4.getComputedLayout().height).toBe(50);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(150);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(100);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(50);

    expect(child1.getComputedLayout().left).toBe(50);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(50);

    expect(child3.getComputedLayout().left).toBe(100);
    expect(child3.getComputedLayout().top).toBe(50);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(50);

    expect(child4.getComputedLayout().left).toBe(50);
    expect(child4.getComputedLayout().top).toBe(50);
    expect(child4.getComputedLayout().width).toBe(50);
    expect(child4.getComputedLayout().height).toBe(50);
  });

  test('align content stretch row with single row', () => {
    const root = Yoga.Node.create();

    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setAlignContent(Yoga.ALIGN_STRETCH);
    root.setFlexWrap(Yoga.WRAP_WRAP);
    root.setWidth(150);
    root.setHeight(100);

    const child0 = Yoga.Node.create();
    child0.setWidth(50);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    root.insertChild(child1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(150);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(50);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(100);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(150);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(100);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(50);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(100);
  });

  test('align content stretch row with fixed height', () => {
    const root = Yoga.Node.create();

    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setAlignContent(Yoga.ALIGN_STRETCH);
    root.setFlexWrap(Yoga.WRAP_WRAP);
    root.setWidth(150);
    root.setHeight(100);

    const child0 = Yoga.Node.create();
    child0.setWidth(50);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    child1.setHeight(60);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setWidth(50);
    root.insertChild(child2, 2);

    const child3 = Yoga.Node.create();
    child3.setWidth(50);
    root.insertChild(child3, 3);

    const child4 = Yoga.Node.create();
    child4.setWidth(50);
    root.insertChild(child4, 4);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(150);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(80);

    expect(child1.getComputedLayout().left).toBe(50);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(60);

    expect(child2.getComputedLayout().left).toBe(100);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(80);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(80);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(20);

    expect(child4.getComputedLayout().left).toBe(50);
    expect(child4.getComputedLayout().top).toBe(80);
    expect(child4.getComputedLayout().width).toBe(50);
    expect(child4.getComputedLayout().height).toBe(20);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(150);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(100);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(80);

    expect(child1.getComputedLayout().left).toBe(50);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(60);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(80);

    expect(child3.getComputedLayout().left).toBe(100);
    expect(child3.getComputedLayout().top).toBe(80);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(20);

    expect(child4.getComputedLayout().left).toBe(50);
    expect(child4.getComputedLayout().top).toBe(80);
    expect(child4.getComputedLayout().width).toBe(50);
    expect(child4.getComputedLayout().height).toBe(20);
  });

  test('align content stretch row with max height', () => {
    const root = Yoga.Node.create();

    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setAlignContent(Yoga.ALIGN_STRETCH);
    root.setFlexWrap(Yoga.WRAP_WRAP);
    root.setWidth(150);
    root.setHeight(100);

    const child0 = Yoga.Node.create();
    child0.setWidth(50);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    child1.setMaxHeight(20);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setWidth(50);
    root.insertChild(child2, 2);

    const child3 = Yoga.Node.create();
    child3.setWidth(50);
    root.insertChild(child3, 3);

    const child4 = Yoga.Node.create();
    child4.setWidth(50);
    root.insertChild(child4, 4);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(150);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(50);

    expect(child1.getComputedLayout().left).toBe(50);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(20);

    expect(child2.getComputedLayout().left).toBe(100);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(50);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(50);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(50);

    expect(child4.getComputedLayout().left).toBe(50);
    expect(child4.getComputedLayout().top).toBe(50);
    expect(child4.getComputedLayout().width).toBe(50);
    expect(child4.getComputedLayout().height).toBe(50);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(150);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(100);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(50);

    expect(child1.getComputedLayout().left).toBe(50);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(20);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(50);

    expect(child3.getComputedLayout().left).toBe(100);
    expect(child3.getComputedLayout().top).toBe(50);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(50);

    expect(child4.getComputedLayout().left).toBe(50);
    expect(child4.getComputedLayout().top).toBe(50);
    expect(child4.getComputedLayout().width).toBe(50);
    expect(child4.getComputedLayout().height).toBe(50);
  });

  test('align content stretch row with min height', () => {
    const root = Yoga.Node.create();

    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setAlignContent(Yoga.ALIGN_STRETCH);
    root.setFlexWrap(Yoga.WRAP_WRAP);
    root.setWidth(150);
    root.setHeight(100);

    const child0 = Yoga.Node.create();
    child0.setWidth(50);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    child1.setMinHeight(80);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setWidth(50);
    root.insertChild(child2, 2);

    const child3 = Yoga.Node.create();
    child3.setWidth(50);
    root.insertChild(child3, 3);

    const child4 = Yoga.Node.create();
    child4.setWidth(50);
    root.insertChild(child4, 4);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(150);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(90);

    expect(child1.getComputedLayout().left).toBe(50);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(90);

    expect(child2.getComputedLayout().left).toBe(100);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(90);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(90);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(10);

    expect(child4.getComputedLayout().left).toBe(50);
    expect(child4.getComputedLayout().top).toBe(90);
    expect(child4.getComputedLayout().width).toBe(50);
    expect(child4.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(150);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(100);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(90);

    expect(child1.getComputedLayout().left).toBe(50);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(90);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(90);

    expect(child3.getComputedLayout().left).toBe(100);
    expect(child3.getComputedLayout().top).toBe(90);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(10);

    expect(child4.getComputedLayout().left).toBe(50);
    expect(child4.getComputedLayout().top).toBe(90);
    expect(child4.getComputedLayout().width).toBe(50);
    expect(child4.getComputedLayout().height).toBe(10);
  });

  test('align content stretch column', () => {
    const root = Yoga.Node.create();
    root.setAlignContent(Yoga.ALIGN_STRETCH);
    root.setFlexWrap(Yoga.WRAP_WRAP);
    root.setWidth(100);
    root.setHeight(150);

    const child0 = Yoga.Node.create();
    child0.setHeight(50);
    root.insertChild(child0, 0);

    const child00 = Yoga.Node.create();
    child00.setFlexGrow(1);
    child00.setFlexShrink(1);
    child00.setFlexBasisPercent(0);
    child0.insertChild(child00, 0);

    const child1 = Yoga.Node.create();
    child1.setFlexGrow(1);
    child1.setFlexShrink(1);
    child1.setFlexBasisPercent(0);
    child1.setHeight(50);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setHeight(50);
    root.insertChild(child2, 2);

    const child3 = Yoga.Node.create();
    child3.setHeight(50);
    root.insertChild(child3, 3);

    const child4 = Yoga.Node.create();
    child4.setHeight(50);
    root.insertChild(child4, 4);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(150);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(50);

    expect(child00.getComputedLayout().left).toBe(0);
    expect(child00.getComputedLayout().top).toBe(0);
    expect(child00.getComputedLayout().width).toBe(50);
    expect(child00.getComputedLayout().height).toBe(50);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(50);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(0);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(50);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(50);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(100);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(50);

    expect(child4.getComputedLayout().left).toBe(50);
    expect(child4.getComputedLayout().top).toBe(0);
    expect(child4.getComputedLayout().width).toBe(50);
    expect(child4.getComputedLayout().height).toBe(50);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(150);

    expect(child0.getComputedLayout().left).toBe(50);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(50);

    expect(child00.getComputedLayout().left).toBe(0);
    expect(child00.getComputedLayout().top).toBe(0);
    expect(child00.getComputedLayout().width).toBe(50);
    expect(child00.getComputedLayout().height).toBe(50);

    expect(child1.getComputedLayout().left).toBe(50);
    expect(child1.getComputedLayout().top).toBe(50);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(0);

    expect(child2.getComputedLayout().left).toBe(50);
    expect(child2.getComputedLayout().top).toBe(50);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(50);

    expect(child3.getComputedLayout().left).toBe(50);
    expect(child3.getComputedLayout().top).toBe(100);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(50);

    expect(child4.getComputedLayout().left).toBe(0);
    expect(child4.getComputedLayout().top).toBe(0);
    expect(child4.getComputedLayout().width).toBe(50);
    expect(child4.getComputedLayout().height).toBe(50);
  });

  test('align content stretch is not overriding align items', () => {
    const root = Yoga.Node.create();
    root.setAlignContent(Yoga.ALIGN_STRETCH);

    const child0 = Yoga.Node.create();
    child0.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    child0.setAlignContent(Yoga.ALIGN_STRETCH);
    child0.setAlignItems(Yoga.ALIGN_CENTER);
    child0.setWidth(100);
    child0.setHeight(100);
    root.insertChild(child0, 0);

    const child00 = Yoga.Node.create();
    child00.setAlignContent(Yoga.ALIGN_STRETCH);
    child00.setWidth(10);
    child00.setHeight(10);
    child0.insertChild(child00, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(100);
    expect(child0.getComputedLayout().height).toBe(100);

    expect(child00.getComputedLayout().left).toBe(0);
    expect(child00.getComputedLayout().top).toBe(45);
    expect(child00.getComputedLayout().width).toBe(10);
    expect(child00.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(100);
    expect(child0.getComputedLayout().height).toBe(100);

    expect(child00.getComputedLayout().left).toBe(90);
    expect(child00.getComputedLayout().top).toBe(45);
    expect(child00.getComputedLayout().width).toBe(10);
    expect(child00.getComputedLayout().height).toBe(10);
  });
});
