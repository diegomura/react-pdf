import getPadding from '../node/getPadding';

const getContentArea = page => {
  const { paddingBottom } = getPadding(page);
  const height = page.style?.height;
  return height - paddingBottom;
};

export default getContentArea;
