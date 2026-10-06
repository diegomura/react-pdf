import { HomeLayout } from 'fumadocs-ui/layouts/home';
import type { ReactNode } from 'react';
import { homeNav } from '@/lib/nav';

export default function Layout({ children }: { children: ReactNode }) {
  return <HomeLayout {...homeNav}>{children}</HomeLayout>;
}
