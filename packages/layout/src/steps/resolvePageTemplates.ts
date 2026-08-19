import {
  PageLayout,
  findSlot,
  forwardFlowStyles,
  identityLayout,
  instantiateTemplate,
  pageAbsolute,
} from '../page/template';

const isAbsolute = (node: any) => node.style?.position === 'absolute';

// Every page becomes a template with one slot; a page without a layout gets
// the identity one. In-flow children graft into the slot (fixed ones repeat
// through the stream), absolutes stay beside it in their source positions:
// they never enter the flow and must keep anchoring to the page —
// `bottom: 30` inside the page padding is how footers reach the margin.
const resolvePageTemplates = (root: any) => {
  const children = (root.children || []).map((page: any) => {
    const layout: PageLayout = page.props?.layout || identityLayout;
    const pageChildren = page.children || [];

    const nodes = instantiateTemplate(layout, { pageNumber: 1 });
    const slot = findSlot({ type: 'PAGE', children: nodes } as any)!;

    slot.children = pageChildren.filter((child: any) => !isAbsolute(child));
    forwardFlowStyles(slot, page.style);

    const slotAt = pageChildren.findIndex((child: any) => !isAbsolute(child));
    const spliced =
      slotAt === -1
        ? [...pageChildren.map(pageAbsolute), ...nodes]
        : pageChildren.flatMap((child: any, at: number) => {
            if (at === slotAt) return nodes;
            return isAbsolute(child) ? [pageAbsolute(child)] : [];
          });

    return { ...page, children: spliced };
  });

  return { ...root, children };
};

export default resolvePageTemplates;
