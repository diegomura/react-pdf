const Yoga = require('..');

describe('Computed padding', () => {
  test('computed layout padding', () => {
    const root = Yoga.Node.create();
    root.setWidth(100);
    root.setHeight(100);
    root.setPaddingPercent(Yoga.EDGE_START, 10);

    root.calculateLayout(100, 100, Yoga.DIRECTION_LTR);

    expect(root.getComputedPadding(Yoga.EDGE_LEFT)).toBe(10);
    expect(root.getComputedPadding(Yoga.EDGE_RIGHT)).toBe(0);

    root.calculateLayout(100, 100, Yoga.DIRECTION_RTL);

    expect(root.getComputedPadding(Yoga.EDGE_LEFT)).toBe(0);
    expect(root.getComputedPadding(Yoga.EDGE_RIGHT)).toBe(10);
  });
});
