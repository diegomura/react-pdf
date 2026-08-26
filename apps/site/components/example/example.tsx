import Link from 'next/link';
import { highlight } from 'fumadocs-core/highlight';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';

import { codeThemeDark, codeThemeLight } from '@/lib/code-theme';
import { examples } from '@/components/repl/examples';

import { ExampleBlock } from './example-block';

export const playgroundHref = (name?: string) =>
  name ? `/playground?example=${encodeURIComponent(name)}` : '/playground';

export interface GoToExampleProps {
  name?: string;
  defaultOpen?: boolean;
}

/**
 * Runs on the server: the example source and its highlighted markup are baked
 * into the page, so the docs bundle never carries the 42-entry registry or a
 * syntax highlighter. Only the preview costs the reader anything, and only once
 * it scrolls into view.
 */
export async function GoToExample({ name, defaultOpen }: GoToExampleProps) {
  const code = name ? examples[name] : undefined;
  const href = playgroundHref(name);

  // v1/v2 have a handful of nameless usages; there is nothing to preview
  if (!code)
    return (
      <div className="my-6 flex justify-end">
        <Link
          href={href}
          className="text-fd-muted-foreground hover:text-fd-foreground text-[0.8125rem] transition-colors"
        >
          Open in Playground ↗
        </Link>
      </div>
    );

  const highlighted = await highlight(code, {
    lang: 'jsx',
    themes: { light: codeThemeLight, dark: codeThemeDark },
    components: {
      pre: (props) => (
        <CodeBlock {...props}>
          <Pre>{props.children}</Pre>
        </CodeBlock>
      ),
    },
  });

  return (
    <ExampleBlock code={code} href={href} defaultOpen={defaultOpen}>
      {highlighted}
    </ExampleBlock>
  );
}
