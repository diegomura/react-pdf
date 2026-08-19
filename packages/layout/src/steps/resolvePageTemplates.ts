import {
  PageLayout,
  identityLayout,
  instantiateTemplate,
  tagContent,
  validateTemplate,
} from '../page/template';

// Every page instantiates its template — the identity one when no layout
// prop is given — with the page's own children as the payload. Content
// lands inline wherever the layout renders `children`, tagged so the
// pagination step can tell it apart from the chrome around it. For plain
// pages this is a true noop: the spliced tree is the original tree.
const resolvePageTemplates = (root: any) => {
  const children = (root.children || []).map((page: any) => {
    const layout: PageLayout = page.props?.layout || identityLayout;

    validateTemplate(layout);

    const content = (page.children || []).map(tagContent);
    const nodes = instantiateTemplate(layout, { pageNumber: 1 }, content);

    return { ...page, children: nodes };
  });

  return { ...root, children };
};

export default resolvePageTemplates;
