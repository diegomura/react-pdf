import * as R from 'ramda';

const getWrappingHeight = page => {
  const paddingTop = R.pathOr(0, ['style', 'paddingTop'], page);
  const paddingBottom = R.pathOr(0, ['style', 'paddingBottom'], page);
  const height = R.path(['style', 'height'], page);
  return height - paddingTop - paddingBottom;
};

// Default presence ahead function. Used when node does not provides one.
const defaultPresenceAhead = element => height =>
  Math.min(element.box.height, height);

const getPresenceAhead = (elements, height) => {
  let result = 0;

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const isElementInside = height > element.box.top;
    const presenceAhead =
      element.props.presenceAhead || defaultPresenceAhead(element);

    if (element && isElementInside) {
      result += presenceAhead(height - element.box.top);
    }
  }

  return result;
};

const wrapNodes = height => nodes => {
  const nextPageElements = [];

  console.log(nodes);

  for (let i = 0; i < nodes.length; i++) {
    const element = nodes[i];

    const futureElements = nodes.slice(i + 1);
    const isElementOutside = height <= element.box.top;
    const elementShouldSplit = height < element.box.top + element.box.height;
    let elementShouldBreak =
      element.props.break || (!element.props.wrap && elementShouldSplit);

    // If element is fixed, we add it both to the current page
    // and to all future pages to come.
    if (element.fixed) {
      nextPageElements.push(element);
      continue;
    }

    // If current element is outside wrapping zone, we ignore it completely.
    // Just substract page height so next time will be upper in the page's layout.
    if (isElementOutside) {
      nextPageElements.push(element);
      continue;
    }

    // Checks if element has more than the minimun presence ahead on that page.
    // If not, we break the page in this element.
    if (element.minPresenceAhead) {
      const presenceAhead = getPresenceAhead(futureElements, height);
      if (presenceAhead < element.minPresenceAhead) elementShouldBreak = true;
    }

    // Element can break based on many conditions: if has the break flag,
    // if has the wrap flag as false and should be splitted or didn't have enough
    // presence ahead. Either way, the element get's relocated on the next page,
    // as well as all other next elements.
    if (elementShouldBreak) {
      element.box.top = 0;
      element.props.break = false;

      nextPageElements.push(element, ...futureElements);
      break;
    }

    // Element is between to pages and needs to be splitted.
    // We clone the original one adjusting his dimensions, and send the
    // remaining section to be rendered on next page
    if (elementShouldSplit) {
      const clone = element.clone();
      const remainingHeight = height - element.top;

      if (element.children && element.children.length > 0) {
        const wrappedChildren = wrapNodes(element.children, remainingHeight);
        wrappedChildren.forEach(child => clone.appendChild(child));
      }

      element.onNodeSplit(remainingHeight, clone);
      nextPageElements.push(clone);

      continue;
    }
  }

  return nextPageElements;
};

const wrapPage = page => {
  const height = getWrappingHeight(page);

  const page1 = page;
  const page2 = { ...page };
  const page3 = { ...page };

  page1.children = page1.children.slice(0, 2);
  page2.children = page2.children.slice(2, 4);
  page3.children = page3.children.slice(4, 6);

  // R.compose(
  //   wrapNodes(height),
  //   R.prop('children'),
  // )(page);

  return [page1, page2, page3];
};

const resolvePageWrapping = R.evolve({
  children: R.compose(
    R.map(R.evolve({ children: R.flatten })),
    R.map(R.evolve({ children: R.map(wrapPage) })),
  ),
});

export default resolvePageWrapping;
