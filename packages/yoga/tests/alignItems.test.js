const Yoga = require('..');

describe('Align items', () => {
  test('align items stretch', () => {
    const root = Yoga.Node.create();

    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setHeight(10);
    root.insertChild(child1, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(100);
    expect(child1.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(100);
    expect(child1.getComputedLayout().height).toBe(10);
  });

  test('align items center', () => {
    const root = Yoga.Node.create();

    root.setAlignItems(Yoga.ALIGN_CENTER);
    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setWidth(10);
    child1.setHeight(10);
    root.insertChild(child1, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(45);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(10);
    expect(child1.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(45);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(10);
    expect(child1.getComputedLayout().height).toBe(10);
  });

  test('align items flex start', () => {
    const root = Yoga.Node.create();

    root.setAlignItems(Yoga.ALIGN_FLEX_START);
    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setWidth(10);
    child1.setHeight(10);
    root.insertChild(child1, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(10);
    expect(child1.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(90);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(10);
    expect(child1.getComputedLayout().height).toBe(10);
  });

  test('align items flex end', () => {
    const root = Yoga.Node.create();

    root.setAlignItems(Yoga.ALIGN_FLEX_END);
    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setWidth(10);
    child1.setHeight(10);
    root.insertChild(child1, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(90);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(10);
    expect(child1.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(10);
    expect(child1.getComputedLayout().height).toBe(10);
  });

  test('align baseline', () => {
    const root = Yoga.Node.create();

    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setAlignItems(Yoga.ALIGN_BASELINE);
    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    child1.setHeight(50);
    root.insertChild(child1, 0);

    const child2 = Yoga.Node.create();
    child2.setWidth(50);
    child2.setHeight(20);
    root.insertChild(child2, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    expect(child2.getComputedLayout().left).toBe(50);
    expect(child2.getComputedLayout().top).toBe(30);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(20);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(50);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(30);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(20);
  });

  test('align baseline child', () => {
    const root = Yoga.Node.create();

    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setAlignItems(Yoga.ALIGN_BASELINE);
    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    child1.setHeight(50);
    root.insertChild(child1, 0);

    const child2 = Yoga.Node.create();
    child2.setWidth(50);
    child2.setHeight(20);
    root.insertChild(child2, 1);

    const child3 = Yoga.Node.create();
    child3.setWidth(50);
    child3.setHeight(10);
    child2.insertChild(child3, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    expect(child2.getComputedLayout().left).toBe(50);
    expect(child2.getComputedLayout().top).toBe(40);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(20);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(0);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(50);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(40);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(20);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(0);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(10);
  });

  test('align baseline child multiline', () => {
    const root = Yoga.Node.create();

    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setAlignItems(Yoga.ALIGN_BASELINE);
    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    child1.setHeight(60);
    root.insertChild(child1, 0);

    const child2 = Yoga.Node.create();
    child2.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    child2.setFlexWrap(Yoga.WRAP_WRAP);
    child2.setWidth(50);
    child2.setHeight(25);
    root.insertChild(child2, 1);

    const child3 = Yoga.Node.create();
    child3.setWidth(25);
    child3.setHeight(20);
    child2.insertChild(child3, 0);

    const child4 = Yoga.Node.create();
    child4.setWidth(25);
    child4.setHeight(10);
    child2.insertChild(child4, 1);

    const child5 = Yoga.Node.create();
    child5.setWidth(25);
    child5.setHeight(20);
    child2.insertChild(child5, 2);

    const child6 = Yoga.Node.create();
    child6.setWidth(25);
    child6.setHeight(10);
    child2.insertChild(child6, 3);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(60);

    expect(child2.getComputedLayout().left).toBe(50);
    expect(child2.getComputedLayout().top).toBe(40);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(25);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(0);
    expect(child3.getComputedLayout().width).toBe(25);
    expect(child3.getComputedLayout().height).toBe(20);

    expect(child4.getComputedLayout().left).toBe(25);
    expect(child4.getComputedLayout().top).toBe(0);
    expect(child4.getComputedLayout().width).toBe(25);
    expect(child4.getComputedLayout().height).toBe(10);

    expect(child5.getComputedLayout().left).toBe(0);
    expect(child5.getComputedLayout().top).toBe(20);
    expect(child5.getComputedLayout().width).toBe(25);
    expect(child5.getComputedLayout().height).toBe(20);

    expect(child6.getComputedLayout().left).toBe(25);
    expect(child6.getComputedLayout().top).toBe(20);
    expect(child6.getComputedLayout().width).toBe(25);
    expect(child6.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(50);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(60);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(40);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(25);

    expect(child3.getComputedLayout().left).toBe(25);
    expect(child3.getComputedLayout().top).toBe(0);
    expect(child3.getComputedLayout().width).toBe(25);
    expect(child3.getComputedLayout().height).toBe(20);

    expect(child4.getComputedLayout().left).toBe(0);
    expect(child4.getComputedLayout().top).toBe(0);
    expect(child4.getComputedLayout().width).toBe(25);
    expect(child4.getComputedLayout().height).toBe(10);

    expect(child5.getComputedLayout().left).toBe(25);
    expect(child5.getComputedLayout().top).toBe(20);
    expect(child5.getComputedLayout().width).toBe(25);
    expect(child5.getComputedLayout().height).toBe(20);

    expect(child6.getComputedLayout().left).toBe(0);
    expect(child6.getComputedLayout().top).toBe(20);
    expect(child6.getComputedLayout().width).toBe(25);
    expect(child6.getComputedLayout().height).toBe(10);
  });

  test('align baseline child multiline override', () => {
    const root = Yoga.Node.create();

    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setAlignItems(Yoga.ALIGN_BASELINE);
    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    child1.setHeight(60);
    root.insertChild(child1, 0);

    const child2 = Yoga.Node.create();
    child2.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    child2.setFlexWrap(Yoga.WRAP_WRAP);
    child2.setWidth(50);
    child2.setHeight(25);
    root.insertChild(child2, 1);

    const child3 = Yoga.Node.create();
    child3.setWidth(25);
    child3.setHeight(20);
    child2.insertChild(child3, 0);

    const child4 = Yoga.Node.create();
    child4.setAlignSelf(Yoga.ALIGN_BASELINE);
    child4.setWidth(25);
    child4.setHeight(10);
    child2.insertChild(child4, 1);

    const child5 = Yoga.Node.create();
    child5.setWidth(25);
    child5.setHeight(20);
    child2.insertChild(child5, 2);

    const child6 = Yoga.Node.create();
    child6.setAlignSelf(Yoga.ALIGN_BASELINE);
    child6.setWidth(25);
    child6.setHeight(10);
    child2.insertChild(child6, 3);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(60);

    expect(child2.getComputedLayout().left).toBe(50);
    expect(child2.getComputedLayout().top).toBe(50);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(25);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(0);
    expect(child3.getComputedLayout().width).toBe(25);
    expect(child3.getComputedLayout().height).toBe(20);

    expect(child4.getComputedLayout().left).toBe(25);
    expect(child4.getComputedLayout().top).toBe(0);
    expect(child4.getComputedLayout().width).toBe(25);
    expect(child4.getComputedLayout().height).toBe(10);

    expect(child5.getComputedLayout().left).toBe(0);
    expect(child5.getComputedLayout().top).toBe(20);
    expect(child5.getComputedLayout().width).toBe(25);
    expect(child5.getComputedLayout().height).toBe(20);

    expect(child6.getComputedLayout().left).toBe(25);
    expect(child6.getComputedLayout().top).toBe(20);
    expect(child6.getComputedLayout().width).toBe(25);
    expect(child6.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(50);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(60);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(50);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(25);

    expect(child3.getComputedLayout().left).toBe(25);
    expect(child3.getComputedLayout().top).toBe(0);
    expect(child3.getComputedLayout().width).toBe(25);
    expect(child3.getComputedLayout().height).toBe(20);

    expect(child4.getComputedLayout().left).toBe(0);
    expect(child4.getComputedLayout().top).toBe(0);
    expect(child4.getComputedLayout().width).toBe(25);
    expect(child4.getComputedLayout().height).toBe(10);

    expect(child5.getComputedLayout().left).toBe(25);
    expect(child5.getComputedLayout().top).toBe(20);
    expect(child5.getComputedLayout().width).toBe(25);
    expect(child5.getComputedLayout().height).toBe(20);

    expect(child6.getComputedLayout().left).toBe(0);
    expect(child6.getComputedLayout().top).toBe(20);
    expect(child6.getComputedLayout().width).toBe(25);
    expect(child6.getComputedLayout().height).toBe(10);
  });

  test('align baseline child multiline no override on secondline', () => {
    const root = Yoga.Node.create();

    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setAlignItems(Yoga.ALIGN_BASELINE);
    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    child1.setHeight(60);
    root.insertChild(child1, 0);

    const child2 = Yoga.Node.create();
    child2.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    child2.setFlexWrap(Yoga.WRAP_WRAP);
    child2.setWidth(50);
    child2.setHeight(25);
    root.insertChild(child2, 1);

    const child3 = Yoga.Node.create();
    child3.setWidth(25);
    child3.setHeight(20);
    child2.insertChild(child3, 0);

    const child4 = Yoga.Node.create();
    child4.setWidth(25);
    child4.setHeight(10);
    child2.insertChild(child4, 1);

    const child5 = Yoga.Node.create();
    child5.setWidth(25);
    child5.setHeight(20);
    child2.insertChild(child5, 2);

    const child6 = Yoga.Node.create();
    child6.setAlignSelf(Yoga.ALIGN_BASELINE);
    child6.setWidth(25);
    child6.setHeight(10);
    child2.insertChild(child6, 3);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(60);

    expect(child2.getComputedLayout().left).toBe(50);
    expect(child2.getComputedLayout().top).toBe(40);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(25);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(0);
    expect(child3.getComputedLayout().width).toBe(25);
    expect(child3.getComputedLayout().height).toBe(20);

    expect(child4.getComputedLayout().left).toBe(25);
    expect(child4.getComputedLayout().top).toBe(0);
    expect(child4.getComputedLayout().width).toBe(25);
    expect(child4.getComputedLayout().height).toBe(10);

    expect(child5.getComputedLayout().left).toBe(0);
    expect(child5.getComputedLayout().top).toBe(20);
    expect(child5.getComputedLayout().width).toBe(25);
    expect(child5.getComputedLayout().height).toBe(20);

    expect(child6.getComputedLayout().left).toBe(25);
    expect(child6.getComputedLayout().top).toBe(20);
    expect(child6.getComputedLayout().width).toBe(25);
    expect(child6.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(50);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(60);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(40);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(25);

    expect(child3.getComputedLayout().left).toBe(25);
    expect(child3.getComputedLayout().top).toBe(0);
    expect(child3.getComputedLayout().width).toBe(25);
    expect(child3.getComputedLayout().height).toBe(20);

    expect(child4.getComputedLayout().left).toBe(0);
    expect(child4.getComputedLayout().top).toBe(0);
    expect(child4.getComputedLayout().width).toBe(25);
    expect(child4.getComputedLayout().height).toBe(10);

    expect(child5.getComputedLayout().left).toBe(25);
    expect(child5.getComputedLayout().top).toBe(20);
    expect(child5.getComputedLayout().width).toBe(25);
    expect(child5.getComputedLayout().height).toBe(20);

    expect(child6.getComputedLayout().left).toBe(0);
    expect(child6.getComputedLayout().top).toBe(20);
    expect(child6.getComputedLayout().width).toBe(25);
    expect(child6.getComputedLayout().height).toBe(10);
  });

  test('align baseline child top', () => {
    const root = Yoga.Node.create();

    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setAlignItems(Yoga.ALIGN_BASELINE);
    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setPosition(Yoga.EDGE_TOP, 10);
    child1.setWidth(50);
    child1.setHeight(50);
    root.insertChild(child1, 0);

    const child2 = Yoga.Node.create();
    child2.setWidth(50);
    child2.setHeight(20);
    root.insertChild(child2, 1);

    const child3 = Yoga.Node.create();
    child3.setWidth(50);
    child3.setHeight(10);
    child2.insertChild(child3, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(10);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    expect(child2.getComputedLayout().left).toBe(50);
    expect(child2.getComputedLayout().top).toBe(40);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(20);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(0);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(50);
    expect(child1.getComputedLayout().top).toBe(10);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(40);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(20);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(0);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(10);
  });

  test('align baseline child top2', () => {
    const root = Yoga.Node.create();

    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setAlignItems(Yoga.ALIGN_BASELINE);
    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    child1.setHeight(50);
    root.insertChild(child1, 0);

    const child2 = Yoga.Node.create();
    child2.setPosition(Yoga.EDGE_TOP, 5);
    child2.setWidth(50);
    child2.setHeight(20);
    root.insertChild(child2, 1);

    const child3 = Yoga.Node.create();
    child3.setWidth(50);
    child3.setHeight(10);
    child2.insertChild(child3, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    expect(child2.getComputedLayout().left).toBe(50);
    expect(child2.getComputedLayout().top).toBe(45);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(20);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(0);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(50);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(45);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(20);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(0);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(10);
  });

  test('align baseline double nested child', () => {
    const root = Yoga.Node.create();

    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setAlignItems(Yoga.ALIGN_BASELINE);
    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    child1.setHeight(50);
    root.insertChild(child1, 0);

    const child2 = Yoga.Node.create();
    child2.setWidth(50);
    child2.setHeight(20);
    child1.insertChild(child2, 0);

    const child3 = Yoga.Node.create();
    child3.setWidth(50);
    child3.setHeight(20);
    root.insertChild(child3, 1);

    const child4 = Yoga.Node.create();
    child4.setWidth(50);
    child4.setHeight(15);
    child3.insertChild(child4, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(20);

    expect(child3.getComputedLayout().left).toBe(50);
    expect(child3.getComputedLayout().top).toBe(5);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(20);

    expect(child4.getComputedLayout().left).toBe(0);
    expect(child4.getComputedLayout().top).toBe(0);
    expect(child4.getComputedLayout().width).toBe(50);
    expect(child4.getComputedLayout().height).toBe(15);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(50);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(20);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(5);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(20);

    expect(child4.getComputedLayout().left).toBe(0);
    expect(child4.getComputedLayout().top).toBe(0);
    expect(child4.getComputedLayout().width).toBe(50);
    expect(child4.getComputedLayout().height).toBe(15);
  });

  test('align baseline column', () => {
    const root = Yoga.Node.create();

    root.setAlignItems(Yoga.ALIGN_BASELINE);
    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    child1.setHeight(50);
    root.insertChild(child1, 0);

    const child2 = Yoga.Node.create();
    child2.setWidth(50);
    child2.setHeight(20);
    root.insertChild(child2, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(50);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(20);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(50);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    expect(child2.getComputedLayout().left).toBe(50);
    expect(child2.getComputedLayout().top).toBe(50);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(20);
  });

  test('align_baseline_child_margin', () => {
    const root = Yoga.Node.create();

    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setAlignItems(Yoga.ALIGN_BASELINE);
    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setMargin(Yoga.EDGE_LEFT, 5);
    child1.setMargin(Yoga.EDGE_TOP, 5);
    child1.setMargin(Yoga.EDGE_RIGHT, 5);
    child1.setMargin(Yoga.EDGE_BOTTOM, 5);
    child1.setWidth(50);
    child1.setHeight(50);
    root.insertChild(child1, 0);

    const child2 = Yoga.Node.create();
    child2.setWidth(50);
    child2.setHeight(20);
    root.insertChild(child2, 1);

    const child3 = Yoga.Node.create();
    child3.setMargin(Yoga.EDGE_LEFT, 1);
    child3.setMargin(Yoga.EDGE_TOP, 1);
    child3.setMargin(Yoga.EDGE_RIGHT, 1);
    child3.setMargin(Yoga.EDGE_BOTTOM, 1);
    child3.setWidth(50);
    child3.setHeight(10);
    child2.insertChild(child3, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(5);
    expect(child1.getComputedLayout().top).toBe(5);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    expect(child2.getComputedLayout().left).toBe(60);
    expect(child2.getComputedLayout().top).toBe(44);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(20);

    expect(child3.getComputedLayout().left).toBe(1);
    expect(child3.getComputedLayout().top).toBe(1);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(45);
    expect(child1.getComputedLayout().top).toBe(5);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    expect(child2.getComputedLayout().left).toBe(-10);
    expect(child2.getComputedLayout().top).toBe(44);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(20);

    expect(child3.getComputedLayout().left).toBe(-1);
    expect(child3.getComputedLayout().top).toBe(1);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(10);
  });

  test('align baseline child padding', () => {
    const root = Yoga.Node.create();

    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setAlignItems(Yoga.ALIGN_BASELINE);
    root.setPadding(Yoga.EDGE_LEFT, 5);
    root.setPadding(Yoga.EDGE_TOP, 5);
    root.setPadding(Yoga.EDGE_RIGHT, 5);
    root.setPadding(Yoga.EDGE_BOTTOM, 5);
    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    child1.setHeight(50);
    root.insertChild(child1, 0);

    const child2 = Yoga.Node.create();
    child2.setPadding(Yoga.EDGE_LEFT, 5);
    child2.setPadding(Yoga.EDGE_TOP, 5);
    child2.setPadding(Yoga.EDGE_RIGHT, 5);
    child2.setPadding(Yoga.EDGE_BOTTOM, 5);
    child2.setWidth(50);
    child2.setHeight(20);
    root.insertChild(child2, 1);

    const child3 = Yoga.Node.create();
    child3.setWidth(50);
    child3.setHeight(10);
    child2.insertChild(child3, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(5);
    expect(child1.getComputedLayout().top).toBe(5);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    expect(child2.getComputedLayout().left).toBe(55);
    expect(child2.getComputedLayout().top).toBe(40);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(20);

    expect(child3.getComputedLayout().left).toBe(5);
    expect(child3.getComputedLayout().top).toBe(5);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(45);
    expect(child1.getComputedLayout().top).toBe(5);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    expect(child2.getComputedLayout().left).toBe(-5);
    expect(child2.getComputedLayout().top).toBe(40);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(20);

    expect(child3.getComputedLayout().left).toBe(-5);
    expect(child3.getComputedLayout().top).toBe(5);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(10);
  });

  test('align baseline multiline', () => {
    const root = Yoga.Node.create();

    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setAlignItems(Yoga.ALIGN_BASELINE);
    root.setFlexWrap(Yoga.WRAP_WRAP);
    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    child1.setHeight(50);
    root.insertChild(child1, 0);

    const child2 = Yoga.Node.create();
    child2.setWidth(50);
    child2.setHeight(20);
    root.insertChild(child2, 1);

    const child3 = Yoga.Node.create();
    child3.setWidth(50);
    child3.setHeight(10);
    child2.insertChild(child3, 0);

    const child4 = Yoga.Node.create();
    child4.setWidth(50);
    child4.setHeight(20);
    root.insertChild(child4, 2);

    const child5 = Yoga.Node.create();
    child5.setWidth(50);
    child5.setHeight(10);
    child4.insertChild(child5, 0);

    const child6 = Yoga.Node.create();
    child6.setWidth(50);
    child6.setHeight(50);
    root.insertChild(child6, 3);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    expect(child2.getComputedLayout().left).toBe(50);
    expect(child2.getComputedLayout().top).toBe(40);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(20);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(0);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(10);

    expect(child4.getComputedLayout().left).toBe(0);
    expect(child4.getComputedLayout().top).toBe(100);
    expect(child4.getComputedLayout().width).toBe(50);
    expect(child4.getComputedLayout().height).toBe(20);

    expect(child5.getComputedLayout().left).toBe(0);
    expect(child5.getComputedLayout().top).toBe(0);
    expect(child5.getComputedLayout().width).toBe(50);
    expect(child5.getComputedLayout().height).toBe(10);

    expect(child6.getComputedLayout().left).toBe(50);
    expect(child6.getComputedLayout().top).toBe(60);
    expect(child6.getComputedLayout().width).toBe(50);
    expect(child6.getComputedLayout().height).toBe(50);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(50);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(40);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(20);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(0);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(10);

    expect(child4.getComputedLayout().left).toBe(50);
    expect(child4.getComputedLayout().top).toBe(100);
    expect(child4.getComputedLayout().width).toBe(50);
    expect(child4.getComputedLayout().height).toBe(20);

    expect(child5.getComputedLayout().left).toBe(0);
    expect(child5.getComputedLayout().top).toBe(0);
    expect(child5.getComputedLayout().width).toBe(50);
    expect(child5.getComputedLayout().height).toBe(10);

    expect(child6.getComputedLayout().left).toBe(0);
    expect(child6.getComputedLayout().top).toBe(60);
    expect(child6.getComputedLayout().width).toBe(50);
    expect(child6.getComputedLayout().height).toBe(50);
  });

  test('align baseline multiline column', () => {
    const root = Yoga.Node.create();

    root.setAlignItems(Yoga.ALIGN_BASELINE);
    root.setFlexWrap(Yoga.WRAP_WRAP);
    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    child1.setHeight(50);
    root.insertChild(child1, 0);

    const child2 = Yoga.Node.create();
    child2.setWidth(30);
    child2.setHeight(50);
    root.insertChild(child2, 1);

    const child3 = Yoga.Node.create();
    child3.setWidth(20);
    child3.setHeight(20);
    child2.insertChild(child3, 0);

    const child4 = Yoga.Node.create();
    child4.setWidth(40);
    child4.setHeight(70);
    root.insertChild(child4, 2);

    const child5 = Yoga.Node.create();
    child5.setWidth(10);
    child5.setHeight(10);
    child4.insertChild(child5, 0);

    const child6 = Yoga.Node.create();
    child6.setWidth(50);
    child6.setHeight(20);
    root.insertChild(child6, 3);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(50);
    expect(child2.getComputedLayout().width).toBe(30);
    expect(child2.getComputedLayout().height).toBe(50);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(0);
    expect(child3.getComputedLayout().width).toBe(20);
    expect(child3.getComputedLayout().height).toBe(20);

    expect(child4.getComputedLayout().left).toBe(50);
    expect(child4.getComputedLayout().top).toBe(0);
    expect(child4.getComputedLayout().width).toBe(40);
    expect(child4.getComputedLayout().height).toBe(70);

    expect(child5.getComputedLayout().left).toBe(0);
    expect(child5.getComputedLayout().top).toBe(0);
    expect(child5.getComputedLayout().width).toBe(10);
    expect(child5.getComputedLayout().height).toBe(10);

    expect(child6.getComputedLayout().left).toBe(50);
    expect(child6.getComputedLayout().top).toBe(70);
    expect(child6.getComputedLayout().width).toBe(50);
    expect(child6.getComputedLayout().height).toBe(20);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(50);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    expect(child2.getComputedLayout().left).toBe(70);
    expect(child2.getComputedLayout().top).toBe(50);
    expect(child2.getComputedLayout().width).toBe(30);
    expect(child2.getComputedLayout().height).toBe(50);

    expect(child3.getComputedLayout().left).toBe(10);
    expect(child3.getComputedLayout().top).toBe(0);
    expect(child3.getComputedLayout().width).toBe(20);
    expect(child3.getComputedLayout().height).toBe(20);

    expect(child4.getComputedLayout().left).toBe(10);
    expect(child4.getComputedLayout().top).toBe(0);
    expect(child4.getComputedLayout().width).toBe(40);
    expect(child4.getComputedLayout().height).toBe(70);

    expect(child5.getComputedLayout().left).toBe(30);
    expect(child5.getComputedLayout().top).toBe(0);
    expect(child5.getComputedLayout().width).toBe(10);
    expect(child5.getComputedLayout().height).toBe(10);

    expect(child6.getComputedLayout().left).toBe(0);
    expect(child6.getComputedLayout().top).toBe(70);
    expect(child6.getComputedLayout().width).toBe(50);
    expect(child6.getComputedLayout().height).toBe(20);
  });

  test('align baseline multiline column2', () => {
    const root = Yoga.Node.create();

    root.setAlignItems(Yoga.ALIGN_BASELINE);
    root.setFlexWrap(Yoga.WRAP_WRAP);
    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    child1.setHeight(50);
    root.insertChild(child1, 0);

    const child2 = Yoga.Node.create();
    child2.setWidth(30);
    child2.setHeight(50);
    root.insertChild(child2, 1);

    const child3 = Yoga.Node.create();
    child3.setWidth(20);
    child3.setHeight(20);
    child2.insertChild(child3, 0);

    const child4 = Yoga.Node.create();
    child4.setWidth(40);
    child4.setHeight(70);
    root.insertChild(child4, 2);

    const child5 = Yoga.Node.create();
    child5.setWidth(10);
    child5.setHeight(10);
    child4.insertChild(child5, 0);

    const child6 = Yoga.Node.create();
    child6.setWidth(50);
    child6.setHeight(20);
    root.insertChild(child6, 3);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(50);
    expect(child2.getComputedLayout().width).toBe(30);
    expect(child2.getComputedLayout().height).toBe(50);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(0);
    expect(child3.getComputedLayout().width).toBe(20);
    expect(child3.getComputedLayout().height).toBe(20);

    expect(child4.getComputedLayout().left).toBe(50);
    expect(child4.getComputedLayout().top).toBe(0);
    expect(child4.getComputedLayout().width).toBe(40);
    expect(child4.getComputedLayout().height).toBe(70);

    expect(child5.getComputedLayout().left).toBe(0);
    expect(child5.getComputedLayout().top).toBe(0);
    expect(child5.getComputedLayout().width).toBe(10);
    expect(child5.getComputedLayout().height).toBe(10);

    expect(child6.getComputedLayout().left).toBe(50);
    expect(child6.getComputedLayout().top).toBe(70);
    expect(child6.getComputedLayout().width).toBe(50);
    expect(child6.getComputedLayout().height).toBe(20);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(50);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    expect(child2.getComputedLayout().left).toBe(70);
    expect(child2.getComputedLayout().top).toBe(50);
    expect(child2.getComputedLayout().width).toBe(30);
    expect(child2.getComputedLayout().height).toBe(50);

    expect(child3.getComputedLayout().left).toBe(10);
    expect(child3.getComputedLayout().top).toBe(0);
    expect(child3.getComputedLayout().width).toBe(20);
    expect(child3.getComputedLayout().height).toBe(20);

    expect(child4.getComputedLayout().left).toBe(10);
    expect(child4.getComputedLayout().top).toBe(0);
    expect(child4.getComputedLayout().width).toBe(40);
    expect(child4.getComputedLayout().height).toBe(70);

    expect(child5.getComputedLayout().left).toBe(30);
    expect(child5.getComputedLayout().top).toBe(0);
    expect(child5.getComputedLayout().width).toBe(10);
    expect(child5.getComputedLayout().height).toBe(10);

    expect(child6.getComputedLayout().left).toBe(0);
    expect(child6.getComputedLayout().top).toBe(70);
    expect(child6.getComputedLayout().width).toBe(50);
    expect(child6.getComputedLayout().height).toBe(20);
  });

  test('align baseline multiline row and column', () => {
    const root = Yoga.Node.create();

    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setAlignItems(Yoga.ALIGN_BASELINE);
    root.setFlexWrap(Yoga.WRAP_WRAP);
    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    child1.setHeight(50);
    root.insertChild(child1, 0);

    const child2 = Yoga.Node.create();
    child2.setWidth(50);
    child2.setHeight(50);
    root.insertChild(child2, 1);

    const child3 = Yoga.Node.create();
    child3.setWidth(50);
    child3.setHeight(10);
    child2.insertChild(child3, 0);

    const child4 = Yoga.Node.create();
    child4.setWidth(50);
    child4.setHeight(20);
    root.insertChild(child4, 2);

    const child5 = Yoga.Node.create();
    child5.setWidth(50);
    child5.setHeight(10);
    child4.insertChild(child5, 0);

    const child6 = Yoga.Node.create();
    child6.setWidth(50);
    child6.setHeight(20);
    root.insertChild(child6, 3);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    expect(child2.getComputedLayout().left).toBe(50);
    expect(child2.getComputedLayout().top).toBe(40);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(50);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(0);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(10);

    expect(child4.getComputedLayout().left).toBe(0);
    expect(child4.getComputedLayout().top).toBe(100);
    expect(child4.getComputedLayout().width).toBe(50);
    expect(child4.getComputedLayout().height).toBe(20);

    expect(child5.getComputedLayout().left).toBe(0);
    expect(child5.getComputedLayout().top).toBe(0);
    expect(child5.getComputedLayout().width).toBe(50);
    expect(child5.getComputedLayout().height).toBe(10);

    expect(child6.getComputedLayout().left).toBe(50);
    expect(child6.getComputedLayout().top).toBe(90);
    expect(child6.getComputedLayout().width).toBe(50);
    expect(child6.getComputedLayout().height).toBe(20);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(50);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(40);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(50);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(0);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(10);

    expect(child4.getComputedLayout().left).toBe(50);
    expect(child4.getComputedLayout().top).toBe(100);
    expect(child4.getComputedLayout().width).toBe(50);
    expect(child4.getComputedLayout().height).toBe(20);

    expect(child5.getComputedLayout().left).toBe(0);
    expect(child5.getComputedLayout().top).toBe(0);
    expect(child5.getComputedLayout().width).toBe(50);
    expect(child5.getComputedLayout().height).toBe(10);

    expect(child6.getComputedLayout().left).toBe(0);
    expect(child6.getComputedLayout().top).toBe(90);
    expect(child6.getComputedLayout().width).toBe(50);
    expect(child6.getComputedLayout().height).toBe(20);
  });

  test('align items center child with margin bigger than parent', () => {
    const root = Yoga.Node.create();

    root.setJustifyContent(Yoga.JUSTIFY_CENTER);
    root.setAlignItems(Yoga.ALIGN_CENTER);
    root.setWidth(52);
    root.setHeight(52);

    const child1 = Yoga.Node.create();
    child1.setAlignItems(Yoga.ALIGN_CENTER);
    root.insertChild(child1, 0);

    const child2 = Yoga.Node.create();
    child2.setMargin(Yoga.EDGE_LEFT, 10);
    child2.setMargin(Yoga.EDGE_RIGHT, 10);
    child2.setWidth(52);
    child2.setHeight(52);
    child1.insertChild(child2, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(52);
    expect(root.getComputedLayout().height).toBe(52);

    expect(child1.getComputedLayout().left).toBe(-10);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(72);
    expect(child1.getComputedLayout().height).toBe(52);

    expect(child2.getComputedLayout().left).toBe(10);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(52);
    expect(child2.getComputedLayout().height).toBe(52);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(52);
    expect(root.getComputedLayout().height).toBe(52);

    expect(child1.getComputedLayout().left).toBe(-10);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(72);
    expect(child1.getComputedLayout().height).toBe(52);

    expect(child2.getComputedLayout().left).toBe(10);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(52);
    expect(child2.getComputedLayout().height).toBe(52);
  });

  test('align items flex end child with margin bigger than parent', () => {
    const root = Yoga.Node.create();

    root.setJustifyContent(Yoga.JUSTIFY_CENTER);
    root.setAlignItems(Yoga.ALIGN_CENTER);
    root.setWidth(52);
    root.setHeight(52);

    const child1 = Yoga.Node.create();
    child1.setAlignItems(Yoga.ALIGN_FLEX_END);
    root.insertChild(child1, 0);

    const child2 = Yoga.Node.create();
    child2.setMargin(Yoga.EDGE_LEFT, 10);
    child2.setMargin(Yoga.EDGE_RIGHT, 10);
    child2.setWidth(52);
    child2.setHeight(52);
    child1.insertChild(child2, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(52);
    expect(root.getComputedLayout().height).toBe(52);

    expect(child1.getComputedLayout().left).toBe(-10);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(72);
    expect(child1.getComputedLayout().height).toBe(52);

    expect(child2.getComputedLayout().left).toBe(10);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(52);
    expect(child2.getComputedLayout().height).toBe(52);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(52);
    expect(root.getComputedLayout().height).toBe(52);

    expect(child1.getComputedLayout().left).toBe(-10);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(72);
    expect(child1.getComputedLayout().height).toBe(52);

    expect(child2.getComputedLayout().left).toBe(10);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(52);
    expect(child2.getComputedLayout().height).toBe(52);
  });

  test('align items center child without margin bigger than parent', () => {
    const root = Yoga.Node.create();

    root.setJustifyContent(Yoga.JUSTIFY_CENTER);
    root.setAlignItems(Yoga.ALIGN_CENTER);
    root.setWidth(52);
    root.setHeight(52);

    const child1 = Yoga.Node.create();
    child1.setAlignItems(Yoga.ALIGN_CENTER);
    root.insertChild(child1, 0);

    const child2 = Yoga.Node.create();
    child2.setWidth(72);
    child2.setHeight(72);
    child1.insertChild(child2, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(52);
    expect(root.getComputedLayout().height).toBe(52);

    expect(child1.getComputedLayout().left).toBe(-10);
    expect(child1.getComputedLayout().top).toBe(-10);
    expect(child1.getComputedLayout().width).toBe(72);
    expect(child1.getComputedLayout().height).toBe(72);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(72);
    expect(child2.getComputedLayout().height).toBe(72);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(52);
    expect(root.getComputedLayout().height).toBe(52);

    expect(child1.getComputedLayout().left).toBe(-10);
    expect(child1.getComputedLayout().top).toBe(-10);
    expect(child1.getComputedLayout().width).toBe(72);
    expect(child1.getComputedLayout().height).toBe(72);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(72);
    expect(child2.getComputedLayout().height).toBe(72);
  });

  test('align items flex end child without margin bigger than parent', () => {
    const root = Yoga.Node.create();

    root.setJustifyContent(Yoga.JUSTIFY_CENTER);
    root.setAlignItems(Yoga.ALIGN_CENTER);
    root.setWidth(52);
    root.setHeight(52);

    const child1 = Yoga.Node.create();
    child1.setAlignItems(Yoga.ALIGN_FLEX_END);
    root.insertChild(child1, 0);

    const child2 = Yoga.Node.create();
    child2.setWidth(72);
    child2.setHeight(72);
    child1.insertChild(child2, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(52);
    expect(root.getComputedLayout().height).toBe(52);

    expect(child1.getComputedLayout().left).toBe(-10);
    expect(child1.getComputedLayout().top).toBe(-10);
    expect(child1.getComputedLayout().width).toBe(72);
    expect(child1.getComputedLayout().height).toBe(72);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(72);
    expect(child2.getComputedLayout().height).toBe(72);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(52);
    expect(root.getComputedLayout().height).toBe(52);

    expect(child1.getComputedLayout().left).toBe(-10);
    expect(child1.getComputedLayout().top).toBe(-10);
    expect(child1.getComputedLayout().width).toBe(72);
    expect(child1.getComputedLayout().height).toBe(72);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(72);
    expect(child2.getComputedLayout().height).toBe(72);
  });

  test('align center should size based on content', () => {
    const root = Yoga.Node.create();

    root.setAlignItems(Yoga.ALIGN_CENTER);
    root.setMargin(Yoga.EDGE_TOP, 20);
    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setJustifyContent(Yoga.JUSTIFY_CENTER);
    child1.setFlexShrink(1);
    root.insertChild(child1, 0);

    const child2 = Yoga.Node.create();
    child2.setFlexGrow(1);
    child2.setFlexShrink(1);
    child1.insertChild(child2, 0);

    const child3 = Yoga.Node.create();
    child3.setWidth(20);
    child3.setHeight(20);
    child2.insertChild(child3, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(20);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(40);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(20);
    expect(child1.getComputedLayout().height).toBe(20);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(20);
    expect(child2.getComputedLayout().height).toBe(20);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(0);
    expect(child3.getComputedLayout().width).toBe(20);
    expect(child3.getComputedLayout().height).toBe(20);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(20);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(40);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(20);
    expect(child1.getComputedLayout().height).toBe(20);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(20);
    expect(child2.getComputedLayout().height).toBe(20);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(0);
    expect(child3.getComputedLayout().width).toBe(20);
    expect(child3.getComputedLayout().height).toBe(20);
  });

  test('align strech should size based on parent', () => {
    const root = Yoga.Node.create();

    root.setMargin(Yoga.EDGE_TOP, 20);
    root.setWidth(100);
    root.setHeight(100);

    const child1 = Yoga.Node.create();
    child1.setJustifyContent(Yoga.JUSTIFY_CENTER);
    child1.setFlexShrink(1);
    root.insertChild(child1, 0);

    const child2 = Yoga.Node.create();
    child2.setFlexGrow(1);
    child2.setFlexShrink(1);
    child1.insertChild(child2, 0);

    const child3 = Yoga.Node.create();
    child3.setWidth(20);
    child3.setHeight(20);
    child2.insertChild(child3, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(20);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(100);
    expect(child1.getComputedLayout().height).toBe(20);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(100);
    expect(child2.getComputedLayout().height).toBe(20);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(0);
    expect(child3.getComputedLayout().width).toBe(20);
    expect(child3.getComputedLayout().height).toBe(20);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(20);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(100);
    expect(child1.getComputedLayout().height).toBe(20);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(100);
    expect(child2.getComputedLayout().height).toBe(20);

    expect(child3.getComputedLayout().left).toBe(80);
    expect(child3.getComputedLayout().top).toBe(0);
    expect(child3.getComputedLayout().width).toBe(20);
    expect(child3.getComputedLayout().height).toBe(20);
  });

  test('align flex start with shrinking children', () => {
    const root = Yoga.Node.create();

    root.setWidth(500);
    root.setHeight(500);

    const child1 = Yoga.Node.create();
    child1.setAlignItems(Yoga.ALIGN_FLEX_START);
    root.insertChild(child1, 0);

    const child2 = Yoga.Node.create();
    child2.setFlexGrow(1);
    child2.setFlexShrink(1);
    child1.insertChild(child2, 0);

    const child3 = Yoga.Node.create();
    child3.setFlexGrow(1);
    child3.setFlexShrink(1);
    child2.insertChild(child3, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(500);
    expect(root.getComputedLayout().height).toBe(500);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(500);
    expect(child1.getComputedLayout().height).toBe(0);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(0);
    expect(child2.getComputedLayout().height).toBe(0);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(0);
    expect(child3.getComputedLayout().width).toBe(0);
    expect(child3.getComputedLayout().height).toBe(0);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(500);
    expect(root.getComputedLayout().height).toBe(500);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(500);
    expect(child1.getComputedLayout().height).toBe(0);

    expect(child2.getComputedLayout().left).toBe(500);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(0);
    expect(child2.getComputedLayout().height).toBe(0);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(0);
    expect(child3.getComputedLayout().width).toBe(0);
    expect(child3.getComputedLayout().height).toBe(0);
  });

  test('align flex start with stretching children', () => {
    const root = Yoga.Node.create();

    root.setWidth(500);
    root.setHeight(500);

    const child1 = Yoga.Node.create();
    root.insertChild(child1, 0);

    const child2 = Yoga.Node.create();
    child2.setFlexGrow(1);
    child2.setFlexShrink(1);
    child1.insertChild(child2, 0);

    const child3 = Yoga.Node.create();
    child3.setFlexGrow(1);
    child3.setFlexShrink(1);
    child2.insertChild(child3, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(500);
    expect(root.getComputedLayout().height).toBe(500);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(500);
    expect(child1.getComputedLayout().height).toBe(0);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(500);
    expect(child2.getComputedLayout().height).toBe(0);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(0);
    expect(child3.getComputedLayout().width).toBe(500);
    expect(child3.getComputedLayout().height).toBe(0);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(500);
    expect(root.getComputedLayout().height).toBe(500);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(500);
    expect(child1.getComputedLayout().height).toBe(0);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(500);
    expect(child2.getComputedLayout().height).toBe(0);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(0);
    expect(child3.getComputedLayout().width).toBe(500);
    expect(child3.getComputedLayout().height).toBe(0);
  });

  test('align flex start with shrinking children with stretch', () => {
    const root = Yoga.Node.create();

    root.setWidth(500);
    root.setHeight(500);

    const child1 = Yoga.Node.create();
    child1.setAlignItems(Yoga.ALIGN_FLEX_START);
    root.insertChild(child1, 0);

    const child2 = Yoga.Node.create();
    child2.setFlexGrow(1);
    child2.setFlexShrink(1);
    child1.insertChild(child2, 0);

    const child3 = Yoga.Node.create();
    child3.setFlexGrow(1);
    child3.setFlexShrink(1);
    child2.insertChild(child3, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(500);
    expect(root.getComputedLayout().height).toBe(500);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(500);
    expect(child1.getComputedLayout().height).toBe(0);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(0);
    expect(child2.getComputedLayout().height).toBe(0);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(0);
    expect(child3.getComputedLayout().width).toBe(0);
    expect(child3.getComputedLayout().height).toBe(0);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(500);
    expect(root.getComputedLayout().height).toBe(500);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(500);
    expect(child1.getComputedLayout().height).toBe(0);

    expect(child2.getComputedLayout().left).toBe(500);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(0);
    expect(child2.getComputedLayout().height).toBe(0);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(0);
    expect(child3.getComputedLayout().width).toBe(0);
    expect(child3.getComputedLayout().height).toBe(0);
  });
});
