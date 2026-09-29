import type { Metadata } from 'next';
import { IBM_Plex_Mono } from 'next/font/google';
import { Provider } from '@/components/provider';
import './global.css';

export const metadata: Metadata = {
  icons: { icon: { url: '/img/logo-mark-gold.svg', type: 'image/svg+xml' } },
};

const plexMono = IBM_Plex_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-plex-mono',
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      // Opts the page into the Lightcone brand tokens; the provider keeps the
      // scheme attribute in sync with the active theme.
      className={`lightcone-brand ${plexMono.variable}`}
      data-lightcone-color-scheme="light"
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
