import getPadding from '../node/getPadding';

const getContentArea = (page) => {
  const height = page.style?.height;
  const { paddingTop, paddingBottom } = getPadding(page);

  return {
    contentArea: height - paddingBottom - paddingTop,
    paddingTop,
    paddingBottom,
  };
};

export default getContentArea;
