import { highlight } from 'fumadocs-core/highlight';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';

import { codeThemeDark, codeThemeLight } from '@/lib/code-theme';
import { COMPONENT_USAGE } from '@/lib/component-usage';

/**
 * Native `<details>` rather than a client toggle: the docs pages are otherwise
 * static, and this way the snippet costs no JavaScript and is keyboard and
 * screen-reader accessible without any of it being written here.
 */
export async function Usage({
  name,
  lang = 'jsx',
}: {
  name: string;
  lang?: string;
}) {
  const code = COMPONENT_USAGE[name];
  if (!code) return null;

  const highlighted = await highlight(code, {
    lang,
    themes: { light: codeThemeLight, dark: codeThemeDark },
    // Without this shiki bakes the light theme in as inline colours and the
    // block stays white in dark mode; the MDX pipeline's rehypeCode already
    // defaults to the CSS-variable output this matches.
    defaultColor: false,
    components: {
      pre: (props) => (
        <CodeBlock {...props}>
          <Pre>{props.children}</Pre>
        </CodeBlock>
      ),
    },
  });

  return (
    <details className="group my-6">
      <summary className="text-fd-muted-foreground hover:text-fd-foreground focus-visible:ring-fd-ring inline-flex cursor-pointer list-none items-center gap-1.5 rounded-sm text-[0.8125rem] transition-colors outline-none focus-visible:ring-2 [&::-webkit-details-marker]:hidden">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          className="size-3.5 shrink-0 transition-transform group-open:rotate-180"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
        <span className="group-open:hidden">View code</span>
        <span className="hidden group-open:inline">Hide code</span>
      </summary>
      {highlighted}
    </details>
  );
}
