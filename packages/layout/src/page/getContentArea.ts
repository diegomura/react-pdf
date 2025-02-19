import getPadding from '../node/getPadding';
import { PageNode } from '../types';

// TODO: Use safe node
const getContentArea = (page: PageNode) => {
  const height = page.style?.height as number;
  const { paddingTop, paddingBottom } = getPadding(page);

  return height - (paddingBottom as number) - (paddingTop as number);
};

export default getContentArea;
