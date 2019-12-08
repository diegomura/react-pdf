import resolveSvg from './resolveSvg';
import resolveAssets from './resolveAssets';
import resolveStyles from './resolveStyles';
import resolveDimensions from './resolveDimensions';
import resolveTextLayout from './resolveTextLayout';
import resolveInheritance from './resolveInheritance';
import resolveNoteChildren from './resolveNoteChildren';
import resolvePagePaddings from './resolvePagePaddings';
import resolvePercentRadius from './resolvePercentRadius';
import resolvePercentHeight from './resolvePercentHeight';
import resolveLinkSubstitution from './resolveLinkSubstitution';
import asyncCompose from '../utils/asyncCompose';

const resolvePageLayout = asyncCompose(
  resolveTextLayout,
  resolvePercentRadius,
  resolveDimensions,
  resolveSvg,
  resolveAssets,
  resolveInheritance,
  resolvePercentHeight,
  resolvePagePaddings,
  resolveStyles,
  resolveNoteChildren,
  resolveLinkSubstitution,
);

export default resolvePageLayout;
