import { Suspense } from 'react';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { SearchTrigger } from 'fumadocs-ui/layouts/shared/slots/search-trigger';
import {
  DONATE_URL,
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
  // transparent while the hero backdrop is behind it, tinted once you scroll
  nav: {
    title: Wordmark,
    children: <NavLinks key="nav-links" />,
    transparentMode: 'top',
  },
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
    { text: 'Playground', url: '/playground', on: 'menu' },
    { text: 'Changelog', url: '/changelog', on: 'menu' },
    { text: 'Blog', url: '/blog', on: 'menu' },
    { text: 'GitHub', url: GITHUB_URL, external: true, on: 'menu' },
    { text: 'Donate', url: DONATE_URL, external: true, on: 'menu' },
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
