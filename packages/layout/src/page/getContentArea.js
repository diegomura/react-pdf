import getPadding from '../node/getPadding';

const getContentArea = page => {
  const { paddingTop } = getPadding(page);
  const height = page.style?.height;
  return height - paddingTop;
};

export default getContentArea;
