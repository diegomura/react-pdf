const renderNote = (ctx, node) => {
  const { top, left } = node.box;
  const value = node?.children?.[0].value || '';
  const color = node.style?.backgroundColor || null;
  const borderWidth = node.style?.borderWidth || null;

  ctx.note(left, top, 0, 0, value, { color, borderWidth });
};

export default renderNote;
