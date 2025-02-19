import getPadding from '../node/getPadding';
import { PageNode } from '../types';

// TODO: Use safe node

const getWrapArea = (page: PageNode) => {
  const height = page.style?.height as number;
  const { paddingBottom } = getPadding(page);

  return height - (paddingBottom as number);
};

export default getWrapArea;
