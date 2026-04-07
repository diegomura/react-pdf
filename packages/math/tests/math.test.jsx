import { describe, expect, test } from 'vitest';
import React from 'react';
import { Document, Page, View } from '@react-pdf/renderer';
import { Math } from '@react-pdf/math';

import renderToImage from './renderComponent';

const cases = [
  // Algebra
  {
    name: 'quadratic formula',
    latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
  },
  {
    name: 'binomial theorem',
    latex: '(x + y)^n = \\sum_{k=0}^{n} \\binom{n}{k} x^{n-k} y^k',
  },
  {
    name: 'polynomial roots',
    latex:
      'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}, \\quad \\Delta = b^2 - 4ac',
  },

  // Calculus
  {
    name: 'gaussian integral',
    latex: '\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}',
  },
  {
    name: 'limit definition of derivative',
    latex: "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}",
  },
  {
    name: 'taylor series',
    latex:
      'e^x = \\sum_{n=0}^{\\infty} \\frac{x^n}{n!} = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\cdots',
  },
  {
    name: 'multivariable chain rule',
    latex:
      '\\frac{\\partial f}{\\partial t} = \\frac{\\partial f}{\\partial x} \\frac{dx}{dt} + \\frac{\\partial f}{\\partial y} \\frac{dy}{dt}',
  },
  {
    name: 'double integral',
    latex:
      '\\iint_D f(x,y) \\, dA = \\int_a^b \\int_{g_1(x)}^{g_2(x)} f(x,y) \\, dy \\, dx',
  },
  {
    name: 'divergence theorem',
    latex:
      '\\oint_S \\vec{F} \\cdot d\\vec{A} = \\iiint_V (\\nabla \\cdot \\vec{F}) \\, dV',
  },

  // Series & identities
  { name: 'euler identity', latex: 'e^{i\\pi} + 1 = 0' },
  {
    name: 'basel problem',
    latex: '\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}',
  },
  {
    name: 'riemann zeta',
    latex:
      '\\zeta(s) = \\sum_{n=1}^{\\infty} \\frac{1}{n^s} = \\prod_{p \\text{ prime}} \\frac{1}{1 - p^{-s}}',
  },
  {
    name: 'fourier series',
    latex:
      'f(x) = \\frac{a_0}{2} + \\sum_{n=1}^{\\infty} \\left( a_n \\cos\\frac{n\\pi x}{L} + b_n \\sin\\frac{n\\pi x}{L} \\right)',
  },

  // Linear algebra
  {
    name: 'matrix 2x2',
    latex:
      'A = \\begin{pmatrix} a_{11} & a_{12} \\\\ a_{21} & a_{22} \\end{pmatrix}',
  },
  {
    name: 'matrix 3x3 determinant',
    latex:
      '\\det(A) = \\begin{vmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{vmatrix}',
  },
  {
    name: 'eigenvalue equation',
    latex: 'A\\vec{v} = \\lambda\\vec{v}, \\quad \\det(A - \\lambda I) = 0',
  },
  {
    name: 'matrix multiplication',
    latex: '(AB)_{ij} = \\sum_{k=1}^{n} a_{ik} b_{kj}',
  },

  // Physics
  {
    name: 'maxwell faraday',
    latex:
      '\\nabla \\times \\vec{E} = -\\frac{\\partial \\vec{B}}{\\partial t}',
  },
  {
    name: 'schrodinger equation',
    latex:
      'i\\hbar \\frac{\\partial}{\\partial t} \\Psi(\\mathbf{r}, t) = \\hat{H} \\Psi(\\mathbf{r}, t)',
  },
  {
    name: 'lorentz transformation',
    latex:
      "t' = \\gamma \\left( t - \\frac{vx}{c^2} \\right), \\quad x' = \\gamma(x - vt)",
  },
  {
    name: 'einstein field equations',
    latex:
      'R_{\\mu\\nu} - \\frac{1}{2} R g_{\\mu\\nu} + \\Lambda g_{\\mu\\nu} = \\frac{8\\pi G}{c^4} T_{\\mu\\nu}',
  },

  // Probability & statistics
  { name: 'bayes theorem', latex: 'P(A|B) = \\frac{P(B|A) \\, P(A)}{P(B)}' },
  {
    name: 'normal distribution',
    latex:
      'f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} \\exp\\left( -\\frac{(x-\\mu)^2}{2\\sigma^2} \\right)',
  },
  {
    name: 'expected value',
    latex:
      'E[X] = \\int_{-\\infty}^{\\infty} x \\, f(x) \\, dx = \\sum_{i} x_i \\, P(X = x_i)',
  },

  // Logic & set theory
  {
    name: 'set operations',
    latex:
      '(A \\cup B)^c = A^c \\cap B^c, \\quad (A \\cap B)^c = A^c \\cup B^c',
  },
  {
    name: 'quantifiers',
    latex:
      '\\forall \\epsilon > 0, \\exists \\delta > 0 : |x - a| < \\delta \\Rightarrow |f(x) - L| < \\epsilon',
  },

  // Environments & complex notation
  {
    name: 'piecewise function',
    latex:
      'f(x) = \\begin{cases} x^2 & \\text{if } x \\geq 0 \\\\ -x^2 & \\text{if } x < 0 \\end{cases}',
  },
  {
    name: 'aligned equations',
    latex:
      '\\begin{aligned} (a+b)^2 &= a^2 + 2ab + b^2 \\\\ (a-b)^2 &= a^2 - 2ab + b^2 \\\\ (a+b)(a-b) &= a^2 - b^2 \\end{aligned}',
  },
  {
    name: 'continued fraction',
    latex:
      'x = a_0 + \\cfrac{1}{a_1 + \\cfrac{1}{a_2 + \\cfrac{1}{a_3 + \\cdots}}}',
  },

  // Inline & options
  { name: 'inline E=mc2', latex: 'E = mc^2', inline: true },
  { name: 'custom color', latex: 'e^{i\\pi} + 1 = 0', color: 'red' },
  {
    name: 'explicit dimensions',
    latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
    width: 180,
    height: 40,
  },
];

describe('Math', () => {
  test.each(cases)('$name', async ({ latex, inline, color, width, height }) => {
    const image = await renderToImage(
      <Document>
        <Page size={[300, 80]}>
          <View style={{ padding: 10 }}>
            <Math
              height={height ?? 34}
              {...(width != null && { width })}
              {...(inline != null && { inline })}
              {...(color != null && { color })}
            >
              {latex}
            </Math>
          </View>
        </Page>
      </Document>,
    );

    expect(image).toMatchImageSnapshot();
  });
});
