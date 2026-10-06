import {
  PageLayout,
  instantiateTemplate,
  isProbe,
  probeElement,
  tagContent,
} from '../page/template';
import { SafeNode } from '../types';

const countProbes = (node: SafeNode): number =>
  (isProbe(node) ? 1 : 0) +
  (node.children || []).reduce((acc, child) => acc + countProbes(child), 0);

// The probe doubles as the render-once validator: a layout that drops or
// duplicates its children is caught before any content is entrusted to it.
const validateTemplate = (layout: PageLayout) => {
  const children = [probeElement() as any];
  const nodes = instantiateTemplate(layout, { pageNumber: 1 }, children);
  const probes = nodes.reduce((acc, node) => acc + countProbes(node), 0);

  if (probes !== 1) {
    throw new Error(
      `[layout] A page layout must render its children exactly once (found ${probes}).`,
    );
  }
};

// Render each page's layout with the page content as children, tagged so
// pagination can tell content from chrome. Pages without a layout come out
// unchanged.
const resolvePageTemplates = (root: any) => {
  const children = (root.children || []).map((page: any) => {
    const layout: PageLayout | undefined = page.props?.layout;
    if (layout) validateTemplate(layout);

    // TODO: content identity could be structural instead of tag-based — a
    // single P.Fragment node holding the page content, made transparent to
    // layout (display: contents semantics: no yoga node, no box, children
    // hoisted to the parent). Requires teaching yoga mapping, resolvers,
    // fromPage and render about a boxless node. Worth it if content ever
    // needs richer identity (marks, named regions, TOC anchors).
    const content = (page.children || []).map(tagContent);
    const nodes = instantiateTemplate(layout, { pageNumber: 1 }, content);

    return { ...page, children: nodes };
  });

  return { ...root, children };
};

export default resolvePageTemplates;
