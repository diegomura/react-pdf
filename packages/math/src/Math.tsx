import { latexToSvg } from './mathjax';
import { parseSvg } from './parseSvg';
import { mapSvgNode } from './mapSvg';

interface MathProps {
  /**
   * LaTeX math expression to render.
   * e.g. "\\frac{1}{2}" or "E = mc^2"
   */
  children: string;
  /**
   * Whether to render in inline mode (compact) instead of display mode (centered, larger).
   * @default false
   */
  inline?: boolean;
  /**
   * Width of the SVG element. If not provided, the SVG width is left undefined
   */
  width?: number | string;
  /**
   * Height of the SVG element. If not provided, the SVG height is left undefined
   */
  height?: number | string;
  /**
   * Color for the math expression.
   * @default "black"
   */
  color?: string;
  /**
   * Adds a visible border around the SVG element for debugging layout.
   * @default false
   */
  debug?: boolean;
}

/**
 * Renders a LaTeX math expression as SVG in a react-pdf document.
 *
 * @example
 * ```tsx
 * <Math width={200} height={40}>{"\\int_0^\\infty e^{-x^2} dx"}</Math>
 * ```
 */
const Math = ({
  children,
  inline = false,
  width,
  height,
  color = 'black',
  debug = false,
}: MathProps) => {
  const svgString = latexToSvg(children, { display: !inline });
  const svgTree = parseSvg(svgString);

  if (!svgTree) return null;

  return mapSvgNode(svgTree, 'math', { width, height, color, debug });
};

export default Math;
