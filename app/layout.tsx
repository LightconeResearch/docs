import type { Metadata } from 'next';
import { Provider } from '@/components/provider';
import './global.css';

export const metadata: Metadata = {
  icons: { icon: { url: '/img/logo-mark-gold.svg', type: 'image/svg+xml' } },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      // Opts the page into the Lightcone brand tokens, whose dark scheme
      // follows the `dark` class the theme provider toggles.
      className="lightcone-brand"
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
