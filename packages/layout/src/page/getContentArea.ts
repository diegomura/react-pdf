import getPadding from '../node/getPadding';
import { SafePageNode } from '../types';

const getContentArea = (page: SafePageNode) => {
  const height = page.style?.height as number;
  const { paddingTop, paddingBottom } = getPadding(page as any);

  return height - (paddingBottom as number) - (paddingTop as number);
};

export default getContentArea;
