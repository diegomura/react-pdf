import { findSlot, instantiateTemplate } from '../paginate/template';

// Pages with a `layout` prop swap their children for the instantiated
// template, with the original content grafted into the slot — so the first
// unconstrained pass measures content at slot width, inside the chrome.
const resolvePageTemplates = (root: any) => {
  const children = (root.children || []).map((page: any) => {
    const layout = page.props?.layout;

    if (!layout) return page;

    const nodes = instantiateTemplate(layout, { pageNumber: 1 });
    const slot = findSlot({ type: 'PAGE', children: nodes } as any)!;

    slot.children = page.children || [];

    return { ...page, children: nodes };
  });

  return { ...root, children };
};

export default resolvePageTemplates;
