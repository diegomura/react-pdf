import resolveAssets from './resolveAssets';
import resolveStyles from './resolveStyles';
import resolvePageSizes from './resolvePageSizes';
import resolveDimensions from './resolveDimensions';
import resolveInheritance from './resolveInheritance';
import resolvePageMargins from './resolvePageMargins';
import resolvePagePaddings from './resolvePagePaddings';
import resolveLinkSubstitution from './resolveLinkSubstitution';
import resolveAbsoluteCoordinates from './resolveAbsoluteCoordinates';
import asyncCompose from '../utils/asyncCompose';

const layout = asyncCompose(
  resolveAbsoluteCoordinates,
  // pageWrapping
  resolveDimensions,
  resolveAssets,
  resolvePagePaddings,
  resolveInheritance,
  resolveStyles,
  resolveLinkSubstitution,
  resolvePageMargins,
  resolvePageSizes,
);

export default layout;
