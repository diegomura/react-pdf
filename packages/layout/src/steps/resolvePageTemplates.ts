import isFixed from '../node/isFixed';
import { findSlot, instantiateTemplate, slotInstance } from '../page/template';

const isAbsolute = (node: any) => node.style?.position === 'absolute';

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
