import getPadding from '../node/getPadding';

const getWrapArea = (page) => {
  const { paddingBottom } = getPadding(page);
  const height = page.style?.height;
  return height - paddingBottom;
};

export default getWrapArea;
