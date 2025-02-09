const getBookmarkValue = (title) => {
  return typeof title === 'string'
    ? { title, fit: false, expanded: false }
    : title;
};

const resolveBookmarks = (node) => {
  let refs = 0;

  const children = (node.children || []).slice(0);
  const listToExplore = children.map((value) => ({ value, parent: null }));

  while (listToExplore.length > 0) {
    const element = listToExplore.shift();
    const child = element.value;

    let parent = element.parent;

    if (child.props?.bookmark) {
      const bookmark = getBookmarkValue(child.props.bookmark);
      const ref = refs++;
      const newHierarchy = { ref, parent: parent?.ref, ...bookmark };

      child.props.bookmark = newHierarchy;
      parent = newHierarchy;
    }

    if (child.children) {
      child.children.forEach((childNode) => {
        listToExplore.push({ value: childNode, parent });
      });
    }
  }

  return node;
};

export default resolveBookmarks;
