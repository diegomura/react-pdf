import { parseSvg, SvgNode } from '@react-pdf/svg';
import { SvgImage, Viewbox } from './types';

const UNIT_TO_PT: Record<string, number> = {
  px: 72 / 96,
  pt: 1,
  in: 72,
  cm: 72 / 2.54,
  mm: 72 / 25.4,
};

function parseNumber(value: unknown): number | undefined {
  if (typeof value !== 'string') return undefined;

  const match = value.match(/^(-?\d*\.?\d+)(px|pt|in|cm|mm)?$/);
  if (!match) return undefined;

  const num = parseFloat(match[1]);
  const unit = match[2];

  if (!unit) return num;

  return num * (UNIT_TO_PT[unit] ?? 1);
}

function parseViewBox(value: unknown): Viewbox | undefined {
  if (typeof value !== 'string') return undefined;

  const parts = value
    .trim()
    .split(/[\s,]+/)
    .map(Number);

  if (parts.length !== 4 || parts.some(isNaN)) return undefined;

  return {
    minX: parts[0],
    minY: parts[1],
    maxX: parts[2],
    maxY: parts[3],
  };
}

class SVG implements SvgImage {
  data: SvgNode;
  width: number;
  height: number;
  format: 'svg';

  constructor(data: Buffer) {
    const svgString = data.toString('utf-8');
    const parsed = parseSvg(svgString);
    const viewBox = parseViewBox(parsed.props.viewBox);

    this.data = parsed;
    this.format = 'svg';
    this.width = parseNumber(parsed.props.width) ?? viewBox?.maxX ?? 0;
    this.height = parseNumber(parsed.props.height) ?? viewBox?.maxY ?? 0;
  }

  static isValid(data: unknown): boolean {
    if (!Buffer.isBuffer(data)) return false;

    const str = data.toString('utf-8').trimStart();
    return str.startsWith('<?xml') || str.startsWith('<svg');
  }
}

export default SVG;
