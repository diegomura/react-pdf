import resolveAssets from './resolveAssets';
import resolveStyles from './resolveStyles';
import resolveOrigins from './resolveOrigins';
import resolvePageSizes from './resolvePageSizes';
import resolveDimensions from './resolveDimensions';
import resolveTextLayout from './resolveTextLayout';
import resolveInheritance from './resolveInheritance';
import resolvePageMargins from './resolvePageMargins';
import resolvePagePaddings from './resolvePagePaddings';
import resolvePercentRadius from './resolvePercentRadius';
import resolveLinkSubstitution from './resolveLinkSubstitution';
import resolveAbsoluteCoordinates from './resolveAbsoluteCoordinates';
import asyncCompose from '../utils/asyncCompose';

const layout = asyncCompose(
  resolveAbsoluteCoordinates,
  resolveOrigins,
  // pageWrapping
  resolveTextLayout,
  resolvePercentRadius,
  resolveDimensions, // Expensive!
  resolveAssets,
  resolveInheritance,
  resolvePagePaddings,
  resolveStyles,
  resolveLinkSubstitution,
  resolvePageMargins,
  resolvePageSizes,
);

export default layout;
