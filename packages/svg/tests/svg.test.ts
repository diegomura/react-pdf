import { describe, expect, test, vi } from 'vitest';

import { parseSvg } from '../src/svg';

describe('parseSvg', () => {
  test('should parse SVG and extract dimensions', () => {
    const result = parseSvg(
      '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="150"></svg>',
    );

    expect(result.width).toBe(200);
    expect(result.height).toBe(150);
  });

  test('should parse SVG with viewBox', () => {
    const result = parseSvg(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"></svg>',
    );

    expect(result.viewBox).toEqual({
      minX: 0,
      minY: 0,
      maxX: 100,
      maxY: 100,
    });
  });

  test('should use viewBox dimensions when width/height not specified', () => {
    const result = parseSvg(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"></svg>',
    );

    expect(result.width).toBe(300);
    expect(result.height).toBe(200);
  });

  test('should parse width/height with px unit (1px = 0.75pt)', () => {
    const result = parseSvg(
      '<svg xmlns="http://www.w3.org/2000/svg" width="96px" height="48px"></svg>',
    );

    expect(result.width).toBe(72); // 96px * 0.75 = 72pt
    expect(result.height).toBe(36); // 48px * 0.75 = 36pt
  });

  test('should parse width/height with pt unit (1pt = 1)', () => {
    const result = parseSvg(
      '<svg xmlns="http://www.w3.org/2000/svg" width="72pt" height="36pt"></svg>',
    );

    expect(result.width).toBe(72);
    expect(result.height).toBe(36);
  });

  test('should parse width/height with in unit (1in = 72pt)', () => {
    const result = parseSvg(
      '<svg xmlns="http://www.w3.org/2000/svg" width="1in" height="2in"></svg>',
    );

    expect(result.width).toBe(72);
    expect(result.height).toBe(144);
  });

  test('should parse width/height with cm unit (1cm ≈ 28.35pt)', () => {
    const result = parseSvg(
      '<svg xmlns="http://www.w3.org/2000/svg" width="2.54cm" height="5.08cm"></svg>',
    );

    expect(result.width).toBeCloseTo(72, 1);
    expect(result.height).toBeCloseTo(144, 1);
  });

  test('should parse width/height with mm unit (1mm ≈ 2.835pt)', () => {
    const result = parseSvg(
      '<svg xmlns="http://www.w3.org/2000/svg" width="25.4mm" height="50.8mm"></svg>',
    );

    expect(result.width).toBeCloseTo(72, 1);
    expect(result.height).toBeCloseTo(144, 1);
  });

  test('should parse SVG children elements', () => {
    const result = parseSvg(
      '<svg xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="80" height="80"/></svg>',
    );

    expect(result.children.length).toBe(1);
    expect(result.children[0].type).toBe('RECT');
    expect(result.children[0].props.x).toBe('10');
  });

  test('should parse nested SVG elements', () => {
    const result = parseSvg(
      '<svg xmlns="http://www.w3.org/2000/svg"><g><rect/><circle/></g></svg>',
    );

    expect(result.children.length).toBe(1);
    expect(result.children[0].type).toBe('G');
    expect(result.children[0].children?.length).toBe(2);
  });

  test('should convert attribute names to camelCase', () => {
    const result = parseSvg(
      '<svg xmlns="http://www.w3.org/2000/svg"><rect stroke-width="2" fill-opacity="0.5"/></svg>',
    );

    expect(result.children[0].props.strokeWidth).toBe('2');
    expect(result.children[0].props.fillOpacity).toBe('0.5');
  });

  test('should parse style attribute into individual properties', () => {
    const result = parseSvg(
      '<svg xmlns="http://www.w3.org/2000/svg"><stop style="stop-color:#ff6b6b;stop-opacity:1"/></svg>',
    );

    expect(result.children[0].props.stopColor).toBe('#ff6b6b');
    expect(result.children[0].props.stopOpacity).toBe('1');
  });

  test('should parse style attribute with various CSS properties', () => {
    const result = parseSvg(
      '<svg xmlns="http://www.w3.org/2000/svg"><rect style="fill:red;stroke:blue;stroke-width:2px"/></svg>',
    );

    expect(result.children[0].props.fill).toBe('red');
    expect(result.children[0].props.stroke).toBe('blue');
    expect(result.children[0].props.strokeWidth).toBe('2px');
  });

  test('should merge style properties with direct attributes', () => {
    const result = parseSvg(
      '<svg xmlns="http://www.w3.org/2000/svg"><rect fill="green" style="stroke:blue"/></svg>',
    );

    expect(result.children[0].props.fill).toBe('green');
    expect(result.children[0].props.stroke).toBe('blue');
  });

  test('should skip unsupported elements with warning', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const result = parseSvg(
      '<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script><rect/></svg>',
    );

    expect(result.children.length).toBe(1);
    expect(result.children[0].type).toBe('RECT');
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('script'));

    warnSpy.mockRestore();
  });

  test('should return empty result for invalid SVG', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const result = parseSvg('<div>not svg</div>');

    expect(result.width).toBe(0);
    expect(result.height).toBe(0);
    expect(result.children).toEqual([]);

    warnSpy.mockRestore();
  });
});
