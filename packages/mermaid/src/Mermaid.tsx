import { mermaidToSvg } from './render';
import { preprocessSvg } from './preprocessSvg';
import { parseSvg } from '@react-pdf/svg';
import { mapSvgNode } from './mapSvg';
import type { MermaidRenderOptions } from './render';

interface MermaidProps {
  /**
   * Mermaid diagram definition string.
   * @example
   * ```
   * graph TD
   *   A[Start] --> B{Decision}
   *   B -->|Yes| C[OK]
   *   B -->|No| D[End]
   * ```
   */
  children: string;
  /**
   * Width of the rendered SVG. If not provided, derived from viewBox aspect ratio.
   */
  width?: number | string;
  /**
   * Height of the rendered SVG. If not provided, derived from viewBox aspect ratio.
   */
  height?: number | string;
  /**
   * Foreground/text color.
   * @default "black"
   */
  color?: string;
  /**
   * Background color for the diagram.
   */
  bg?: string;
  /**
   * Accent color (arrowheads, highlights).
   */
  accent?: string;
  /**
   * Edge/connector stroke color.
   */
  line?: string;
  /**
   * Secondary text and label color.
   */
  muted?: string;
  /**
   * Node fill tint color.
   */
  surface?: string;
  /**
   * Node stroke color.
   */
  border?: string;
  /**
   * Use transparent background.
   */
  transparent?: boolean;
  /**
   * Built-in theme name.
   * Available: 'tokyo-night', 'tokyo-night-storm', 'tokyo-night-light',
   * 'catppuccin-mocha', 'catppuccin-latte', 'nord', 'nord-light',
   * 'dracula', 'github-dark', 'github-light', 'solarized-dark',
   * 'solarized-light', 'one-dark', 'zinc-dark', 'zinc-light'
   */
  theme?: string;
  /**
   * Adds a visible border around the SVG element for debugging layout.
   * @default false
   */
  debug?: boolean;
}

/**
 * Renders a Mermaid diagram as SVG in a react-pdf document.
 *
 * @example
 * ```tsx
 * <Mermaid width={400} height={300}>
 *   {`graph TD
 *     A[Start] --> B{Decision}
 *     B -->|Yes| C[OK]
 *     B -->|No| D[End]`}
 * </Mermaid>
 * ```
 */
const Mermaid = ({
  children,
  width,
  height,
  color,
  bg,
  accent,
  line,
  muted,
  surface,
  border,
  transparent,
  theme,
  debug = false,
}: MermaidProps) => {
  const renderOptions: MermaidRenderOptions = {};

  if (color) renderOptions.fg = color;
  if (bg) renderOptions.bg = bg;
  if (accent) renderOptions.accent = accent;
  if (line) renderOptions.line = line;
  if (muted) renderOptions.muted = muted;
  if (surface) renderOptions.surface = surface;
  if (border) renderOptions.border = border;
  if (transparent) renderOptions.transparent = transparent;
  if (theme) renderOptions.theme = theme;

  const rawSvg = mermaidToSvg(children, renderOptions);

  const svgString = preprocessSvg(rawSvg, {
    fg: color,
    bg,
    accent,
    line,
    muted,
    surface,
    border,
  });

  const svgTree = parseSvg(svgString);

  if (!svgTree) return null;

  const svgWidth = width ?? svgTree.props.width;
  const svgHeight = height ?? svgTree.props.height;

  return mapSvgNode(svgTree, 'mermaid', {
    width: svgWidth ? Number(svgWidth) : undefined,
    height: svgHeight ? Number(svgHeight) : undefined,
    color: color || 'black',
    debug,
  });
};

export default Mermaid;
