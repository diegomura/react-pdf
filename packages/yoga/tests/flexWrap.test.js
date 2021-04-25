const Yoga = require('../src/dist/entry-browser');

describe('Flex wrap', () => {
  test('wrap_column', () => {
    const root = Yoga.Node.create();
    root.setFlexWrap(Yoga.WRAP_WRAP);
    root.setHeight(100);

    const child0 = Yoga.Node.create();
    child0.setWidth(30);
    child0.setHeight(30);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(30);
    child1.setHeight(30);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setWidth(30);
    child2.setHeight(30);
    root.insertChild(child2, 2);

    const child3 = Yoga.Node.create();
    child3.setWidth(30);
    child3.setHeight(30);
    root.insertChild(child3, 3);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(60);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(30);
    expect(child0.getComputedLayout().height).toBe(30);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(30);
    expect(child1.getComputedLayout().width).toBe(30);
    expect(child1.getComputedLayout().height).toBe(30);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(60);
    expect(child2.getComputedLayout().width).toBe(30);
    expect(child2.getComputedLayout().height).toBe(30);

    expect(child3.getComputedLayout().left).toBe(30);
    expect(child3.getComputedLayout().top).toBe(0);
    expect(child3.getComputedLayout().width).toBe(30);
    expect(child3.getComputedLayout().height).toBe(30);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(60);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(30);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(30);
    expect(child0.getComputedLayout().height).toBe(30);

    expect(child1.getComputedLayout().left).toBe(30);
    expect(child1.getComputedLayout().top).toBe(30);
    expect(child1.getComputedLayout().width).toBe(30);
    expect(child1.getComputedLayout().height).toBe(30);

    expect(child2.getComputedLayout().left).toBe(30);
    expect(child2.getComputedLayout().top).toBe(60);
    expect(child2.getComputedLayout().width).toBe(30);
    expect(child2.getComputedLayout().height).toBe(30);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(0);
    expect(child3.getComputedLayout().width).toBe(30);
    expect(child3.getComputedLayout().height).toBe(30);
  });

  test('wrap_row', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setFlexWrap(Yoga.WRAP_WRAP);
    root.setWidth(100);

    const child0 = Yoga.Node.create();
    child0.setWidth(30);
    child0.setHeight(30);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(30);
    child1.setHeight(30);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setWidth(30);
    child2.setHeight(30);
    root.insertChild(child2, 2);

    const child3 = Yoga.Node.create();
    child3.setWidth(30);
    child3.setHeight(30);
    root.insertChild(child3, 3);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(60);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(30);
    expect(child0.getComputedLayout().height).toBe(30);

    expect(child1.getComputedLayout().left).toBe(30);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(30);
    expect(child1.getComputedLayout().height).toBe(30);

    expect(child2.getComputedLayout().left).toBe(60);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(30);
    expect(child2.getComputedLayout().height).toBe(30);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(30);
    expect(child3.getComputedLayout().width).toBe(30);
    expect(child3.getComputedLayout().height).toBe(30);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(60);

    expect(child0.getComputedLayout().left).toBe(70);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(30);
    expect(child0.getComputedLayout().height).toBe(30);

    expect(child1.getComputedLayout().left).toBe(40);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(30);
    expect(child1.getComputedLayout().height).toBe(30);

    expect(child2.getComputedLayout().left).toBe(10);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(30);
    expect(child2.getComputedLayout().height).toBe(30);

    expect(child3.getComputedLayout().left).toBe(70);
    expect(child3.getComputedLayout().top).toBe(30);
    expect(child3.getComputedLayout().width).toBe(30);
    expect(child3.getComputedLayout().height).toBe(30);
  });

  test('wrap_row_align_items_flex_end', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setAlignItems(Yoga.ALIGN_FLEX_END);
    root.setFlexWrap(Yoga.WRAP_WRAP);
    root.setWidth(100);

    const child0 = Yoga.Node.create();
    child0.setWidth(30);
    child0.setHeight(10);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(30);
    child1.setHeight(20);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setWidth(30);
    child2.setHeight(30);
    root.insertChild(child2, 2);

    const child3 = Yoga.Node.create();
    child3.setWidth(30);
    child3.setHeight(30);
    root.insertChild(child3, 3);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(60);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(20);
    expect(child0.getComputedLayout().width).toBe(30);
    expect(child0.getComputedLayout().height).toBe(10);

    expect(child1.getComputedLayout().left).toBe(30);
    expect(child1.getComputedLayout().top).toBe(10);
    expect(child1.getComputedLayout().width).toBe(30);
    expect(child1.getComputedLayout().height).toBe(20);

    expect(child2.getComputedLayout().left).toBe(60);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(30);
    expect(child2.getComputedLayout().height).toBe(30);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(30);
    expect(child3.getComputedLayout().width).toBe(30);
    expect(child3.getComputedLayout().height).toBe(30);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(60);

    expect(child0.getComputedLayout().left).toBe(70);
    expect(child0.getComputedLayout().top).toBe(20);
    expect(child0.getComputedLayout().width).toBe(30);
    expect(child0.getComputedLayout().height).toBe(10);

    expect(child1.getComputedLayout().left).toBe(40);
    expect(child1.getComputedLayout().top).toBe(10);
    expect(child1.getComputedLayout().width).toBe(30);
    expect(child1.getComputedLayout().height).toBe(20);

    expect(child2.getComputedLayout().left).toBe(10);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(30);
    expect(child2.getComputedLayout().height).toBe(30);

    expect(child3.getComputedLayout().left).toBe(70);
    expect(child3.getComputedLayout().top).toBe(30);
    expect(child3.getComputedLayout().width).toBe(30);
    expect(child3.getComputedLayout().height).toBe(30);
  });

  test('wrap_row_align_items_center', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setAlignItems(Yoga.ALIGN_CENTER);
    root.setFlexWrap(Yoga.WRAP_WRAP);
    root.setWidth(100);

    const child0 = Yoga.Node.create();
    child0.setWidth(30);
    child0.setHeight(10);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(30);
    child1.setHeight(20);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setWidth(30);
    child2.setHeight(30);
    root.insertChild(child2, 2);

    const child3 = Yoga.Node.create();
    child3.setWidth(30);
    child3.setHeight(30);
    root.insertChild(child3, 3);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(60);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(10);
    expect(child0.getComputedLayout().width).toBe(30);
    expect(child0.getComputedLayout().height).toBe(10);

    expect(child1.getComputedLayout().left).toBe(30);
    expect(child1.getComputedLayout().top).toBe(5);
    expect(child1.getComputedLayout().width).toBe(30);
    expect(child1.getComputedLayout().height).toBe(20);

    expect(child2.getComputedLayout().left).toBe(60);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(30);
    expect(child2.getComputedLayout().height).toBe(30);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(30);
    expect(child3.getComputedLayout().width).toBe(30);
    expect(child3.getComputedLayout().height).toBe(30);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(60);

    expect(child0.getComputedLayout().left).toBe(70);
    expect(child0.getComputedLayout().top).toBe(10);
    expect(child0.getComputedLayout().width).toBe(30);
    expect(child0.getComputedLayout().height).toBe(10);

    expect(child1.getComputedLayout().left).toBe(40);
    expect(child1.getComputedLayout().top).toBe(5);
    expect(child1.getComputedLayout().width).toBe(30);
    expect(child1.getComputedLayout().height).toBe(20);

    expect(child2.getComputedLayout().left).toBe(10);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(30);
    expect(child2.getComputedLayout().height).toBe(30);

    expect(child3.getComputedLayout().left).toBe(70);
    expect(child3.getComputedLayout().top).toBe(30);
    expect(child3.getComputedLayout().width).toBe(30);
    expect(child3.getComputedLayout().height).toBe(30);
  });

  test('flex_wrap_children_with_min_main_overriding_flex_basis', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setFlexWrap(Yoga.WRAP_WRAP);
    root.setWidth(100);

    const child0 = Yoga.Node.create();
    child0.setFlexBasis(50);
    child0.setMinWidth(55);
    child0.setHeight(50);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setFlexBasis(50);
    child1.setMinWidth(55);
    child1.setHeight(50);
    root.insertChild(child1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(55);
    expect(child0.getComputedLayout().height).toBe(50);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(50);
    expect(child1.getComputedLayout().width).toBe(55);
    expect(child1.getComputedLayout().height).toBe(50);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(45);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(55);
    expect(child0.getComputedLayout().height).toBe(50);

    expect(child1.getComputedLayout().left).toBe(45);
    expect(child1.getComputedLayout().top).toBe(50);
    expect(child1.getComputedLayout().width).toBe(55);
    expect(child1.getComputedLayout().height).toBe(50);
  });

  test('flex_wrap_wrap_to_child_height', () => {
    const root = Yoga.Node.create();

    const child0 = Yoga.Node.create();
    child0.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    child0.setAlignItems(Yoga.ALIGN_FLEX_START);
    child0.setFlexWrap(Yoga.WRAP_WRAP);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(100);
    child0.insertChild(child1, 0);

    const child2 = Yoga.Node.create();
    child2.setWidth(100);
    child2.setHeight(100);
    child1.insertChild(child2, 0);

    const child3 = Yoga.Node.create();
    child3.setWidth(100);
    child3.setHeight(100);
    root.insertChild(child3, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(200);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(100);
    expect(child0.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(100);
    expect(child1.getComputedLayout().height).toBe(100);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(100);
    expect(child2.getComputedLayout().height).toBe(100);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(100);
    expect(child3.getComputedLayout().width).toBe(100);
    expect(child3.getComputedLayout().height).toBe(100);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(200);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(100);
    expect(child0.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(100);
    expect(child1.getComputedLayout().height).toBe(100);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(100);
    expect(child2.getComputedLayout().height).toBe(100);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(100);
    expect(child3.getComputedLayout().width).toBe(100);
    expect(child3.getComputedLayout().height).toBe(100);
  });

  test('flex_wrap_align_stretch_fits_one_row', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
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

  test('wrap_reverse_row_align_content_flex_start', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setFlexWrap(Yoga.WRAP_WRAP_REVERSE);
    root.setWidth(100);

    const child0 = Yoga.Node.create();
    child0.setWidth(30);
    child0.setHeight(10);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(30);
    child1.setHeight(20);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setWidth(30);
    child2.setHeight(30);
    root.insertChild(child2, 2);

    const child3 = Yoga.Node.create();
    child3.setWidth(30);
    child3.setHeight(40);
    root.insertChild(child3, 3);

    const child4 = Yoga.Node.create();
    child4.setWidth(30);
    child4.setHeight(50);
    root.insertChild(child4, 4);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(80);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(70);
    expect(child0.getComputedLayout().width).toBe(30);
    expect(child0.getComputedLayout().height).toBe(10);

    expect(child1.getComputedLayout().left).toBe(30);
    expect(child1.getComputedLayout().top).toBe(60);
    expect(child1.getComputedLayout().width).toBe(30);
    expect(child1.getComputedLayout().height).toBe(20);

    expect(child2.getComputedLayout().left).toBe(60);
    expect(child2.getComputedLayout().top).toBe(50);
    expect(child2.getComputedLayout().width).toBe(30);
    expect(child2.getComputedLayout().height).toBe(30);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(10);
    expect(child3.getComputedLayout().width).toBe(30);
    expect(child3.getComputedLayout().height).toBe(40);

    expect(child4.getComputedLayout().left).toBe(30);
    expect(child4.getComputedLayout().top).toBe(0);
    expect(child4.getComputedLayout().width).toBe(30);
    expect(child4.getComputedLayout().height).toBe(50);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(80);

    expect(child0.getComputedLayout().left).toBe(70);
    expect(child0.getComputedLayout().top).toBe(70);
    expect(child0.getComputedLayout().width).toBe(30);
    expect(child0.getComputedLayout().height).toBe(10);

    expect(child1.getComputedLayout().left).toBe(40);
    expect(child1.getComputedLayout().top).toBe(60);
    expect(child1.getComputedLayout().width).toBe(30);
    expect(child1.getComputedLayout().height).toBe(20);

    expect(child2.getComputedLayout().left).toBe(10);
    expect(child2.getComputedLayout().top).toBe(50);
    expect(child2.getComputedLayout().width).toBe(30);
    expect(child2.getComputedLayout().height).toBe(30);

    expect(child3.getComputedLayout().left).toBe(70);
    expect(child3.getComputedLayout().top).toBe(10);
    expect(child3.getComputedLayout().width).toBe(30);
    expect(child3.getComputedLayout().height).toBe(40);

    expect(child4.getComputedLayout().left).toBe(40);
    expect(child4.getComputedLayout().top).toBe(0);
    expect(child4.getComputedLayout().width).toBe(30);
    expect(child4.getComputedLayout().height).toBe(50);
  });

  test('wrap_reverse_row_align_content_center', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setAlignContent(Yoga.ALIGN_CENTER);
    root.setFlexWrap(Yoga.WRAP_WRAP_REVERSE);
    root.setWidth(100);

    const child0 = Yoga.Node.create();
    child0.setWidth(30);
    child0.setHeight(10);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(30);
    child1.setHeight(20);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setWidth(30);
    child2.setHeight(30);
    root.insertChild(child2, 2);

    const child3 = Yoga.Node.create();
    child3.setWidth(30);
    child3.setHeight(40);
    root.insertChild(child3, 3);

    const child4 = Yoga.Node.create();
    child4.setWidth(30);
    child4.setHeight(50);
    root.insertChild(child4, 4);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(80);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(70);
    expect(child0.getComputedLayout().width).toBe(30);
    expect(child0.getComputedLayout().height).toBe(10);

    expect(child1.getComputedLayout().left).toBe(30);
    expect(child1.getComputedLayout().top).toBe(60);
    expect(child1.getComputedLayout().width).toBe(30);
    expect(child1.getComputedLayout().height).toBe(20);

    expect(child2.getComputedLayout().left).toBe(60);
    expect(child2.getComputedLayout().top).toBe(50);
    expect(child2.getComputedLayout().width).toBe(30);
    expect(child2.getComputedLayout().height).toBe(30);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(10);
    expect(child3.getComputedLayout().width).toBe(30);
    expect(child3.getComputedLayout().height).toBe(40);

    expect(child4.getComputedLayout().left).toBe(30);
    expect(child4.getComputedLayout().top).toBe(0);
    expect(child4.getComputedLayout().width).toBe(30);
    expect(child4.getComputedLayout().height).toBe(50);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(80);

    expect(child0.getComputedLayout().left).toBe(70);
    expect(child0.getComputedLayout().top).toBe(70);
    expect(child0.getComputedLayout().width).toBe(30);
    expect(child0.getComputedLayout().height).toBe(10);

    expect(child1.getComputedLayout().left).toBe(40);
    expect(child1.getComputedLayout().top).toBe(60);
    expect(child1.getComputedLayout().width).toBe(30);
    expect(child1.getComputedLayout().height).toBe(20);

    expect(child2.getComputedLayout().left).toBe(10);
    expect(child2.getComputedLayout().top).toBe(50);
    expect(child2.getComputedLayout().width).toBe(30);
    expect(child2.getComputedLayout().height).toBe(30);

    expect(child3.getComputedLayout().left).toBe(70);
    expect(child3.getComputedLayout().top).toBe(10);
    expect(child3.getComputedLayout().width).toBe(30);
    expect(child3.getComputedLayout().height).toBe(40);

    expect(child4.getComputedLayout().left).toBe(40);
    expect(child4.getComputedLayout().top).toBe(0);
    expect(child4.getComputedLayout().width).toBe(30);
    expect(child4.getComputedLayout().height).toBe(50);
  });

  test('wrap_reverse_row_single_line_different_size', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setFlexWrap(Yoga.WRAP_WRAP_REVERSE);
    root.setWidth(300);

    const child0 = Yoga.Node.create();
    child0.setWidth(30);
    child0.setHeight(10);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(30);
    child1.setHeight(20);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setWidth(30);
    child2.setHeight(30);
    root.insertChild(child2, 2);

    const child3 = Yoga.Node.create();
    child3.setWidth(30);
    child3.setHeight(40);
    root.insertChild(child3, 3);

    const child4 = Yoga.Node.create();
    child4.setWidth(30);
    child4.setHeight(50);
    root.insertChild(child4, 4);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(300);
    expect(root.getComputedLayout().height).toBe(50);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(40);
    expect(child0.getComputedLayout().width).toBe(30);
    expect(child0.getComputedLayout().height).toBe(10);

    expect(child1.getComputedLayout().left).toBe(30);
    expect(child1.getComputedLayout().top).toBe(30);
    expect(child1.getComputedLayout().width).toBe(30);
    expect(child1.getComputedLayout().height).toBe(20);

    expect(child2.getComputedLayout().left).toBe(60);
    expect(child2.getComputedLayout().top).toBe(20);
    expect(child2.getComputedLayout().width).toBe(30);
    expect(child2.getComputedLayout().height).toBe(30);

    expect(child3.getComputedLayout().left).toBe(90);
    expect(child3.getComputedLayout().top).toBe(10);
    expect(child3.getComputedLayout().width).toBe(30);
    expect(child3.getComputedLayout().height).toBe(40);

    expect(child4.getComputedLayout().left).toBe(120);
    expect(child4.getComputedLayout().top).toBe(0);
    expect(child4.getComputedLayout().width).toBe(30);
    expect(child4.getComputedLayout().height).toBe(50);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(300);
    expect(root.getComputedLayout().height).toBe(50);

    expect(child0.getComputedLayout().left).toBe(270);
    expect(child0.getComputedLayout().top).toBe(40);
    expect(child0.getComputedLayout().width).toBe(30);
    expect(child0.getComputedLayout().height).toBe(10);

    expect(child1.getComputedLayout().left).toBe(240);
    expect(child1.getComputedLayout().top).toBe(30);
    expect(child1.getComputedLayout().width).toBe(30);
    expect(child1.getComputedLayout().height).toBe(20);

    expect(child2.getComputedLayout().left).toBe(210);
    expect(child2.getComputedLayout().top).toBe(20);
    expect(child2.getComputedLayout().width).toBe(30);
    expect(child2.getComputedLayout().height).toBe(30);

    expect(child3.getComputedLayout().left).toBe(180);
    expect(child3.getComputedLayout().top).toBe(10);
    expect(child3.getComputedLayout().width).toBe(30);
    expect(child3.getComputedLayout().height).toBe(40);

    expect(child4.getComputedLayout().left).toBe(150);
    expect(child4.getComputedLayout().top).toBe(0);
    expect(child4.getComputedLayout().width).toBe(30);
    expect(child4.getComputedLayout().height).toBe(50);
  });

  test('wrap_reverse_row_align_content_stretch', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setAlignContent(Yoga.ALIGN_STRETCH);
    root.setFlexWrap(Yoga.WRAP_WRAP_REVERSE);
    root.setWidth(100);

    const child0 = Yoga.Node.create();
    child0.setWidth(30);
    child0.setHeight(10);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(30);
    child1.setHeight(20);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setWidth(30);
    child2.setHeight(30);
    root.insertChild(child2, 2);

    const child3 = Yoga.Node.create();
    child3.setWidth(30);
    child3.setHeight(40);
    root.insertChild(child3, 3);

    const child4 = Yoga.Node.create();
    child4.setWidth(30);
    child4.setHeight(50);
    root.insertChild(child4, 4);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(80);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(70);
    expect(child0.getComputedLayout().width).toBe(30);
    expect(child0.getComputedLayout().height).toBe(10);

    expect(child1.getComputedLayout().left).toBe(30);
    expect(child1.getComputedLayout().top).toBe(60);
    expect(child1.getComputedLayout().width).toBe(30);
    expect(child1.getComputedLayout().height).toBe(20);

    expect(child2.getComputedLayout().left).toBe(60);
    expect(child2.getComputedLayout().top).toBe(50);
    expect(child2.getComputedLayout().width).toBe(30);
    expect(child2.getComputedLayout().height).toBe(30);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(10);
    expect(child3.getComputedLayout().width).toBe(30);
    expect(child3.getComputedLayout().height).toBe(40);

    expect(child4.getComputedLayout().left).toBe(30);
    expect(child4.getComputedLayout().top).toBe(0);
    expect(child4.getComputedLayout().width).toBe(30);
    expect(child4.getComputedLayout().height).toBe(50);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(80);

    expect(child0.getComputedLayout().left).toBe(70);
    expect(child0.getComputedLayout().top).toBe(70);
    expect(child0.getComputedLayout().width).toBe(30);
    expect(child0.getComputedLayout().height).toBe(10);

    expect(child1.getComputedLayout().left).toBe(40);
    expect(child1.getComputedLayout().top).toBe(60);
    expect(child1.getComputedLayout().width).toBe(30);
    expect(child1.getComputedLayout().height).toBe(20);

    expect(child2.getComputedLayout().left).toBe(10);
    expect(child2.getComputedLayout().top).toBe(50);
    expect(child2.getComputedLayout().width).toBe(30);
    expect(child2.getComputedLayout().height).toBe(30);

    expect(child3.getComputedLayout().left).toBe(70);
    expect(child3.getComputedLayout().top).toBe(10);
    expect(child3.getComputedLayout().width).toBe(30);
    expect(child3.getComputedLayout().height).toBe(40);

    expect(child4.getComputedLayout().left).toBe(40);
    expect(child4.getComputedLayout().top).toBe(0);
    expect(child4.getComputedLayout().width).toBe(30);
    expect(child4.getComputedLayout().height).toBe(50);
  });

  test('wrap_reverse_row_align_content_space_around', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setAlignContent(Yoga.ALIGN_SPACE_AROUND);
    root.setFlexWrap(Yoga.WRAP_WRAP_REVERSE);
    root.setWidth(100);

    const child0 = Yoga.Node.create();
    child0.setWidth(30);
    child0.setHeight(10);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(30);
    child1.setHeight(20);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setWidth(30);
    child2.setHeight(30);
    root.insertChild(child2, 2);

    const child3 = Yoga.Node.create();
    child3.setWidth(30);
    child3.setHeight(40);
    root.insertChild(child3, 3);

    const child4 = Yoga.Node.create();
    child4.setWidth(30);
    child4.setHeight(50);
    root.insertChild(child4, 4);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(80);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(70);
    expect(child0.getComputedLayout().width).toBe(30);
    expect(child0.getComputedLayout().height).toBe(10);

    expect(child1.getComputedLayout().left).toBe(30);
    expect(child1.getComputedLayout().top).toBe(60);
    expect(child1.getComputedLayout().width).toBe(30);
    expect(child1.getComputedLayout().height).toBe(20);

    expect(child2.getComputedLayout().left).toBe(60);
    expect(child2.getComputedLayout().top).toBe(50);
    expect(child2.getComputedLayout().width).toBe(30);
    expect(child2.getComputedLayout().height).toBe(30);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(10);
    expect(child3.getComputedLayout().width).toBe(30);
    expect(child3.getComputedLayout().height).toBe(40);

    expect(child4.getComputedLayout().left).toBe(30);
    expect(child4.getComputedLayout().top).toBe(0);
    expect(child4.getComputedLayout().width).toBe(30);
    expect(child4.getComputedLayout().height).toBe(50);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(80);

    expect(child0.getComputedLayout().left).toBe(70);
    expect(child0.getComputedLayout().top).toBe(70);
    expect(child0.getComputedLayout().width).toBe(30);
    expect(child0.getComputedLayout().height).toBe(10);

    expect(child1.getComputedLayout().left).toBe(40);
    expect(child1.getComputedLayout().top).toBe(60);
    expect(child1.getComputedLayout().width).toBe(30);
    expect(child1.getComputedLayout().height).toBe(20);

    expect(child2.getComputedLayout().left).toBe(10);
    expect(child2.getComputedLayout().top).toBe(50);
    expect(child2.getComputedLayout().width).toBe(30);
    expect(child2.getComputedLayout().height).toBe(30);

    expect(child3.getComputedLayout().left).toBe(70);
    expect(child3.getComputedLayout().top).toBe(10);
    expect(child3.getComputedLayout().width).toBe(30);
    expect(child3.getComputedLayout().height).toBe(40);

    expect(child4.getComputedLayout().left).toBe(40);
    expect(child4.getComputedLayout().top).toBe(0);
    expect(child4.getComputedLayout().width).toBe(30);
    expect(child4.getComputedLayout().height).toBe(50);
  });

  test('wrap_reverse_column_fixed_size', () => {
    const root = Yoga.Node.create();
    root.setAlignItems(Yoga.ALIGN_CENTER);
    root.setFlexWrap(Yoga.WRAP_WRAP_REVERSE);
    root.setWidth(200);
    root.setHeight(100);

    const child0 = Yoga.Node.create();
    child0.setWidth(30);
    child0.setHeight(10);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(30);
    child1.setHeight(20);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setWidth(30);
    child2.setHeight(30);
    root.insertChild(child2, 2);

    const child3 = Yoga.Node.create();
    child3.setWidth(30);
    child3.setHeight(40);
    root.insertChild(child3, 3);

    const child4 = Yoga.Node.create();
    child4.setWidth(30);
    child4.setHeight(50);
    root.insertChild(child4, 4);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(170);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(30);
    expect(child0.getComputedLayout().height).toBe(10);

    expect(child1.getComputedLayout().left).toBe(170);
    expect(child1.getComputedLayout().top).toBe(10);
    expect(child1.getComputedLayout().width).toBe(30);
    expect(child1.getComputedLayout().height).toBe(20);

    expect(child2.getComputedLayout().left).toBe(170);
    expect(child2.getComputedLayout().top).toBe(30);
    expect(child2.getComputedLayout().width).toBe(30);
    expect(child2.getComputedLayout().height).toBe(30);

    expect(child3.getComputedLayout().left).toBe(170);
    expect(child3.getComputedLayout().top).toBe(60);
    expect(child3.getComputedLayout().width).toBe(30);
    expect(child3.getComputedLayout().height).toBe(40);

    expect(child4.getComputedLayout().left).toBe(140);
    expect(child4.getComputedLayout().top).toBe(0);
    expect(child4.getComputedLayout().width).toBe(30);
    expect(child4.getComputedLayout().height).toBe(50);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(30);
    expect(child0.getComputedLayout().height).toBe(10);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(10);
    expect(child1.getComputedLayout().width).toBe(30);
    expect(child1.getComputedLayout().height).toBe(20);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(30);
    expect(child2.getComputedLayout().width).toBe(30);
    expect(child2.getComputedLayout().height).toBe(30);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(60);
    expect(child3.getComputedLayout().width).toBe(30);
    expect(child3.getComputedLayout().height).toBe(40);

    expect(child4.getComputedLayout().left).toBe(30);
    expect(child4.getComputedLayout().top).toBe(0);
    expect(child4.getComputedLayout().width).toBe(30);
    expect(child4.getComputedLayout().height).toBe(50);
  });

  test('wrapped_row_within_align_items_center', () => {
    const root = Yoga.Node.create();
    root.setAlignItems(Yoga.ALIGN_CENTER);
    root.setWidth(200);
    root.setHeight(200);

    const child0 = Yoga.Node.create();
    child0.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    child0.setFlexWrap(Yoga.WRAP_WRAP);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(150);
    child1.setHeight(80);
    child0.insertChild(child1, 0);

    const child2 = Yoga.Node.create();
    child2.setWidth(80);
    child2.setHeight(80);
    child0.insertChild(child2, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(200);
    expect(child0.getComputedLayout().height).toBe(160);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(150);
    expect(child1.getComputedLayout().height).toBe(80);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(80);
    expect(child2.getComputedLayout().width).toBe(80);
    expect(child2.getComputedLayout().height).toBe(80);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(200);
    expect(child0.getComputedLayout().height).toBe(160);

    expect(child1.getComputedLayout().left).toBe(50);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(150);
    expect(child1.getComputedLayout().height).toBe(80);

    expect(child2.getComputedLayout().left).toBe(120);
    expect(child2.getComputedLayout().top).toBe(80);
    expect(child2.getComputedLayout().width).toBe(80);
    expect(child2.getComputedLayout().height).toBe(80);
  });

  test('wrapped_row_within_align_items_flex_start', () => {
    const root = Yoga.Node.create();
    root.setAlignItems(Yoga.ALIGN_FLEX_START);
    root.setWidth(200);
    root.setHeight(200);

    const child0 = Yoga.Node.create();
    child0.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    child0.setFlexWrap(Yoga.WRAP_WRAP);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(150);
    child1.setHeight(80);
    child0.insertChild(child1, 0);

    const child2 = Yoga.Node.create();
    child2.setWidth(80);
    child2.setHeight(80);
    child0.insertChild(child2, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(200);
    expect(child0.getComputedLayout().height).toBe(160);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(150);
    expect(child1.getComputedLayout().height).toBe(80);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(80);
    expect(child2.getComputedLayout().width).toBe(80);
    expect(child2.getComputedLayout().height).toBe(80);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(200);
    expect(child0.getComputedLayout().height).toBe(160);

    expect(child1.getComputedLayout().left).toBe(50);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(150);
    expect(child1.getComputedLayout().height).toBe(80);

    expect(child2.getComputedLayout().left).toBe(120);
    expect(child2.getComputedLayout().top).toBe(80);
    expect(child2.getComputedLayout().width).toBe(80);
    expect(child2.getComputedLayout().height).toBe(80);
  });

  test('wrapped_row_within_align_items_flex_end', () => {
    const root = Yoga.Node.create();
    root.setAlignItems(Yoga.ALIGN_FLEX_END);
    root.setWidth(200);
    root.setHeight(200);

    const child0 = Yoga.Node.create();
    child0.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    child0.setFlexWrap(Yoga.WRAP_WRAP);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(150);
    child1.setHeight(80);
    child0.insertChild(child1, 0);

    const child2 = Yoga.Node.create();
    child2.setWidth(80);
    child2.setHeight(80);
    child0.insertChild(child2, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(200);
    expect(child0.getComputedLayout().height).toBe(160);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(150);
    expect(child1.getComputedLayout().height).toBe(80);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(80);
    expect(child2.getComputedLayout().width).toBe(80);
    expect(child2.getComputedLayout().height).toBe(80);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(200);
    expect(child0.getComputedLayout().height).toBe(160);

    expect(child1.getComputedLayout().left).toBe(50);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(150);
    expect(child1.getComputedLayout().height).toBe(80);

    expect(child2.getComputedLayout().left).toBe(120);
    expect(child2.getComputedLayout().top).toBe(80);
    expect(child2.getComputedLayout().width).toBe(80);
    expect(child2.getComputedLayout().height).toBe(80);
  });

  test('wrapped_column_max_height', () => {
    const root = Yoga.Node.create();
    root.setJustifyContent(Yoga.JUSTIFY_CENTER);
    root.setAlignContent(Yoga.ALIGN_CENTER);
    root.setAlignItems(Yoga.ALIGN_CENTER);
    root.setFlexWrap(Yoga.WRAP_WRAP);
    root.setWidth(700);
    root.setHeight(500);

    const child0 = Yoga.Node.create();
    child0.setWidth(100);
    child0.setHeight(500);
    child0.setMaxHeight(200);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setMargin(Yoga.EDGE_LEFT, 20);
    child1.setMargin(Yoga.EDGE_TOP, 20);
    child1.setMargin(Yoga.EDGE_RIGHT, 20);
    child1.setMargin(Yoga.EDGE_BOTTOM, 20);
    child1.setWidth(200);
    child1.setHeight(200);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setWidth(100);
    child2.setHeight(100);
    root.insertChild(child2, 2);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(700);
    expect(root.getComputedLayout().height).toBe(500);

    expect(child0.getComputedLayout().left).toBe(250);
    expect(child0.getComputedLayout().top).toBe(30);
    expect(child0.getComputedLayout().width).toBe(100);
    expect(child0.getComputedLayout().height).toBe(200);

    expect(child1.getComputedLayout().left).toBe(200);
    expect(child1.getComputedLayout().top).toBe(250);
    expect(child1.getComputedLayout().width).toBe(200);
    expect(child1.getComputedLayout().height).toBe(200);

    expect(child2.getComputedLayout().left).toBe(420);
    expect(child2.getComputedLayout().top).toBe(200);
    expect(child2.getComputedLayout().width).toBe(100);
    expect(child2.getComputedLayout().height).toBe(100);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(700);
    expect(root.getComputedLayout().height).toBe(500);

    expect(child0.getComputedLayout().left).toBe(350);
    expect(child0.getComputedLayout().top).toBe(30);
    expect(child0.getComputedLayout().width).toBe(100);
    expect(child0.getComputedLayout().height).toBe(200);

    expect(child1.getComputedLayout().left).toBe(300);
    expect(child1.getComputedLayout().top).toBe(250);
    expect(child1.getComputedLayout().width).toBe(200);
    expect(child1.getComputedLayout().height).toBe(200);

    expect(child2.getComputedLayout().left).toBe(180);
    expect(child2.getComputedLayout().top).toBe(200);
    expect(child2.getComputedLayout().width).toBe(100);
    expect(child2.getComputedLayout().height).toBe(100);
  });

  test('wrapped_column_max_height_flex', () => {
    const root = Yoga.Node.create();
    root.setJustifyContent(Yoga.JUSTIFY_CENTER);
    root.setAlignContent(Yoga.ALIGN_CENTER);
    root.setAlignItems(Yoga.ALIGN_CENTER);
    root.setFlexWrap(Yoga.WRAP_WRAP);
    root.setWidth(700);
    root.setHeight(500);

    const child0 = Yoga.Node.create();
    child0.setFlexGrow(1);
    child0.setFlexShrink(1);
    child0.setFlexBasisPercent(0);
    child0.setWidth(100);
    child0.setHeight(500);
    child0.setMaxHeight(200);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setFlexGrow(1);
    child1.setFlexShrink(1);
    child1.setFlexBasisPercent(0);
    child1.setMargin(Yoga.EDGE_LEFT, 20);
    child1.setMargin(Yoga.EDGE_TOP, 20);
    child1.setMargin(Yoga.EDGE_RIGHT, 20);
    child1.setMargin(Yoga.EDGE_BOTTOM, 20);
    child1.setWidth(200);
    child1.setHeight(200);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setWidth(100);
    child2.setHeight(100);
    root.insertChild(child2, 2);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(700);
    expect(root.getComputedLayout().height).toBe(500);

    expect(child0.getComputedLayout().left).toBe(300);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(100);
    expect(child0.getComputedLayout().height).toBe(180);

    expect(child1.getComputedLayout().left).toBe(250);
    expect(child1.getComputedLayout().top).toBe(200);
    expect(child1.getComputedLayout().width).toBe(200);
    expect(child1.getComputedLayout().height).toBe(180);

    expect(child2.getComputedLayout().left).toBe(300);
    expect(child2.getComputedLayout().top).toBe(400);
    expect(child2.getComputedLayout().width).toBe(100);
    expect(child2.getComputedLayout().height).toBe(100);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(700);
    expect(root.getComputedLayout().height).toBe(500);

    expect(child0.getComputedLayout().left).toBe(300);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(100);
    expect(child0.getComputedLayout().height).toBe(180);

    expect(child1.getComputedLayout().left).toBe(250);
    expect(child1.getComputedLayout().top).toBe(200);
    expect(child1.getComputedLayout().width).toBe(200);
    expect(child1.getComputedLayout().height).toBe(180);

    expect(child2.getComputedLayout().left).toBe(300);
    expect(child2.getComputedLayout().top).toBe(400);
    expect(child2.getComputedLayout().width).toBe(100);
    expect(child2.getComputedLayout().height).toBe(100);
  });

  test('wrap_nodes_with_content_sizing_overflowing_margin', () => {
    const root = Yoga.Node.create();
    root.setWidth(500);
    root.setHeight(500);

    const child0 = Yoga.Node.create();
    child0.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    child0.setFlexWrap(Yoga.WRAP_WRAP);
    child0.setWidth(85);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child0.insertChild(child1, 0);

    const child2 = Yoga.Node.create();
    child2.setWidth(40);
    child2.setHeight(40);
    child1.insertChild(child2, 0);

    const child3 = Yoga.Node.create();
    child3.setMargin(Yoga.EDGE_RIGHT, 10);
    child0.insertChild(child3, 1);

    const child4 = Yoga.Node.create();
    child4.setWidth(40);
    child4.setHeight(40);
    child3.insertChild(child4, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(500);
    expect(root.getComputedLayout().height).toBe(500);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(85);
    expect(child0.getComputedLayout().height).toBe(80);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(40);
    expect(child1.getComputedLayout().height).toBe(40);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(40);
    expect(child2.getComputedLayout().height).toBe(40);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(40);
    expect(child3.getComputedLayout().width).toBe(40);
    expect(child3.getComputedLayout().height).toBe(40);

    expect(child4.getComputedLayout().left).toBe(0);
    expect(child4.getComputedLayout().top).toBe(0);
    expect(child4.getComputedLayout().width).toBe(40);
    expect(child4.getComputedLayout().height).toBe(40);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(500);
    expect(root.getComputedLayout().height).toBe(500);

    expect(child0.getComputedLayout().left).toBe(415);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(85);
    expect(child0.getComputedLayout().height).toBe(80);

    expect(child1.getComputedLayout().left).toBe(45);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(40);
    expect(child1.getComputedLayout().height).toBe(40);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(40);
    expect(child2.getComputedLayout().height).toBe(40);

    expect(child3.getComputedLayout().left).toBe(35);
    expect(child3.getComputedLayout().top).toBe(40);
    expect(child3.getComputedLayout().width).toBe(40);
    expect(child3.getComputedLayout().height).toBe(40);

    expect(child4.getComputedLayout().left).toBe(0);
    expect(child4.getComputedLayout().top).toBe(0);
    expect(child4.getComputedLayout().width).toBe(40);
    expect(child4.getComputedLayout().height).toBe(40);
  });

  test('wrap_nodes_with_content_sizing_margin_cross', () => {
    const root = Yoga.Node.create();
    root.setWidth(500);
    root.setHeight(500);

    const child0 = Yoga.Node.create();
    child0.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    child0.setFlexWrap(Yoga.WRAP_WRAP);
    child0.setWidth(70);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child0.insertChild(child1, 0);

    const child2 = Yoga.Node.create();
    child2.setWidth(40);
    child2.setHeight(40);
    child1.insertChild(child2, 0);

    const child3 = Yoga.Node.create();
    child3.setMargin(Yoga.EDGE_TOP, 10);
    child0.insertChild(child3, 1);

    const child4 = Yoga.Node.create();
    child4.setWidth(40);
    child4.setHeight(40);
    child3.insertChild(child4, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(500);
    expect(root.getComputedLayout().height).toBe(500);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(70);
    expect(child0.getComputedLayout().height).toBe(90);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(40);
    expect(child1.getComputedLayout().height).toBe(40);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(40);
    expect(child2.getComputedLayout().height).toBe(40);

    expect(child3.getComputedLayout().left).toBe(0);
    expect(child3.getComputedLayout().top).toBe(50);
    expect(child3.getComputedLayout().width).toBe(40);
    expect(child3.getComputedLayout().height).toBe(40);

    expect(child4.getComputedLayout().left).toBe(0);
    expect(child4.getComputedLayout().top).toBe(0);
    expect(child4.getComputedLayout().width).toBe(40);
    expect(child4.getComputedLayout().height).toBe(40);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(500);
    expect(root.getComputedLayout().height).toBe(500);

    expect(child0.getComputedLayout().left).toBe(430);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(70);
    expect(child0.getComputedLayout().height).toBe(90);

    expect(child1.getComputedLayout().left).toBe(30);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(40);
    expect(child1.getComputedLayout().height).toBe(40);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(40);
    expect(child2.getComputedLayout().height).toBe(40);

    expect(child3.getComputedLayout().left).toBe(30);
    expect(child3.getComputedLayout().top).toBe(50);
    expect(child3.getComputedLayout().width).toBe(40);
    expect(child3.getComputedLayout().height).toBe(40);

    expect(child4.getComputedLayout().left).toBe(0);
    expect(child4.getComputedLayout().top).toBe(0);
    expect(child4.getComputedLayout().width).toBe(40);
    expect(child4.getComputedLayout().height).toBe(40);
  });
});
