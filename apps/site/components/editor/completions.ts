import type {
  CompletionContext,
  CompletionResult,
} from '@codemirror/autocomplete';
import { syntaxTree } from '@codemirror/language';

const COMPONENTS = [
  'Document',
  'Page',
  'View',
  'Text',
  'Link',
  'Image',
  'Note',
  'Canvas',
  'Svg',
  'Line',
  'Polyline',
  'Polygon',
  'Path',
  'Rect',
  'Circle',
  'Ellipse',
  'Tspan',
  'G',
  'Stop',
  'Defs',
  'ClipPath',
  'Marker',
  'LinearGradient',
  'RadialGradient',
  'TextInput',
  'Checkbox',
  'Select',
  'FieldSet',
  'PDFViewer',
  'PDFDownloadLink',
  'BlobProvider',
  'StyleSheet',
  'Font',
  'pdf',
];

const PROPS = [
  'style',
  'fixed',
  'break',
  'wrap',
  'debug',
  'render',
  'src',
  'source',
  'size',
  'orientation',
  'dpi',
  'bookmark',
  'cache',
  'minPresenceAhead',
  'markerStart',
  'markerMid',
  'markerEnd',
  'hyphenationCallback',
  'orphans',
  'widows',
];

// ponytail: curated list; regenerate from @react-pdf/stylesheet's Style type if it grows
const STYLE_KEYS = [
  'alignContent',
  'alignItems',
  'alignSelf',
  'aspectRatio',
  'backgroundColor',
  'border',
  'borderBottom',
  'borderBottomColor',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'borderBottomStyle',
  'borderBottomWidth',
  'borderColor',
  'borderLeft',
  'borderLeftColor',
  'borderLeftStyle',
  'borderLeftWidth',
  'borderRadius',
  'borderRight',
  'borderRightColor',
  'borderRightStyle',
  'borderRightWidth',
  'borderStyle',
  'borderTop',
  'borderTopColor',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderTopStyle',
  'borderTopWidth',
  'borderWidth',
  'bottom',
  'clear',
  'clipPath',
  'color',
  'columnGap',
  'direction',
  'display',
  'dominantBaseline',
  'fill',
  'fillOpacity',
  'fillRule',
  'flex',
  'flexBasis',
  'flexDirection',
  'flexFlow',
  'flexGrow',
  'flexShrink',
  'flexWrap',
  'float',
  'fontFamily',
  'fontFeatureSettings',
  'fontSize',
  'fontStyle',
  'fontWeight',
  'gap',
  'gradientTransform',
  'height',
  'justifyContent',
  'justifySelf',
  'left',
  'letterSpacing',
  'lineHeight',
  'margin',
  'marginBottom',
  'marginHorizontal',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginVertical',
  'maxHeight',
  'maxLines',
  'maxWidth',
  'minHeight',
  'minWidth',
  'objectFit',
  'objectPosition',
  'opacity',
  'overflow',
  'padding',
  'paddingBottom',
  'paddingHorizontal',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingVertical',
  'position',
  'remBase',
  'right',
  'rowGap',
  'shapeOutside',
  'stroke',
  'strokeDasharray',
  'strokeLinecap',
  'strokeLinejoin',
  'strokeOpacity',
  'strokeWidth',
  'textAlign',
  'textAnchor',
  'textDecoration',
  'textDecorationColor',
  'textDecorationStyle',
  'textIndent',
  'textOverflow',
  'textTransform',
  'top',
  'transform',
  'transformOrigin',
  'verticalAlign',
  'visibility',
  'width',
  'zIndex',
];

type Node = ReturnType<ReturnType<typeof syntaxTree>['resolveInner']>;

const isObject = (node: Node) =>
  node.name === 'ObjectExpression' || node.name === 'ObjectPattern';

const isTag = (node: Node | null) =>
  !!node && /^JSX(SelfClosing|Open|Close)Tag$/.test(node.name);

// Incomplete objects parse as ObjectPattern, so both shapes count as one level.
// `style={{ ... }}` puts style keys one object deep, StyleSheet.create two.
const inStyleObject = (context: CompletionContext, node: Node) => {
  const text = (n: Node | null) =>
    n ? context.state.sliceDoc(n.from, n.to) : '';

  let depth = 0;
  for (let n: Node | null = node; n; n = n.parent) {
    if (isObject(n)) depth += 1;
    if (n.name === 'JSXAttribute') return depth >= 1 && /^style/.test(text(n));
    if (n.name === 'CallExpression')
      return depth >= 2 && /StyleSheet\s*\.\s*create$/.test(text(n.firstChild));
  }
  return false;
};

const toOptions = (
  words: string[],
  type: string,
): CompletionResult['options'] => words.map((label) => ({ label, type }));

export function reactPdfCompletions(
  context: CompletionContext,
): CompletionResult | null {
  const word = context.matchBefore(/[\w-]*/);
  if (!word || (word.from === word.to && !context.explicit)) return null;

  const done = (options: CompletionResult['options']) => ({
    from: word.from,
    options,
    validFor: /^[\w-]*$/,
  });

  const node = syntaxTree(context.state).resolveInner(word.from, -1);
  const jsxName = node.name === 'JSXIdentifier';

  // `</Foo` doesn't parse as JSX until the tag closes.
  if ((jsxName && isTag(node.parent)) || context.matchBefore(/<\/?\s*[\w-]*$/))
    return done(toOptions(COMPONENTS, 'class'));

  if ((jsxName && node.parent?.name === 'JSXAttribute') || isTag(node))
    return done(toOptions(PROPS, 'property'));

  const onValueSide = context.matchBefore(/:[\s'"`]*[\w-]*$/);
  if (!onValueSide && inStyleObject(context, node))
    return done(toOptions(STYLE_KEYS, 'property'));

  return null;
}
