import getPadding from '../node/getPadding';
import { SafePageNode } from '../types';

const getWrapArea = (page: SafePageNode) => {
  const height = page.style?.height as number;
  const { paddingBottom } = getPadding(page);

  return height - (paddingBottom as number);
};

export default getWrapArea;
