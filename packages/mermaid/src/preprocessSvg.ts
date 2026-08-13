import { colorMix } from './colorMix';

export interface MermaidColors {
  fg: string;
  bg: string;
  accent?: string;
  line?: string;
  muted?: string;
  surface?: string;
  border?: string;
}

/**
 * Build the CSS variable map that beautiful-mermaid's SVG uses internally.
 * These mirror the `<style>` block's variable definitions.
 */
function buildVariableMap(
  colors: MermaidColors,
  svgString: string,
): Record<string, string> {
  const { fg, bg, accent, line, muted, surface, border } = colors;

  const vars: Record<string, string> = {
    '--bg': bg,
    '--fg': fg,
    '--_text': fg,
    '--_text-sec': muted || colorMix(fg, 60, bg),
    '--_text-muted': muted || colorMix(fg, 40, bg),
    '--_text-faint': colorMix(fg, 25, bg),
    '--_line': line || colorMix(fg, 50, bg),
    '--_arrow': accent || colorMix(fg, 85, bg),
    '--_node-fill': surface || colorMix(fg, 3, bg),
    '--_node-stroke': border || colorMix(fg, 20, bg),
    '--_group-fill': bg,
    '--_group-hdr': colorMix(fg, 5, bg),
    '--_inner-stroke': colorMix(fg, 12, bg),
    '--_key-badge': colorMix(fg, 10, bg),
  };

  // Extract xychart-specific color variables from the SVG
  // beautiful-mermaid defines: --xychart-color-0, --xychart-color-1, etc. as CSS custom properties
  const xyColorRegex = /--xychart-color-(\d+):\s*([^;}\n]+)/g;
  let xyMatch;

  while ((xyMatch = xyColorRegex.exec(svgString)) !== null) {
    const varName = `--xychart-color-${xyMatch[1]}`;
    const value = xyMatch[2].trim();
    vars[varName] = resolveVarReferences(value, vars);
  }

  // Extract xychart bar fill variables
  const xyBarFillRegex = /--xychart-bar-fill-(\d+):\s*([^;}\n]+)/g;
  let xyBarMatch;

  while ((xyBarMatch = xyBarFillRegex.exec(svgString)) !== null) {
    const varName = `--xychart-bar-fill-${xyBarMatch[1]}`;
    const value = xyBarMatch[2].trim();
    vars[varName] = resolveVarReferences(value, vars);
  }

  return vars;
}

/**
 * Replace all `var(...)` references in a string with resolved values.
 */
function resolveVarReferences(
  value: string,
  vars: Record<string, string>,
): string {
  let result = value;
  let prevResult = '';

  // Iterate until stable (handles nested vars)
  while (result !== prevResult) {
    prevResult = result;
    result = result.replace(
      /var\((--[a-zA-Z0-9_-]+)(?:,\s*([^)]+))?\)/g,
      (match, name, fallback) => {
        if (vars[name]) return vars[name];
        if (fallback) return resolveVarReferences(fallback.trim(), vars);
        return match;
      },
    );
  }

  // Handle color-mix() calls that may remain after var resolution
  result = result.replace(
    /color-mix\(in srgb,\s*(#[0-9a-fA-F]{3,8})\s+(\d+)%,\s*(#[0-9a-fA-F]{3,8})(?:\s+\d+%)?\)/g,
    (_, color1, percent, color2) => colorMix(color1, Number(percent), color2),
  );

  return result;
}

/**
 * Extract fg/bg colors from the SVG root's style attribute.
 * beautiful-mermaid sets: style="--bg:#FFFFFF;--fg:#27272A;background:var(--bg)"
 */
function extractColorsFromStyle(styleAttr: string): {
  fg: string;
  bg: string;
} {
  const fgMatch = styleAttr.match(/--fg:\s*(#[0-9a-fA-F]{3,8})/);
  const bgMatch = styleAttr.match(/--bg:\s*(#[0-9a-fA-F]{3,8})/);

  return {
    fg: fgMatch?.[1] || '#27272A',
    bg: bgMatch?.[1] || '#FFFFFF',
  };
}

interface CssRule {
  /** Optional tag name constraint (e.g. "path", "circle"). Null means any tag. */
  tag: string | null;
  /** Class names that must all be present on the element. */
  classes: string[];
  properties: Record<string, string>;
}

/**
 * Parse a single CSS selector like ".foo.bar" or "path.foo" into tag + class list.
 * Returns null for selectors that can't be parsed.
 */
function parseSelector(
  selector: string,
): { tag: string | null; classes: string[] } | null {
  const trimmed = selector.trim();
  if (!trimmed || !trimmed.includes('.')) return null;

  const dotIndex = trimmed.indexOf('.');
  const tag = dotIndex > 0 ? trimmed.substring(0, dotIndex) : null;
  const classes = trimmed.substring(dotIndex).split('.').filter(Boolean);

  if (classes.length === 0) return null;
  return { tag, classes };
}

/**
 * Parse CSS rules from a `<style>` block.
 * Handles class selectors (`.foo`, `.foo.bar`), tag-qualified selectors
 * (`path.foo`), and comma-separated selectors (`path.foo, line.foo`).
 */
function parseCssRules(styleBlock: string): CssRule[] {
  const rules: CssRule[] = [];
  const ruleRegex = /([^{}]+)\{([^}]*)\}/g;

  let match;

  while ((match = ruleRegex.exec(styleBlock)) !== null) {
    const selectorStr = match[1].trim();
    const bodyStr = match[2].trim();

    // Parse declarations
    const properties: Record<string, string> = {};
    const decls = bodyStr.split(';');

    for (const decl of decls) {
      const colonIdx = decl.indexOf(':');
      if (colonIdx === -1) continue;
      const prop = decl.substring(0, colonIdx).trim();
      const val = decl.substring(colonIdx + 1).trim();
      if (prop && val) properties[prop] = val;
    }

    if (Object.keys(properties).length === 0) continue;

    // Handle comma-separated selectors: each produces its own rule
    const selectors = selectorStr.split(',');

    for (const sel of selectors) {
      const parsed = parseSelector(sel);
      if (!parsed) continue;

      rules.push({ tag: parsed.tag, classes: parsed.classes, properties });
    }
  }

  return rules;
}

/**
 * Check if an element matches a CSS rule (tag + class selectors).
 */
function matchesRule(
  tagName: string,
  classAttr: string,
  rule: CssRule,
): boolean {
  if (rule.tag && rule.tag !== tagName) return false;
  const classes = classAttr.split(/\s+/);
  return rule.classes.every((sel) => classes.includes(sel));
}

/**
 * Inline CSS class-based styles onto matching elements.
 * This handles the XY chart case where bars/grid/lines are styled entirely via CSS classes.
 */
function inlineCssStyles(
  svgString: string,
  vars: Record<string, string>,
): string {
  // Extract ALL style blocks (beautiful-mermaid may emit multiple)
  const styleBlocks = svgString.match(/<style[\s\S]*?<\/style>/g);
  if (!styleBlocks) return svgString;

  const allCss = styleBlocks
    .map((block) => block.replace(/<\/?style[^>]*>/g, ''))
    .join('\n');
  const rules = parseCssRules(allCss);
  if (rules.length === 0) return svgString;

  // For each element with a class attribute, check if any CSS rule matches
  // and add the resolved style properties as inline attributes
  return svgString.replace(
    /<(\w+)([^>]*class="([^"]*)"[^>]*)\/?>(?:<\/\1>)?/g,
    (match, tagName, attrs, classValue) => {
      const inlined: Record<string, string> = {};

      for (const rule of rules) {
        if (matchesRule(tagName, classValue, rule)) {
          for (const [prop, val] of Object.entries(rule.properties)) {
            const resolved = resolveVarReferences(val, vars);
            // Only inline SVG presentation attributes that react-pdf supports
            if (
              prop === 'fill' ||
              prop === 'stroke' ||
              prop === 'stroke-width' ||
              prop === 'stroke-linecap' ||
              prop === 'stroke-linejoin' ||
              prop === 'opacity' ||
              prop === 'fill-opacity' ||
              prop === 'stroke-opacity' ||
              prop === 'stroke-dasharray'
            ) {
              // Check if the attribute already exists on the element
              const attrRegex = new RegExp(`${prop}="`);
              if (!attrRegex.test(attrs)) {
                // Later rules override earlier ones (CSS specificity)
                inlined[prop] = resolved;
              }
            }
          }
        }
      }

      let inlineStyle = '';
      for (const [prop, val] of Object.entries(inlined)) {
        inlineStyle += ` ${prop}="${val}"`;
      }

      if (inlineStyle) {
        // Insert the new attributes before the closing > or />
        const selfClosing = match.endsWith('/>');
        const closingTag = match.match(/<\/\w+>$/)?.[0] || '';
        const openTag = closingTag ? match.slice(0, -closingTag.length) : match;
        const insertPos = selfClosing ? openTag.length - 2 : openTag.length - 1;
        return (
          openTag.slice(0, insertPos) +
          inlineStyle +
          openTag.slice(insertPos) +
          closingTag
        );
      }

      return match;
    },
  );
}

/**
 * Preprocess an SVG string from beautiful-mermaid to make it compatible with react-pdf.
 *
 * This resolves CSS variables, inlines CSS class styles, removes `<style>` blocks,
 * and removes unsupported attributes.
 */
export function preprocessSvg(
  svgString: string,
  colors?: Partial<MermaidColors>,
): string {
  // Extract colors from SVG or use provided overrides
  const styleMatch = svgString.match(/style="([^"]*)"/);
  const extracted = styleMatch
    ? extractColorsFromStyle(styleMatch[1])
    : { fg: '#27272A', bg: '#FFFFFF' };

  const mergedColors: MermaidColors = {
    fg: colors?.fg || extracted.fg,
    bg: colors?.bg || extracted.bg,
    accent: colors?.accent,
    line: colors?.line,
    muted: colors?.muted,
    surface: colors?.surface,
    border: colors?.border,
  };

  const vars = buildVariableMap(mergedColors, svgString);
  let result = svgString;

  // Inline CSS class-based styles BEFORE removing the style block
  result = inlineCssStyles(result, vars);

  // Remove <style>...</style> blocks
  result = result.replace(/<style[\s\S]*?<\/style>/g, '');

  // Remove class attributes
  result = result.replace(/\s*class="[^"]*"/g, '');

  // Resolve all var() references in attribute values
  result = result.replace(
    /="(var\(--[^"]*\))"/g,
    (_, varExpr) => `="${resolveVarReferences(varExpr, vars)}"`,
  );

  // Clean up the root SVG style attribute (remove CSS variable definitions and background)
  result = result.replace(/style="[^"]*"/, '');

  return result;
}
