import resolveZIndex from './resolveZIndex';
import resolveRulers from './resolveRulers';
import resolveOrigins from './resolveOrigins';
import resolvePageSizes from './resolvePageSizes';
import resolvePageLayout from './resolvePageLayout';
import resolvePagination from './resolvePagination';
import resolvePageMargins from './resolvePageMargins';
import asyncCompose from '../utils/asyncCompose';

// const startTimer = name => R.tap(() => console.time(name));
// const endTimer = name => R.tap(() => console.timeEnd(name));

const layout = asyncCompose(
  resolveZIndex,
  resolveRulers,
  resolveOrigins,
  resolvePagination,
  resolvePageLayout,
  resolvePageMargins,
  resolvePageSizes,
);

export default layout;
