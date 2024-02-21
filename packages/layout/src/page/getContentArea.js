import getPadding from '../node/getPadding';

const getContentArea = (page) => {
  const height = page.style?.height;
  const { paddingTop, paddingBottom } = getPadding(page);

  return height - paddingBottom - paddingTop;
};

export default getContentArea;
