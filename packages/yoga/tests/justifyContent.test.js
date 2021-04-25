const Yoga = require('../src/dist/entry-browser');

describe('Justify content', () => {
  test('justify_content_row_flex_start', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setWidth(102);
    root.setHeight(102);

    const child0 = Yoga.Node.create();
    child0.setWidth(10);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(10);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setWidth(10);
    root.insertChild(child2, 2);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(102);
    expect(root.getComputedLayout().height).toBe(102);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(10);
    expect(child0.getComputedLayout().height).toBe(102);

    expect(child1.getComputedLayout().left).toBe(10);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(10);
    expect(child1.getComputedLayout().height).toBe(102);

    expect(child2.getComputedLayout().left).toBe(20);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(10);
    expect(child2.getComputedLayout().height).toBe(102);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(102);
    expect(root.getComputedLayout().height).toBe(102);

    expect(child0.getComputedLayout().left).toBe(92);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(10);
    expect(child0.getComputedLayout().height).toBe(102);

    expect(child1.getComputedLayout().left).toBe(82);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(10);
    expect(child1.getComputedLayout().height).toBe(102);

    expect(child2.getComputedLayout().left).toBe(72);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(10);
    expect(child2.getComputedLayout().height).toBe(102);
  });

  test('justify_content_row_flex_end', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setJustifyContent(Yoga.JUSTIFY_FLEX_END);
    root.setWidth(102);
    root.setHeight(102);

    const child0 = Yoga.Node.create();
    child0.setWidth(10);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(10);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setWidth(10);
    root.insertChild(child2, 2);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(102);
    expect(root.getComputedLayout().height).toBe(102);

    expect(child0.getComputedLayout().left).toBe(72);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(10);
    expect(child0.getComputedLayout().height).toBe(102);

    expect(child1.getComputedLayout().left).toBe(82);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(10);
    expect(child1.getComputedLayout().height).toBe(102);

    expect(child2.getComputedLayout().left).toBe(92);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(10);
    expect(child2.getComputedLayout().height).toBe(102);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(102);
    expect(root.getComputedLayout().height).toBe(102);

    expect(child0.getComputedLayout().left).toBe(20);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(10);
    expect(child0.getComputedLayout().height).toBe(102);

    expect(child1.getComputedLayout().left).toBe(10);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(10);
    expect(child1.getComputedLayout().height).toBe(102);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(10);
    expect(child2.getComputedLayout().height).toBe(102);
  });

  test('justify_content_row_center', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setJustifyContent(Yoga.JUSTIFY_CENTER);
    root.setWidth(102);
    root.setHeight(102);

    const child0 = Yoga.Node.create();
    child0.setWidth(10);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(10);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setWidth(10);
    root.insertChild(child2, 2);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(102);
    expect(root.getComputedLayout().height).toBe(102);

    expect(child0.getComputedLayout().left).toBe(36);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(10);
    expect(child0.getComputedLayout().height).toBe(102);

    expect(child1.getComputedLayout().left).toBe(46);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(10);
    expect(child1.getComputedLayout().height).toBe(102);

    expect(child2.getComputedLayout().left).toBe(56);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(10);
    expect(child2.getComputedLayout().height).toBe(102);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(102);
    expect(root.getComputedLayout().height).toBe(102);

    expect(child0.getComputedLayout().left).toBe(56);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(10);
    expect(child0.getComputedLayout().height).toBe(102);

    expect(child1.getComputedLayout().left).toBe(46);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(10);
    expect(child1.getComputedLayout().height).toBe(102);

    expect(child2.getComputedLayout().left).toBe(36);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(10);
    expect(child2.getComputedLayout().height).toBe(102);
  });

  test('justify_content_row_space_between', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setJustifyContent(Yoga.JUSTIFY_SPACE_BETWEEN);
    root.setWidth(102);
    root.setHeight(102);

    const child0 = Yoga.Node.create();
    child0.setWidth(10);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(10);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setWidth(10);
    root.insertChild(child2, 2);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(102);
    expect(root.getComputedLayout().height).toBe(102);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(10);
    expect(child0.getComputedLayout().height).toBe(102);

    expect(child1.getComputedLayout().left).toBe(46);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(10);
    expect(child1.getComputedLayout().height).toBe(102);

    expect(child2.getComputedLayout().left).toBe(92);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(10);
    expect(child2.getComputedLayout().height).toBe(102);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(102);
    expect(root.getComputedLayout().height).toBe(102);

    expect(child0.getComputedLayout().left).toBe(92);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(10);
    expect(child0.getComputedLayout().height).toBe(102);

    expect(child1.getComputedLayout().left).toBe(46);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(10);
    expect(child1.getComputedLayout().height).toBe(102);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(10);
    expect(child2.getComputedLayout().height).toBe(102);
  });

  test('justify_content_row_space_around', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setJustifyContent(Yoga.JUSTIFY_SPACE_AROUND);
    root.setWidth(102);
    root.setHeight(102);

    const child0 = Yoga.Node.create();
    child0.setWidth(10);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(10);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setWidth(10);
    root.insertChild(child2, 2);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(102);
    expect(root.getComputedLayout().height).toBe(102);

    expect(child0.getComputedLayout().left).toBe(12);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(10);
    expect(child0.getComputedLayout().height).toBe(102);

    expect(child1.getComputedLayout().left).toBe(46);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(10);
    expect(child1.getComputedLayout().height).toBe(102);

    expect(child2.getComputedLayout().left).toBe(80);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(10);
    expect(child2.getComputedLayout().height).toBe(102);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(102);
    expect(root.getComputedLayout().height).toBe(102);

    expect(child0.getComputedLayout().left).toBe(80);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(10);
    expect(child0.getComputedLayout().height).toBe(102);

    expect(child1.getComputedLayout().left).toBe(46);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(10);
    expect(child1.getComputedLayout().height).toBe(102);

    expect(child2.getComputedLayout().left).toBe(12);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(10);
    expect(child2.getComputedLayout().height).toBe(102);
  });

  test('justify_content_column_flex_start', () => {
    const root = Yoga.Node.create();
    root.setWidth(102);
    root.setHeight(102);

    const child0 = Yoga.Node.create();
    child0.setHeight(10);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setHeight(10);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setHeight(10);
    root.insertChild(child2, 2);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(102);
    expect(root.getComputedLayout().height).toBe(102);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(102);
    expect(child0.getComputedLayout().height).toBe(10);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(10);
    expect(child1.getComputedLayout().width).toBe(102);
    expect(child1.getComputedLayout().height).toBe(10);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(20);
    expect(child2.getComputedLayout().width).toBe(102);
    expect(child2.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(102);
    expect(root.getComputedLayout().height).toBe(102);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(102);
    expect(child0.getComputedLayout().height).toBe(10);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(10);
    expect(child1.getComputedLayout().width).toBe(102);
    expect(child1.getComputedLayout().height).toBe(10);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(20);
    expect(child2.getComputedLayout().width).toBe(102);
    expect(child2.getComputedLayout().height).toBe(10);
  });

  test('justify_content_column_flex_end', () => {
    const root = Yoga.Node.create();
    root.setJustifyContent(Yoga.JUSTIFY_FLEX_END);
    root.setWidth(102);
    root.setHeight(102);

    const child0 = Yoga.Node.create();
    child0.setHeight(10);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setHeight(10);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setHeight(10);
    root.insertChild(child2, 2);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(102);
    expect(root.getComputedLayout().height).toBe(102);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(72);
    expect(child0.getComputedLayout().width).toBe(102);
    expect(child0.getComputedLayout().height).toBe(10);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(82);
    expect(child1.getComputedLayout().width).toBe(102);
    expect(child1.getComputedLayout().height).toBe(10);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(92);
    expect(child2.getComputedLayout().width).toBe(102);
    expect(child2.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(102);
    expect(root.getComputedLayout().height).toBe(102);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(72);
    expect(child0.getComputedLayout().width).toBe(102);
    expect(child0.getComputedLayout().height).toBe(10);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(82);
    expect(child1.getComputedLayout().width).toBe(102);
    expect(child1.getComputedLayout().height).toBe(10);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(92);
    expect(child2.getComputedLayout().width).toBe(102);
    expect(child2.getComputedLayout().height).toBe(10);
  });

  test('justify_content_column_center', () => {
    const root = Yoga.Node.create();
    root.setJustifyContent(Yoga.JUSTIFY_CENTER);
    root.setWidth(102);
    root.setHeight(102);

    const child0 = Yoga.Node.create();
    child0.setHeight(10);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setHeight(10);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setHeight(10);
    root.insertChild(child2, 2);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(102);
    expect(root.getComputedLayout().height).toBe(102);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(36);
    expect(child0.getComputedLayout().width).toBe(102);
    expect(child0.getComputedLayout().height).toBe(10);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(46);
    expect(child1.getComputedLayout().width).toBe(102);
    expect(child1.getComputedLayout().height).toBe(10);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(56);
    expect(child2.getComputedLayout().width).toBe(102);
    expect(child2.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(102);
    expect(root.getComputedLayout().height).toBe(102);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(36);
    expect(child0.getComputedLayout().width).toBe(102);
    expect(child0.getComputedLayout().height).toBe(10);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(46);
    expect(child1.getComputedLayout().width).toBe(102);
    expect(child1.getComputedLayout().height).toBe(10);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(56);
    expect(child2.getComputedLayout().width).toBe(102);
    expect(child2.getComputedLayout().height).toBe(10);
  });

  test('justify_content_column_space_between', () => {
    const root = Yoga.Node.create();
    root.setJustifyContent(Yoga.JUSTIFY_SPACE_BETWEEN);
    root.setWidth(102);
    root.setHeight(102);

    const child0 = Yoga.Node.create();
    child0.setHeight(10);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setHeight(10);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setHeight(10);
    root.insertChild(child2, 2);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(102);
    expect(root.getComputedLayout().height).toBe(102);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(102);
    expect(child0.getComputedLayout().height).toBe(10);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(46);
    expect(child1.getComputedLayout().width).toBe(102);
    expect(child1.getComputedLayout().height).toBe(10);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(92);
    expect(child2.getComputedLayout().width).toBe(102);
    expect(child2.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(102);
    expect(root.getComputedLayout().height).toBe(102);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(102);
    expect(child0.getComputedLayout().height).toBe(10);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(46);
    expect(child1.getComputedLayout().width).toBe(102);
    expect(child1.getComputedLayout().height).toBe(10);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(92);
    expect(child2.getComputedLayout().width).toBe(102);
    expect(child2.getComputedLayout().height).toBe(10);
  });

  test('justify_content_column_space_around', () => {
    const root = Yoga.Node.create();
    root.setJustifyContent(Yoga.JUSTIFY_SPACE_AROUND);
    root.setWidth(102);
    root.setHeight(102);

    const child0 = Yoga.Node.create();
    child0.setHeight(10);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setHeight(10);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setHeight(10);
    root.insertChild(child2, 2);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(102);
    expect(root.getComputedLayout().height).toBe(102);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(12);
    expect(child0.getComputedLayout().width).toBe(102);
    expect(child0.getComputedLayout().height).toBe(10);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(46);
    expect(child1.getComputedLayout().width).toBe(102);
    expect(child1.getComputedLayout().height).toBe(10);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(80);
    expect(child2.getComputedLayout().width).toBe(102);
    expect(child2.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(102);
    expect(root.getComputedLayout().height).toBe(102);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(12);
    expect(child0.getComputedLayout().width).toBe(102);
    expect(child0.getComputedLayout().height).toBe(10);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(46);
    expect(child1.getComputedLayout().width).toBe(102);
    expect(child1.getComputedLayout().height).toBe(10);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(80);
    expect(child2.getComputedLayout().width).toBe(102);
    expect(child2.getComputedLayout().height).toBe(10);
  });

  test('justify_content_row_min_width_and_margin', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setJustifyContent(Yoga.JUSTIFY_CENTER);
    root.setMargin(Yoga.EDGE_LEFT, 100);
    root.setMinWidth(50);

    const child0 = Yoga.Node.create();
    child0.setWidth(20);
    child0.setHeight(20);
    root.insertChild(child0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(100);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(50);
    expect(root.getComputedLayout().height).toBe(20);

    expect(child0.getComputedLayout().left).toBe(15);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(20);
    expect(child0.getComputedLayout().height).toBe(20);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(100);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(50);
    expect(root.getComputedLayout().height).toBe(20);

    expect(child0.getComputedLayout().left).toBe(15);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(20);
    expect(child0.getComputedLayout().height).toBe(20);
  });

  test('justify_content_row_max_width_and_margin', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setJustifyContent(Yoga.JUSTIFY_CENTER);
    root.setMargin(Yoga.EDGE_LEFT, 100);
    root.setWidth(100);
    root.setMaxWidth(80);

    const child0 = Yoga.Node.create();
    child0.setWidth(20);
    child0.setHeight(20);
    root.insertChild(child0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(100);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(80);
    expect(root.getComputedLayout().height).toBe(20);

    expect(child0.getComputedLayout().left).toBe(30);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(20);
    expect(child0.getComputedLayout().height).toBe(20);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(100);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(80);
    expect(root.getComputedLayout().height).toBe(20);

    expect(child0.getComputedLayout().left).toBe(30);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(20);
    expect(child0.getComputedLayout().height).toBe(20);
  });

  test('justify_content_column_min_height_and_margin', () => {
    const root = Yoga.Node.create();
    root.setJustifyContent(Yoga.JUSTIFY_CENTER);
    root.setMargin(Yoga.EDGE_TOP, 100);
    root.setMinHeight(50);

    const child0 = Yoga.Node.create();
    child0.setWidth(20);
    child0.setHeight(20);
    root.insertChild(child0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(100);
    expect(root.getComputedLayout().width).toBe(20);
    expect(root.getComputedLayout().height).toBe(50);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(15);
    expect(child0.getComputedLayout().width).toBe(20);
    expect(child0.getComputedLayout().height).toBe(20);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(100);
    expect(root.getComputedLayout().width).toBe(20);
    expect(root.getComputedLayout().height).toBe(50);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(15);
    expect(child0.getComputedLayout().width).toBe(20);
    expect(child0.getComputedLayout().height).toBe(20);
  });

  test('justify_content_colunn_max_height_and_margin', () => {
    const root = Yoga.Node.create();
    root.setJustifyContent(Yoga.JUSTIFY_CENTER);
    root.setMargin(Yoga.EDGE_TOP, 100);
    root.setHeight(100);
    root.setMaxHeight(80);

    const child0 = Yoga.Node.create();
    child0.setWidth(20);
    child0.setHeight(20);
    root.insertChild(child0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(100);
    expect(root.getComputedLayout().width).toBe(20);
    expect(root.getComputedLayout().height).toBe(80);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(30);
    expect(child0.getComputedLayout().width).toBe(20);
    expect(child0.getComputedLayout().height).toBe(20);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(100);
    expect(root.getComputedLayout().width).toBe(20);
    expect(root.getComputedLayout().height).toBe(80);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(30);
    expect(child0.getComputedLayout().width).toBe(20);
    expect(child0.getComputedLayout().height).toBe(20);
  });

  test('justify_content_column_space_evenly', () => {
    const root = Yoga.Node.create();
    root.setJustifyContent(Yoga.JUSTIFY_SPACE_EVENLY);
    root.setWidth(102);
    root.setHeight(102);

    const child0 = Yoga.Node.create();
    child0.setHeight(10);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setHeight(10);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setHeight(10);
    root.insertChild(child2, 2);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(102);
    expect(root.getComputedLayout().height).toBe(102);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(18);
    expect(child0.getComputedLayout().width).toBe(102);
    expect(child0.getComputedLayout().height).toBe(10);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(46);
    expect(child1.getComputedLayout().width).toBe(102);
    expect(child1.getComputedLayout().height).toBe(10);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(74);
    expect(child2.getComputedLayout().width).toBe(102);
    expect(child2.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(102);
    expect(root.getComputedLayout().height).toBe(102);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(18);
    expect(child0.getComputedLayout().width).toBe(102);
    expect(child0.getComputedLayout().height).toBe(10);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(46);
    expect(child1.getComputedLayout().width).toBe(102);
    expect(child1.getComputedLayout().height).toBe(10);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(74);
    expect(child2.getComputedLayout().width).toBe(102);
    expect(child2.getComputedLayout().height).toBe(10);
  });

  test('justify_content_row_space_evenly', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setJustifyContent(Yoga.JUSTIFY_SPACE_EVENLY);
    root.setWidth(102);
    root.setHeight(102);

    const child0 = Yoga.Node.create();
    child0.setHeight(10);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setHeight(10);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setHeight(10);
    root.insertChild(child2, 2);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(102);
    expect(root.getComputedLayout().height).toBe(102);

    expect(child0.getComputedLayout().left).toBe(26);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(0);
    expect(child0.getComputedLayout().height).toBe(10);

    expect(child1.getComputedLayout().left).toBe(51);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(0);
    expect(child1.getComputedLayout().height).toBe(10);

    expect(child2.getComputedLayout().left).toBe(77);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(0);
    expect(child2.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(102);
    expect(root.getComputedLayout().height).toBe(102);

    expect(child0.getComputedLayout().left).toBe(77);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(0);
    expect(child0.getComputedLayout().height).toBe(10);

    expect(child1.getComputedLayout().left).toBe(51);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(0);
    expect(child1.getComputedLayout().height).toBe(10);

    expect(child2.getComputedLayout().left).toBe(26);
    expect(child2.getComputedLayout().top).toBe(0);
    expect(child2.getComputedLayout().width).toBe(0);
    expect(child2.getComputedLayout().height).toBe(10);
  });
});
