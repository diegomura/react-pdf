import './global.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { Geist, Geist_Mono } from 'next/font/google';
import type { ReactNode } from 'react';
import VersionedSearchDialog from '@/components/search-dialog';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });
const mono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export const metadata = {
  title: {
    template: '%s | react-pdf',
    default: 'react-pdf — PDFs, made with React',
  },
  description:
    'React renderer for creating PDF files on the browser and server.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col font-sans">
        <RootProvider
          theme={{ defaultTheme: 'light' }}
          search={{ SearchDialog: VersionedSearchDialog }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
