import { highlight } from 'fumadocs-core/highlight';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';

import { codeThemeDark, codeThemeLight } from '@/lib/code-theme';
import { COMPONENT_USAGE, previewSource } from '@/lib/component-usage';

import { UsagePreview } from './usage-preview';

export async function Usage({
  name,
  lang = 'jsx',
}: {
  name: string;
  lang?: string;
}) {
  const usage = COMPONENT_USAGE[name];
  if (!usage) return null;

  const highlighted = await highlight(usage.code, {
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

  const preview = previewSource(usage);

  return (
    <div className="border-fd-border my-6 overflow-hidden rounded-xl border">
      <div className="rp-example-code">{highlighted}</div>
      {preview && <UsagePreview code={preview} />}
    </div>
  );
}
