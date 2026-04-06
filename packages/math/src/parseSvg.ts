export interface SvgNode {
  tagName: string;
  attributes: Record<string, string>;
  children: SvgNode[];
}

const SELF_CLOSING_TAGS = new Set([
  'path',
  'rect',
  'circle',
  'ellipse',
  'line',
  'polygon',
  'polyline',
  'use',
]);

function parseAttributes(str: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  const regex = /([a-zA-Z][a-zA-Z0-9_:-]*)\s*=\s*"([^"]*)"/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(str)) !== null) {
    attrs[match[1]] = match[2];
  }

  return attrs;
}

/**
 * Minimal XML parser for MathJax SVG output.
 * Only handles the subset of SVG that MathJax produces.
 */
export function parseSvg(svgString: string): SvgNode | null {
  const tokens: Array<
    | { type: 'open'; tagName: string; attributes: Record<string, string> }
    | {
        type: 'self-close';
        tagName: string;
        attributes: Record<string, string>;
      }
    | { type: 'close'; tagName: string }
  > = [];

  const tagRegex =
    /<\/?([a-zA-Z][a-zA-Z0-9-]*)((?:\s+[a-zA-Z][a-zA-Z0-9_:-]*\s*=\s*"[^"]*")*)\s*(\/?)>/g;

  let match: RegExpExecArray | null;

  while ((match = tagRegex.exec(svgString)) !== null) {
    const [fullMatch, tagName, attrString, selfClose] = match;

    if (fullMatch.startsWith('</')) {
      tokens.push({ type: 'close', tagName });
    } else if (selfClose === '/' || SELF_CLOSING_TAGS.has(tagName)) {
      tokens.push({
        type: 'self-close',
        tagName,
        attributes: parseAttributes(attrString),
      });
    } else {
      tokens.push({
        type: 'open',
        tagName,
        attributes: parseAttributes(attrString),
      });
    }
  }

  const stack: SvgNode[] = [];
  let root: SvgNode | null = null;

  for (const token of tokens) {
    if (token.type === 'open') {
      const node: SvgNode = {
        tagName: token.tagName,
        attributes: token.attributes,
        children: [],
      };

      if (stack.length > 0) {
        stack[stack.length - 1].children.push(node);
      }

      stack.push(node);

      if (!root) root = node;
    } else if (token.type === 'self-close') {
      const node: SvgNode = {
        tagName: token.tagName,
        attributes: token.attributes,
        children: [],
      };

      if (stack.length > 0) {
        stack[stack.length - 1].children.push(node);
      }

      if (!root) root = node;
    } else if (token.type === 'close') {
      // Skip closing tags for elements treated as self-closing,
      // since they were never pushed onto the stack.
      if (SELF_CLOSING_TAGS.has(token.tagName)) continue;
      stack.pop();
    }
  }

  return root;
}
