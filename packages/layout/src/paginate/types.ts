import FontStore from '@react-pdf/font';

import { DynamicPageProps, SafePageNode, YogaInstance } from '../types';

// Per-page pagination context: `props` maps an engine page number to the
// render props for that page, and the rest lets dynamic nodes re-measure
// themselves against the page they render on.
export type PageCtx = {
  props: (enginePageNumber: number) => DynamicPageProps;
  page: SafePageNode;
  fontStore: FontStore;
  yoga: YogaInstance;
};
