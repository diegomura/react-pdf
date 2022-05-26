const renderNote = (ctx, node) => {
  const { top, left } = node.box;
  const value = node?.children?.[0].value || '';

  ctx.note(left, top, 0, 0, value);
};

export default renderNote;
