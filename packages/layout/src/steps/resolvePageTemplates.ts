import isFixed from '../node/isFixed';
import { findSlot, instantiateTemplate, slotInstance } from '../page/template';

const isAbsolute = (node: any) => node.style?.position === 'absolute';

// In-flow fixed repeats like the pagination engine sees it: at the top of
// pages, from where the flow reaches it. Declared after content it never
// becomes a footer — the layout prop is the way to say that.
let warnedSuffixFixed = false;

const warnSuffixFixed = (children: any[]) => {
  if (warnedSuffixFixed) return;

  const flow = children.findIndex(
    (child) => !isAbsolute(child) && !isFixed(child),
  );
  const suffix =
    flow !== -1 &&
    children.some(
      (child, at) => at > flow && isFixed(child) && !isAbsolute(child),
    );

  if (!suffix) return;

  warnedSuffixFixed = true;
  console.warn(
    '[layout] In-flow fixed elements placed after content only repeat at ' +
      'the top of later pages. For footers, use the Page `layout` prop.',
  );
};

// The slot is the flow container now, so the page's flow styles move with
// the content or they'd apply to a single slot child and do nothing.
const FLOW_STYLES = [
  'justifyContent',
  'alignItems',
  'alignContent',
  'gap',
  'rowGap',
  'columnGap',
];

const flowStyles = (style: any = {}) =>
  Object.fromEntries(
    FLOW_STYLES.filter((key) => key in style).map((key) => [key, style[key]]),
  );

// A page without a layout gets a near-noop template: the slot wraps every
// in-flow child — fixed ones included, which repeat through the stream like
// any nested fixed. Only absolutes stay outside: they never enter the flow
// and anchor to the page (the pagination step keeps plain ones to page 1).
const synthesize = (page: any) => {
  const children = page.children || [];

  warnSuffixFixed(children);

  const flow = children.filter((child: any) => !isAbsolute(child));
  const slotAt = children.findIndex((child: any) => !isAbsolute(child));
  const slot = slotInstance(flow);

  slot.style = { ...slot.style, ...flowStyles(page.style) };

  if (slotAt === -1) return [...children, slot];

  return children.flatMap((child: any, at: number) => {
    if (at === slotAt) return [slot];
    return isAbsolute(child) ? [child] : [];
  });
};

// Every page becomes a template with one slot — user-authored via the
// `layout` prop, or synthesized from its own children — so the first
// unconstrained pass measures content at slot width and pagination has a
// single path.
const resolvePageTemplates = (root: any) => {
  const children = (root.children || []).map((page: any) => {
    const layout = page.props?.layout;

    if (!layout) return { ...page, children: synthesize(page) };

    const nodes = instantiateTemplate(layout, { pageNumber: 1 });
    const slot = findSlot({ type: 'PAGE', children: nodes } as any)!;

    slot.children = page.children || [];

    return { ...page, children: nodes };
  });

  return { ...root, children };
};

export default resolvePageTemplates;
