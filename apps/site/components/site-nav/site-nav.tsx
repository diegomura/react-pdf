'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import logo from '@/public/logo.png';
import { ChevronDown, Moon, Search, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useSearchContext } from 'fumadocs-ui/contexts/search';

export const DONATE_URL = 'https://opencollective.com/react-pdf';

const LINKS = [
  { text: 'Docs', url: '/docs/v4', match: '/docs' },
  { text: 'Playground', url: '/playground', match: '/playground' },
  { text: 'Changelog', url: '/changelog', match: '/changelog' },
  { text: 'Blog', url: '/blog', match: '/blog' },
];

export type WordmarkProps = React.ComponentProps<'a'>;

export function Wordmark({ href = '/' }: WordmarkProps) {
  return (
    <Link
      href={href}
      className="text-fd-foreground flex items-center gap-2 text-[1rem] font-semibold tracking-tight"
    >
      <Image src={logo} alt="" width={29} height={26} priority />
      react-pdf
    </Link>
  );
}

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="ms-7 flex items-center gap-6 text-[0.8125rem] max-lg:hidden">
      {LINKS.map((link) => (
        <Link
          key={link.url}
          href={link.url}
          data-active={pathname.startsWith(link.match)}
          className="text-fd-muted-foreground data-[active=true]:text-fd-foreground transition-colors hover:text-fd-foreground data-[active=true]:font-medium"
        >
          {link.text}
        </Link>
      ))}
      <a
        href={DONATE_URL}
        target="_blank"
        rel="noreferrer"
        className="text-fd-muted-foreground hover:text-fd-primary transition-colors"
      >
        Donate
      </a>
    </nav>
  );
}

export function NavSearchTrigger() {
  const { setOpenSearch, enabled } = useSearchContext();
  if (!enabled) return null;

  return (
    <button
      type="button"
      onClick={() => setOpenSearch(true)}
      className="bg-fd-muted/60 text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground inline-flex h-8 w-[240px] items-center gap-2 rounded-md border ps-2.5 pe-1.5 text-[0.8125rem] transition-colors"
    >
      <Search className="size-3.5 shrink-0" />
      <span className="truncate">Search documentation…</span>
      <kbd className="bg-fd-background text-fd-muted-foreground ms-auto rounded border px-1.5 py-0.5 font-sans text-[0.6875rem] leading-none">
        ⌘K
      </kbd>
    </button>
  );
}

const VERSIONS = ['v4', 'v3', 'v2', 'v1'];

export function VersionSelect() {
  const pathname = usePathname();
  const router = useRouter();
  if (!pathname.startsWith('/docs')) return null;

  const current =
    VERSIONS.find((v) => pathname.startsWith(`/docs/${v}`)) ?? 'v4';

  return (
    <div className="relative inline-flex items-center">
      <select
        aria-label="Documentation version"
        value={current}
        onChange={(e) => router.push(`/docs/${e.target.value}`)}
        className="bg-fd-muted/60 text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground h-8 cursor-pointer appearance-none rounded-md border ps-2.5 pe-6 text-[0.8125rem] font-medium transition-colors"
      >
        {VERSIONS.map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </select>
      <ChevronDown className="text-fd-muted-foreground pointer-events-none absolute end-2 size-3" />
    </div>
  );
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground inline-flex size-8 items-center justify-center rounded-md transition-colors"
    >
      <Sun className="size-4 dark:hidden" />
      <Moon className="hidden size-4 dark:block" />
    </button>
  );
}

/** The navbar renders its own search trigger, so the layout's built-in one is suppressed. */
export function NoSearchTrigger() {
  return null;
}
