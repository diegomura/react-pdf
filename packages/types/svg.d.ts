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
  strokeLineCap?: 'butt' | 'round' | 'square';
  visibility?: 'visible' | 'hidden' | 'collapse';
  dominantBaseline?:
    | 'auto'
    | 'middle'
    | 'central'
    | 'hanging'
    | 'mathematical'
    | 'text-after-edge'
    | 'text-before-edge';
}
