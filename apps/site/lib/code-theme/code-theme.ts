import type { ThemeRegistration } from 'shiki';

/**
 * Syntax colours ported from the legacy react-pdf.org Prism theme
 * (public/styles/prism.css). Only the token hues carry over — the surface is
 * whatever the site theme provides. The legacy hues are tuned for a dark
 * background, so the light variant darkens each one to stay legible on paper
 * while keeping the same identity.
 */
export type Palette = {
  fg: string;
  comment: string;
  keyword: string;
  string: string;
  fn: string;
  punctuation: string;
  tag: string;
  accent: string;
};

const dark: Palette = {
  fg: '#CDD3DE',
  comment: '#7a7a7a',
  keyword: '#FF6666',
  string: '#7AECD9',
  fn: '#72B2FF',
  punctuation: '#9f68c4',
  tag: '#e7e7e7',
  accent: '#F99157',
};

const light: Palette = {
  fg: '#3e3e3e',
  comment: '#7a7a7a',
  keyword: '#d1372a',
  string: '#0e7a6b',
  fn: '#2166c4',
  punctuation: '#7b4bb0',
  tag: '#3e3e3e',
  accent: '#b0560f',
};

/** Shared with the CodeMirror theme so the playground editor and the docs agree. */
export const codePalette = { light, dark };

const build = (p: Palette): ThemeRegistration['settings'] => [
  { settings: { foreground: p.fg } },
  {
    scope: ['comment', 'punctuation.definition.comment'],
    settings: { foreground: p.comment, fontStyle: 'italic' },
  },
  {
    scope: [
      'keyword',
      'storage',
      'storage.type',
      'storage.modifier',
      'keyword.control',
      'keyword.operator.new',
      'keyword.operator.expression',
      'entity.other.attribute-name',
      'entity.name.tag.css',
      'keyword.control.at-rule',
    ],
    settings: { foreground: p.keyword },
  },
  {
    scope: [
      'string',
      'string.quoted',
      'string.template',
      'constant.character',
      'punctuation.definition.string',
      'meta.attribute-selector',
      'markup.inserted',
    ],
    settings: { foreground: p.string },
  },
  {
    scope: [
      'entity.name.function',
      'support.function',
      'meta.function-call.generic',
      'variable.function',
      'entity.name.label',
    ],
    settings: { foreground: p.fn },
  },
  {
    scope: [
      'punctuation',
      'punctuation.separator',
      'punctuation.terminator',
      'punctuation.accessor',
      'meta.brace',
    ],
    settings: { foreground: p.punctuation },
  },
  {
    scope: ['keyword.operator', 'markup.link', 'variable.other.constant'],
    settings: { foreground: p.fg },
  },
  {
    scope: [
      'entity.name.tag',
      'punctuation.definition.tag',
      'punctuation.definition.tag.begin',
      'punctuation.definition.tag.end',
    ],
    settings: { foreground: p.tag },
  },
  {
    scope: [
      'support.class.component',
      'entity.name.type',
      'entity.name.class',
      'support.class',
      'support.type',
      'constant.numeric',
      'constant.language',
      'support.constant',
      'variable',
      'variable.other',
      'variable.parameter',
      'meta.object-literal.key',
      'support.type.property-name',
    ],
    settings: { foreground: p.fg },
  },
  {
    scope: [
      'variable.language',
      'variable.other.readwrite.instance',
      'string.regexp',
      'constant.other.symbol',
      'markup.bold',
      'markup.deleted',
    ],
    settings: { foreground: p.accent },
  },
];

export const codeThemeLight: ThemeRegistration = {
  name: 'react-pdf-legacy-light',
  type: 'light',
  colors: { 'editor.foreground': light.fg },
  settings: build(light),
};

export const codeThemeDark: ThemeRegistration = {
  name: 'react-pdf-legacy-dark',
  type: 'dark',
  colors: { 'editor.foreground': dark.fg },
  settings: build(dark),
};
