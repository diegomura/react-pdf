import { describe, expect, test } from 'vitest';
import { preprocessSvg } from '../src/preprocessSvg';

describe('preprocessSvg', () => {
  test('removes style blocks', () => {
    const svg =
      '<svg><style>text { font-family: Inter; }</style><rect fill="red"/></svg>';
    const result = preprocessSvg(svg, { fg: '#000000', bg: '#FFFFFF' });

    expect(result).not.toContain('<style>');
    expect(result).toContain('<rect');
  });

  test('preserves defs blocks with markers', () => {
    const svg =
      '<svg><defs><marker id="arrow"><polygon points="0 0, 8 2.5, 0 5"/></marker></defs><rect fill="red"/></svg>';
    const result = preprocessSvg(svg, { fg: '#000000', bg: '#FFFFFF' });

    expect(result).toContain('<defs>');
    expect(result).toContain('<marker');
    expect(result).toContain('<rect');
  });

  test('preserves marker-end attributes', () => {
    const svg = '<svg><line marker-end="url(#arrow)" x1="0" y1="0"/></svg>';
    const result = preprocessSvg(svg, { fg: '#000000', bg: '#FFFFFF' });

    expect(result).toContain('marker-end');
  });

  test('preserves marker-start attributes', () => {
    const svg = '<svg><line marker-start="url(#arrow)" x1="0" y1="0"/></svg>';
    const result = preprocessSvg(svg, { fg: '#000000', bg: '#FFFFFF' });

    expect(result).toContain('marker-start');
  });

  test('removes class attributes', () => {
    const svg = '<svg><g class="node"><rect fill="red"/></g></svg>';
    const result = preprocessSvg(svg, { fg: '#000000', bg: '#FFFFFF' });

    expect(result).not.toContain('class=');
  });

  test('resolves var(--_text) to fg color', () => {
    const svg = '<svg><text fill="var(--_text)">Hello</text></svg>';
    const result = preprocessSvg(svg, { fg: '#333333', bg: '#FFFFFF' });

    expect(result).toContain('fill="#333333"');
    expect(result).not.toContain('var(');
  });

  test('resolves var(--_node-fill) to computed color', () => {
    const svg = '<svg><rect fill="var(--_node-fill)"/></svg>';
    const result = preprocessSvg(svg, { fg: '#000000', bg: '#FFFFFF' });

    // 3% of black mixed with 97% white ≈ very light gray
    expect(result).not.toContain('var(');
    expect(result).toMatch(/fill="#[0-9a-f]{6}"/);
  });

  test('resolves var(--bg) to background color', () => {
    const svg = '<svg><rect fill="var(--bg)"/></svg>';
    const result = preprocessSvg(svg, { fg: '#000000', bg: '#FF0000' });

    expect(result).toContain('fill="#FF0000"');
  });

  test('uses custom accent color when provided', () => {
    const svg = '<svg><polygon fill="var(--_arrow)"/></svg>';
    const result = preprocessSvg(svg, {
      fg: '#000000',
      bg: '#FFFFFF',
      accent: '#0000FF',
    });

    expect(result).toContain('fill="#0000FF"');
  });

  test('uses custom surface color for node fill', () => {
    const svg = '<svg><rect fill="var(--_node-fill)"/></svg>';
    const result = preprocessSvg(svg, {
      fg: '#000000',
      bg: '#FFFFFF',
      surface: '#EEEEFF',
    });

    expect(result).toContain('fill="#EEEEFF"');
  });

  test('extracts colors from SVG style attribute when not provided', () => {
    const svg =
      '<svg style="--bg:#F0F0F0;--fg:#1A1A1A;background:var(--bg)"><text fill="var(--_text)">Hi</text></svg>';
    const result = preprocessSvg(svg);

    expect(result).toContain('fill="#1A1A1A"');
  });

  test('inlines CSS class-based fill and stroke onto matching elements', () => {
    const svg = `<svg style="--bg:#FFFFFF;--fg:#27272A">
<style>.xychart-bar { stroke-width: 1.5; }</style>
<style>.xychart-bar.xychart-color-0 { stroke: #3b82f6; fill: #d4e4fd; }</style>
<path d="M10,10 L20,20" class="xychart-bar xychart-color-0" data-value="30"/>
</svg>`;
    const result = preprocessSvg(svg, { fg: '#27272A', bg: '#FFFFFF' });

    // CSS class styles should be inlined as attributes
    expect(result).toContain('fill="#d4e4fd"');
    expect(result).toContain('stroke="#3b82f6"');
    expect(result).toContain('stroke-width="1.5"');
    // class attributes should be removed
    expect(result).not.toContain('class=');
    // style blocks should be removed
    expect(result).not.toContain('<style>');
  });

  test('resolves CSS var references in class-based styles', () => {
    const svg = `<svg style="--bg:#FFFFFF;--fg:#27272A">
<style>.xychart-label { fill: var(--_text-muted); }</style>
<text class="xychart-label">Jan</text>
</svg>`;
    const result = preprocessSvg(svg, { fg: '#27272A', bg: '#FFFFFF' });

    // var(--_text-muted) should be resolved to a hex color
    expect(result).toMatch(/fill="#[0-9a-fA-F]{6}"/);
    expect(result).not.toContain('var(');
  });

  test('cleans root style attribute', () => {
    const svg =
      '<svg style="--bg:#FFFFFF;--fg:#27272A;background:var(--bg)"><rect fill="red"/></svg>';
    const result = preprocessSvg(svg, { fg: '#000000', bg: '#FFFFFF' });

    expect(result).not.toContain('--bg:');
    expect(result).not.toContain('background:');
  });
});
