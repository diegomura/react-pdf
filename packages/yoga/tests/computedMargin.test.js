const Yoga = require('..');

describe('Computed margin', () => {
  test('computed layout margin', () => {
    const root = Yoga.Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setMarginPercent(Yoga.EDGE_START, 10);

    root.calculateLayout(100, 100, Yoga.DIRECTION_LTR);

    expect(root.getComputedMargin(Yoga.EDGE_LEFT)).toBe(10);
    expect(root.getComputedMargin(Yoga.EDGE_RIGHT)).toBe(0);

    root.calculateLayout(100, 100, Yoga.DIRECTION_RTL);

    expect(root.getComputedMargin(Yoga.EDGE_LEFT)).toBe(0);
    expect(root.getComputedMargin(Yoga.EDGE_RIGHT)).toBe(10);
  });
});
