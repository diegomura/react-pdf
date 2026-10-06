import type { ComponentProps } from 'react';
import type { MDXComponents, MDXContent } from 'mdx/types';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Heading } from 'fumadocs-ui/components/heading';
import {
  CodeBlock,
  CodeBlockTabs,
  CodeBlockTabsTrigger,
  Pre,
} from 'fumadocs-ui/components/codeblock';

const table = [
  'border-separate border-spacing-0 text-[0.8125rem] leading-[1.5]',
  '[&_th]:border-0 [&_th]:px-3 [&_th]:py-[0.4375rem] [&_th]:text-start',
  '[&_th]:bg-rp-table-head [&_th]:text-rp-table-head-foreground [&_th]:font-medium [&_th]:tracking-[0.01em]',
  '[&_td]:border-x-0 [&_td]:border-t [&_td]:border-b-0 [&_td]:border-rp-table',
  '[&_td]:px-3 [&_td]:py-[0.4375rem] [&_td]:text-start',
  '[&_td_code]:whitespace-pre-wrap [&_td_code]:wrap-anywhere',
].join(' ');

function Table(props: ComponentProps<'table'>) {
  return (
    <div className="prose-no-margin border-rp-table relative my-6 overflow-x-auto rounded-[0.625rem] border shadow-none">
      <table {...props} className={table} />
    </div>
  );
}

const components: MDXComponents = {
  ...defaultMdxComponents,

  h2: (props) => (
    <Heading
      as="h2"
      {...props}
      className="mt-9 mb-3 text-[1.1875rem] font-semibold tracking-[-0.01em]"
    />
  ),

  h3: (props) => (
    <Heading
      as="h3"
      {...props}
      className="mt-7 mb-2 text-[1rem] font-semibold"
    />
  ),

  h4: (props) => (
    <Heading as="h4" {...props} className="text-[0.9375rem] font-semibold" />
  ),

  table: Table,

  // fumadocs has the surfaces backwards: the tab strip gets fd-card and the code
  // panel under it fd-secondary, so tabbed snippets sat darker than every other
  // one. Swapped — the strip is the darker chrome, the code matches plain snippets.
  pre: (props) => (
    <CodeBlock {...props} className="bg-fd-card">
      <Pre className="py-2.5 leading-[1.6]">{props.children}</Pre>
    </CodeBlock>
  ),

  CodeBlockTabs: (props) => (
    <CodeBlockTabs {...props} className="bg-fd-secondary" />
  ),

  CodeBlockTabsTrigger: (props) => (
    <CodeBlockTabsTrigger
      {...props}
      className="data-[state=active]:text-fd-foreground text-[0.8125rem]"
    />
  ),
};

export interface MdxProps {
  body: MDXContent;
  components?: MDXComponents;
}

export function Mdx({ body: Body, components: extra }: MdxProps) {
  return <Body components={{ ...components, ...extra }} />;
}
