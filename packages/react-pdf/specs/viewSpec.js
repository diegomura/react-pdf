import Page from '../src/elements/Page';
import View from '../src/elements/View';

describe('<View />', () => {
  test('Should corectly splice empty view', () => {
    const page = new Page(null, { style: { width: 400, height: 800 } });
    const view = new View(null, { style: { width: 400, height: 400 } });

    page.appendChild(view);
    page.applyProps();
    page.wrapPage();

    const res = view.splice(100);

    expect(view.height).toBe(100);
    expect(res.height).toBe(300);
  });

  test('Should corectly splice empty view with padding', () => {
    const page = new Page();
    const view = new View(null, {
      style: { width: 400, height: 400, padding: 20 },
    });

    page.appendChild(view);
    page.applyProps();
    page.wrapPage();

    const res = view.splice(100);

    // Assert original view
    expect(view.height).toBe(100);
    expect(view.paddingTop).toBe(20);
    expect(view.paddingLeft).toBe(20);
    expect(view.paddingRight).toBe(20);
    expect(view.paddingBottom).toBeCloseTo(0);

    // Assert splice result
    expect(res.height).toBe(300);
    expect(res.paddingTop).toBeCloseTo(0);
    expect(res.paddingLeft).toBe(20);
    expect(res.paddingRight).toBe(20);
    expect(res.paddingBottom).toBe(20);
  });

  test('Should corectly splice empty view with margin', () => {
    const page = new Page();
    const view = new View(null, {
      style: { width: 400, height: 400, margin: 20 },
    });

    page.appendChild(view);
    page.applyProps();
    page.wrapPage();

    const res = view.splice(100);

    // Assert original view
    expect(view.height).toBe(100);
    expect(view.marginTop).toBe(20);
    expect(view.marginLeft).toBe(20);
    expect(view.marginRight).toBe(20);
    expect(view.marginBottom).toBeCloseTo(0);

    // Assert splice result
    expect(res.height).toBe(340);
    expect(res.marginTop).toBeCloseTo(0);
    expect(res.marginLeft).toBe(20);
    expect(res.marginRight).toBe(20);
    expect(res.marginBottom).toBe(20);
  });

  test('Should corectly splice empty view with margin and padding', () => {
    const page = new Page();
    const view = new View(null, {
      style: { width: 400, height: 400, margin: 20, padding: 30 },
    });

    page.appendChild(view);
    page.applyProps();
    page.wrapPage();

    const res = view.splice(100);

    // Assert original view
    expect(view.height).toBe(100);
    expect(view.paddingTop).toBe(30);
    expect(view.paddingLeft).toBe(30);
    expect(view.paddingRight).toBe(30);
    expect(view.paddingBottom).toBeCloseTo(0);
    expect(view.marginTop).toBe(20);
    expect(view.marginLeft).toBe(20);
    expect(view.marginRight).toBe(20);
    expect(view.marginBottom).toBeCloseTo(0);

    // Assert splice result
    expect(res.height).toBe(340);
    expect(res.paddingTop).toBeCloseTo(0);
    expect(res.paddingLeft).toBe(30);
    expect(res.paddingRight).toBe(30);
    expect(res.paddingBottom).toBe(30);
    expect(res.marginTop).toBeCloseTo(0);
    expect(res.marginLeft).toBe(20);
    expect(res.marginRight).toBe(20);
    expect(res.marginBottom).toBe(20);
  });

  test('Should corectly splice view with children', () => {
    const page = new Page(null, { style: { width: 400, height: 800 } });
    const parent = new View(null, {
      style: { width: 400, height: 400, padding: 10, margin: 20 },
    });
    const child1 = new View(null, {
      style: { height: 190, backgroundColor: 'red' },
    });
    const child2 = new View(null, {
      style: { height: 190, backgroundColor: 'blue' },
    });

    page.appendChild(parent);
    parent.appendChild(child1);
    parent.appendChild(child2);
    page.applyProps();
    page.wrapPage();

    const res = parent.splice(100);

    // Assert original view & his children
    expect(parent.height).toBe(100);
    expect(parent.children.length).toBe(1);
    expect(parent.children[0].height).toBe(70);
    expect(parent.children[0].style.backgroundColor).toBe('red');

    // Assert splice result & his children
    expect(res.height).toBe(340);
    expect(res.children.length).toBe(2);
    expect(res.children[0].height).toBe(120);
    expect(res.children[0].style.backgroundColor).toBe('red');
    expect(res.children[1].style.backgroundColor).toBe('blue');
  });

  test('Fixed elements should persist when spliced', () => {
    const page = new Page(null, { style: { width: 400, height: 800 } });
    const parent = new View(null, { style: { width: 400, height: 400 } });
    const fixed = new View(null, { style: { height: 20 }, fixed: true });
    const child1 = new View(null, { style: { height: 150 } });
    const child2 = new View(null, { style: { height: 150 } });

    page.appendChild(parent);
    parent.appendChild(fixed);
    parent.appendChild(child1);
    parent.appendChild(child2);
    page.applyProps();
    page.wrapPage();

    const res = parent.splice(100);

    // Assert original view & his children
    expect(parent.children.length).toBe(2);
    expect(parent.children[0].height).toBe(20);

    // Assert splice result & his children
    expect(res.children.length).toBe(3);
    expect(res.children[0].height).toBe(20);
  });

  test('Should add page break if break present on splice', () => {
    const page = new Page(null, { style: { width: 400, height: 800 } });
    const parent = new View(null, { style: { width: 400, height: 400 } });
    const child1 = new View(null, { style: { height: 50 } });
    const child2 = new View(null, { style: { height: 150 }, break: true });

    page.appendChild(parent);
    parent.appendChild(child1);
    parent.appendChild(child2);
    page.applyProps();
    page.wrapPage();

    const res = parent.splice(100);

    // Assert original view & his children
    expect(parent.children.length).toBe(1);
    expect(parent.children[0].style.height).toBe(50);

    // Assert splice result & his children
    expect(res.children.length).toBe(1);
    expect(res.children[0].style.height).toBe(150);
  });
});
