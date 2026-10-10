import type { Metadata } from 'next';
import { Banner } from 'fumadocs-ui/components/banner';
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
        <Provider>
          {/* Readers can close the banner; its id remembers that they did. */}
          <Banner id="public-beta">
            Public beta:&nbsp;
            <a href="https://discord.gg/EbG6JKuyAx" className="underline">
              join our Discord
            </a>
            <span className="max-sm:hidden">&nbsp;to share feedback and suggestions</span>
          </Banner>
          {children}
        </Provider>
      </body>
    </html>
  );
}
