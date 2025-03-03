export interface SVGPresentationAttributes {
  fill?: string;
  color?: string;
  stroke?: string;
  transform?: string;
  strokeDasharray?: string;
  opacity?: string | number;
  strokeWidth?: string | number;
  fillOpacity?: string | number;
  fillRule?: 'nonzero' | 'evenodd';
  strokeOpacity?: string | number;
  textAnchor?: 'start' | 'middle' | 'end';
  strokeLinecap?: 'butt' | 'round' | 'square';
  strokeLinejoin?: 'butt' | 'round' | 'square' | 'miter' | 'bevel';
  visibility?: 'visible' | 'hidden' | 'collapse';
  clipPath?: string;
  dominantBaseline?:
    | 'auto'
    | 'middle'
    | 'central'
    | 'hanging'
    | 'mathematical'
    | 'text-after-edge'
    | 'text-before-edge';
}
