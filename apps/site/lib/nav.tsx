import { Suspense } from 'react';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { SearchTrigger } from 'fumadocs-ui/layouts/shared/slots/search-trigger';
import {
  NavLinks,
  NavSearchTrigger,
  NoSearchTrigger,
  ThemeToggle,
  VersionSelect,
  Wordmark,
} from '@/components/site-nav';
import { GithubLink, GithubStars, REPO } from '@/components/github-stars';

const GITHUB_URL = `https://github.com/${REPO}`;

export const homeNav = {
  nav: { title: Wordmark, children: <NavLinks key="nav-links" /> },
  slots: { searchTrigger: { sm: SearchTrigger, full: NoSearchTrigger } },
  // the layouts place their own theme switch inconsistently between home/docs,
  // so it lives inside the actions cluster instead
  themeSwitch: { enabled: false },
  links: [
    {
      type: 'custom',
      on: 'nav',
      secondary: true,
      children: (
        <div className="flex items-center gap-2">
          <NavSearchTrigger />
          <VersionSelect />
          <Suspense fallback={<GithubLink />}>
            <GithubStars />
          </Suspense>
          <ThemeToggle />
        </div>
      ),
    },
    { text: 'Docs', url: '/docs/v4', on: 'menu' },
    { text: 'REPL', url: '/repl', on: 'menu' },
    { text: 'Blog', url: '/blog', on: 'menu' },
    { text: 'GitHub', url: GITHUB_URL, external: true, on: 'menu' },
    {
      type: 'custom',
      on: 'menu',
      children: (
        <div className="flex items-center gap-2">
          <VersionSelect />
          <ThemeToggle />
        </div>
      ),
    },
  ],
} satisfies BaseLayoutProps;
