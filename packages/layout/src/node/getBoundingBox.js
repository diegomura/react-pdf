const getBoundingBox = node => {
  const { box } = node;

  if (!box) return null;

  return {
    x: box.left - box.marginLeft,
    y: box.top - box.marginTop,
    width: box.width + box.marginLeft + box.marginRight,
    height: box.height + box.marginTop + box.marginBottom,
  };
};

export default getBoundingBox;
