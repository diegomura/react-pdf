import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { source } from '@/lib/source';
import { homeNav } from '@/lib/nav';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={source.pageTree} {...homeNav}>
      {children}
    </DocsLayout>
  );
}
