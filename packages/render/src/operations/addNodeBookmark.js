const addNodeBookmark = (ctx, node, pageNumber, registry) => {
  const bookmark = node.props?.bookmark;

  if (bookmark) {
    const { title, parent, expanded, zoom, fit } = bookmark;
    const outline = registry[parent] || ctx.outline;
    const top = bookmark.top || node.box.top;
    const left = bookmark.left || node.box.left;
    const instance = outline.addItem(title, {
      pageNumber,
      expanded,
      top,
      left,
      zoom,
      fit,
    });
    registry[bookmark.ref] = instance;
  }

  if (!node.children) return;

  node.children.forEach((child) =>
    addNodeBookmark(ctx, child, pageNumber, registry),
  );
};

export default addNodeBookmark;
