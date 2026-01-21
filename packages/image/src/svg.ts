import { SvgImage, Viewbox } from './types';
import parseSvg from './svg/parse';

/**
 * Parses SVG string and extracts metadata for react-pdf rendering
 */
class SVG implements SvgImage {
  data: string;
  width: number;
  height: number;
  format: 'svg';
  viewBox?: Viewbox;
  children: SvgImage['children'];

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

  /**
   * Check if data contains valid SVG
   * SVG files start with `<?xml` or `<svg` (with optional whitespace/BOM)
   */
  static isValid(data: unknown): boolean {
    if (!Buffer.isBuffer(data)) return false;

    const str = data.toString('utf-8').trimStart();
    return str.startsWith('<?xml') || str.startsWith('<svg');
  }
}

export default SVG;
