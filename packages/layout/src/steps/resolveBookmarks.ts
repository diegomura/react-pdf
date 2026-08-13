import { Bookmark, DocumentNode, Node } from '../types';

type Parent = Bookmark & { ref: number; parent: number | null };

type Item = {
  value: Node;
  parent: Parent | null;
};

/**
 * Normalize bookmark value, expanding a plain string title into a full
 * bookmark object with default fit and expanded values
 *
 * @param bookmark - Bookmark value
 * @returns Normalized bookmark object
 */
const getBookmarkValue = (bookmark: string | Bookmark) => {
  return typeof bookmark === 'string'
    ? { title: bookmark, fit: false, expanded: false }
    : bookmark;
};

/**
 * Traverse document tree and resolve bookmark hierarchy, assigning each
 * bookmark a ref index and a reference to its nearest bookmark ancestor
 *
 * @param node - Document node
 * @returns Document node with resolved bookmarks
 */
const resolveBookmarks = (node: DocumentNode) => {
  let refs = 0;

  const listToExplore: Item[] = (node.children || []).map((value) => ({
    value,
    parent: null,
  }));

  while (listToExplore.length > 0) {
    const element = listToExplore.shift();

    if (!element) break;

    const child = element.value;

    let parent = element.parent;

    if (child.props && 'bookmark' in child.props && child.props.bookmark) {
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
