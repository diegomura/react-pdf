import type { ThemeRegistration } from 'shiki';

/**
 * Port of the legacy react-pdf.org Prism theme (public/styles/prism.css) to a
 * TextMate theme. It is dark-only by design: code blocks stay on the same dark
 * surface in both site themes, which is how the legacy site read.
 */
const FG = '#CDD3DE';
const BG = '#3E3E3E';

const settings: ThemeRegistration['settings'] = [
  { settings: { foreground: FG, background: BG } },
  {
    scope: ['comment', 'punctuation.definition.comment'],
    settings: { foreground: '#7a7a7a', fontStyle: 'italic' },
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
    settings: { foreground: '#FF6666' },
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
    settings: { foreground: '#7AECD9' },
  },
  {
    scope: [
      'entity.name.function',
      'support.function',
      'meta.function-call.generic',
      'variable.function',
      'entity.name.label',
    ],
    settings: { foreground: '#72B2FF' },
  },
  {
    scope: [
      'punctuation',
      'punctuation.separator',
      'punctuation.terminator',
      'punctuation.accessor',
      'meta.brace',
    ],
    settings: { foreground: '#9f68c4' },
  },
  {
    scope: ['keyword.operator', 'markup.link', 'variable.other.constant'],
    settings: { foreground: FG },
  },
  {
    scope: [
      'entity.name.tag',
      'punctuation.definition.tag',
      'punctuation.definition.tag.begin',
      'punctuation.definition.tag.end',
    ],
    settings: { foreground: '#e7e7e7' },
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
    settings: { foreground: FG },
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
    settings: { foreground: '#F99157' },
  },
];

const colors = {
  'editor.background': BG,
  'editor.foreground': FG,
};

export const codeThemeLight: ThemeRegistration = {
  name: 'react-pdf-legacy-light',
  type: 'dark',
  colors,
  settings,
};

export const codeThemeDark: ThemeRegistration = {
  name: 'react-pdf-legacy-dark',
  type: 'dark',
  colors,
  settings,
};
