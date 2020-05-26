import * as R from 'ramda';

import resolveSvg from './steps/resolveSvg';
import resolveZIndex from './steps/resolveZIndex';
import resolveRulers from './steps/resolveRulers';
import resolveAssets from './steps/resolveAssets';
import resolveStyles from './steps/resolveStyles';
import resolveOrigins from './steps/resolveOrigins';
import resolvePageSizes from './steps/resolvePageSizes';
import resolvePagination from './steps/resolvePagination';
import resolveDimensions from './steps/resolveDimensions';
import resolveTextLayout from './steps/resolveTextLayout';
import resolveInheritance from './steps/resolveInheritance';
import resolvePageMargins from './steps/resolvePageMargins';
import resolveNoteChildren from './steps/resolveNoteChildren';
import resolvePagePaddings from './steps/resolvePagePaddings';
import resolvePercentRadius from './steps/resolvePercentRadius';
import resolvePercentHeight from './steps/resolvePercentHeight';
import resolveLinkSubstitution from './steps/resolveLinkSubstitution';
import asyncCompose from './utils/asyncCompose';

const startTimer = name => R.tap(() => console.time(name));
const endTimer = name => R.tap(() => console.timeEnd(name));

const layout = asyncCompose(
  resolveZIndex,
  resolveRulers,
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
  endTimer('timer'),
  resolveNoteChildren,
  startTimer('timer'),
  resolveLinkSubstitution,
  resolvePageMargins,
  resolvePageSizes,
);

export default layout;
