import { Transform } from '@react-pdf/stylesheet';
import { YogaNode } from 'yoga-layout/load';
import * as React from 'react';
import { SafeClipPathNode } from './clip-path';
import { SafeLinearGradientNode } from './linear-gradient';
import { SafeRadialGradientNode } from './radial-gradient';

export type YogaInstance = {
  node: { create: () => YogaNode };
};

export type Box = {
  width: number;
  height: number;

  top: number;
  left: number;
  right: number;
  bottom: number;

  // TODO: should be optional?
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  borderTopWidth?: number;
  borderRightWidth?: number;
  borderBottomWidth?: number;
  borderLeftWidth?: number;
};

export type Origin = {
  left: number;
  top: number;
};

export interface Bookmark {
  title: string;
  top?: number;
  left?: number;
  zoom?: number;
  fit?: true | false;
  expanded?: true | false;
  parent?: number;
  ref?: number;
}

export type DynamicPageProps = {
  pageNumber: number;
  totalPages?: number;
  subPageNumber?: number;
  subPageTotalPages?: number;
};

export type RenderProp = (
  props: DynamicPageProps,
) => React.ReactNode | null | undefined;

export type NodeProps = {
  id?: string;
  /**
   * Render component in all wrapped pages.
   * @see https://react-pdf.org/advanced#fixed-components
   */
  fixed?: boolean;
  /**
   * Force the wrapping algorithm to start a new page when rendering the
   * element.
   * @see https://react-pdf.org/advanced#page-breaks
   */
  break?: boolean;
  /**
   * Hint that no page wrapping should occur between all sibling elements following the element within n points
   * @see https://react-pdf.org/advanced#orphan-&-widow-protection
   */
  minPresenceAhead?: number;
  /**
   * Enables debug mode on page bounding box.
   * @see https://react-pdf.org/advanced#debugging
   */
  debug?: boolean;
  bookmark?: Bookmark;
};

export type FillRule = 'nonzero' | 'evenodd';

export type TextAnchor = 'start' | 'middle' | 'end';

export type StrokeLinecap = 'butt' | 'round' | 'square';

export type StrokeLinejoin = 'butt' | 'round' | 'square' | 'miter' | 'bevel';

export type Visibility = 'visible' | 'hidden' | 'collapse';

export type DominantBaseline =
  | 'auto'
  | 'middle'
  | 'central'
  | 'hanging'
  | 'mathematical'
  | 'text-after-edge'
  | 'text-before-edge';

export type SVGPresentationAttributes = {
  fill?: string;
  color?: string;
  stroke?: string;
  transform?: string;
  strokeDasharray?: string;
  opacity?: string | number;
  strokeWidth?: string | number;
  fillOpacity?: string | number;
  fillRule?: FillRule;
  strokeOpacity?: string | number;
  textAnchor?: TextAnchor;
  strokeLinecap?: StrokeLinecap;
  strokeLinejoin?: StrokeLinejoin;
  visibility?: Visibility;
  clipPath?: string;
  dominantBaseline?: DominantBaseline;
};

export type SafeSVGPresentationAttributes = {
  fill?: string | SafeLinearGradientNode | SafeRadialGradientNode;
  color?: string;
  stroke?: string;
  transform?: Transform[];
  strokeDasharray?: string;
  opacity?: number;
  strokeWidth?: number;
  fillOpacity?: number;
  fillRule?: FillRule;
  strokeOpacity?: number;
  textAnchor?: TextAnchor;
  strokeLinecap?: StrokeLinecap;
  strokeLinejoin?: StrokeLinejoin;
  visibility?: Visibility;
  clipPath?: SafeClipPathNode;
  dominantBaseline?: DominantBaseline;
};

export interface FormCommonProps extends NodeProps {
  name?: string;
  required?: boolean;
  noExport?: boolean;
  readOnly?: boolean;
  value?: number | string;
  defaultValue?: number | string;
}
