import { asyncCompose } from '@react-pdf/fns';

import resolveSvg from './steps/resolveSvg';
import resolveZIndex from './steps/resolveZIndex';
import resolveAssets from './steps/resolveAssets';
import resolveStyles from './steps/resolveStyles';
import resolveOrigins from './steps/resolveOrigins';
import resolvePageSizes from './steps/resolvePageSizes';
import resolvePagination from './steps/resolvePagination';
import resolveDimensions from './steps/resolveDimensions';
import resolveTextLayout from './steps/resolveTextLayout';
import resolveInheritance from './steps/resolveInheritance';
import resolvePagePaddings from './steps/resolvePagePaddings';
import resolvePercentRadius from './steps/resolvePercentRadius';
import resolvePercentHeight from './steps/resolvePercentHeight';
import resolveLinkSubstitution from './steps/resolveLinkSubstitution';

const layout = asyncCompose(
  resolveZIndex,
  resolveOrigins,
  resolvePagination,
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
  resolvePageSizes,
);

export default layout;
