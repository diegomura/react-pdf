import { parseSvg, SvgNode, Viewbox } from '@react-pdf/svg';
import { SvgImage } from './types';

class SVG implements SvgImage {
  data: string;
  width: number;
  height: number;
  format: 'svg';
  viewBox?: Viewbox;
  children: SvgNode[];

  constructor(data: Buffer) {
    const svgString = data.toString('utf-8');
    const parsed = parseSvg(svgString);

    this.data = svgString;
    this.format = 'svg';
    this.width = parsed.width;
    this.height = parsed.height;
    this.viewBox = parsed.viewBox;
    this.children = parsed.children;
  }

  static isValid(data: unknown): boolean {
    if (!Buffer.isBuffer(data)) return false;

    const str = data.toString('utf-8').trimStart();
    return str.startsWith('<?xml') || str.startsWith('<svg');
  }
}

export default SVG;
