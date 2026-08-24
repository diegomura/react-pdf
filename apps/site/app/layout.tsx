import './global.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import type { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata = {
  title: {
    template: '%s | react-pdf',
    default: 'react-pdf — PDFs, made with React',
  },
  description:
    'React renderer for creating PDF files on the browser and server.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col font-sans">
        <RootProvider theme={{ defaultTheme: 'dark' }}>{children}</RootProvider>
      </body>
    </html>
  );
}
