import { parseSvg, SvgNode, Viewbox } from '@react-pdf/svg';
import { SvgImage } from './types';

const UNIT_TO_PT: Record<string, number> = {
  px: 72 / 96,
  pt: 1,
  in: 72,
  cm: 72 / 2.54,
  mm: 72 / 25.4,
};

function parseNumber(value: string | null): number | undefined {
  if (!value) return undefined;

  const match = value.match(/^(-?\d*\.?\d+)(px|pt|in|cm|mm)?$/);
  if (!match) return undefined;

  const num = parseFloat(match[1]);
  const unit = match[2];

  if (!unit) return num;

  return num * (UNIT_TO_PT[unit] ?? 1);
}

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
    const width = parseNumber(parsed.width) ?? parsed.viewBox?.maxX ?? 0;
    const height = parseNumber(parsed.height) ?? parsed.viewBox?.maxY ?? 0;

    this.data = svgString;
    this.format = 'svg';
    this.width = width;
    this.height = height;
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
