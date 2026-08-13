import { renderMermaidSVG } from 'beautiful-mermaid';

export interface MermaidRenderOptions {
  bg?: string;
  fg?: string;
  accent?: string;
  line?: string;
  muted?: string;
  surface?: string;
  border?: string;
  transparent?: boolean;
  theme?: string;
}

export function mermaidToSvg(
  definition: string,
  options?: MermaidRenderOptions,
): string {
  return renderMermaidSVG(definition, options as any);
}
