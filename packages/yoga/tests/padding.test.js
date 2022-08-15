const Yoga = require('../src/dist/entry-browser');

describe('Paddings', () => {
  let yogaNode;
  let flexboxNode;

  beforeEach(() => {
    yogaNode = Yoga.Node.createDefault();
    flexboxNode = Yoga.Node.createDefault();
  });

  test('should have same top padding by default', () => {
    expect(yogaNode.getPadding(Yoga.EDGE_TOP)).toEqual(
      flexboxNode.getPadding(Yoga.EDGE_TOP),
    );
  });

  test('should have same left padding by default', () => {
    expect(yogaNode.getPadding(Yoga.EDGE_LEFT)).toEqual(
      flexboxNode.getPadding(Yoga.EDGE_LEFT),
    );
  });

  test('should have same bottom padding by default', () => {
    expect(yogaNode.getPadding(Yoga.EDGE_BOTTOM)).toEqual(
      flexboxNode.getPadding(Yoga.EDGE_BOTTOM),
    );
  });

  test('should have same right padding by default', () => {
    expect(yogaNode.getPadding(Yoga.EDGE_RIGHT)).toEqual(
      flexboxNode.getPadding(Yoga.EDGE_RIGHT),
    );
  });

  test('should have same vertical padding by default', () => {
    expect(yogaNode.getPadding(Yoga.EDGE_VERTICAL)).toEqual(
      flexboxNode.getPadding(Yoga.EDGE_VERTICAL),
    );
  });

  test('should have same horizontal padding by default', () => {
    expect(yogaNode.getPadding(Yoga.EDGE_HORIZONTAL)).toEqual(
      flexboxNode.getPadding(Yoga.EDGE_HORIZONTAL),
    );
  });

  test('should have same start padding by default', () => {
    expect(yogaNode.getPadding(Yoga.EDGE_START)).toEqual(
      flexboxNode.getPadding(Yoga.EDGE_START),
    );
  });

  test('should have same end padding by default', () => {
    expect(yogaNode.getPadding(Yoga.EDGE_END)).toEqual(
      flexboxNode.getPadding(Yoga.EDGE_END),
    );
  });

  test('should have same all padding by default', () => {
    expect(yogaNode.getPadding(Yoga.EDGE_ALL)).toEqual(
      flexboxNode.getPadding(Yoga.EDGE_ALL),
    );
  });

  test('should set top padding', () => {
    yogaNode.setPadding(Yoga.EDGE_TOP, 5);
    flexboxNode.setPadding(Yoga.EDGE_TOP, 5);

    expect(yogaNode.getPadding(Yoga.EDGE_TOP)).toEqual(
      flexboxNode.getPadding(Yoga.EDGE_TOP),
    );
  });

  test('should set left padding', () => {
    yogaNode.setPadding(Yoga.EDGE_LEFT, 5);
    flexboxNode.setPadding(Yoga.EDGE_LEFT, 5);

    expect(yogaNode.getPadding(Yoga.EDGE_LEFT)).toEqual(
      flexboxNode.getPadding(Yoga.EDGE_LEFT),
    );
  });

  test('should set bottom padding', () => {
    yogaNode.setPadding(Yoga.EDGE_BOTTOM, 5);
    flexboxNode.setPadding(Yoga.EDGE_BOTTOM, 5);

    expect(yogaNode.getPadding(Yoga.EDGE_BOTTOM)).toEqual(
      flexboxNode.getPadding(Yoga.EDGE_BOTTOM),
    );
  });

  test('should set right padding', () => {
    yogaNode.setPadding(Yoga.EDGE_RIGHT, 5);
    flexboxNode.setPadding(Yoga.EDGE_RIGHT, 5);

    expect(yogaNode.getPadding(Yoga.EDGE_RIGHT)).toEqual(
      flexboxNode.getPadding(Yoga.EDGE_RIGHT),
    );
  });

  test('should set vertical padding', () => {
    yogaNode.setPadding(Yoga.EDGE_VERTICAL, 5);
    flexboxNode.setPadding(Yoga.EDGE_VERTICAL, 5);

    expect(yogaNode.getPadding(Yoga.EDGE_VERTICAL)).toEqual(
      flexboxNode.getPadding(Yoga.EDGE_VERTICAL),
    );
  });

  test('should set horizontal padding', () => {
    yogaNode.setPadding(Yoga.EDGE_HORIZONTAL, 5);
    flexboxNode.setPadding(Yoga.EDGE_HORIZONTAL, 5);

    expect(yogaNode.getPadding(Yoga.EDGE_HORIZONTAL)).toEqual(
      flexboxNode.getPadding(Yoga.EDGE_HORIZONTAL),
    );
  });

  test('should set start padding', () => {
    yogaNode.setPadding(Yoga.EDGE_START, 5);
    flexboxNode.setPadding(Yoga.EDGE_START, 5);

    expect(yogaNode.getPadding(Yoga.EDGE_START)).toEqual(
      flexboxNode.getPadding(Yoga.EDGE_START),
    );
  });

  test('should set end padding', () => {
    yogaNode.setPadding(Yoga.EDGE_END, 5);
    flexboxNode.setPadding(Yoga.EDGE_END, 5);

    expect(yogaNode.getPadding(Yoga.EDGE_END)).toEqual(
      flexboxNode.getPadding(Yoga.EDGE_END),
    );
  });

  test('should set all padding', () => {
    yogaNode.setPadding(Yoga.EDGE_ALL, 5);
    flexboxNode.setPadding(Yoga.EDGE_ALL, 5);

    expect(yogaNode.getPadding(Yoga.EDGE_ALL)).toEqual(
      flexboxNode.getPadding(Yoga.EDGE_ALL),
    );
  });

  test('should set top percent padding', () => {
    yogaNode.setPaddingPercent(Yoga.EDGE_TOP, 5);
    flexboxNode.setPaddingPercent(Yoga.EDGE_TOP, 5);

    expect(yogaNode.getPadding(Yoga.EDGE_TOP)).toEqual(
      flexboxNode.getPadding(Yoga.EDGE_TOP),
    );
  });

  test('should set left percent padding', () => {
    yogaNode.setPaddingPercent(Yoga.EDGE_LEFT, 5);
    flexboxNode.setPaddingPercent(Yoga.EDGE_LEFT, 5);

    expect(yogaNode.getPadding(Yoga.EDGE_LEFT)).toEqual(
      flexboxNode.getPadding(Yoga.EDGE_LEFT),
    );
  });

  test('should set bottom percent padding', () => {
    yogaNode.setPaddingPercent(Yoga.EDGE_BOTTOM, 5);
    flexboxNode.setPaddingPercent(Yoga.EDGE_BOTTOM, 5);

    expect(yogaNode.getPadding(Yoga.EDGE_BOTTOM)).toEqual(
      flexboxNode.getPadding(Yoga.EDGE_BOTTOM),
    );
  });

  test('should set right percent padding', () => {
    yogaNode.setPaddingPercent(Yoga.EDGE_RIGHT, 5);
    flexboxNode.setPaddingPercent(Yoga.EDGE_RIGHT, 5);

    expect(yogaNode.getPadding(Yoga.EDGE_RIGHT)).toEqual(
      flexboxNode.getPadding(Yoga.EDGE_RIGHT),
    );
  });

  test('should set vertical percent padding', () => {
    yogaNode.setPaddingPercent(Yoga.EDGE_VERTICAL, 5);
    flexboxNode.setPaddingPercent(Yoga.EDGE_VERTICAL, 5);

    expect(yogaNode.getPadding(Yoga.EDGE_VERTICAL)).toEqual(
      flexboxNode.getPadding(Yoga.EDGE_VERTICAL),
    );
  });

  test('should set horizontal percent padding', () => {
    yogaNode.setPaddingPercent(Yoga.EDGE_HORIZONTAL, 5);
    flexboxNode.setPaddingPercent(Yoga.EDGE_HORIZONTAL, 5);

    expect(yogaNode.getPadding(Yoga.EDGE_HORIZONTAL)).toEqual(
      flexboxNode.getPadding(Yoga.EDGE_HORIZONTAL),
    );
  });

  test('should set start percent padding', () => {
    yogaNode.setPaddingPercent(Yoga.EDGE_START, 5);
    flexboxNode.setPaddingPercent(Yoga.EDGE_START, 5);

    expect(yogaNode.getPadding(Yoga.EDGE_START)).toEqual(
      flexboxNode.getPadding(Yoga.EDGE_START),
    );
  });

  test('should set end percent padding', () => {
    yogaNode.setPaddingPercent(Yoga.EDGE_END, 5);
    flexboxNode.setPaddingPercent(Yoga.EDGE_END, 5);

    expect(yogaNode.getPadding(Yoga.EDGE_END)).toEqual(
      flexboxNode.getPadding(Yoga.EDGE_END),
    );
  });

  test('padding_no_size', () => {
    const root = Yoga.Node.create()
    root.setPadding(Yoga.EDGE_LEFT, 10);
    root.setPadding(Yoga.EDGE_TOP, 10);
    root.setPadding(Yoga.EDGE_RIGHT, 10);
    root.setPadding(Yoga.EDGE_BOTTOM, 10);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(20);
    expect(root.getComputedLayout().height).toBe(20);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(20);
    expect(root.getComputedLayout().height).toBe(20);
  });

  test('padding_container_match_child', () => {
    const root = Yoga.Node.create()
    root.setPadding(Yoga.EDGE_LEFT, 10);
    root.setPadding(Yoga.EDGE_TOP, 10);
    root.setPadding(Yoga.EDGE_RIGHT, 10);
    root.setPadding(Yoga.EDGE_BOTTOM, 10);

    const rootChild0 = Yoga.Node.create()
    rootChild0.setWidth(10);
    rootChild0.setHeight(10);
    root.insertChild(rootChild0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(30);
    expect(root.getComputedLayout().height).toBe(30);

    expect(rootChild0.getComputedLayout().left).toBe(10);
    expect(rootChild0.getComputedLayout().top).toBe(10);
    expect(rootChild0.getComputedLayout().width).toBe(10);
    expect(rootChild0.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(30);
    expect(root.getComputedLayout().height).toBe(30);

    expect(rootChild0.getComputedLayout().left).toBe(10);
    expect(rootChild0.getComputedLayout().top).toBe(10);
    expect(rootChild0.getComputedLayout().width).toBe(10);
    expect(rootChild0.getComputedLayout().height).toBe(10);
  });

  test('padding_flex_child', () => {
    const root = Yoga.Node.create()
    root.setPadding(Yoga.EDGE_LEFT, 10);
    root.setPadding(Yoga.EDGE_TOP, 10);
    root.setPadding(Yoga.EDGE_RIGHT, 10);
    root.setPadding(Yoga.EDGE_BOTTOM, 10);
    root.setWidth(100);
    root.setHeight(100);

    const rootChild0 = Yoga.Node.create()
    rootChild0.setFlexGrow(1);
    rootChild0.setWidth(10);
    root.insertChild(rootChild0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(10);
    expect(rootChild0.getComputedLayout().top).toBe(10);
    expect(rootChild0.getComputedLayout().width).toBe(10);
    expect(rootChild0.getComputedLayout().height).toBe(80);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(80);
    expect(rootChild0.getComputedLayout().top).toBe(10);
    expect(rootChild0.getComputedLayout().width).toBe(10);
    expect(rootChild0.getComputedLayout().height).toBe(80);
  });

  test('padding_stretch_child', () => {
    const root = Yoga.Node.create()
    root.setPadding(Yoga.EDGE_LEFT, 10);
    root.setPadding(Yoga.EDGE_TOP, 10);
    root.setPadding(Yoga.EDGE_RIGHT, 10);
    root.setPadding(Yoga.EDGE_BOTTOM, 10);
    root.setWidth(100);
    root.setHeight(100);

    const rootChild0 = Yoga.Node.create()
    rootChild0.setHeight(10);
    root.insertChild(rootChild0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(10);
    expect(rootChild0.getComputedLayout().top).toBe(10);
    expect(rootChild0.getComputedLayout().width).toBe(80);
    expect(rootChild0.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(10);
    expect(rootChild0.getComputedLayout().top).toBe(10);
    expect(rootChild0.getComputedLayout().width).toBe(80);
    expect(rootChild0.getComputedLayout().height).toBe(10);
  });

  test('padding_center_child', () => {
    const root = Yoga.Node.create()
    root.setJustifyContent(Yoga.JUSTIFY_CENTER);
    root.setAlignItems(Yoga.ALIGN_CENTER);
    root.setPadding(Yoga.EDGE_START, 10);
    root.setPadding(Yoga.EDGE_END, 20);
    root.setPadding(Yoga.EDGE_BOTTOM, 20);
    root.setWidth(100);
    root.setHeight(100);

    const rootChild0 = Yoga.Node.create()
    rootChild0.setWidth(10);
    rootChild0.setHeight(10);
    root.insertChild(rootChild0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(40);
    expect(rootChild0.getComputedLayout().top).toBe(35);
    expect(rootChild0.getComputedLayout().width).toBe(10);
    expect(rootChild0.getComputedLayout().height).toBe(10);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(100);
    expect(root.getComputedLayout().height).toBe(100);

    expect(rootChild0.getComputedLayout().left).toBe(50);
    expect(rootChild0.getComputedLayout().top).toBe(35);
    expect(rootChild0.getComputedLayout().width).toBe(10);
    expect(rootChild0.getComputedLayout().height).toBe(10);
  });

  test('child_with_padding_align_end', () => {
    const root = Yoga.Node.create()
    root.setJustifyContent(Yoga.JUSTIFY_FLEX_END);
    root.setAlignItems(Yoga.ALIGN_FLEX_END);
    root.setWidth(200);
    root.setHeight(200);

    const rootChild0 = Yoga.Node.create()
    rootChild0.setPadding(Yoga.EDGE_LEFT, 20);
    rootChild0.setPadding(Yoga.EDGE_TOP, 20);
    rootChild0.setPadding(Yoga.EDGE_RIGHT, 20);
    rootChild0.setPadding(Yoga.EDGE_BOTTOM, 20);
    rootChild0.setWidth(100);
    rootChild0.setHeight(100);
    root.insertChild(rootChild0, 0);
    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_LTR);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(rootChild0.getComputedLayout().left).toBe(100);
    expect(rootChild0.getComputedLayout().top).toBe(100);
    expect(rootChild0.getComputedLayout().width).toBe(100);
    expect(rootChild0.getComputedLayout().height).toBe(100);

    root.calculateLayout(undefined, undefined, Yoga.DIRECTION_RTL);

    expect(root.getComputedLayout().left).toBe(0);
    expect(root.getComputedLayout().top).toBe(0);
    expect(root.getComputedLayout().width).toBe(200);
    expect(root.getComputedLayout().height).toBe(200);

    expect(rootChild0.getComputedLayout().left).toBe(0);
    expect(rootChild0.getComputedLayout().top).toBe(100);
    expect(rootChild0.getComputedLayout().width).toBe(100);
    expect(rootChild0.getComputedLayout().height).toBe(100);
  });
});
