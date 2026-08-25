import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { EditorView } from '@codemirror/view';
import { tags as t } from '@lezer/highlight';

import { codePalette, type Palette } from '@/lib/code-theme';

/**
 * The editor counterpart of the Shiki themes in lib/code-theme: same palette,
 * same token buckets, so a snippet reads identically in the docs and here.
 */
const highlight = (p: Palette) =>
  HighlightStyle.define([
    {
      tag: [t.comment, t.lineComment, t.blockComment, t.docComment],
      color: p.comment,
      fontStyle: 'italic',
    },
    {
      tag: [
        t.keyword,
        t.controlKeyword,
        t.moduleKeyword,
        t.definitionKeyword,
        t.operatorKeyword,
        t.modifier,
        t.attributeName,
      ],
      color: p.keyword,
    },
    {
      tag: [
        t.string,
        t.special(t.string),
        t.character,
        t.inserted,
        // JSX string props are `attributeValue`, not `string`
        t.attributeValue,
      ],
      color: p.string,
    },
    {
      tag: [
        t.function(t.variableName),
        t.function(t.propertyName),
        t.standard(t.variableName),
        t.labelName,
      ],
      color: p.fn,
    },
    // `=>` is `storage.type.function.arrow` in the Shiki grammar, so it reads
    // as a keyword in the docs; lezer tags it as function(punctuation)
    { tag: t.function(t.punctuation), color: p.keyword },
    {
      tag: [
        t.punctuation,
        t.separator,
        t.bracket,
        t.brace,
        t.paren,
        t.squareBracket,
        t.derefOperator,
      ],
      color: p.punctuation,
    },
    // lezer tags lowercase intrinsics as standard(tagName) and capitalised
    // components as plain tagName — Shiki splits them the same way
    // (`entity.name.tag` vs `support.class.component`)
    { tag: [t.standard(t.tagName), t.angleBracket], color: p.tag },
    {
      tag: [
        t.operator,
        t.variableName,
        t.propertyName,
        t.tagName,
        t.typeName,
        t.className,
        t.number,
        t.bool,
        t.null,
        t.atom,
      ],
      color: p.fg,
    },
    { tag: [t.regexp, t.self, t.strong, t.deleted], color: p.accent },
  ]);

const surface = (p: Palette, dark: boolean) =>
  EditorView.theme(
    {
      '&': {
        color: p.fg,
        backgroundColor: 'transparent',
        height: '100%',
        fontSize: '13px',
      },
      '&.cm-focused': { outline: 'none' },
      '.cm-scroller': {
        fontFamily: 'var(--font-geist-mono), ui-monospace, monospace',
        lineHeight: '1.7',
        scrollbarWidth: 'thin',
        scrollbarColor:
          'color-mix(in srgb, var(--color-fd-muted-foreground) 30%, transparent) transparent',
      },
      '.cm-content': {
        padding: '14px 0',
        caretColor: 'var(--color-fd-primary)',
      },
      '.cm-line': { padding: '0 1rem 0 0.75rem' },
      '.cm-cursor, .cm-dropCursor': {
        borderLeftWidth: '2px',
        borderLeftColor: 'var(--color-fd-primary)',
      },
      '.cm-selectionBackground, &.cm-focused .cm-selectionBackground, .cm-content ::selection':
        {
          backgroundColor:
            'color-mix(in srgb, var(--color-fd-primary) 22%, transparent)',
        },
      // only while focused, so an idle editor is an undisturbed block of code
      '&.cm-focused .cm-activeLine': {
        backgroundColor:
          'color-mix(in srgb, var(--color-fd-muted-foreground) 8%, transparent)',
      },
      '.cm-activeLine': { backgroundColor: 'transparent' },
      // opaque and above the content: the gutter is sticky, so horizontally
      // scrolled code slides underneath it
      '.cm-gutters': {
        backgroundColor: 'var(--color-fd-background)',
        zIndex: '1',
        border: 'none',
        color:
          'color-mix(in srgb, var(--color-fd-muted-foreground) 55%, transparent)',
        paddingInlineStart: '0.5rem',
      },
      '.cm-lineNumbers .cm-gutterElement': { padding: '0 0.5rem 0 0.75rem' },
      '.cm-activeLineGutter': {
        backgroundColor: 'transparent',
        color: 'var(--color-fd-muted-foreground)',
      },
      '.cm-foldGutter .cm-gutterElement': { opacity: 0.5 },
      '.cm-matchingBracket, &.cm-focused .cm-matchingBracket': {
        backgroundColor:
          'color-mix(in srgb, var(--color-fd-primary) 16%, transparent)',
        outline: 'none',
      },
      '.cm-tooltip': {
        border: '1px solid var(--color-fd-border)',
        borderRadius: '0.5rem',
        overflow: 'hidden',
        backgroundColor: 'var(--color-fd-popover)',
        color: 'var(--color-fd-popover-foreground)',
        boxShadow: '0 8px 24px -12px rgb(0 0 0 / 0.35)',
      },
      '.cm-tooltip.cm-tooltip-autocomplete > ul': {
        fontFamily: 'var(--font-geist-mono), ui-monospace, monospace',
        fontSize: '12px',
        maxHeight: '14rem',
      },
      '.cm-tooltip.cm-tooltip-autocomplete > ul > li[aria-selected]': {
        backgroundColor: 'var(--color-fd-accent)',
        color: 'var(--color-fd-accent-foreground)',
      },
      '.cm-lintRange-error': {
        backgroundImage: 'none',
        textDecoration: `underline wavy ${dark ? '#FF6666' : '#d1372a'}`,
        textUnderlineOffset: '3px',
      },
    },
    { dark },
  );

const build = (p: Palette, dark: boolean) => [
  surface(p, dark),
  syntaxHighlighting(highlight(p)),
];

export const cmThemeLight = build(codePalette.light, false);
export const cmThemeDark = build(codePalette.dark, true);
