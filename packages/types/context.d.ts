// instance.registerFont = vi.fn().mockReturnValue(instance);
// instance.note = vi.fn().mockReturnValue(instance);
// instance.rotate = vi.fn().mockReturnValue(instance);
// instance.scale = vi.fn().mockReturnValue(instance);
// instance.translate = vi.fn().mockReturnValue(instance);
// instance.link = vi.fn().mockReturnValue(instance);
// instance.goTo = vi.fn().mockReturnValue(instance);
// instance.addNamedDestination = vi.fn().mockReturnValue(instance);
// instance.clip = vi.fn().mockReturnValue(instance);
// instance.closePath = vi.fn().mockReturnValue(instance);
// instance.path = vi.fn().mockReturnValue(instance);
// instance.radialGradient = vi.fn().mockReturnValue(instance);
// instance.linearGradient = vi.fn().mockReturnValue(instance);
// instance.fontSize = vi.fn().mockReturnValue(instance);
// instance.text = vi.fn().mockReturnValue(instance);
// instance.font = vi.fn().mockReturnValue(instance);

interface DocumentInfo {
  Producer?: string;
  Creator?: string;
  CreationDate?: Date;
  Title?: string;
  Author?: string;
  Keywords?: string;
  ModDate?: Date;
}

interface PageOption {
  margin?: number;
  size?: number[] | string;
}

interface ImageOption {
  width?: number;
  height?: number;
}

type ColorValue = string;

export interface Context {
  info: DocumentInfo;
  undash(): this;
  end: () => void;
  save: () => this;
  restore: () => this;
  lineCap(c: string): this;
  miterLimit(m: any): this;
  lineJoin(j: string): this;
  lineWidth(w: number): this;
  fill(color?: ColorValue): this;
  stroke(color?: ColorValue): this;
  moveTo(x: number, y: number): this;
  lineTo(x: number, y: number): this;
  opacity(opacity: number): this;
  fillOpacity(opacity: number): this;
  addPage(options?: PageOption): this;
  polygon(...points: number[][]): this;
  strokeOpacity(opacity: number): this;
  dash(length: number, option: any): this;
  circle(x: number, y: number, raduis: number): this;
  fillColor(color: ColorValue, opacity?: number): this;
  rect(x: number, y: number, w: number, h: number): this;
  strokeColor(color: ColorValue, opacity?: number): this;
  ellipse(x: number, y: number, r1: number, r2?: number): this;
  quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): this;
  image(src: any, x?: number, y?: number, options?: ImageOption): Context;
  roundedRect(x: number, y: number, w: number, h: number, r?: number): this;
  bezierCurveTo(
    cp1x: number,
    cp1y: number,
    cp2x: number,
    cp2y: number,
    x: number,
    y: number,
  ): this;
}
