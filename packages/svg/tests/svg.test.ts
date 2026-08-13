import { describe, expect, test, vi } from 'vitest';

import { parseSvg } from '../src/svg';

describe('parseSvg', () => {
  const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

  describe('dimensions', () => {
    test('should parse unitless width and height', () => {
      const svg = parseSvg(
        '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="150"></svg>',
      );
      expect(svg).toMatchSnapshot();
    });

    test('should parse width and height in px', () => {
      const svg = parseSvg(
        '<svg xmlns="http://www.w3.org/2000/svg" width="96px" height="48px"></svg>',
      );
      expect(svg).toMatchSnapshot();
    });

    test('should parse width and height in pt', () => {
      const svg = parseSvg(
        '<svg xmlns="http://www.w3.org/2000/svg" width="72pt" height="36pt"></svg>',
      );
      expect(svg).toMatchSnapshot();
    });

    test('should parse width and height in inches', () => {
      const svg = parseSvg(
        '<svg xmlns="http://www.w3.org/2000/svg" width="1in" height="2in"></svg>',
      );
      expect(svg).toMatchSnapshot();
    });

    test('should parse width and height in cm', () => {
      const svg = parseSvg(
        '<svg xmlns="http://www.w3.org/2000/svg" width="2.54cm" height="5.08cm"></svg>',
      );
      expect(svg).toMatchSnapshot();
    });

    test('should parse width and height in mm', () => {
      const svg = parseSvg(
        '<svg xmlns="http://www.w3.org/2000/svg" width="25.4mm" height="50.8mm"></svg>',
      );
      expect(svg).toMatchSnapshot();
    });

    test('should parse viewbox', () => {
      const svg = parseSvg(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="10 20 300 200"></svg>',
      );
      expect(svg).toMatchSnapshot();
    });

    test('should handle no dimensions and no viewBox', () => {
      const svg = parseSvg('<svg xmlns="http://www.w3.org/2000/svg"></svg>');
      expect(svg).toMatchSnapshot();
    });
  });

  describe('element mapping', () => {
    test('should map basic shapes', () => {
      const svg = parseSvg(`
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
          <rect x="10" y="10" width="80" height="80" fill="red"/>
          <circle cx="50" cy="50" r="25" fill="blue"/>
          <ellipse cx="50" cy="50" rx="40" ry="20"/>
          <line x1="0" y1="0" x2="100" y2="100" stroke="black"/>
          <polyline points="0,0 50,50 100,0"/>
          <polygon points="50,0 100,100 0,100"/>
        </svg>`);
      expect(svg).toMatchSnapshot();
    });

    test('should map path element', () => {
      const svg = parseSvg(`
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
          <path d="M10 10 H 90 V 90 H 10 Z" fill="none" stroke="black"/>
        </svg>`);
      expect(svg).toMatchSnapshot();
    });

    test('should map gradient definitions', () => {
      const svg = parseSvg(`
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
          <defs>
            <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="red"/>
              <stop offset="100%" stop-color="blue"/>
            </linearGradient>
            <radialGradient id="rg1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="white"/>
              <stop offset="100%" stop-color="black"/>
            </radialGradient>
          </defs>
        </svg>`);
      expect(svg).toMatchSnapshot();
    });

    test('should map nested groups', () => {
      const svg = parseSvg(`
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
          <g transform="translate(10,10)">
            <g opacity="0.5">
              <rect width="50" height="50"/>
            </g>
            <circle cx="75" cy="75" r="10"/>
          </g>
        </svg>`);
      expect(svg).toMatchSnapshot();
    });

    test('should map clipPath element', () => {
      const svg = parseSvg(`
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
          <defs>
            <clipPath id="clip1">
              <rect width="50" height="50"/>
            </clipPath>
          </defs>
        </svg>`);
      expect(svg).toMatchSnapshot();
    });

    test('should map image element', () => {
      const svg = parseSvg(`
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
          <image href="photo.png" x="0" y="0" width="100" height="100"/>
        </svg>`);
      expect(svg).toMatchSnapshot();
    });
  });

  describe('text handling', () => {
    test('should parse text with content', () => {
      const svg = parseSvg(`
        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="50">
          <text x="10" y="30" font-size="20">Hello World</text>
        </svg>`);
      expect(svg).toMatchSnapshot();
    });

    test('should parse text with tspan children', () => {
      const svg = parseSvg(`
        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="50">
          <text x="10" y="30">
            <tspan fill="red">Red</tspan>
            <tspan fill="blue">Blue</tspan>
          </text>
        </svg>`);
      expect(svg).toMatchSnapshot();
    });

    test('should ignore text content in non-text elements', () => {
      const svg = parseSvg(`
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
          <rect>some text</rect>
        </svg>`);
      expect(svg).toMatchSnapshot();
    });
  });

  describe('attribute handling', () => {
    test('should convert hyphenated attributes to camelCase', () => {
      const svg = parseSvg(`
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
          <rect stroke-width="2" fill-opacity="0.5" stroke-dasharray="5,3" stroke-linecap="round"/>
        </svg>`);
      expect(svg).toMatchSnapshot();
    });

    test('should expand inline style attribute', () => {
      const svg = parseSvg(`
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
          <rect style="fill:red;stroke:blue;stroke-width:2px;opacity:0.8"/>
        </svg>`);
      expect(svg).toMatchSnapshot();
    });

    test('should merge direct attributes and style', () => {
      const svg = parseSvg(`
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
          <rect fill="green" width="50" height="50" style="stroke:blue;stroke-width:3"/>
        </svg>`);
      expect(svg).toMatchSnapshot();
    });

    test('should decode XML entities in attribute values', () => {
      const svg = parseSvg(`
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
          <text x="10" y="30">&lt;hello&gt; &amp; &quot;world&quot;</text>
        </svg>`);
      expect(svg).toMatchSnapshot();
    });

    test('should parse single-quoted attributes', () => {
      const svg = parseSvg(`
        <svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'>
          <rect fill='red' width='50' height='50'/>
        </svg>`);
      expect(svg).toMatchSnapshot();
    });
  });

  describe('skipped elements', () => {
    test('should omit script, filter, mask, and other unsupported elements', () => {
      const svg = parseSvg(`
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
          <script>alert(1)</script>
          <rect width="50" height="50"/>
          <foreignObject><div>hi</div></foreignObject>
          <circle cx="50" cy="50" r="10"/>
          <filter id="f1"><feGaussianBlur/></filter>
          <mask id="m1"><rect/></mask>
        </svg>`);
      expect(svg).toMatchSnapshot();
    });

    test('should silently ignore unknown elements', () => {
      const svg = parseSvg(`
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
          <custom-element foo="bar"/>
          <rect width="50" height="50"/>
        </svg>`);
      expect(svg).toMatchSnapshot();
    });
  });

  describe('XML preamble and comments', () => {
    test('should strip XML declaration', () => {
      const svg = parseSvg(
        '<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="50" height="50"/></svg>',
      );
      expect(svg).toMatchSnapshot();
    });

    test('should strip DOCTYPE', () => {
      const svg = parseSvg(
        '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect/></svg>',
      );
      expect(svg).toMatchSnapshot();
    });

    test('should strip comments', () => {
      const svg = parseSvg(`
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
          <!-- this is a comment -->
          <rect width="50" height="50"/>
        </svg>`);
      expect(svg).toMatchSnapshot();
    });

    test('should preserve CDATA sections as text', () => {
      const svg = parseSvg(`
        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="50">
          <text x="10" y="30"><![CDATA[Some <special> text]]></text>
        </svg>`);
      expect(svg).toMatchSnapshot();
    });
  });

  describe('invalid input', () => {
    test('should handle non-svg root element', () => {
      const svg = parseSvg('<div>not svg</div>');
      expect(svg).toMatchSnapshot();
    });

    test('should handle empty string', () => {
      const svg = parseSvg('');
      expect(svg).toMatchSnapshot();
    });

    test('should ignore invalid viewBox', () => {
      const svg = parseSvg(
        '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="bad"></svg>',
      );
      expect(svg).toMatchSnapshot();
    });

    test('should ignore viewBox with wrong number of values', () => {
      const svg = parseSvg(
        '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100"></svg>',
      );
      expect(svg).toMatchSnapshot();
    });
  });

  describe('real-world SVGs', () => {
    test('should parse icon with gradients and paths', () => {
      const svg = parseSvg(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#ff6b6b"/>
              <stop offset="100%" stop-color="#4ecdc4"/>
            </linearGradient>
          </defs>
          <g fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </g>
        </svg>`);
      expect(svg).toMatchSnapshot();
    });

    test('should parse chart with styled elements', () => {
      const svg = parseSvg(`
        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="100" viewBox="0 0 200 100">
          <rect width="200" height="100" fill="#f0f0f0"/>
          <g transform="translate(20,80)">
            <line x1="0" y1="0" x2="160" y2="0" stroke="#ccc"/>
            <rect x="0" y="-60" width="30" height="60" style="fill:#4ecdc4;opacity:0.9"/>
            <rect x="40" y="-40" width="30" height="40" style="fill:#ff6b6b;opacity:0.9"/>
            <rect x="80" y="-75" width="30" height="75" style="fill:#45b7d1;opacity:0.9"/>
          </g>
        </svg>`);
      expect(svg).toMatchSnapshot();
    });
  });

  warnSpy.mockRestore();
});
