const Yoga = require('../src/dist/entry-browser');

describe('yoga-layout', () => {
  test('layout works', () => {
    const config = Yoga.Config.create();

    const root = Yoga.Node.create(config);
    root.setWidth(100);
    root.setHeight(100);

    const firstChild = Yoga.Node.create(config);
    firstChild.setFlexGrow(1);
    firstChild.setFlexBasis(50);
    root.insertChild(firstChild, 0);

    const secondChild = Yoga.Node.create(config);
    secondChild.setFlexGrow(1);
    root.insertChild(secondChild, 1);
    root.calculateLayout(Yoga.UNDEFINED, Yoga.UNDEFINED, Yoga.DIRECTION_LTR);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(firstChild.getComputedLeft()).toBe(0);
    expect(firstChild.getComputedTop()).toBe(0);
    expect(firstChild.getComputedWidth()).toBe(100);
    expect(firstChild.getComputedHeight()).toBe(75);

    expect(secondChild.getComputedLeft()).toBe(0);
    expect(secondChild.getComputedTop()).toBe(75);
    expect(secondChild.getComputedWidth()).toBe(100);
    expect(secondChild.getComputedHeight()).toBe(25);

    root.calculateLayout(Yoga.UNDEFINED, Yoga.UNDEFINED, Yoga.DIRECTION_RTL);

    expect(root.getComputedLeft()).toBe(0);
    expect(root.getComputedTop()).toBe(0);
    expect(root.getComputedWidth()).toBe(100);
    expect(root.getComputedHeight()).toBe(100);

    expect(firstChild.getComputedLeft()).toBe(0);
    expect(firstChild.getComputedTop()).toBe(0);
    expect(firstChild.getComputedWidth()).toBe(100);
    expect(firstChild.getComputedHeight()).toBe(75);

    expect(secondChild.getComputedLeft()).toBe(0);
    expect(secondChild.getComputedTop()).toBe(75);
    expect(secondChild.getComputedWidth()).toBe(100);
    expect(secondChild.getComputedHeight()).toBe(25);
  });
});
