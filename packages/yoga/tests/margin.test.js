const Yoga = require('..');

describe('Margins', () => {
  let yogaNode;
  let flexboxNode;

  beforeEach(() => {
    yogaNode = Yoga.Node.createDefault();
    flexboxNode = Yoga.Node.createDefault();
  });

  test('should have same top margin by default', () => {
    expect(yogaNode.getMargin(Yoga.EDGE_TOP)).toEqual(
      flexboxNode.getMargin(Yoga.EDGE_TOP),
    );
  });

  test('should have same left margin by default', () => {
    expect(yogaNode.getMargin(Yoga.EDGE_LEFT)).toEqual(
      flexboxNode.getMargin(Yoga.EDGE_LEFT),
    );
  });

  test('should have same bottom margin by default', () => {
    expect(yogaNode.getMargin(Yoga.EDGE_BOTTOM)).toEqual(
      flexboxNode.getMargin(Yoga.EDGE_BOTTOM),
    );
  });

  test('should have same right margin by default', () => {
    expect(yogaNode.getMargin(Yoga.EDGE_RIGHT)).toEqual(
      flexboxNode.getMargin(Yoga.EDGE_RIGHT),
    );
  });

  test('should have same vertical margin by default', () => {
    expect(yogaNode.getMargin(Yoga.EDGE_VERTICAL)).toEqual(
      flexboxNode.getMargin(Yoga.EDGE_VERTICAL),
    );
  });

  test('should have same horizontal margin by default', () => {
    expect(yogaNode.getMargin(Yoga.EDGE_HORIZONTAL)).toEqual(
      flexboxNode.getMargin(Yoga.EDGE_HORIZONTAL),
    );
  });

  test('should have same start margin by default', () => {
    expect(yogaNode.getMargin(Yoga.EDGE_START)).toEqual(
      flexboxNode.getMargin(Yoga.EDGE_START),
    );
  });

  test('should have same end margin by default', () => {
    expect(yogaNode.getMargin(Yoga.EDGE_END)).toEqual(
      flexboxNode.getMargin(Yoga.EDGE_END),
    );
  });

  test('should have same all margin by default', () => {
    expect(yogaNode.getMargin(Yoga.EDGE_ALL)).toEqual(
      flexboxNode.getMargin(Yoga.EDGE_ALL),
    );
  });

  test('should set top margin', () => {
    yogaNode.setMargin(Yoga.EDGE_TOP, 5);
    flexboxNode.setMargin(Yoga.EDGE_TOP, 5);

    expect(yogaNode.getMargin(Yoga.EDGE_TOP)).toEqual(
      flexboxNode.getMargin(Yoga.EDGE_TOP),
    );
  });

  test('should set left margin', () => {
    yogaNode.setMargin(Yoga.EDGE_LEFT, 5);
    flexboxNode.setMargin(Yoga.EDGE_LEFT, 5);

    expect(yogaNode.getMargin(Yoga.EDGE_LEFT)).toEqual(
      flexboxNode.getMargin(Yoga.EDGE_LEFT),
    );
  });

  test('should set bottom margin', () => {
    yogaNode.setMargin(Yoga.EDGE_BOTTOM, 5);
    flexboxNode.setMargin(Yoga.EDGE_BOTTOM, 5);

    expect(yogaNode.getMargin(Yoga.EDGE_BOTTOM)).toEqual(
      flexboxNode.getMargin(Yoga.EDGE_BOTTOM),
    );
  });

  test('should set right margin', () => {
    yogaNode.setMargin(Yoga.EDGE_RIGHT, 5);
    flexboxNode.setMargin(Yoga.EDGE_RIGHT, 5);

    expect(yogaNode.getMargin(Yoga.EDGE_RIGHT)).toEqual(
      flexboxNode.getMargin(Yoga.EDGE_RIGHT),
    );
  });

  test('should set vertical margin', () => {
    yogaNode.setMargin(Yoga.EDGE_VERTICAL, 5);
    flexboxNode.setMargin(Yoga.EDGE_VERTICAL, 5);

    expect(yogaNode.getMargin(Yoga.EDGE_VERTICAL)).toEqual(
      flexboxNode.getMargin(Yoga.EDGE_VERTICAL),
    );
  });

  test('should set horizontal margin', () => {
    yogaNode.setMargin(Yoga.EDGE_HORIZONTAL, 5);
    flexboxNode.setMargin(Yoga.EDGE_HORIZONTAL, 5);

    expect(yogaNode.getMargin(Yoga.EDGE_HORIZONTAL)).toEqual(
      flexboxNode.getMargin(Yoga.EDGE_HORIZONTAL),
    );
  });

  test('should set start margin', () => {
    yogaNode.setMargin(Yoga.EDGE_START, 5);
    flexboxNode.setMargin(Yoga.EDGE_START, 5);

    expect(yogaNode.getMargin(Yoga.EDGE_START)).toEqual(
      flexboxNode.getMargin(Yoga.EDGE_START),
    );
  });

  test('should set end margin', () => {
    yogaNode.setMargin(Yoga.EDGE_END, 5);
    flexboxNode.setMargin(Yoga.EDGE_END, 5);

    expect(yogaNode.getMargin(Yoga.EDGE_END)).toEqual(
      flexboxNode.getMargin(Yoga.EDGE_END),
    );
  });

  test('should set all margin', () => {
    yogaNode.setMargin(Yoga.EDGE_ALL, 5);
    flexboxNode.setMargin(Yoga.EDGE_ALL, 5);

    expect(yogaNode.getMargin(Yoga.EDGE_ALL)).toEqual(
      flexboxNode.getMargin(Yoga.EDGE_ALL),
    );
  });

  test('should set margin auto', () => {
    yogaNode.setMarginAuto(Yoga.EDGE_ALL);
    flexboxNode.setMarginAuto(Yoga.EDGE_ALL);

    expect(yogaNode.getMargin(Yoga.EDGE_ALL)).toEqual(
      flexboxNode.getMargin(Yoga.EDGE_ALL),
    );
  });

  test('should set top percent margin', () => {
    yogaNode.setMarginPercent(Yoga.EDGE_TOP, 5);
    flexboxNode.setMarginPercent(Yoga.EDGE_TOP, 5);

    expect(yogaNode.getMargin(Yoga.EDGE_TOP)).toEqual(
      flexboxNode.getMargin(Yoga.EDGE_TOP),
    );
  });

  test('should set left percent margin', () => {
    yogaNode.setMarginPercent(Yoga.EDGE_LEFT, 5);
    flexboxNode.setMarginPercent(Yoga.EDGE_LEFT, 5);

    expect(yogaNode.getMargin(Yoga.EDGE_LEFT)).toEqual(
      flexboxNode.getMargin(Yoga.EDGE_LEFT),
    );
  });

  test('should set bottom percent margin', () => {
    yogaNode.setMarginPercent(Yoga.EDGE_BOTTOM, 5);
    flexboxNode.setMarginPercent(Yoga.EDGE_BOTTOM, 5);

    expect(yogaNode.getMargin(Yoga.EDGE_BOTTOM)).toEqual(
      flexboxNode.getMargin(Yoga.EDGE_BOTTOM),
    );
  });

  test('should set right percent margin', () => {
    yogaNode.setMarginPercent(Yoga.EDGE_RIGHT, 5);
    flexboxNode.setMarginPercent(Yoga.EDGE_RIGHT, 5);

    expect(yogaNode.getMargin(Yoga.EDGE_RIGHT)).toEqual(
      flexboxNode.getMargin(Yoga.EDGE_RIGHT),
    );
  });

  test('should set vertical percent margin', () => {
    yogaNode.setMarginPercent(Yoga.EDGE_VERTICAL, 5);
    flexboxNode.setMarginPercent(Yoga.EDGE_VERTICAL, 5);

    expect(yogaNode.getMargin(Yoga.EDGE_VERTICAL)).toEqual(
      flexboxNode.getMargin(Yoga.EDGE_VERTICAL),
    );
  });

  test('should set horizontal percent margin', () => {
    yogaNode.setMarginPercent(Yoga.EDGE_HORIZONTAL, 5);
    flexboxNode.setMarginPercent(Yoga.EDGE_HORIZONTAL, 5);

    expect(yogaNode.getMargin(Yoga.EDGE_HORIZONTAL)).toEqual(
      flexboxNode.getMargin(Yoga.EDGE_HORIZONTAL),
    );
  });

  test('should set start percent margin', () => {
    yogaNode.setMarginPercent(Yoga.EDGE_START, 5);
    flexboxNode.setMarginPercent(Yoga.EDGE_START, 5);

    expect(yogaNode.getMargin(Yoga.EDGE_START)).toEqual(
      flexboxNode.getMargin(Yoga.EDGE_START),
    );

    const root = Yoga.Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setMarginPercent(Yoga.EDGE_START, 10);
    root.calculateLayout(100, 100, Yoga.DIRECTION_LTR);
  });

  test('should set end percent margin', () => {
    yogaNode.setMarginPercent(Yoga.EDGE_END, 5);
    flexboxNode.setMarginPercent(Yoga.EDGE_END, 5);

    expect(yogaNode.getMargin(Yoga.EDGE_END)).toEqual(
      flexboxNode.getMargin(Yoga.EDGE_END),
    );
  });

  test('margin_start', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setWidth(100);
    root.setHeight(100);

    const child0 = Yoga.Node.create();
    child0.setMargin(Yoga.EDGE_START, 10);
    child0.setWidth(10);
    root.insertChild(child0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(10);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(10);
    expect(child0.getComputedLayout().height).toBe(100);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(80);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(10);
    expect(child0.getComputedLayout().height).toBe(100);
  });

  test('margin_top', () => {
    const root = Yoga.Node.create();
    root.setWidth(100);
    root.setHeight(100);

    const child0 = Yoga.Node.create();
    child0.setMargin(Yoga.EDGE_TOP, 10);
    child0.setHeight(10);
    root.insertChild(child0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(10);
    expect(child0.getComputedLayout().width).toBe(100);
    expect(child0.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(10);
    expect(child0.getComputedLayout().width).toBe(100);
    expect(child0.getComputedLayout().height).toBe(10);
  });

  test('margin_end', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setJustifyContent(Yoga.JUSTIFY_FLEX_END);
    root.setWidth(100);
    root.setHeight(100);

    const child0 = Yoga.Node.create();
    child0.setMargin(Yoga.EDGE_END, 10);
    child0.setWidth(10);
    root.insertChild(child0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(80);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(10);
    expect(child0.getComputedLayout().height).toBe(100);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(10);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(10);
    expect(child0.getComputedLayout().height).toBe(100);
  });

  test('margin_bottom', () => {
    const root = Yoga.Node.create();
    root.setJustifyContent(Yoga.JUSTIFY_FLEX_END);
    root.setWidth(100);
    root.setHeight(100);

    const child0 = Yoga.Node.create();
    child0.setMargin(Yoga.EDGE_BOTTOM, 10);
    child0.setHeight(10);
    root.insertChild(child0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(80);
    expect(child0.getComputedLayout().width).toBe(100);
    expect(child0.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(80);
    expect(child0.getComputedLayout().width).toBe(100);
    expect(child0.getComputedLayout().height).toBe(10);
  });

  test('margin_and_flex_row', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setWidth(100);
    root.setHeight(100);

    const child0 = Yoga.Node.create();
    child0.setFlexGrow(1);
    child0.setMargin(Yoga.EDGE_START, 10);
    child0.setMargin(Yoga.EDGE_END, 10);
    root.insertChild(child0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(10);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(80);
    expect(child0.getComputedLayout().height).toBe(100);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(10);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(80);
    expect(child0.getComputedLayout().height).toBe(100);
  });

  test('margin_and_flex_column', () => {
    const root = Yoga.Node.create();
    root.setWidth(100);
    root.setHeight(100);

    const child0 = Yoga.Node.create();
    child0.setFlexGrow(1);
    child0.setMargin(Yoga.EDGE_TOP, 10);
    child0.setMargin(Yoga.EDGE_BOTTOM, 10);
    root.insertChild(child0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(10);
    expect(child0.getComputedLayout().width).toBe(100);
    expect(child0.getComputedLayout().height).toBe(80);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(10);
    expect(child0.getComputedLayout().width).toBe(100);
    expect(child0.getComputedLayout().height).toBe(80);
  });

  test('margin_and_stretch_row', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setWidth(100);
    root.setHeight(100);

    const child0 = Yoga.Node.create();
    child0.setFlexGrow(1);
    child0.setMargin(Yoga.EDGE_TOP, 10);
    child0.setMargin(Yoga.EDGE_BOTTOM, 10);
    root.insertChild(child0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(10);
    expect(child0.getComputedLayout().width).toBe(100);
    expect(child0.getComputedLayout().height).toBe(80);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(10);
    expect(child0.getComputedLayout().width).toBe(100);
    expect(child0.getComputedLayout().height).toBe(80);
  });

  test('margin_and_stretch_column', () => {
    const root = Yoga.Node.create();
    root.setWidth(100);
    root.setHeight(100);

    const child0 = Yoga.Node.create();
    child0.setFlexGrow(1);
    child0.setMargin(Yoga.EDGE_START, 10);
    child0.setMargin(Yoga.EDGE_END, 10);
    root.insertChild(child0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(10);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(80);
    expect(child0.getComputedLayout().height).toBe(100);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(10);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(80);
    expect(child0.getComputedLayout().height).toBe(100);
  });

  test('margin_with_sibling_row', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setWidth(100);
    root.setHeight(100);

    const child0 = Yoga.Node.create();
    child0.setFlexGrow(1);
    child0.setMargin(Yoga.EDGE_END, 10);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setFlexGrow(1);
    root.insertChild(child1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(45);
    expect(child0.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(55);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(45);
    expect(child1.getComputedLayout().height).toBe(100);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(55);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(45);
    expect(child0.getComputedLayout().height).toBe(100);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(45);
    expect(child1.getComputedLayout().height).toBe(100);
  });

  test('margin_with_sibling_column', () => {
    const root = Yoga.Node.create();
    root.setWidth(100);
    root.setHeight(100);

    const child0 = Yoga.Node.create();
    child0.setFlexGrow(1);
    child0.setMargin(Yoga.EDGE_BOTTOM, 10);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setFlexGrow(1);
    root.insertChild(child1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(100);
    expect(child0.getComputedLayout().height).toBe(45);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(55);
    expect(child1.getComputedLayout().width).toBe(100);
    expect(child1.getComputedLayout().height).toBe(45);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(100);
    expect(child0.getComputedLayout().height).toBe(45);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(55);
    expect(child1.getComputedLayout().width).toBe(100);
    expect(child1.getComputedLayout().height).toBe(45);
  });

  test('margin_auto_bottom', () => {
    const root = Yoga.Node.create();
    root.setAlignItems(Yoga.ALIGN_CENTER);
    root.setWidth(200);
    root.setHeight(200);

    const child0 = Yoga.Node.create();
    child0.setMarginAuto(Yoga.EDGE_BOTTOM);
    child0.setWidth(50);
    child0.setHeight(50);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    child1.setHeight(50);
    root.insertChild(child1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(child0.getComputedLayout().left).toBe(75);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(50);

    expect(child1.getComputedLayout().left).toBe(75);
    expect(child1.getComputedLayout().top).toBe(150);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(child0.getComputedLayout().left).toBe(75);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(50);

    expect(child1.getComputedLayout().left).toBe(75);
    expect(child1.getComputedLayout().top).toBe(150);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);
  });

  test('margin_auto_top', () => {
    const root = Yoga.Node.create();
    root.setAlignItems(Yoga.ALIGN_CENTER);
    root.setWidth(200);
    root.setHeight(200);

    const child0 = Yoga.Node.create();
    child0.setMarginAuto(Yoga.EDGE_TOP);
    child0.setWidth(50);
    child0.setHeight(50);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    child1.setHeight(50);
    root.insertChild(child1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(child0.getComputedLayout().left).toBe(75);
    expect(child0.getComputedLayout().top).toBe(100);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(50);

    expect(child1.getComputedLayout().left).toBe(75);
    expect(child1.getComputedLayout().top).toBe(150);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(child0.getComputedLayout().left).toBe(75);
    expect(child0.getComputedLayout().top).toBe(100);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(50);

    expect(child1.getComputedLayout().left).toBe(75);
    expect(child1.getComputedLayout().top).toBe(150);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);
  });

  test('margin_auto_bottom_and_top', () => {
    const root = Yoga.Node.create();
    root.setAlignItems(Yoga.ALIGN_CENTER);
    root.setWidth(200);
    root.setHeight(200);

    const child0 = Yoga.Node.create();
    child0.setMarginAuto(Yoga.EDGE_TOP);
    child0.setMarginAuto(Yoga.EDGE_BOTTOM);
    child0.setWidth(50);
    child0.setHeight(50);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    child1.setHeight(50);
    root.insertChild(child1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(child0.getComputedLayout().left).toBe(75);
    expect(child0.getComputedLayout().top).toBe(50);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(50);

    expect(child1.getComputedLayout().left).toBe(75);
    expect(child1.getComputedLayout().top).toBe(150);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(child0.getComputedLayout().left).toBe(75);
    expect(child0.getComputedLayout().top).toBe(50);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(50);

    expect(child1.getComputedLayout().left).toBe(75);
    expect(child1.getComputedLayout().top).toBe(150);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);
  });

  test('margin_auto_bottom_and_top_justify_center', () => {
    const root = Yoga.Node.create();
    root.setJustifyContent(Yoga.JUSTIFY_CENTER);
    root.setWidth(200);
    root.setHeight(200);

    const child0 = Yoga.Node.create();
    child0.setMarginAuto(Yoga.EDGE_TOP);
    child0.setMarginAuto(Yoga.EDGE_BOTTOM);
    child0.setWidth(50);
    child0.setHeight(50);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    child1.setHeight(50);
    root.insertChild(child1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(50);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(50);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(150);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(child0.getComputedLayout().left).toBe(150);
    expect(child0.getComputedLayout().top).toBe(50);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(50);

    expect(child1.getComputedLayout().left).toBe(150);
    expect(child1.getComputedLayout().top).toBe(150);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);
  });

  test('margin_auto_mutiple_children_column', () => {
    const root = Yoga.Node.create();
    root.setAlignItems(Yoga.ALIGN_CENTER);
    root.setWidth(200);
    root.setHeight(200);

    const child0 = Yoga.Node.create();
    child0.setMarginAuto(Yoga.EDGE_TOP);
    child0.setWidth(50);
    child0.setHeight(50);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setMarginAuto(Yoga.EDGE_TOP);
    child1.setWidth(50);
    child1.setHeight(50);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setWidth(50);
    child2.setHeight(50);
    root.insertChild(child2, 2);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(child0.getComputedLayout().left).toBe(75);
    expect(child0.getComputedLayout().top).toBe(25);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(50);

    expect(child1.getComputedLayout().left).toBe(75);
    expect(child1.getComputedLayout().top).toBe(100);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    expect(child2.getComputedLayout().left).toBe(75);
    expect(child2.getComputedLayout().top).toBe(150);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(50);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(child0.getComputedLayout().left).toBe(75);
    expect(child0.getComputedLayout().top).toBe(25);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(50);

    expect(child1.getComputedLayout().left).toBe(75);
    expect(child1.getComputedLayout().top).toBe(100);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    expect(child2.getComputedLayout().left).toBe(75);
    expect(child2.getComputedLayout().top).toBe(150);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(50);
  });

  test('margin_auto_mutiple_children_row', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setAlignItems(Yoga.ALIGN_CENTER);
    root.setWidth(200);
    root.setHeight(200);

    const child0 = Yoga.Node.create();
    child0.setMarginAuto(Yoga.EDGE_RIGHT);
    child0.setWidth(50);
    child0.setHeight(50);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setMarginAuto(Yoga.EDGE_RIGHT);
    child1.setWidth(50);
    child1.setHeight(50);
    root.insertChild(child1, 1);

    const child2 = Yoga.Node.create();
    child2.setWidth(50);
    child2.setHeight(50);
    root.insertChild(child2, 2);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(75);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(50);

    expect(child1.getComputedLayout().left).toBe(75);
    expect(child1.getComputedLayout().top).toBe(75);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    expect(child2.getComputedLayout().left).toBe(150);
    expect(child2.getComputedLayout().top).toBe(75);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(50);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(child0.getComputedLayout().left).toBe(125);
    expect(child0.getComputedLayout().top).toBe(75);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(50);

    expect(child1.getComputedLayout().left).toBe(50);
    expect(child1.getComputedLayout().top).toBe(75);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    expect(child2.getComputedLayout().left).toBe(0);
    expect(child2.getComputedLayout().top).toBe(75);
    expect(child2.getComputedLayout().width).toBe(50);
    expect(child2.getComputedLayout().height).toBe(50);
  });

  test('margin_auto_left_and_right_column', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setAlignItems(Yoga.ALIGN_CENTER);
    root.setWidth(200);
    root.setHeight(200);

    const child0 = Yoga.Node.create();
    child0.setMarginAuto(Yoga.EDGE_LEFT);
    child0.setMarginAuto(Yoga.EDGE_RIGHT);
    child0.setWidth(50);
    child0.setHeight(50);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    child1.setHeight(50);
    root.insertChild(child1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(child0.getComputedLayout().left).toBe(50);
    expect(child0.getComputedLayout().top).toBe(75);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(50);

    expect(child1.getComputedLayout().left).toBe(150);
    expect(child1.getComputedLayout().top).toBe(75);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(child0.getComputedLayout().left).toBe(100);
    expect(child0.getComputedLayout().top).toBe(75);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(50);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(75);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);
  });

  test('margin_auto_left_and_right', () => {
    const root = Yoga.Node.create();
    root.setWidth(200);
    root.setHeight(200);

    const child0 = Yoga.Node.create();
    child0.setMarginAuto(Yoga.EDGE_LEFT);
    child0.setMarginAuto(Yoga.EDGE_RIGHT);
    child0.setWidth(50);
    child0.setHeight(50);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    child1.setHeight(50);
    root.insertChild(child1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(child0.getComputedLayout().left).toBe(75);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(50);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(50);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(child0.getComputedLayout().left).toBe(75);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(50);

    expect(child1.getComputedLayout().left).toBe(150);
    expect(child1.getComputedLayout().top).toBe(50);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);
  });

  test('margin_auto_start_and_end_column', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setAlignItems(Yoga.ALIGN_CENTER);
    root.setWidth(200);
    root.setHeight(200);

    const child0 = Yoga.Node.create();
    child0.setMarginAuto(Yoga.EDGE_START);
    child0.setMarginAuto(Yoga.EDGE_END);
    child0.setWidth(50);
    child0.setHeight(50);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    child1.setHeight(50);
    root.insertChild(child1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(child0.getComputedLayout().left).toBe(50);
    expect(child0.getComputedLayout().top).toBe(75);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(50);

    expect(child1.getComputedLayout().left).toBe(150);
    expect(child1.getComputedLayout().top).toBe(75);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(child0.getComputedLayout().left).toBe(100);
    expect(child0.getComputedLayout().top).toBe(75);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(50);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(75);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);
  });

  test('margin_auto_start_and_end', () => {
    const root = Yoga.Node.create();
    root.setWidth(200);
    root.setHeight(200);

    const child0 = Yoga.Node.create();
    child0.setMarginAuto(Yoga.EDGE_START);
    child0.setMarginAuto(Yoga.EDGE_END);
    child0.setWidth(50);
    child0.setHeight(50);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    child1.setHeight(50);
    root.insertChild(child1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(child0.getComputedLayout().left).toBe(75);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(50);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(50);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(child0.getComputedLayout().left).toBe(75);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(50);

    expect(child1.getComputedLayout().left).toBe(150);
    expect(child1.getComputedLayout().top).toBe(50);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);
  });

  test('margin_auto_left_and_right_column_and_center', () => {
    const root = Yoga.Node.create();
    root.setAlignItems(Yoga.ALIGN_CENTER);
    root.setWidth(200);
    root.setHeight(200);

    const child0 = Yoga.Node.create();
    child0.setMarginAuto(Yoga.EDGE_LEFT);
    child0.setMarginAuto(Yoga.EDGE_RIGHT);
    child0.setWidth(50);
    child0.setHeight(50);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    child1.setHeight(50);
    root.insertChild(child1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(child0.getComputedLayout().left).toBe(75);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(50);

    expect(child1.getComputedLayout().left).toBe(75);
    expect(child1.getComputedLayout().top).toBe(50);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(child0.getComputedLayout().left).toBe(75);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(50);

    expect(child1.getComputedLayout().left).toBe(75);
    expect(child1.getComputedLayout().top).toBe(50);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);
  });

  test('margin_auto_left', () => {
    const root = Yoga.Node.create();
    root.setAlignItems(Yoga.ALIGN_CENTER);
    root.setWidth(200);
    root.setHeight(200);

    const child0 = Yoga.Node.create();
    child0.setMarginAuto(Yoga.EDGE_LEFT);
    child0.setWidth(50);
    child0.setHeight(50);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    child1.setHeight(50);
    root.insertChild(child1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(child0.getComputedLayout().left).toBe(150);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(50);

    expect(child1.getComputedLayout().left).toBe(75);
    expect(child1.getComputedLayout().top).toBe(50);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(child0.getComputedLayout().left).toBe(150);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(50);

    expect(child1.getComputedLayout().left).toBe(75);
    expect(child1.getComputedLayout().top).toBe(50);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);
  });

  test('margin_auto_right', () => {
    const root = Yoga.Node.create();
    root.setAlignItems(Yoga.ALIGN_CENTER);
    root.setWidth(200);
    root.setHeight(200);

    const child0 = Yoga.Node.create();
    child0.setMarginAuto(Yoga.EDGE_RIGHT);
    child0.setWidth(50);
    child0.setHeight(50);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    child1.setHeight(50);
    root.insertChild(child1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(50);

    expect(child1.getComputedLayout().left).toBe(75);
    expect(child1.getComputedLayout().top).toBe(50);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(50);

    expect(child1.getComputedLayout().left).toBe(75);
    expect(child1.getComputedLayout().top).toBe(50);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);
  });

  test('margin_auto_left_and_right_strech', () => {
    const root = Yoga.Node.create();
    root.setFlexDirection(Yoga.FLEX_DIRECTION_ROW);
    root.setWidth(200);
    root.setHeight(200);

    const child0 = Yoga.Node.create();
    child0.setMarginAuto(Yoga.EDGE_LEFT);
    child0.setMarginAuto(Yoga.EDGE_RIGHT);
    child0.setWidth(50);
    child0.setHeight(50);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    child1.setHeight(50);
    root.insertChild(child1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(child0.getComputedLayout().left).toBe(50);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(50);

    expect(child1.getComputedLayout().left).toBe(150);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(child0.getComputedLayout().left).toBe(100);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(50);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(0);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);
  });

  test('margin_auto_top_and_bottom_strech', () => {
    const root = Yoga.Node.create();
    root.setWidth(200);
    root.setHeight(200);

    const child0 = Yoga.Node.create();
    child0.setMarginAuto(Yoga.EDGE_TOP);
    child0.setMarginAuto(Yoga.EDGE_BOTTOM);
    child0.setWidth(50);
    child0.setHeight(50);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    child1.setHeight(50);
    root.insertChild(child1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(50);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(50);

    expect(child1.getComputedLayout().left).toBe(0);
    expect(child1.getComputedLayout().top).toBe(150);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(child0.getComputedLayout().left).toBe(150);
    expect(child0.getComputedLayout().top).toBe(50);
    expect(child0.getComputedLayout().width).toBe(50);
    expect(child0.getComputedLayout().height).toBe(50);

    expect(child1.getComputedLayout().left).toBe(150);
    expect(child1.getComputedLayout().top).toBe(150);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);
  });

  test('margin_should_not_be_part_of_max_height', () => {
    const root = Yoga.Node.create();
    root.setWidth(250);
    root.setHeight(250);

    const child0 = Yoga.Node.create();
    child0.setMargin(Yoga.EDGE_TOP, 20);
    child0.setWidth(100);
    child0.setHeight(100);
    child0.setMaxHeight(100);
    root.insertChild(child0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(250);
    expect(root.getComputedLayout().height).toBe(250);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(20);
    expect(child0.getComputedLayout().width).toBe(100);
    expect(child0.getComputedLayout().height).toBe(100);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(250);
    expect(root.getComputedLayout().height).toBe(250);

    expect(child0.getComputedLayout().left).toBe(150);
    expect(child0.getComputedLayout().top).toBe(20);
    expect(child0.getComputedLayout().width).toBe(100);
    expect(child0.getComputedLayout().height).toBe(100);
  });

  test('margin_should_not_be_part_of_max_width', () => {
    const root = Yoga.Node.create();
    root.setWidth(250);
    root.setHeight(250);

    const child0 = Yoga.Node.create();
    child0.setMargin(Yoga.EDGE_LEFT, 20);
    child0.setWidth(100);
    child0.setMaxWidth(100);
    child0.setHeight(100);
    root.insertChild(child0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(250);
    expect(root.getComputedLayout().height).toBe(250);

    expect(child0.getComputedLayout().left).toBe(20);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(100);
    expect(child0.getComputedLayout().height).toBe(100);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(250);
    expect(root.getComputedLayout().height).toBe(250);

    expect(child0.getComputedLayout().left).toBe(150);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(100);
    expect(child0.getComputedLayout().height).toBe(100);
  });

  test('margin_auto_left_right_child_bigger_than_parent', () => {
    const root = Yoga.Node.create();
    root.setJustifyContent(Yoga.JUSTIFY_CENTER);
    root.setWidth(52);
    root.setHeight(52);

    const child0 = Yoga.Node.create();
    child0.setMarginAuto(Yoga.EDGE_LEFT);
    child0.setMarginAuto(Yoga.EDGE_RIGHT);
    child0.setWidth(72);
    child0.setHeight(72);
    root.insertChild(child0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(52);
    expect(root.getComputedLayout().height).toBe(52);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(-10);
    expect(child0.getComputedLayout().width).toBe(72);
    expect(child0.getComputedLayout().height).toBe(72);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(52);
    expect(root.getComputedLayout().height).toBe(52);

    expect(child0.getComputedLayout().left).toBe(-20);
    expect(child0.getComputedLayout().top).toBe(-10);
    expect(child0.getComputedLayout().width).toBe(72);
    expect(child0.getComputedLayout().height).toBe(72);
  });

  test('margin_auto_left_child_bigger_than_parent', () => {
    const root = Yoga.Node.create();
    root.setJustifyContent(Yoga.JUSTIFY_CENTER);
    root.setWidth(52);
    root.setHeight(52);

    const child0 = Yoga.Node.create();
    child0.setMarginAuto(Yoga.EDGE_LEFT);
    child0.setWidth(72);
    child0.setHeight(72);
    root.insertChild(child0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(52);
    expect(root.getComputedLayout().height).toBe(52);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(-10);
    expect(child0.getComputedLayout().width).toBe(72);
    expect(child0.getComputedLayout().height).toBe(72);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(52);
    expect(root.getComputedLayout().height).toBe(52);

    expect(child0.getComputedLayout().left).toBe(-20);
    expect(child0.getComputedLayout().top).toBe(-10);
    expect(child0.getComputedLayout().width).toBe(72);
    expect(child0.getComputedLayout().height).toBe(72);
  });

  test('margin_fix_left_auto_right_child_bigger_than_parent', () => {
    const root = Yoga.Node.create();
    root.setJustifyContent(Yoga.JUSTIFY_CENTER);
    root.setWidth(52);
    root.setHeight(52);

    const child0 = Yoga.Node.create();
    child0.setMargin(Yoga.EDGE_LEFT, 10);
    child0.setMarginAuto(Yoga.EDGE_RIGHT);
    child0.setWidth(72);
    child0.setHeight(72);
    root.insertChild(child0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(52);
    expect(root.getComputedLayout().height).toBe(52);

    expect(child0.getComputedLayout().left).toBe(10);
    expect(child0.getComputedLayout().top).toBe(-10);
    expect(child0.getComputedLayout().width).toBe(72);
    expect(child0.getComputedLayout().height).toBe(72);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(52);
    expect(root.getComputedLayout().height).toBe(52);

    expect(child0.getComputedLayout().left).toBe(-20);
    expect(child0.getComputedLayout().top).toBe(-10);
    expect(child0.getComputedLayout().width).toBe(72);
    expect(child0.getComputedLayout().height).toBe(72);
  });

  test('margin_auto_left_fix_right_child_bigger_than_parent', () => {
    const root = Yoga.Node.create();
    root.setJustifyContent(Yoga.JUSTIFY_CENTER);
    root.setWidth(52);
    root.setHeight(52);

    const child0 = Yoga.Node.create();
    child0.setMarginAuto(Yoga.EDGE_LEFT);
    child0.setMargin(Yoga.EDGE_RIGHT, 10);
    child0.setWidth(72);
    child0.setHeight(72);
    root.insertChild(child0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(52);
    expect(root.getComputedLayout().height).toBe(52);

    expect(child0.getComputedLayout().left).toBe(0);
    expect(child0.getComputedLayout().top).toBe(-10);
    expect(child0.getComputedLayout().width).toBe(72);
    expect(child0.getComputedLayout().height).toBe(72);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(52);
    expect(root.getComputedLayout().height).toBe(52);

    expect(child0.getComputedLayout().left).toBe(-30);
    expect(child0.getComputedLayout().top).toBe(-10);
    expect(child0.getComputedLayout().width).toBe(72);
    expect(child0.getComputedLayout().height).toBe(72);
  });

  test('margin_auto_top_stretching_child', () => {
    const root = Yoga.Node.create();
    root.setAlignItems(Yoga.ALIGN_CENTER);
    root.setWidth(200);
    root.setHeight(200);

    const child0 = Yoga.Node.create();
    child0.setFlexGrow(1);
    child0.setFlexShrink(1);
    child0.setFlexBasisPercent(0);
    child0.setMarginAuto(Yoga.EDGE_TOP);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    child1.setHeight(50);
    root.insertChild(child1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(child0.getComputedLayout().left).toBe(100);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(0);
    expect(child0.getComputedLayout().height).toBe(150);

    expect(child1.getComputedLayout().left).toBe(75);
    expect(child1.getComputedLayout().top).toBe(150);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(child0.getComputedLayout().left).toBe(100);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(0);
    expect(child0.getComputedLayout().height).toBe(150);

    expect(child1.getComputedLayout().left).toBe(75);
    expect(child1.getComputedLayout().top).toBe(150);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);
  });

  test('margin_auto_left_stretching_child', () => {
    const root = Yoga.Node.create();
    root.setAlignItems(Yoga.ALIGN_CENTER);
    root.setWidth(200);
    root.setHeight(200);

    const child0 = Yoga.Node.create();
    child0.setFlexGrow(1);
    child0.setFlexShrink(1);
    child0.setFlexBasisPercent(0);
    child0.setMarginAuto(Yoga.EDGE_LEFT);
    root.insertChild(child0, 0);

    const child1 = Yoga.Node.create();
    child1.setWidth(50);
    child1.setHeight(50);
    root.insertChild(child1, 1);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(child0.getComputedLayout().left).toBe(200);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(0);
    expect(child0.getComputedLayout().height).toBe(150);

    expect(child1.getComputedLayout().left).toBe(75);
    expect(child1.getComputedLayout().top).toBe(150);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(child0.getComputedLayout().left).toBe(200);
    expect(child0.getComputedLayout().top).toBe(0);
    expect(child0.getComputedLayout().width).toBe(0);
    expect(child0.getComputedLayout().height).toBe(150);

    expect(child1.getComputedLayout().left).toBe(75);
    expect(child1.getComputedLayout().top).toBe(150);
    expect(child1.getComputedLayout().width).toBe(50);
    expect(child1.getComputedLayout().height).toBe(50);
  });
});
