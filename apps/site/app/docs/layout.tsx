import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import type { ReactNode } from 'react';
import { source } from '@/lib/source';
import { homeNav } from '@/lib/nav';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      {...homeNav}
      nav={{ ...homeNav.nav, mode: 'top' }}
      tabs={false}
      sidebar={{ collapsible: false }}
    >
      {children}
    </DocsLayout>
  );
}
