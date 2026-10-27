import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { highlight } from 'fumadocs-core/highlight';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';

import { codeThemeDark, codeThemeLight } from '@/lib/code-theme';

import { UsagePreview } from './usage-preview';

/**
 * The snippet lives in a `.usage.jsx` file next to the page rather than inline
 * in the MDX, because MDX strips two spaces of indentation from a multi-line
 * template literal in a JSX attribute, which silently flattened the nesting in
 * every snippet.
 *
 * The file is the whole runnable program. Everything up to its trailing
 * `ReactPDF.render(...)` call is what the page shows; the call itself is what
 * the preview playground needs, and pages whose component is browser-only omit it and
 * get no preview.
 */
export interface UsageProps {
  page: string;
  lang?: string;
}

export async function Usage({ page, lang = 'jsx' }: UsageProps) {
  const path = join(
    process.cwd(),
    'content/docs',
    page.replace(/\.mdx$/, '.usage.jsx'),
  );
  const source = readFileSync(path, 'utf8').trimEnd();

  const mount = source.lastIndexOf('ReactPDF.render(');
  const code = mount === -1 ? source : source.slice(0, mount).trimEnd();

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
    <div className="border-fd-border my-6 overflow-hidden rounded-xl border">
      <div className="rp-example-code">{highlighted}</div>
      {mount !== -1 && <UsagePreview code={source} />}
    </div>
  );
}
