const Yoga = require('..');

describe('Align self', () => {
  test('align_self_center', () => {
    const root = Yoga.Node.create();

    root.setWidth(100);
    root.setHeight(100);

    const child = Yoga.Node.create();
    child.setAlignSelf(Yoga.ALIGN_CENTER);
    child.setWidth(10);
    child.setHeight(10);
    root.insertChild(child, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child.getComputedLayout().left).toBe(45);
    expect(child.getComputedLayout().top).toBe(0);
    expect(child.getComputedLayout().width).toBe(10);
    expect(child.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child.getComputedLayout().left).toBe(45);
    expect(child.getComputedLayout().top).toBe(0);
    expect(child.getComputedLayout().width).toBe(10);
    expect(child.getComputedLayout().height).toBe(10);
  });

  test('align_self_flex_end', () => {
    const root = Yoga.Node.create();

    root.setWidth(100);
    root.setHeight(100);

    const child = Yoga.Node.create();
    child.setAlignSelf(Yoga.ALIGN_FLEX_END);
    child.setWidth(10);
    child.setHeight(10);
    root.insertChild(child, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child.getComputedLayout().left).toBe(90);
    expect(child.getComputedLayout().top).toBe(0);
    expect(child.getComputedLayout().width).toBe(10);
    expect(child.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child.getComputedLayout().left).toBe(0);
    expect(child.getComputedLayout().top).toBe(0);
    expect(child.getComputedLayout().width).toBe(10);
    expect(child.getComputedLayout().height).toBe(10);
  });

  test('align_self_flex_start', () => {
    const root = Yoga.Node.create();

    root.setWidth(100);
    root.setHeight(100);

    const child = Yoga.Node.create();
    child.setAlignSelf(Yoga.ALIGN_FLEX_START);
    child.setWidth(10);
    child.setHeight(10);
    root.insertChild(child, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child.getComputedLayout().left).toBe(0);
    expect(child.getComputedLayout().top).toBe(0);
    expect(child.getComputedLayout().width).toBe(10);
    expect(child.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child.getComputedLayout().left).toBe(90);
    expect(child.getComputedLayout().top).toBe(0);
    expect(child.getComputedLayout().width).toBe(10);
    expect(child.getComputedLayout().height).toBe(10);
  });

  test('align_self_flex_end_override_flex_start', () => {
    const root = Yoga.Node.create();

    root.setAlignItems(Yoga.ALIGN_FLEX_START);
    root.setWidth(100);
    root.setHeight(100);

    const child = Yoga.Node.create();
    child.setAlignSelf(Yoga.ALIGN_FLEX_END);
    child.setWidth(10);
    child.setHeight(10);
    root.insertChild(child, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child.getComputedLayout().left).toBe(90);
    expect(child.getComputedLayout().top).toBe(0);
    expect(child.getComputedLayout().width).toBe(10);
    expect(child.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child.getComputedLayout().left).toBe(0);
    expect(child.getComputedLayout().top).toBe(0);
    expect(child.getComputedLayout().width).toBe(10);
    expect(child.getComputedLayout().height).toBe(10);
  });

  test('align_self_baseline', () => {
    const root = Yoga.Node.create();

    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setWidth(100);
    root.setHeight(100);

    const child = Yoga.Node.create();
    child.setAlignSelf(Yoga.ALIGN_BASELINE);
    child.setWidth(50);
    child.setHeight(50);
    root.insertChild(child, 0);

    const child2 = Yoga.Node.create();
    child2.setAlignSelf(Yoga.ALIGN_BASELINE);
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

    expect(child.getComputedLayout().left).toBe(0);
    expect(child.getComputedLayout().top).toBe(0);
    expect(child.getComputedLayout().width).toBe(50);
    expect(child.getComputedLayout().height).toBe(50);

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

    expect(child.getComputedLayout().left).toBe(50);
    expect(child.getComputedLayout().top).toBe(0);
    expect(child.getComputedLayout().width).toBe(50);
    expect(child.getComputedLayout().height).toBe(50);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(40);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(20);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(0);
    expect(child3.getComputedLayout().width).toBe(50);
    expect(child3.getComputedLayout().height).toBe(10);
  });
});
