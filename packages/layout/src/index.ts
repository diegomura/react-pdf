import { asyncCompose } from '@react-pdf/fns';

import resolveSvg from './steps/resolveSvg';
import resolveYoga from './steps/resolveYoga';
import resolveZIndex from './steps/resolveZIndex';
import resolveAssets from './steps/resolveAssets';
import resolveStyles from './steps/resolveStyles';
import resolveOrigins from './steps/resolveOrigins';
import resolveBookmarks from './steps/resolveBookmarks';
import resolvePageSizes from './steps/resolvePageSizes';
import resolvePagination from './steps/resolvePagination';
import resolveDimensions from './steps/resolveDimensions';
import resolveTextLayout from './steps/resolveTextLayout';
import resolveInheritance from './steps/resolveInheritance';
import resolvePagePaddings from './steps/resolvePagePaddings';
import resolvePageTemplates from './steps/resolvePageTemplates';
import resolvePercentRadius from './steps/resolvePercentRadius';
import resolvePercentHeight from './steps/resolvePercentHeight';
import resolveLinkSubstitution from './steps/resolveLinkSubstitution';
import resolvePaginationNext from './paginate';
import { SafeDocumentNode } from './types';

// The new pagination engine, shipped dark: flip to true to enable.
const NEXT_PAGINATION: boolean = false;

const paginationStep = (root: SafeDocumentNode, fontStore) =>
  NEXT_PAGINATION
    ? resolvePaginationNext(root, fontStore)
    : resolvePagination(root, fontStore);

const layout = asyncCompose(
  resolveZIndex,
  resolveOrigins,
  resolveAssets,
  paginationStep,
  resolveTextLayout,
  resolvePercentRadius,
  resolveDimensions,
  resolveSvg,
  resolveAssets,
  resolveInheritance,
  resolvePercentHeight,
  resolvePagePaddings,
  resolveStyles,
  resolveLinkSubstitution,
  resolveBookmarks,
  resolvePageTemplates,
  resolvePageSizes,
  resolveYoga,
);

export * from './types';

export default layout;
